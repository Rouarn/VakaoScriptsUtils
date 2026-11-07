# @vakao/scripts-utils

Vakao-UI 脚本工具库：统一提供颜色、图标、横幅展示、日志输出与常用工具函数。
支持 ESM 与 CJS 双构建，并附带 TypeScript 类型声明。

## 特性

- 统一日志与样式：`log`、`colors`、`icons`、`typeColors`、`typeColorLabels`
- 横幅展示：`showBanner`、`createBanner`、`asciiArt`、`asciiArtPlain`
- 常用工具：`separator`、`showSuccess`、`handleError`
- 丰富的 ANSI 样式：8 种前景色 + 8 种亮色变体 + 8 种背景色 + 5 种文本样式（下划线/斜体/删除线/反转/隐藏）
- 兼容 ESM/CJS：通过 `exports` 字段同时支持 `import` 与 `require`
- TypeScript 类型声明：入口 `index.d.ts` 与 `index.d.mts` 均已生成

## 环境要求

- Node 18+（推荐），或支持 ESM 的打包器/环境

## 安装

```bash
# pnpm
pnpm add @vakao/scripts-utils

# npm
npm i @vakao/scripts-utils
```

## ESM 使用

```ts
import { log, showBanner, showSuccess, separator, colors, icons } from '@vakao/scripts-utils';

showBanner('Vakao UI 构建工具');
log('开始构建项目', 'build');
separator('═', 60);
showSuccess('所有任务完成');
console.log(`${colors.green}成功${colors.reset}`, icons.success);
console.log(`${colors.bgRed}错误${colors.reset} ${colors.underline}下划线${colors.reset}`);
```

## CJS 使用

```js
const {
  log,
  showBanner,
  showSuccess,
  separator,
  colors,
  icons,
} = require('@vakao/scripts-utils');

showBanner('Vakao UI 构建工具');
log('开始构建项目', 'build');
separator('═', 60);
showSuccess('所有任务完成');
console.log(`${colors.green}成功${colors.reset}`, icons.success);
console.log(`${colors.bgRed}错误${colors.reset} ${colors.underline}下划线${colors.reset}`);
```

## 输出预览

横幅（ASCII 艺术字基于 figlet Standard 字体，5 行统一补齐到 46 列，标题动态居中）：

```
 __     ___    _  __    _    ___    _   _ ___
 \ \   / / \  | |/ /   / \  / _ \  | | | |_ _|
  \ \ / / _ \ | ' /   / _ \| | | | | | | || |
   \ V / ___ \| . \  / ___ \ |_| | | |_| || |
    \_/_/   \_\_|\_\/_/   \_\___/   \___/|___|
                       Vakao UI 构建工具
════════════════════════════════════════════
```

日志（固定时间戳 `HH:MM:SS`，多行消息后续行缩进对齐；图标均为纯 emoji 无 variation selector，渲染对齐稳定）：

```
[16:23:45] 💬 信息
[16:23:45] 🔨 开始构建项目
[16:23:45] ✅ 编译成功完成
[16:23:45] 🟡 警告
[16:23:45] ❌ 无法连接到 npm registry
[16:23:45] 🔧 执行 pnpm install
[16:23:45] 💬 第一行
           第二行
           第三行
```

图标全集（11 个 LogType，全部纯 emoji 无 VS）：

| 类型    | 图标 | 类型    | 图标 | 类型    | 图标 | 类型   | 图标 |
| ------- | ---- | ------- | ---- | ------- | ---- | ------ | ---- |
| info    | 💬   | success | ✅   | warning | 🟡   | error  | ❌   |
| command | 🔧   | build   | 🔨   | publish | 📦   | deploy | 🚀   |
| check   | 🔍   | copy    | 📋   | clean   | 🧹   |        |      |

成功结束消息（上下装饰线宽度 60，消息居中）：

```
══════════════════════════════════════════════════════════
                        🎉 所有任务完成 🎉
══════════════════════════════════════════════════════════
```

## API 简览

