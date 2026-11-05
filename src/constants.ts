/**
 * 全局尺寸常量
 *
 * 终端输出的宽度与缩进此前分散在 banner.ts（44）、utils.ts（60）、
 * logger.ts（11）三处硬编码，任何一处调整都可能与其余两处失衡。
 * 统一收敛到这里，保证横幅、装饰线、日志缩进只有一个配置点。
 */

/**
 * 横幅艺术字与标题的宽度（figlet Standard "VAKAO UI" 输出宽度）
 */
export const BANNER_WIDTH = 44;

/**
 * 分隔线与成功提示的装饰线宽度
 */
export const LINE_WIDTH = 60;

/**
 * 日志前缀宽度：`[HH:MM:SS]` 10 字符 + 1 个空格
 */
export const LOG_PREFIX_WIDTH = 11;
