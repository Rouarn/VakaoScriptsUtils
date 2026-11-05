/**
 * Vakao-UI 脚本工具库 - 工具函数模块
 *
 * 提供分隔线、成功结束消息与统一错误处理等通用工具函数。
 * 装饰线宽度统一为 60，与横幅艺术字宽度协调，保证整体视觉一致。
 */

import { colors } from './colors.js';
import { displayWidth } from './width.js';
import { log } from './logger.js';

/**
 * 默认装饰线宽度
 *
 * 与 banner 艺术字宽度（44）协调，统一 separator/showSuccess 的视觉宽度。
 */
const DEFAULT_LINE_WIDTH = 60;

/**
 * 显示分隔线
 *
 * 在控制台输出指定字符组成的分隔线，使用暗淡样式显示，不会过于突出。
 *
 * @param char - 用于构成分隔线的字符（默认 '─'）
 * @param length - 分隔线的长度（字符数量，默认 60）
 *
 * @example
 * ```javascript
 * separator();
 * // 输出：────────────────────────────────────────────────────────────
 *
 * separator('=', 30);
 * // 输出：==============================
 *
 * separator('═', 60);
 * // 输出：══════════════════════════════════════════════════════════
 * ```
 */
export function separator(char: string = '─', length: number = DEFAULT_LINE_WIDTH): void {
  console.log(`${colors.dim}${char.repeat(length)}${colors.reset}`);
}

/**
 * 显示成功结束消息
 *
 * 输出格式化的成功消息：上下装饰线（宽度 60）+ 居中的成功消息。
 * 消息以绿色加粗显示，配合庆祝 emoji，提供良好的用户反馈。
 *
 * 输出格式：
 * ```
 * ══════════════════════════════════════════════════════════
 *                    🎉 消息内容 🎉
 * ══════════════════════════════════════════════════════════
 * ```
 *
 * @param message - 成功消息内容
 *
 * @example
 * ```javascript
 * showSuccess('项目构建完成');
 * showSuccess('所有测试用例通过');
 * ```
 */
export function showSuccess(message: string): void {
  const line = '═'.repeat(DEFAULT_LINE_WIDTH);
  const fullMessage = `🎉 ${message} 🎉`;
  const padding = Math.max(0, Math.floor((DEFAULT_LINE_WIDTH - displayWidth(fullMessage)) / 2));
  const centered = ' '.repeat(padding) + fullMessage;

  console.log(`${colors.dim}${line}${colors.reset}`);
  console.log(`${colors.green}${colors.bright}${centered}${colors.reset}`);
  console.log(`${colors.dim}${line}${colors.reset}`);
}

/**
 * 错误处理函数
 *
 * 统一的错误处理机制：输出错误信息并终止程序执行。
 * 仅输出错误消息正文，不展开 stack，避免输出噪音。
 *
 * @param message - 错误描述信息
 * @param error - 错误对象或错误消息字符串
 * @throws 此函数会调用 process.exit(1) 终止程序
 *
 * @example
 * ```javascript
 * try {
 *   const content = fs.readFileSync('config.json', 'utf8');
 * } catch (error) {
 *   handleError('读取配置文件失败', error);
 * }
 * ```
 */
export function handleError(message: string, error: Error | string): never {
  const detail = error instanceof Error ? error.message : error;
  log(`${message}: ${detail}`, 'error');
  process.exit(1);
}
