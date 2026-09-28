/**
 * 横幅显示模块
 *
 * 提供 VAKAO UI 的 ASCII 艺术字横幅输出。艺术字基于 figlet Standard 字体生成，
 * 所有行宽度严格相等，配合动态居中的标题与等宽装饰线，确保终端显示对齐美观。
 */

import { colors } from './colors.js';

/**
 * ASCII 艺术字宽度（figlet Standard "VAKAO UI" 输出宽度）
 * @internal
 */
const BANNER_WIDTH = 44;

/**
 * VAKAO UI ASCII 艺术字
 *
 * 使用 figlet Standard 字体生成，5 行宽度严格相等（44 字符）。
 * 采用青色加粗样式突出显示，作为脚本输出的品牌标识。
 *
 * 使用 String.raw 避免反斜杠转义破坏 figlet 字形。
 */
export const asciiArt: string = String.raw`${colors.cyan}${colors.bright}
 __     ___    _  __    _    ___    _   _ ___
 \ \   / / \  | |/ /   / \  / _ \  | | | |_ _|
  \ \ / / _ \ | ' /   / _ \| | | | | | | || |
   \ V / ___ \| . \  / ___ \ |_| | | |_| || |
    \_/_/   \_\_|\_\/_/   \_\___/   \___/|___|${colors.reset}`;

/**
 * 计算字符串在终端的显示宽度
 *
 * CJK（中日韩）字符按 2 列计算，其余字符按 1 列计算。
 * 用于标题居中时正确处理中文等宽字符。
 *
 * @param str - 待计算的字符串
 * @returns 终端显示宽度
 */
function displayWidth(str: string): number {
  let width = 0;
  for (const ch of str) {
    const code = ch.codePointAt(0) ?? 0;
    if (
      (code >= 0x1100 && code <= 0x115f) ||
      (code >= 0x2e80 && code <= 0x303e) ||
      (code >= 0x3040 && code <= 0x33bf) ||
      (code >= 0x3400 && code <= 0x4dbf) ||
      (code >= 0x4e00 && code <= 0xa4cf) ||
      (code >= 0xac00 && code <= 0xd7af) ||
      (code >= 0xf900 && code <= 0xfaff) ||
      (code >= 0xfe30 && code <= 0xfe6f) ||
      (code >= 0xff01 && code <= 0xff60) ||
      (code >= 0xffe0 && code <= 0xffe6)
    ) {
      width += 2;
    } else {
      width += 1;
    }
  }
  return width;
}

/**
 * 将标题按指定宽度居中
 *
 * @param title - 标题文本
 * @param width - 目标宽度
 * @returns 居中后的字符串（左填充空格）
 */
function centerTitle(title: string, width: number): string {
  const tw = displayWidth(title);
  const padding = Math.max(0, Math.floor((width - tw) / 2));
  return ' '.repeat(padding) + title;
}

/**
 * 创建带标题的横幅
 *
 * 生成包含 ASCII 艺术字和居中标题的完整横幅。
 * 标题以品红色加粗样式显示在艺术字下方，并配合与艺术字等宽的装饰线。
 *
 * @param title - 横幅标题文本
 * @returns 完整的横幅字符串
 *
 * @example
 * ```javascript
 * const banner = createBanner('项目构建');
 * console.log(banner);
 * ```
 */
export function createBanner(title: string): string {
  const line = '═'.repeat(BANNER_WIDTH);
  return `${asciiArt}
${colors.magenta}${colors.bright}${centerTitle(title, BANNER_WIDTH)}${colors.reset}
${colors.dim}${line}${colors.reset}
`;
}

/**
 * 显示横幅
 *
 * 直接在控制台输出带标题的横幅，是 createBanner 的便捷包装函数。
 *
 * @param title - 横幅标题文本
 *
 * @example
 * ```javascript
 * showBanner('Vakao UI 构建工具');
 * ```
 */
export function showBanner(title: string): void {
  console.log(createBanner(title));
}
