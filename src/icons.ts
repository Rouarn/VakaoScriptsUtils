/**
 * 图标配置模块
 *
 * 为不同的操作类型和状态定义对应的 Emoji 图标。
 * 全部使用纯 emoji（不含 variation selector U+FE0F），避免带 VS 的 emoji
 * 在终端渲染时吞掉后续空格、导致图标与文字挨在一起。
 * 为防止源码编辑时 codepoint 被替换为 U+FFFD，统一使用 ES6 unicode 转义。
 */

import type { LogType } from './types.js';

export const icons: Record<LogType, string> = Object.freeze({
  /** 信息提示图标 - 备忘录，用于一般信息输出 */
  info: '\u{1F4DD}',

  /** 成功状态图标 - 白色勾选，用于操作成功提示 */
  success: '\u{2705}',

  /** 警告状态图标 - 黄色圆，警告色，用于警告信息提示 */
  warning: '\u{1F7E1}',

  /** 错误状态图标 - 红色叉，用于错误信息提示 */
  error: '\u{274C}',

  /** 命令执行图标 - 扳手，用于命令行操作提示 */
  command: '\u{1F527}',

  /** 构建操作图标 - 锤子，用于项目构建过程 */
  build: '\u{1F528}',

  /** 发布操作图标 - 包裹，用于包发布过程 */
  publish: '\u{1F4E6}',

  /** 部署操作图标 - 火箭，用于项目部署过程 */
  deploy: '\u{1F680}',

  /** 检查操作图标 - 放大镜，用于检查和验证过程 */
  check: '\u{1F50D}',

  /** 复制操作图标 - 剪贴板，用于文件复制操作 */
  copy: '\u{1F4CB}',

  /** 清理操作图标 - 扫帚，用于清理和删除操作 */
  clean: '\u{1F9F9}',
});
