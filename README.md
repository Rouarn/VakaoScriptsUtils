# @vakao-ui/scripts-utils

Vakao-UI 脚本工具库：统一提供颜色、图标、横幅展示、日志输出与常用工具函数。支持 ESM 和 CJS 双构建，并附带类型声明。

**特性**
- 统一日志与样式：`log`、`colors`、`icons`
- 横幅展示：`showBanner`、`createBanner`
- 常用工具：`separator`、`showSuccess`、`handleError`
- 兼容 ESM/CJS：通过 `exports` 字段同时支持 `import` 与 `require`
- TypeScript 类型声明：入口 `index.d.ts` 已包含函数签名类型

**环境要求**
- Node 18+（推荐），或支持 ESM 的打包器/环境

## 安装
- 使用 pnpm：`pnpm add @vakao-ui/scripts-utils`
- 使用 npm：`npm i @vakao-ui/scripts-utils`

## ESM 使用
```ts
import {
  log,
  showBanner,
  showSuccess,
  separator,
  colors,
  icons,
} from '@vakao-ui/scripts-utils';

showBanner('Vakao UI 构建工具');
log('开始构建项目', 'build');
separator('═', 60);
showSuccess('所有任务完成');
console.log(`${colors.green}成功${colors.reset}`, icons.success);
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
} = require('@vakao-ui/scripts-utils');

showBanner('Vakao UI 构建工具');
log('开始构建项目', 'build');
separator('═', 60);
showSuccess('所有任务完成');
console.log(`${colors.green}成功${colors.reset}`, icons.success);
```

## API 简览
- `log(message: string, type?: 'info' | 'success' | 'warning' | 'error' | 'command' | 'build' | 'publish' | 'deploy' | 'check' | 'copy' | 'clean'): void`
- `showBanner(title: string): void`
- `createBanner(title: string): string`
- `separator(char?: string, length?: number): void`
- `showSuccess(message: string): void`
- `handleError(message: string, error: Error | string): never`
- `colors`: ANSI 颜色码映射对象
- `icons`: Emoji 图标映射对象

## 兼容性说明
- 包 `exports` 指定：
  - `import` → `./dist/index.mjs`
  - `require` → `./dist/index.js`
  - `types` → `./dist/index.d.ts`
- `main` 指向 CJS：`./dist/index.js`
- `module` 指向 ESM：`./dist/index.mjs`

## 发布步骤（npm）
- 更新版本：编辑 `package.json` 的 `version`（例如 `1.0.1`）
- 构建产物：`pnpm run build`
- 登录 npm：`npm login`（或 `pnpm npm login`）
- 作用域包发布：`npm publish --access public`
  - 由于包名为 `@vakao-ui/scripts-utils`（作用域），需要加 `--access public`

## 开发脚本
- 安装依赖：`pnpm install`
- 构建：`pnpm run build`
- 构建产物：`dist/index.mjs`、`dist/index.js`、`dist/index.d.ts`

## 常见问题
- CJS 项目报错 `ERR_REQUIRE_ESM`：请使用 `require('@vakao-ui/scripts-utils')`，或升级到支持 ESM 的环境。
- TypeScript 类型未生效：确认 `node_modules/@vakao-ui/scripts-utils/dist/index.d.ts` 存在，且你的 TS 项目未排除 `node_modules` 的类型解析。