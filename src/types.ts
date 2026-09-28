/**
 * 共享类型定义
 */

/**
 * 标准日志类型枚举（字符串字面量联合）
 */
export type LogType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'command'
  | 'build'
  | 'publish'
  | 'deploy'
  | 'check'
  | 'copy'
  | 'clean';

/**
 * 颜色码映射对象结构
 *
 * 包含前景色（含亮色变体）、背景色与文本样式（下划线、斜体、删除线等）。
 * 所有字段为 ANSI 转义序列字符串。
 */
export interface Colors {
  // 基础样式
  /** 重置所有样式和颜色 */
  reset: string;
  /** 加粗/高亮文本 */
  bright: string;
  /** 暗淡文本（降低亮度） */
  dim: string;

  // 前景色（标准）
  /** 黑色文本 */
  black: string;
  /** 红色文本 - 通常用于错误信息 */
  red: string;
  /** 绿色文本 - 通常用于成功信息 */
  green: string;
  /** 黄色文本 - 通常用于警告信息 */
  yellow: string;
  /** 蓝色文本 - 通常用于信息提示 */
  blue: string;
  /** 品红色文本 - 通常用于特殊标记 */
  magenta: string;
  /** 青色文本 - 通常用于命令或链接 */
  cyan: string;
  /** 白色文本 */
  white: string;

  // 前景色（亮色变体）
  /** 亮黑色文本 */
  brightBlack: string;
  /** 亮红色文本 */
  brightRed: string;
  /** 亮绿色文本 */
  brightGreen: string;
  /** 亮黄色文本 */
  brightYellow: string;
  /** 亮蓝色文本 */
  brightBlue: string;
  /** 亮品红色文本 */
  brightMagenta: string;
  /** 亮青色文本 */
  brightCyan: string;
  /** 亮白色文本 */
  brightWhite: string;

  // 背景色
  /** 黑色背景 */
  bgBlack: string;
  /** 红色背景 - 通常用于错误突出 */
  bgRed: string;
  /** 绿色背景 - 通常用于成功突出 */
  bgGreen: string;
  /** 黄色背景 - 通常用于警告突出 */
  bgYellow: string;
  /** 蓝色背景 */
  bgBlue: string;
  /** 品红色背景 */
  bgMagenta: string;
  /** 青色背景 */
  bgCyan: string;
  /** 白色背景 */
  bgWhite: string;

  // 文本样式
  /** 下划线 */
  underline: string;
  /** 斜体 */
  italic: string;
  /** 删除线 */
  strikethrough: string;
  /** 反转前景/背景色 */
  reverse: string;
  /** 隐藏文本 */
  hidden: string;
}
