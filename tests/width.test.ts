import { describe, expect, it } from 'vitest';

import { displayWidth, icons, padEndDisplay, stripAnsi, truncateDisplay } from '../src/index.js';

describe('displayWidth', () => {
  it('ASCII 字符按 1 列计算', () => {
    expect(displayWidth('abc')).toBe(3);
  });

  it('CJK 字符按 2 列计算', () => {
    expect(displayWidth('中文标题')).toBe(8);
  });

  it('emoji 按 2 列计算', () => {
    expect(displayWidth('🎉')).toBe(2);
    expect(displayWidth('✅')).toBe(2);
    expect(displayWidth('❌')).toBe(2);
  });

  it('11 个日志图标全部按 2 列计算', () => {
    for (const [type, icon] of Object.entries(icons)) {
      expect(displayWidth(icon), `图标 ${type} 宽度`).toBe(2);
    }
  });

  it('ANSI 转义序列不占显示宽度', () => {
    expect(displayWidth('\x1b[31m红色\x1b[0m')).toBe(4);
  });

  it('零宽字符不占显示宽度', () => {
    expect(displayWidth('\u200d')).toBe(0);
    expect(displayWidth('\u2705\uFE0F')).toBe(2);
  });

  it('stripAnsi 只移除转义序列', () => {
    expect(stripAnsi('\x1b[1m\x1b[32mok\x1b[0m')).toBe('ok');
    expect(stripAnsi('纯文本')).toBe('纯文本');
  });

  it('padEndDisplay 按显示宽度补齐', () => {
    expect(displayWidth(padEndDisplay('中文', 10))).toBe(10);
    expect(displayWidth(padEndDisplay('abc', 10))).toBe(10);
    expect(padEndDisplay('abcdef', 3)).toBe('abcdef');
  });

  it('truncateDisplay 不超过目标宽度且保留省略号', () => {
    expect(displayWidth(truncateDisplay('a'.repeat(70), 10))).toBe(10);
    expect(truncateDisplay('a'.repeat(70), 10)).toBe('a'.repeat(9) + '…');
    expect(displayWidth(truncateDisplay('中文标题'.repeat(10), 11))).toBe(11);
    expect(truncateDisplay('短', 10)).toBe('短');
  });
});
