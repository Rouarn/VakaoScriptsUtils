/**
 * 横幅显示模块
 *
 * 提供 VAKAO UI 的 ASCII 艺术字横幅输出。艺术字基于 figlet Standard 字体生成，
 * 所有行宽度严格相等，配合动态居中的标题与等宽装饰线，确保终端显示对齐美观。
 */

import { colors } from './colors.js';
import { displayWidth } from './width.js';

/**
 * VAKAO UI ASCII 艺术字原始行（纯文本，无 ANSI）
 *
 * 使用 figlet Standard 字体生成，5 行；figlet 输出各行宽度并不相等
 * （实测 45/46 混排），因此需要补齐。
 */
const ART_LINES: string[] = String.raw`
 __     ___    _  __    _    ___    _   _ ___
 \ \   / / \  | |/ /   / \  / _ \  | | | |_ _|
  \ \ / / _ \ | ' /   / _ \| | | | | | | || |
   \ V / ___ \| . \  / ___ \ |_| | | |_| || |
    \_/_/   \_\_|\_\/_/   \_\___/   \___/|___|`.split('\n');

/**
 * 艺术字实际宽度
 *
 * 由最长行推导，而不是写死常量：figlet 字形的真实宽度是 46，
 * 此前按 44 画装饰线会导致短线 2 列、标题也整体左偏。
 */
const ART_WIDTH = Math.max(...ART_LINES.map((line) => line.length));

/**
 * VAKAO UI ASCII 艺术字（纯文本，无 ANSI）
 *
 * 以 ART_WIDTH 右补齐每行，保证 5 行显示宽度严格相等。
 */
export const asciiArtPlain: string = ART_LINES.map((line) =>
  line.length === 0 ? line : line.padEnd(ART_WIDTH),
).join('\n');

/**
 * 带青色的 ASCII 艺术字
 *
 * 刻意做成函数而非常量：颜色能力（NO_COLOR / FORCE_COLOR / TTY）是运行期
 * 判定的，若在模块加载时就拼好常量，会把当时的颜色状态固化成快照。
 *
 * @returns 着色后的艺术字
 */
export function asciiArt(): string {
  return `${colors.cyan}${colors.bright}${asciiArtPlain}${colors.reset}`;
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
  // ART_WIDTH 在本文件内由 asciiArtPlain 的最长行推导，不使用外部常量
  const line = '═'.repeat(ART_WIDTH);
  return `${asciiArt()}
${colors.magenta}${colors.bright}${centerTitle(title, ART_WIDTH)}${colors.reset}
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
