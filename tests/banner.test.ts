import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  asciiArt,
  asciiArtPlain,
  createBanner,
  displayWidth,
  showSuccess,
  stripAnsi,
} from '../src/index.js';

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

  it('asciiArtPlain 无 ANSI，asciiArt() 在强制着色时带 ANSI', () => {
    expect(asciiArtPlain).not.toContain(String.fromCharCode(27));
    // NO_COLOR 优先级高于 FORCE_COLOR，需先移除才能验证着色分支
    delete process.env.NO_COLOR;
    process.env.FORCE_COLOR = '1';
    try {
      const art = asciiArt();
      expect(art).toContain(String.fromCharCode(27));
      expect(stripAnsi(art)).toBe(asciiArtPlain);
    } finally {
      delete process.env.FORCE_COLOR;
    }
  });

  it('超长标题/消息不会越过装饰线', () => {
    const bannerTitle = stripAnsi(createBanner('长'.repeat(40)))
      .split('\n')
      .find((line) => line.includes('长'))!;
    expect(displayWidth(bannerTitle.trim())).toBeLessThanOrEqual(46);

    const out: string[] = [];
    const original = console.log;
    console.log = (...args: unknown[]) => out.push(args.map(String).join(' '));
    showSuccess('a'.repeat(70));
    console.log = original;

    const messageLine = stripAnsi(out[1]);
    expect(displayWidth(messageLine.trim())).toBeLessThanOrEqual(60);
    expect(messageLine.endsWith('…')).toBe(true);
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