### 日志与横幅

- `log(message: string, type?: LogType): void`
  - `LogType` = `info` | `success` | `warning` | `error` | `command` | `build` | `publish` | `deploy` | `check` | `copy` | `clean`
- `showBanner(title: string): void` — 直接输出横幅
- `createBanner(title: string): string` — 返回横幅字符串（不打印）
- `asciiArt(): string` — VAKAO UI ASCII 艺术字（带青色，颜色能力运行期判定）
- `asciiArtPlain: string` — 同上，纯文本无 ANSI，便于自定义着色

### 工具函数

- `separator(char?: string, length?: number): void` — 默认 `char='─'`、`length=60`
- `showSuccess(message: string): void` — 居中成功消息 + 上下装饰线（宽度 60）
- `handleError(message: string, error: Error | string): never` — 输出错误并 `process.exit(1)`

### 颜色与图标

- `colors: Colors` — ANSI 颜色/样式码映射
  - 基础样式：`reset` `bright` `dim`
  - 前景标准：`black` `red` `green` `yellow` `blue` `magenta` `cyan` `white`
  - 前景亮色：`brightBlack` `brightRed` `brightGreen` `brightYellow` `brightBlue` `brightMagenta` `brightCyan` `brightWhite`
  - 背景色：`bgBlack` `bgRed` `bgGreen` `bgYellow` `bgBlue` `bgMagenta` `bgCyan` `bgWhite`
  - 文本样式：`underline` `italic` `strikethrough` `reverse` `hidden`
- `typeColors: Record<LogType, string>` — 日志类型对应颜色
- `typeColorLabels: Record<LogType, string>` — 日志类型对应颜色中文名（与 `typeColors` 同源）
- `icons: Record<LogType, string>` — 日志类型对应 Emoji 图标

## 兼容性说明

`package.json` 的 `exports` 指定：

- `import` → `./dist/index.mjs`
- `require` → `./dist/index.js`
- `types` → `./dist/index.d.ts`

此外 `module` 指向 ESM、`main` 指向 CJS、`sideEffects: false` 便于 tree-shaking。

## 发布步骤（私有 NPM 仓库）

1. **配置 `.npmrc`**（仅 `@vakao` scope 走私有源，不影响其他包）：

   ```ini
   @vakao:registry=http://your-registry-host:port/
   //your-registry-host:port/:_authToken=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

   > ⚠️ 含 token 的 `.npmrc` **不要提交到 git**，加入 `.gitignore`。

2. **在 package.json 加 `publishConfig`**（`pnpm publish` 自动用此 registry）：

   ```json
   {
     "publishConfig": {
       "registry": "http://your-registry-host:port/"
     }
   }
   ```

3. **递增版本号**：编辑 `package.json` 的 `version`（私有 registry 不允许重复版本）

4. **构建并发布**：

   ```bash
   pnpm run build
   pnpm publish --no-git-checks
   ```

5. **验证安装**（在另一个项目）：

   ```bash
   pnpm add @vakao/scripts-utils
   ```

## 开发脚本

- `pnpm install` — 安装依赖
- `pnpm run build` — 构建产物（`dist/index.mjs`、`dist/index.js`、`dist/index.d.ts`、`dist/index.d.mts`）
- `pnpm run lint` / `pnpm run lint:fix` — ESLint 检查 / 自动修复
- `pnpm run format` / `pnpm run format:check` — Prettier 格式化 / 检查
- `pnpm run demo` — 运行预览脚本，查看所有功能实际输出

## 常见问题

- CJS 项目报错 `ERR_REQUIRE_ESM`：请使用 `require('@vakao/scripts-utils')`，或升级到支持 ESM 的环境。
- TypeScript 类型未生效：确认 `node_modules/@vakao/scripts-utils/dist/index.d.ts` 存在，且你的 TS 项目未排除 `node_modules` 的类型解析。
- 中文标题居中偏移：库已内置 CJK 宽字符（按 2 列）显示宽度计算，正常情况下居中正确。
