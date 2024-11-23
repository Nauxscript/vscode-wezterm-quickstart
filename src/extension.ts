import * as vscode from 'vscode';
import { spawn } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "vscode-wezterm" is now active!');

    let disposable = vscode.commands.registerCommand('vscode-wezterm.openTerminal', () => {
        // 获取当前工作区路径
        const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;
        if (!workspacePath) {
            vscode.window.showErrorMessage('No workspace folder opened');
            return;
        }

        // 获取配置的 wezterm 路径
        const config = vscode.workspace.getConfiguration('vscode-wezterm');
        const weztermPath = config.get<string>('weztermPath');

        if (!weztermPath) {
            vscode.window.showErrorMessage('WezTerm path not configured');
            return;
        }

        // 启动 WezTerm
        try {
            const child = spawn(weztermPath, [
                'start',
                '--cwd',
                workspacePath
            ], {
                stdio: 'inherit'
            });

            child.on('error', (error) => {
                vscode.window.showErrorMessage(`Failed to start WezTerm: ${error.message}`);
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to execute WezTerm: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}