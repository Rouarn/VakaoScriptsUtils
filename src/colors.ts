/**
 * 颜色和样式配置模块
 *
 * 包含终端文本颜色和样式的 ANSI 转义序列。
 * 涵盖基础样式、前景色（标准 + 亮色变体）、背景色与高级文本样式，
 * 这些代码可组合使用来创建丰富的终端输出效果。
 */

import type { Colors, LogType } from './types.js';

/**
 * ANSI 颜色和样式代码配置
 *
 * 所有值为 ANSI 转义序列字符串，可通过字符串拼接组合使用。
 * 使用后请务必附加 `colors.reset` 重置样式，避免影响后续输出。
 */
export const colors: Colors = {
  // 基础样式
  /** 重置所有样式和颜色 */
  reset: '\x1b[0m',
  /** 加粗/高亮文本 */
  bright: '\x1b[1m',
  /** 暗淡文本（降低亮度） */
  dim: '\x1b[2m',

  // 前景色（标准）
  /** 黑色文本 */
  black: '\x1b[30m',
  /** 红色文本 - 通常用于错误信息 */
  red: '\x1b[31m',
  /** 绿色文本 - 通常用于成功信息 */
  green: '\x1b[32m',
  /** 黄色文本 - 通常用于警告信息 */
  yellow: '\x1b[33m',
  /** 蓝色文本 - 通常用于信息提示 */
  blue: '\x1b[34m',
  /** 品红色文本 - 通常用于特殊标记 */
  magenta: '\x1b[35m',
  /** 青色文本 - 通常用于命令或链接 */
  cyan: '\x1b[36m',
  /** 白色文本 */
  white: '\x1b[37m',

  // 前景色（亮色变体）
  /** 亮黑色文本 */
  brightBlack: '\x1b[90m',
  /** 亮红色文本 */
  brightRed: '\x1b[91m',
  /** 亮绿色文本 */
  brightGreen: '\x1b[92m',
  /** 亮黄色文本 */
  brightYellow: '\x1b[93m',
  /** 亮蓝色文本 */
  brightBlue: '\x1b[94m',
  /** 亮品红色文本 */
  brightMagenta: '\x1b[95m',
  /** 亮青色文本 */
  brightCyan: '\x1b[96m',
  /** 亮白色文本 */
  brightWhite: '\x1b[97m',

  // 背景色
  /** 黑色背景 */
  bgBlack: '\x1b[40m',
  /** 红色背景 - 通常用于错误突出 */
  bgRed: '\x1b[41m',
  /** 绿色背景 - 通常用于成功突出 */
  bgGreen: '\x1b[42m',
  /** 黄色背景 - 通常用于警告突出 */
  bgYellow: '\x1b[43m',
  /** 蓝色背景 */
  bgBlue: '\x1b[44m',
  /** 品红色背景 */
  bgMagenta: '\x1b[45m',
  /** 青色背景 */
  bgCyan: '\x1b[46m',
  /** 白色背景 */
  bgWhite: '\x1b[47m',

  // 文本样式
  /** 下划线 */
  underline: '\x1b[4m',
  /** 斜体 */
  italic: '\x1b[3m',
  /** 删除线 */
  strikethrough: '\x1b[9m',
  /** 反转前景/背景色 */
  reverse: '\x1b[7m',
  /** 隐藏文本 */
  hidden: '\x1b[8m',
};

/**
 * 日志类型对应的颜色映射
 *
 * 为不同类型的日志消息定义标准颜色，确保输出的一致性。
 * 遵循通用的颜色语义约定。
 */
export const typeColors: Record<LogType, string> = {
  /** 信息类型 - 蓝色 */
  info: colors.blue,
  /** 成功类型 - 绿色 */
  success: colors.green,
  /** 警告类型 - 黄色 */
  warning: colors.yellow,
  /** 错误类型 - 红色 */
  error: colors.red,
  /** 命令类型 - 青色 */
  command: colors.cyan,
  /** 构建类型 - 品红色 */
  build: colors.magenta,
  /** 发布类型 - 绿色 */
  publish: colors.green,
  /** 部署类型 - 品红色 */
  deploy: colors.magenta,
  /** 检查类型 - 黄色 */
  check: colors.yellow,
  /** 复制类型 - 青色 */
  copy: colors.cyan,
  /** 清理类型 - 品红色 */
  clean: colors.magenta,
};
