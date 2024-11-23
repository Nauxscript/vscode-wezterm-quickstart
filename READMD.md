# VSCode WezTerm Quickstart

A VSCode extension that opens WezTerm terminal in current workspace directory.

## Features

- Opens WezTerm with current workspace path
- Overrides default `⇧ + ⌘ + c` shortcut to open WezTerm instead of the default terminal
- Configurable WezTerm executable path

## Requirements

- WezTerm must be installed on your system
- macOS (for the default configuration)
- disable default `⇧ + ⌘ + c` shorcut behavior

## Extension Settings

This extension contributes the following settings:

* `vscode-wezterm.weztermPath`: Path to WezTerm executable (default: "/Applications/WezTerm.app/Contents/MacOS/wezterm")

## why?

1. https://github.com/microsoft/vscode/issues/171295
2. https://github.com/wez/wezterm/issues/2954
3. https://stackoverflow.com/questions/78861164/vscode-open-external-terminal-wezterm-in-home-folder-instead-of-in-project-folde