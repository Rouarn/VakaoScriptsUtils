/**
 * Vakao-UI 脚本工具库 - 预览脚本
 *
 * 依次展示所有功能的实际输出效果，便于一眼查看样式与对齐情况。
 * 运行：pnpm run demo（需先 pnpm run build 生成 dist/）
 */

import {
  log,
  showBanner,
  showSuccess,
  separator,
  colors,
  icons,
  typeColors,
  asciiArt,
  createBanner,
  padEndDisplay,
} from '../dist/index.mjs';

// ==================== 1. 横幅 ====================
showBanner('Vakao UI 构建工具');

// ==================== 2. 各类型日志 ====================
log('开始构建项目', 'build');
log('正在编译 TypeScript 文件', 'build');
log('编译成功完成', 'success');
log('缺少 devDependencies 字段', 'warning');
log('无法连接到 npm registry', 'error');
log('执行 pnpm install', 'command');
log('开始发布到 npm', 'publish');
log('部署到生产环境', 'deploy');
log('校验包完整性', 'check');
log('复制文件到 dist', 'copy');
log('清理临时目录', 'clean');
log('普通信息日志');

// ==================== 3. 多行日志（验证缩进对齐） ====================
log('第一行\n第二行\n第三行', 'info');

// ==================== 4. 分隔线对比 ====================
separator();
separator('=', 30);
separator('═', 60);
separator('-', 40);

// ==================== 5. 成功结束消息 ====================
showSuccess('所有任务完成');

// ==================== 6. colors 前景色 ====================
console.log('');
console.log('------ colors 前景色（标准） ------');
console.log(
  `${colors.red}红色${colors.reset}  ${colors.green}绿色${colors.reset}  ${colors.yellow}黄色${colors.reset}  ${colors.blue}蓝色${colors.reset}  ${colors.magenta}品红${colors.reset}  ${colors.cyan}青色${colors.reset}  ${colors.white}白色${colors.reset}  ${colors.black}黑色${colors.reset}`,
);
console.log('------ colors 前景色（亮色变体） ------');
console.log(
  `${colors.brightRed}亮红${colors.reset}  ${colors.brightGreen}亮绿${colors.reset}  ${colors.brightYellow}亮黄${colors.reset}  ${colors.brightBlue}亮蓝${colors.reset}  ${colors.brightMagenta}亮品红${colors.reset}  ${colors.brightCyan}亮青${colors.reset}  ${colors.brightWhite}亮白${colors.reset}  ${colors.brightBlack}亮黑${colors.reset}`,
);

console.log('\n------ colors 背景色 ------');
console.log(
  `${colors.bgRed}红底${colors.reset}  ${colors.bgGreen}绿底${colors.reset}  ${colors.bgYellow}黄底${colors.reset}  ${colors.bgBlue}蓝底${colors.reset}  ${colors.bgMagenta}品红底${colors.reset}  ${colors.bgCyan}青底${colors.reset}  ${colors.bgWhite}白底${colors.reset}  ${colors.bgBlack}黑底${colors.reset}`,
);

console.log('\n------ colors 文本样式 ------');
console.log(
  `${colors.bright}加粗${colors.reset}  ${colors.dim}暗淡${colors.reset}  ${colors.underline}下划线${colors.reset}  ${colors.italic}斜体${colors.reset}  ${colors.strikethrough}删除线${colors.reset}  ${colors.reverse}反转${colors.reset}  ${colors.hidden}隐藏${colors.reset}`,
);

// ==================== 7. icons 全集（对齐表格） ====================
console.log('\n------ icons 全集 ------');
const allTypes = [
  'info',
  'success',
  'warning',
  'error',
  'command',
  'build',
  'publish',
  'deploy',
  'check',
  'copy',
  'clean',
];
const cellWidth = 14;
allTypes.forEach((t, i) => {
  const cell = `${icons[t]} ${padEndDisplay(t, cellWidth - 3)}`;
  process.stdout.write(`  ${cell}`);
  if ((i + 1) % 3 === 0 || i === allTypes.length - 1) process.stdout.write('\n');
});

// ==================== 8. typeColors 与 icons 组合（对齐表格） ====================
console.log('\n------ typeColors 与 icons 组合 ------');
const colorNames = {
  info: '蓝色',
  success: '绿色',
  warning: '黄色',
  error: '红色',
  command: '青色',
  build: '品红',
  publish: '绿色',
  deploy: '品红',
  check: '黄色',
  copy: '青色',
  clean: '品红',
};
const typeCol = 10;
const colorCol = 8;
console.log(
  `  ${padEndDisplay('图标', 4)}  ${padEndDisplay('类型', typeCol)}  ${padEndDisplay('颜色', colorCol)}`,
);
console.log(`  ${'─'.repeat(4)}  ${'─'.repeat(typeCol)}  ${'─'.repeat(colorCol)}`);
for (const t of allTypes) {
  const iconCell = padEndDisplay(icons[t], 4);
  const typeCell = padEndDisplay(t, typeCol);
  const colorCell = padEndDisplay(colorNames[t], colorCol);
  console.log(`  ${iconCell}  ${typeColors[t]}${typeCell}${colors.reset}  ${colorCell}`);
}

// ==================== 9. createBanner 自定义示例 ====================
console.log('\n------ createBanner 自定义 ------');
console.log(createBanner('自定义横幅'));

// ==================== 10. 错误输出格式演示（不调用 handleError 以避免 process.exit） ====================
console.log('\n------ 错误输出格式 ------');
const fakeError = new Error('模拟的配置文件读取失败');
const detail = fakeError instanceof Error ? fakeError.message : fakeError;
log(`读取配置文件失败: ${detail}`, 'error');

console.log('\n------ asciiArt 常量 ------');
console.log(asciiArt);

console.log('\n演示完成 ✨');
