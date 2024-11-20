import { Plugin } from "obsidian";
import PluginStateRepository from "./models/pluginStateRepository";
import PluginContext from "./models/pluginContext";
import ObstampSettingTab from "./views/obstampSettingTab";
import { Command, EditorMenu } from "./models/pluginAction";
import FavoritesList from "./models/favoritesList";

export default class Obstamp extends Plugin {
    private readonly pluginStateRepository = new PluginStateRepository(this);

    async onload(): Promise<void> {
        const state = await this.pluginStateRepository.load();
        PluginContext.favoritesList = new FavoritesList(state.favorites);

        const command = new Command(this.pluginStateRepository, this);
        const editorMenu = new EditorMenu(this.pluginStateRepository, this);
        command.add();
        editorMenu.add();

        this.addSettingTab(
            new ObstampSettingTab(this.app, this, this.pluginStateRepository)
        );
    }
}
