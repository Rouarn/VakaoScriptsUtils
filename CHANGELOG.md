# Changelog

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)；`0.0.x` 阶段仍会有对外 API 收敛。

## [0.0.3] - 2026-11-05

### 修复

- 入口导出 `LogType`、`Colors` 类型，消费方不再出现 `TS2459`。
- 宽度计算统一收敛到 `src/width.ts`：CJK 与 emoji 记 2 列、组合符/变体选择符记 0 列，`showSuccess` 左右留白由 22/20 修正为 21/21。
- 横幅装饰线宽度改为按字形实测推导（44 → 46 列），5 行字形补齐到等宽。
- 错误日志改走 stderr；`handleError` 用 `writeSync(2)` 同步落盘后再退出，退出码仍为 1，避免管道/重定向丢日志。
- `handleError` 形参改为 `unknown`，非 Error 值不再输出 `[object Object]`。
- 着色支持 `NO_COLOR` / `FORCE_COLOR` / `isTTY`，非终端场景不再输出 ANSI。
- `separator` 对负数、NaN、非整数长度做归一化，不再抛 `RangeError`。
- 超长横幅标题与 `showSuccess` 消息按显示宽度截断并补省略号。
- `colors` / `icons` / `typeColors` 冻结，防止运行时被改写。

### 新增

- `asciiArtPlain`（无 ANSI 的字形文本）、`displayWidth` / `padEndDisplay` / `truncateDisplay` / `stripAnsi` / `isColorEnabled`。
- `typecheck` 脚本、Vitest 单测、GitHub Actions CI、`LICENSE`、`CHANGELOG`。
- `exports` 区分 ESM/CJS 的 `types` 并补充 `./package.json` 子路径；构建产物带 sourcemap。

### 变更

- `asciiArt` 由常量改为函数，着色在调用时按环境判定。
- `prepare` 改为 `prepack`，`pnpm install` 不再触发构建。

## [0.0.2]

- 初始发布：颜色、图标、横幅、日志、工具函数。
