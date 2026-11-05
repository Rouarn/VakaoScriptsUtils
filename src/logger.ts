/**
 * 日志记录模块
 *
 * 提供格式化的日志输出，包含固定格式时间戳（HH:MM:SS）、类型图标、
 * 类型颜色与消息内容。支持多行消息的缩进对齐，保证后续行与首行
 * 消息内容垂直对齐，避免输出错位。
 */

import type { LogType } from './types.js';
import { colors, typeColors } from './colors.js';
import { icons } from './icons.js';

/**
 * 时间戳后空格的固定宽度
 *
 * `[HH:MM:SS]` 占 10 字符，后接 1 个空格，共 11 字符。
 * 多行消息的非首行使用此宽度的空格做缩进对齐。
 */
const TIMESTAMP_PREFIX_WIDTH = 11;

/**
 * 生成固定格式的时间戳字符串 HH:MM:SS
 *
 * 不依赖 locale，保证跨机器/CI 输出一致。
 *
 * @returns 形如 `16:23:45` 的时间字符串
 */
function getTimestamp(): string {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':');
}

/**
 * 美化日志输出
 *
 * 输出格式：`[HH:MM:SS] 图标 消息`，时间戳为暗淡样式，消息按类型着色。
 *
 * 多行消息处理：
 * - 首尾换行保留为前后空行（与历史行为一致）
 * - 消息内部的换行不做硬合并，后续行缩进对齐到时间戳之后，
 *   保证多行内容垂直对齐
 *
 * @param message - 要输出的日志消息
 * @param type - 日志类型，决定图标和颜色（默认 'info'）
 *
 * @example
 * ```javascript
 * log('应用启动成功', 'success');
 * // 输出：[14:30:25] ✅ 应用启动成功
 *
 * log('第一行\n第二行\n第三行', 'info');
 * // 多行内容垂直对齐到时间戳右侧
 *
 * log('文件不存在', 'error');
 * // 输出：[14:30:25] ❌ 文件不存在
 *
 * log('正在编译 TypeScript 文件', 'build');
 * // 输出：[14:30:25] 🛠️ 正在编译 TypeScript 文件
 * ```
 */
export function log(message: string, type: LogType = 'info'): void {
  const timestamp = getTimestamp();
  const icon = icons[type] || icons.info;
  const color = typeColors[type] || typeColors.info;

  const startsWithNewline = message.startsWith('\n');
  const endsWithNewline = message.endsWith('\n');

  // 移除首尾换行（由我们控制前后空行），保留内部换行
  const cleanMessage = message.replace(/^\n+|\n+$/g, '');

  // 多行消息：非首行缩进对齐到时间戳之后
  const indent = ' '.repeat(TIMESTAMP_PREFIX_WIDTH);
  const indentedMessage = cleanMessage
    .split('\n')
    .map((line, index) => (index === 0 ? line : indent + line))
    .join('\n');

  // 错误日志走 stderr：便于 `2>` 单独捕获，也不会混进正常输出流。
  // console.error 由 Node 保证写入 fd 2，进程未退出时不会被丢弃。
  const write = type === 'error' ? console.error : console.log;

  if (startsWithNewline) {
    write('');
  }

  write(
    `${colors.dim}[${timestamp}]${colors.reset} ${icon} ${color}${indentedMessage}${colors.reset}`,
  );

  if (endsWithNewline) {
    write('');
  }
}

/**
 * 生成单行日志文本（不含换行符）
 *
 * 供需要同步写出的场景复用（例如 handleError 在进程退出前写 stderr），
 * 保证同步写出与 log 的输出格式完全一致。
 *
 * @param message - 日志消息
 * @param type - 日志类型
 * @returns 已着色、已缩进的日志文本
 * @internal
 */
export function formatLog(message: string, type: LogType = 'info'): string {
  const timestamp = getTimestamp();
  const icon = icons[type] || icons.info;
  const color = typeColors[type] || typeColors.info;
  const cleanMessage = message.replace(/^\n+|\n+$/g, '');
  const indent = ' '.repeat(TIMESTAMP_PREFIX_WIDTH);
  const indentedMessage = cleanMessage
    .split('\n')
    .map((line, index) => (index === 0 ? line : indent + line))
    .join('\n');

  return `${colors.dim}[${timestamp}]${colors.reset} ${icon} ${color}${indentedMessage}${colors.reset}`;
}
