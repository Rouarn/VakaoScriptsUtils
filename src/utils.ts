/**
 * Vakao-UI 脚本工具库 - 工具函数模块
 *
 * 提供分隔线、成功结束消息与统一错误处理等通用工具函数。
 * 装饰线宽度统一为 60，与横幅艺术字宽度协调，保证整体视觉一致。
 */

import { writeSync } from 'node:fs';

import { colors } from './colors.js';
import { displayWidth } from './width.js';
import { formatLog } from './logger.js';

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
 * 把任意错误值转成可读文本（内部）
 *
 * JS 消费方可能抛出对象、数字甚至 undefined，直接拼字符串会得到
 * "[object Object]"，因此优先取 Error.message，对象则尝试 JSON 序列化。
 *
 * @param error - 任意错误值
 * @returns 可读的错误描述
 */
function describeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error === null || error === undefined) {
    return String(error);
  }
  if (typeof error === 'object') {
    try {
      const json = JSON.stringify(error);
      // JSON.stringify 对循环引用抛错，对无法序列化的值返回 undefined
      if (json !== undefined) {
        return json;
      }
    } catch {
      // 落到 String(error)
    }
  }
  return String(error);
}

/**
 * 错误处理函数
 *
 * 统一的错误处理机制：同步写出错误信息到 stderr 并终止程序执行。
 * 仅输出错误消息正文，不展开 stack，避免输出噪音。
 *
 * @param message - 错误描述信息
 * @param error - 任意错误值（Error、字符串、普通对象均可）
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
export function handleError(message: string, error: unknown): never {
  const detail = describeError(error);
  const text = formatLog(`${message}: ${detail}`, 'error');

  // 用 fs.writeSync 同步写入 fd 2：不经过流缓冲，也不依赖事件循环，
  // 因此紧接着调用 process.exit(1) 不会像 console.log 那样出现
  // "退出前异步写未落地、错误信息被截断" 的问题。
  try {
    writeSync(2, `${text}\n`);
  } catch {
    // 极端环境下 stderr 不可写（例如已关闭），至少保证退出码正确
  }

  process.exit(1);
}
