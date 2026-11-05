import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { createBanner, displayWidth, showSuccess, stripAnsi } from '../src/index.js';

describe('banner 与 showSuccess 对齐', () => {
  beforeEach(() => {
    process.env.NO_COLOR = '1';
  });

  afterEach(() => {
    delete process.env.NO_COLOR;
  });

  it('createBanner 的标题按 44 列居中', () => {
    const output = stripAnsi(createBanner('自定义横幅'));
    const titleLine = output.split('\n').find((line) => line.includes('自定义横幅'))!;
    const leftPad = titleLine.length - titleLine.trimStart().length;
    expect(leftPad).toBe(17);
    expect(displayWidth(titleLine.trim())).toBe(10);
  });

  it('showSuccess 的左右留白相等（emoji 按 2 列计）', () => {
    const output = stripAnsi(
      (() => {
        const lines: string[] = [];
        const original = console.log;
        console.log = (...args: unknown[]) => lines.push(args.map(String).join(' '));
        showSuccess('所有任务完成');
        console.log = original;
        return lines.join('\n');
      })(),
    );

    const messageLine = output.split('\n').find((line) => line.includes('所有任务完成'))!;
    const leftPad = messageLine.length - messageLine.trimStart().length;
    const contentWidth = displayWidth(messageLine.trim());
    expect(leftPad).toBe(21);
    expect(60 - leftPad - contentWidth).toBe(21);
  });
});
