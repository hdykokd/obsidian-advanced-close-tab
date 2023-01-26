import { PluginSettingTab, App, Setting, ToggleComponent } from 'obsidian';
import AdvancedCloseTab from './main';

export interface AdvancedCloseTabSettings {
	preventCloseLastTabInPane: boolean;
}
export const DEFAULT_SETTINGS: AdvancedCloseTabSettings = {
	preventCloseLastTabInPane: false,
};

export class SettingTab extends PluginSettingTab {
	plugin: AdvancedCloseTab;

	constructor(app: App, plugin: AdvancedCloseTab) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'AdvancedCloseTab' });

		const preventCloseLastTabInPaneSetting = new Setting(containerEl)
			.setName('Prevent close last tab in pane')
			.setDesc('')
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.preventCloseLastTabInPane).onChange(async (value) => {
					this.plugin.settings.preventCloseLastTabInPane = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(containerEl).setName('Reset to defaults').addButton((btn) => {
			btn.setButtonText('Reset').onClick(async () => {
				this.plugin.settings = { ...DEFAULT_SETTINGS };

				const preventCloseLastTabInPaneToggle = preventCloseLastTabInPaneSetting.components[0] as ToggleComponent;
				preventCloseLastTabInPaneToggle.setValue(DEFAULT_SETTINGS.preventCloseLastTabInPane);

				await this.plugin.saveSettings();
			});
		});
	}
}
