/**
 * Vakao-UI 脚本工具库 - 工具函数模块
 */

import { colors } from "./colors.js";
import { log } from "./logger.js";

/**
 * 显示分隔线
 *
 * 在控制台输出指定字符组成的分隔线，用于视觉上分隔不同的内容区域。
 * 分隔线使用暗淡样式显示，不会过于突出。
 *
 * @param {string} [char='─'] - 用于构成分隔线的字符
 * @param {number} [length=50] - 分隔线的长度（字符数量）
 *
 * @example
 * ```javascript
 * // 默认分隔线
 * separator();
 * // 输出：──────────────────────────────────────────────────
 *
 * // 自定义字符的分隔线
 * separator('=');
 * // 输出：==================================================
 *
 * // 自定义长度的分隔线
 * separator('-', 30);
 * // 输出：------------------------------
 *
 * // 双线分隔线（用于重要分隔）
 * separator('═', 60);
 * // 输出：════════════════════════════════════════════════════════
 * ```
 */
export function separator(char: string = "─", length: number = 50): void {
  console.log(`${colors.dim}${char.repeat(length)}${colors.reset}`);
}

/**
 * 显示成功结束消息
 *
 * 输出格式化的成功消息，包含装饰性的分隔线和庆祝图标。
 * 用于标识重要操作的成功完成，提供良好的用户反馈。
 *
 * 输出格式：
 * ════════════════════════════════════════════════════════
 * 🎉 [消息内容] 🎉
 * ════════════════════════════════════════════════════════
 *
 * @param {string} message - 成功消息内容
 *
 * @example
 * ```javascript
 * // 项目构建成功
 * showSuccess('项目构建完成');
 *
 * // 包发布成功
 * showSuccess('包已成功发布到 npm');
 *
 * // 部署成功
 * showSuccess('应用已成功部署到生产环境');
 *
 * // 测试通过
 * showSuccess('所有测试用例通过');
 * ```
 */
export function showSuccess(message: string): void {
  separator("═");
  log(`🎉 ${message} 🎉`, "success");
  separator("═");
}

/**
 * 错误处理函数
 *
 * 统一的错误处理机制，输出错误信息并终止程序执行。
 * 用于处理不可恢复的错误情况，确保程序不会继续执行。
 *
 * @param {string} message - 错误描述信息
 * @param {Error|string} error - 错误对象或错误消息
 *
 * @throws {never} 此函数会调用 process.exit(1) 终止程序
 *
 * @example
 * ```javascript
 * // 文件操作错误
 * try {
 *   const content = fs.readFileSync('config.json', 'utf8');
 * } catch (error) {
 *   handleError('读取配置文件失败', error);
 * }
 *
 * // 网络请求错误
 * fetch('/api/data')
 *   .catch(error => {
 *     handleError('获取数据失败', error);
 *   });
 *
 * // 自定义错误
 * if (!isValidInput(input)) {
 *   handleError('输入验证失败', '输入参数不符合要求');
 * }
 *
 * // 构建错误
 * try {
 *   await buildProject();
 * } catch (error) {
 *   handleError('项目构建失败', error);
 * }
 * ```
 */
export function handleError(message: string, error: Error | string): never {
  log(`${message}: ${error}`, "error");
  process.exit(1);
}
