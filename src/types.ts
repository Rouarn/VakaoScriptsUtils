/**
 * 共享类型定义
 */

/**
 * 标准日志类型枚举（字符串字面量联合）
 */
export type LogType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "command"
  | "build"
  | "publish"
  | "deploy"
  | "check"
  | "copy"
  | "clean";

/**
 * 颜色码映射对象结构
 */
export interface Colors {
  reset: string;
  bright: string;
  dim: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
}