import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { createBanner, displayWidth, showSuccess, stripAnsi } from '../src/index.js';

describe('banner 与 showSuccess 对齐', () => {
  beforeEach(() => {
    process.env.NO_COLOR = '1';
  });

  afterEach(() => {
    delete process.env.NO_COLOR;
  });

  it('createBanner 的标题按 46 列居中，装饰线与字形等宽', () => {
    const output = stripAnsi(createBanner('自定义横幅'));
    const lines = output.split('\n');
    const titleLine = lines.find((line) => line.includes('自定义横幅'))!;
    const leftPad = titleLine.length - titleLine.trimStart().length;
    expect(leftPad).toBe(18);
    expect(displayWidth(titleLine.trim())).toBe(10);

    const artLines = lines.slice(1, 6);
    for (const line of artLines) {
      expect(displayWidth(line)).toBe(46);
    }
    const decoration = lines.find((line) => line.startsWith('═'))!;
    expect(displayWidth(decoration)).toBe(46);
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
