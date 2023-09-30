import { Plugin, WorkspaceLeaf } from 'obsidian';

export default class AdvancedCloseTab extends Plugin {
  async onload() {
    this.addCommands();
  }

  addCommands() {
    this.addCommand({
      id: 'advanced-close-tab-close-current-tab',
      name: 'Close current tab',
      callback: () => {
        const workspace = this.app.workspace;

        // @ts-expect-error workspace.activeTabGroup is not a public field
        const activeTabGroup = workspace.activeTabGroup;
        const currentTab = activeTabGroup.currentTab;
        const activeLeaf = activeTabGroup.children[currentTab];
        if (!activeLeaf) return;

        const leaf = this.app.workspace.getLeafById(activeLeaf.id);
        if (!leaf) return;

        this.detachLeafIfUnpinned(leaf);
      },
    });

    this.addCommand({
      id: 'close-current-tab-if-in-main-area',
      name: 'Close current tab (if in main area)',
      callback: () => {
        const workspace = this.app.workspace;

        // @ts-expect-error workspace.activeTabGroup is not a public field
        const activeTabGroup = workspace.activeTabGroup;
        const currentTab = activeTabGroup.currentTab;
        const activeLeaf = activeTabGroup.children[currentTab];
        if (!activeLeaf) return;

        const leaf = this.app.workspace.getLeafById(activeLeaf.id);
        if (!leaf) return;

        // @ts-expect-error
        const isTabGroupInRightSidebar = workspace.rightSplit.children.find((c) => {
          return c.id === activeTabGroup.id;
        });
        // @ts-expect-error
        const isTabGroupInLeftSidebar = workspace.leftSplit.children.find((c) => {
          return c.id === activeTabGroup.id;
        });

        if (isTabGroupInRightSidebar) {
          return;
        } else if (isTabGroupInLeftSidebar) {
          return;
        } else {
          this.detachLeafIfUnpinned(leaf);
        }
      },
    });

    this.addCommand({
      id: 'advanced-close-tab-close-all-tabs',
      name: 'Close all tabs',
      callback: () => {
        const workspace = this.app.workspace;

        workspace.iterateAllLeaves((leaf) => {
          this.detachLeafIfUnpinned(leaf);
        });
      },
    });

    this.addCommand({
      id: 'advanced-close-tab-close-all-tabs-in-main-area',
      name: 'Close all tabs in main area',
      callback: () => {
        const workspace = this.app.workspace;

        workspace.iterateRootLeaves((leaf) => {
          this.detachLeafIfUnpinned(leaf);
        });
      },
    });
  }

  detachLeafIfUnpinned(leaf: WorkspaceLeaf) {
    // @ts-expect-error leaf.pinned is not a public field
    if (leaf.pinned) return;
    // workaround for `leaf.detach()` failure
    sleep(0).then(() => {
      leaf.detach();
    });
  }
}
