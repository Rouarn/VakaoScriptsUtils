/**
 * 横幅显示模块
 */

import { colors } from "./colors.js";

/**
 * VAKAO UI ASCII 艺术字
 *
 * 使用 ASCII 字符绘制的 VAKAO UI 标志，为脚本输出提供品牌标识。
 * 采用青色和加粗样式突出显示。
 */
export const asciiArt: string = `
${colors.cyan}${colors.bright}
 _          __  _____  __    __  _   _  __    __  _       ___       _   _  
| |        / / /  _  \\ \\ \\  / / | | | | \\ \\  / / | |     /   |     | | | | 
| |  __   / /  | | | |  \\ \\/ /  | | | |  \\ \\/ /  | |    / /| |     | | | | 
| | /  | / /   | | | |   \\  /   | | | |   }  {   | |   / / | |  _  | | | | 
| |/   |/ /    | |_| |   / /    | |_| |  / /\\ \\  | |  / /  | | | |_| | | | 
|___/|___/     \\_____/  /_/     \\_____/ /_/  \\_\\ |_| /_/   |_| \\_____/ |_|    
${colors.reset}`;

/**
 * 创建带标题的横幅
 *
 * 生成包含 ASCII 艺术字和自定义标题的完整横幅。
 * 标题会以品红色和加粗样式显示在艺术字下方。
 *
 * @param {string} title - 横幅标题文本
 *
 * @returns {string} 完整的横幅字符串，包含艺术字、标题和装饰线
 *
 * @example
 * ```javascript
 * // 创建项目构建横幅
 * const banner = createBanner('项目构建');
 * console.log(banner);
 *
 * // 创建发布横幅
 * const publishBanner = createBanner('包发布');
 * console.log(publishBanner);
 * ```
 */
export function createBanner(title: string): string {
  return `${asciiArt}
${colors.magenta}${colors.bright}                           ${title}${colors.reset}
${colors.dim}                        ═══════════════════════════════════${colors.reset}
`;
}

/**
 * 显示横幅
 *
 * 直接在控制台输出带标题的横幅，是 createBanner 的便捷包装函数。
 * 适用于需要立即显示横幅的场景。
 *
 * @param {string} title - 横幅标题文本
 *
 * @example
 * ```javascript
 * // 在脚本开始时显示横幅
 * showBanner('Vakao UI 构建工具');
 *
 * // 在不同阶段显示不同横幅
 * showBanner('开始构建');
 * // ... 构建过程 ...
 * showBanner('构建完成');
 * ```
 */
export function showBanner(title: string): void {
  console.log(createBanner(title));
}
