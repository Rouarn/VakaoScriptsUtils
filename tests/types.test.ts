import { describe, expect, expectTypeOf, it } from 'vitest';

import type { Colors, LogType } from '../src/index.js';
import { colors, icons, log, typeColors } from '../src/index.js';
import { isColorEnabled } from '../src/index.js';

describe('公开类型契约', () => {
  it('LogType 与 Colors 可以从入口导入', () => {
    expectTypeOf<LogType>().toEqualTypeOf<
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'command'
      | 'build'
      | 'publish'
      | 'deploy'
      | 'check'
      | 'copy'
      | 'clean'
    >();
    expectTypeOf<keyof Colors>().toMatchTypeOf<string>();
  });

  it('log 的参数类型受 LogType 约束', () => {
    log('类型检查', 'success');
    // @ts-expect-error 非法日志类型必须在编译期被拒绝
    log('类型检查', 'nope');
  });

  it('三个映射表的键集合一致', () => {
    expect(Object.keys(icons).sort()).toEqual(Object.keys(typeColors).sort());
  });

  it('颜色与图标映射被冻结，消费方无法污染全局状态', () => {
    expect(Object.isFrozen(colors)).toBe(true);
    expect(Object.isFrozen(icons)).toBe(true);
    expect(Object.isFrozen(typeColors)).toBe(true);
    expect(() => {
      // 类型层面 Colors 仍是可写接口，这里验证的是运行时冻结
      colors.green = 'x';
    }).toThrow(TypeError);
    expect(isColorEnabled()).toBeTypeOf('boolean');
  });
});
