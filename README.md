# Obsidian Advanced Close Tab

An Obsidian plugin to prevent closing pinned tab.

## Features

- Close current tab
  - Close current tab if it is unpinned.
- Close all tabs
  - Close all unpinned tabs. (including main area leaves, floating leaves, and sidebar leaves.)
  - Using `workspace.iterateAllLeaves()`
  - See: https://marcus.se.net/obsidian-plugin-docs/reference/typescript/classes/Workspace#iterateallleaves
- Close all tabs in main area
  - Close all unpinned tabs in main area.
  - Using `workspace.iterateRootLeaves()`
  - See: https://marcus.se.net/obsidian-plugin-docs/reference/typescript/classes/Workspace#iteraterootleaves

## Installation

### via Community plugins
TODO: publish

### Manually installing the plugin

- Copy over `main.js`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/obsidian-advanced-close-tab/`.

## Develop

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.
