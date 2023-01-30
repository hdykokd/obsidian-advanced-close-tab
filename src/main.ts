import { Plugin } from 'obsidian';
import { AdvancedCloseTabSettings, SettingTab, DEFAULT_SETTINGS } from './settings';

export default class AdvancedCloseTab extends Plugin {
  settings: AdvancedCloseTabSettings;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: 'advanced-close-tab-close-tab',
      name: 'Close Tab',
      callback: () => {
        const workspace = this.app.workspace;

        // @ts-expect-error workspace.activeTabGroup is not a public field
        const activeTabGroup = workspace.activeTabGroup;
        const currentTab = activeTabGroup.currentTab;
        const activeLeaf = activeTabGroup.children[currentTab];
        if (!activeLeaf) return;

        const leaf = this.app.workspace.getLeafById(activeLeaf.id);
        if (!leaf) return;

        // @ts-expect-error leaf.pinned is not a public field
        if (leaf.pinned) return;

        if (this.settings.preventCloseLastTabInPane) {
          if (activeTabGroup.children.length === 1) return;
        }

        leaf.detach();
      },
    });

    this.addCommand({
      id: 'advanced-close-tab-close-all-tabs',
      name: 'Close all tabs',
      callback: () => {
        const workspace = this.app.workspace;

        workspace.iterateAllLeaves((leaf) => {
          // @ts-expect-error leaf.pinned is not a public field
          if (!leaf.pinned) {
            // workaround for `leaf.detach()` failure
            // TODO: unit test
            sleep(0).then(() => {
              leaf.detach();
            });
          }
        });
      },
    });

    this.addSettingTab(new SettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
