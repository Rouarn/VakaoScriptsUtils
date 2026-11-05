/**
 * 输出流保护模块
 *
 * 命令行工具常被接在 `| head`、`| less` 等下游使用，下游提前退出后继续写入
 * 会触发 EPIPE。Node 默认把流 `error` 事件当作未处理异常打印堆栈并中断进程，
 * 对“下游不再需要输出”这种正常情况而言是噪音。这里统一吞掉 EPIPE 并安静退出，
 * 其他错误保持原有抛出行为。
 */

let installed = false;

/**
 * 判断是否为管道断开错误
 *
 * @param error - 任意错误值
 * @returns 是否为 EPIPE
 */
export function isBrokenPipe(error: unknown): boolean {
  return (
    typeof error === 'object' && error !== null && (error as NodeJS.ErrnoException).code === 'EPIPE'
  );
}

/**
 * 为 stdout/stderr 注册一次 EPIPE 保护（幂等）
 *
 * 只移除“EPIPE 导致的崩溃”，不改变其他错误的默认行为。
 */
export function installPipeGuard(): void {
  if (installed) {
    return;
  }
  installed = true;

  for (const stream of [process.stdout, process.stderr]) {
    stream.on('error', (error: NodeJS.ErrnoException) => {
      if (isBrokenPipe(error)) {
        // 下游已关闭，继续输出没有意义；退出码 0 表示按约定正常结束
        process.exit(0);
      }
      throw error;
    });
  }
}
