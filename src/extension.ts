import * as vscode from 'vscode';
import { spawn, exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "vscode-wezterm" is now active!');

    let disposable = vscode.commands.registerCommand('vscode-wezterm.openTerminal', () => {
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

        try {
            // start WezTerm
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

            // directly execute AppleScript to bring the WezTerm window to the front
            const script = `tell application "WezTerm" to activate`;
            exec(`osascript -e '${script}'`);
            
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to execute WezTerm: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}