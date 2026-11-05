import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { separator } from '../src/index.js';

describe('separator', () => {
  beforeEach(() => {
    process.env.NO_COLOR = '1';
  });

  afterEach(() => {
    delete process.env.NO_COLOR;
    vi.restoreAllMocks();
  });

  it('默认输出 60 个字符', () => {
    const stdout = vi.spyOn(console, 'log').mockImplementation(() => {});
    separator();
    expect(stdout.mock.calls[0][0]).toHaveLength(60);
  });

  it('负数与 NaN 不抛 RangeError，按 0 处理', () => {
    const stdout = vi.spyOn(console, 'log').mockImplementation(() => {});
    expect(() => separator('-', -1)).not.toThrow();
    expect(() => separator('-', Number.NaN)).not.toThrow();
    expect(stdout.mock.calls[0][0]).toBe('');
  });

  it('小数长度取整', () => {
    const stdout = vi.spyOn(console, 'log').mockImplementation(() => {});
    separator('=', 3.7);
    expect(stdout.mock.calls[0][0]).toBe('===');
  });

  it('多字符入参只取首个码点', () => {
    const stdout = vi.spyOn(console, 'log').mockImplementation(() => {});
    separator('ab', 3);
    expect(stdout.mock.calls[0][0]).toBe('aaa');
  });
});
