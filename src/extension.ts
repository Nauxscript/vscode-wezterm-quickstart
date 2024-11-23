import * as vscode from 'vscode';
import { spawn, exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "vscode-wezterm" is now active!');

    let disposable = vscode.commands.registerCommand('vscode-wezterm.openTerminal', async () => {
        const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;
        if (!workspacePath) {
            vscode.window.showErrorMessage('No workspace folder opened');
            return;
        }

        const config = vscode.workspace.getConfiguration('vscode-wezterm');
        const weztermPath = config.get<string>('weztermPath');

        if (!weztermPath) {
            vscode.window.showErrorMessage('WezTerm path not configured');
            return;
        }

        let child

        try {
            // 使用 wezterm cli list 检查是否有活动窗口
            const { stdout } = await execPromise(`${weztermPath} cli list`);
            console.log('stdout', stdout);
            if (stdout.trim()) {
                console.log('已有窗口，创建新标签');
                // 已有窗口，创建新标签
                child = spawn(weztermPath, [
                    'cli',
                    'spawn',
                    '--cwd',
                    workspacePath
                ], {
                    stdio: 'inherit'
                })
                const activateScript = `tell application "WezTerm" to activate`;
                exec(`osascript -e '${activateScript}'`);
            }
        } catch (error) {
            // 如果 cli list 命令失败，说明没有 WezTerm 进程，创建新进程
            // console.error('Failed to check WezTerm windows:', error);
            console.log('没有 WezTerm 进程，创建新进程');
            child = spawn(weztermPath, [
                'start',
                '--cwd',
                workspacePath
            ], {
                stdio: 'inherit'
            });
        }
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}