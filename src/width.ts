/**
 * 终端显示宽度计算模块（全库唯一实现）
 *
 * 之前 banner.ts 与 utils.ts 各自复制了一份 displayWidth，scripts/demo.mjs 又
 * 实现了第三套（把非 ASCII 一律记为 2 列），三者在 emoji 上结论不同，
 * 直接导致 showSuccess 居中偏移。这里收敛为单一实现，banner、utils、
 * demo 与消费方共用同一套规则。
 *
 * 规则：
 * - 先剥离 ANSI 转义序列（颜色码不占显示宽度）
 * - 零宽字符（ZWJ、变体选择符、组合附加符号）记 0
 * - 东亚宽字符（CJK、全角符号）记 2
 * - Emoji（含 U+2705 ✅、U+274C ❌ 等 emoji presentation 字符）记 2
 * - 成对的 regional indicator（国旗）整体记 2
 * - 其余记 1
 */

/** 单个码点即为零宽的字符 */
const ZERO_WIDTH_CODE_POINTS = new Set<number>([
  0x200b, // zero width space
  0x200c, // zero width non-joiner
  0x200d, // zero width joiner
  0x200e, // left-to-right mark
  0x200f, // right-to-left mark
  0x2060, // word joiner
  0xfe0e, // variation selector-15（文本呈现）
  0xfe0f, // variation selector-16（emoji 呈现）
]);

/** 零宽的码点区间（组合附加符号等） */
const ZERO_WIDTH_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x0300, 0x036f],
  [0x0483, 0x0489],
  [0x0591, 0x05bd],
  [0x0610, 0x061a],
  [0x064b, 0x065f],
  [0x1ab0, 0x1aff],
  [0x1dc0, 0x1dff],
  [0x20d0, 0x20ff],
  [0xfe20, 0xfe2f],
];

/** 占 2 列的码点区间（东亚宽字符 + Emoji） */
const WIDE_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x1100, 0x115f],
  [0x231a, 0x231b],
  [0x23e9, 0x23ec],
  [0x23f0, 0x23f0],
  [0x23f3, 0x23f3],
  [0x25fd, 0x25fe],
  [0x2614, 0x2615],
  [0x2648, 0x2653],
  [0x267f, 0x267f],
  [0x2693, 0x2693],
  [0x26a1, 0x26a1],
  [0x26aa, 0x26ab],
  [0x26bd, 0x26be],
  [0x26c4, 0x26c5],
  [0x26ce, 0x26ce],
  [0x26d4, 0x26d4],
  [0x26ea, 0x26ea],
  [0x26f2, 0x26f3],
  [0x26f5, 0x26f5],
  [0x26fa, 0x26fa],
  [0x26fd, 0x26fd],
  [0x2705, 0x2705],
  [0x270a, 0x270b],
  [0x2728, 0x2728],
  [0x274c, 0x274c],
  [0x274e, 0x274e],
  [0x2753, 0x2755],
  [0x2757, 0x2757],
  [0x2795, 0x2797],
  [0x27b0, 0x27b0],
  [0x27bf, 0x27bf],
  [0x2b1b, 0x2b1c],
  [0x2b50, 0x2b50],
  [0x2b55, 0x2b55],
  [0x2e80, 0x303e],
  [0x3040, 0x33bf],
  [0x3400, 0x4dbf],
  [0x4e00, 0xa4cf],
  [0xac00, 0xd7af],
  [0xf900, 0xfaff],
  [0xfe30, 0xfe6f],
  [0xff01, 0xff60],
  [0xffe0, 0xffe6],
  [0x1f004, 0x1f004],
  [0x1f0cf, 0x1f0cf],
  [0x1f170, 0x1f19a],
  [0x1f1e6, 0x1f1ff],
  [0x1f200, 0x1f320],
  [0x1f32d, 0x1f335],
  [0x1f337, 0x1f37c],
  [0x1f37e, 0x1f393],
  [0x1f3a0, 0x1f3ca],
  [0x1f3cf, 0x1f3d3],
  [0x1f3e0, 0x1f3f0],
  [0x1f3f4, 0x1f3f4],
  [0x1f3f8, 0x1f43e],
  [0x1f440, 0x1f440],
  [0x1f442, 0x1f4fc],
  [0x1f4ff, 0x1f53d],
  [0x1f54b, 0x1f54e],
  [0x1f550, 0x1f567],
  [0x1f57a, 0x1f57a],
  [0x1f595, 0x1f596],
  [0x1f5a4, 0x1f5a4],
  [0x1f5fb, 0x1f64f],
  [0x1f680, 0x1f6c5],
  [0x1f6cc, 0x1f6cc],
  [0x1f6d0, 0x1f6d2],
  [0x1f6d5, 0x1f6d7],
  [0x1f6dc, 0x1f6df],
  [0x1f6eb, 0x1f6ec],
  [0x1f6f4, 0x1f6fc],
  [0x1f7e0, 0x1f7eb],
  [0x1f7f0, 0x1f7f0],
  [0x1f90c, 0x1f93a],
  [0x1f93c, 0x1f945],
  [0x1f947, 0x1f9ff],
  [0x1fa70, 0x1faff],
];

// ANSI 转义序列本身以 ESC（0x1B）控制字符开头，匹配它正是本模块的职责
// eslint-disable-next-line no-control-regex
const ANSI_PATTERN = /\x1b\[[0-?]*[ -/]*[@-~]/g;

function inRanges(code: number, ranges: ReadonlyArray<readonly [number, number]>): boolean {
  return ranges.some(([start, end]) => code >= start && code <= end);
}

/**
 * 剥离字符串中的 ANSI 转义序列
 *
 * @param input - 可能包含颜色码的字符串
 * @returns 纯文本
 */
export function stripAnsi(input: string): string {
  return input.replace(ANSI_PATTERN, '');
}

/**
 * 计算字符串在终端中的显示宽度
 *
 * @param input - 待计算的字符串（可含 ANSI 颜色码）
 * @returns 终端列数
 */
export function displayWidth(input: string): number {
  const plain = stripAnsi(input);
  const chars = [...plain];
  let width = 0;

  for (let i = 0; i < chars.length; i += 1) {
    const code = chars[i].codePointAt(0) ?? 0;

    if (ZERO_WIDTH_CODE_POINTS.has(code) || inRanges(code, ZERO_WIDTH_RANGES)) {
      continue;
    }

    // 成对 regional indicator 组合成一面旗帜，整体占 2 列
    if (code >= 0x1f1e6 && code <= 0x1f1ff) {
      width += 2;
      const next = chars[i + 1]?.codePointAt(0);
      if (next !== undefined && next >= 0x1f1e6 && next <= 0x1f1ff) {
        i += 1;
      }
      continue;
    }

    width += inRanges(code, WIDE_RANGES) ? 2 : 1;
  }

  return width;
}

/**
 * 按显示宽度右填充空格，使后续内容对齐
 *
 * @param input - 待填充的字符串
 * @param width - 目标显示宽度
 * @returns 填充后的字符串
 */
export function padEndDisplay(input: string, width: number): string {
  const padding = Math.max(0, width - displayWidth(input));
  return input + ' '.repeat(padding);
}
