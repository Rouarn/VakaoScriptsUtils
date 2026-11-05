import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatLog } from '../src/logger.js';
import { log } from '../src/index.js';

describe('log', () => {
  beforeEach(() => {
    process.env.NO_COLOR = '1';
  });

  afterEach(() => {
    delete process.env.NO_COLOR;
    vi.restoreAllMocks();
  });

  it('多行消息的非首行缩进 11 空格（与 [HH:MM:SS] 前缀对齐）', () => {
    const text = formatLog('第一行\n第二行', 'info');
    const lines = text.split('\n');
    expect(lines).toHaveLength(2);
    expect(lines[1].match(/^ */)?.[0]).toHaveLength(11);
  });

  it('NO_COLOR 下不输出 ANSI 转义序列', () => {
    // 用码点构造 ESC，避免在正则里直接写控制字符触发 no-control-regex
    const esc = String.fromCharCode(27);
    expect(formatLog('纯文本', 'info')).not.toContain(esc);
  });

  it('info 写 stdout，error 写 stderr', () => {
    const stdout = vi.spyOn(console, 'log').mockImplementation(() => {});
    const stderr = vi.spyOn(console, 'error').mockImplementation(() => {});

    log('普通消息', 'info');
    expect(stdout).toHaveBeenCalledTimes(1);
    expect(stderr).not.toHaveBeenCalled();

    stdout.mockClear();
    log('错误消息', 'error');
    expect(stdout).not.toHaveBeenCalled();
    expect(stderr).toHaveBeenCalledTimes(1);
  });

  it('消息首尾换行转换为前后空行，内部换行保留', () => {
    const stdout = vi.spyOn(console, 'log').mockImplementation(() => {});
    log('\n带空行的消息\n', 'info');
    expect(stdout).toHaveBeenCalledTimes(3);
    expect(stdout.mock.calls[0][0]).toBe('');
    expect(stdout.mock.calls[2][0]).toBe('');
  });

  it('未知类型降级为 info 图标且不崩溃', () => {
    const stdout = vi.spyOn(console, 'log').mockImplementation(() => {});
    // @ts-expect-error 模拟 JS 消费方传入非法类型
    log('未知类型', 'unknown-type');
    expect(stdout).toHaveBeenCalledTimes(1);
  });
});
