import { describe, expect, it } from 'vitest';

import { installPipeGuard, isBrokenPipe } from '../src/stream.js';

describe('管道断开保护', () => {
  it('只把 EPIPE 认定为下游关闭', () => {
    expect(isBrokenPipe(Object.assign(new Error('broken pipe'), { code: 'EPIPE' }))).toBe(true);
    expect(isBrokenPipe(Object.assign(new Error('reset'), { code: 'ECONNRESET' }))).toBe(false);
    expect(isBrokenPipe(null)).toBe(false);
    expect(isBrokenPipe('EPIPE')).toBe(false);
  });

  it('重复调用安装不会叠加监听器', () => {
    // installPipeGuard 幂等：多次调用后每个流上只保留 1 个 error 监听器，
    // 避免长期运行的进程反复调用 log 导致监听器泄漏。
    process.stdout.removeAllListeners('error');
    process.stderr.removeAllListeners('error');
    installPipeGuard();
    installPipeGuard();
    installPipeGuard();
    expect(process.stdout.listenerCount('error')).toBe(1);
    expect(process.stderr.listenerCount('error')).toBe(1);
    process.stdout.removeAllListeners('error');
    process.stderr.removeAllListeners('error');
  });
});
