/**
 * 日志记录模块
 */

import type { LogType } from "./types.js";
import { colors, typeColors } from "./colors.js";
import { icons } from "./icons.js";

/**
 * 美化日志输出
 *
 * 输出格式化的日志消息，包含时间戳、图标、颜色和消息内容。
 * 支持智能换行处理，保持输出格式的整洁性。
 *
 * 输出格式：[时间戳] 图标 消息内容
 *
 * @param {string} message - 要输出的日志消息
 * @param {string} [type='info'] - 日志类型，决定图标和颜色
 *   可选值：'info', 'success', 'warning', 'error', 'command', 'build',
 *          'publish', 'deploy', 'check', 'copy', 'clean'
 *
 * @example
 * ```javascript
 * // 基础用法
 * log('应用启动成功', 'success');
 * // 输出：[14:30:25] ✅ 应用启动成功
 *
 * // 带换行符的消息
 * log('\n开始执行任务\n', 'info');
 * // 会在消息前后添加空行
 *
 * // 错误日志
 * log('文件不存在', 'error');
 * // 输出：[14:30:25] ❌ 文件不存在
 *
 * // 构建日志
 * log('正在编译 TypeScript 文件', 'build');
 * // 输出：[14:30:25] 🏗️ 正在编译 TypeScript 文件
 * ```
 */
export function log(message: string, type: LogType = "info"): void {
  // 获取当前时间戳
  const timestamp: string = new Date().toLocaleTimeString();

  // 获取对应类型的图标和颜色
  const icon: string = icons[type] || icons.info;
  const color: string = typeColors[type] || typeColors.info;

  // 检查消息开头是否有换行符
  const startsWithNewline: boolean = message.startsWith("\n");
  // 检查消息结尾是否有换行符
  const endsWithNewline: boolean = message.endsWith("\n");

  // 移除消息中的换行符，由我们来控制换行
  const cleanMessage: string = message.replace(/^\n+|\n+$/g, "");

  // 如果开头有换行符，先打印换行
  if (startsWithNewline) {
    console.log("");
  }

  // 打印主要内容
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${icon} ${color}${cleanMessage}${colors.reset}`);

  // 如果结尾有换行符，后打印换行
  if (endsWithNewline) {
    console.log("");
  }
}
