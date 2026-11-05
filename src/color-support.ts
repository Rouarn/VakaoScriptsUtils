/**
 * 终端颜色能力判定
 *
 * 库内所有 ANSI 颜色都通过 colors 对象输出；若不做能力判定，把输出重定向到
 * 文件或 CI 日志时会留下大量 `\x1b[31m` 噪声。这里遵循业界通行约定：
 * - `NO_COLOR` 非空：一律关闭（https://no-color.org）
 * - `FORCE_COLOR=0`：关闭；`FORCE_COLOR` 为其他非空值：强制开启
 * - 未设置时按 stdout 是否为 TTY 判断
 *
 * 每次访问 colors 时实时求值，因此运行期修改环境变量或在测试中切换都生效。
 */

/**
 * 当前是否应输出 ANSI 颜色
 *
 * @returns 允许输出颜色返回 true
 */
export function isColorEnabled(): boolean {
  const noColor = process.env.NO_COLOR;
  if (noColor !== undefined && noColor !== '') {
    return false;
  }

  const forceColor = process.env.FORCE_COLOR;
  if (forceColor === '0' || forceColor === 'false') {
    return false;
  }
  if (forceColor !== undefined && forceColor !== '') {
    return true;
  }

  return Boolean(process.stdout?.isTTY);
}
