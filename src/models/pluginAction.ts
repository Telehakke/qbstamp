import { Editor, Menu, Notice, Plugin } from "obsidian";
import PluginStateRepository from "./pluginStateRepository";
import PluginContext from "./pluginContext";

abstract class PluginAction {
    private pluginStateRepository: PluginStateRepository;

    constructor(pluginStateRepository: PluginStateRepository) {
        this.pluginStateRepository = pluginStateRepository;
    }

    /**
     * 選択されているテキストをお気に入りに登録
     */
    protected registerSelectedTextToFavorites = (editor: Editor): void => {
        const selection = editor.getSelection();

        if (selection.length === 0) {
            new Notice(PluginContext.translation.noTextSelected);
            return;
        }

        PluginContext.favoritesList =
            PluginContext.favoritesList.appended(selection);
        this.pluginStateRepository.save(PluginContext.favoritesList.values);
        new Notice(PluginContext.translation.textWasRegisteredInTheList);
    };

    /**
     * お気に入りの一覧をメニューに表示する
     */
    protected showFavoritesMenu = (editor: Editor): void => {
        const favorites = PluginContext.favoritesList.values;
        if (favorites.length === 0) {
            new Notice(PluginContext.translation.textNotRegisteredInTheList);
            return;
        }

        const menu = new Menu();
        favorites.forEach((v) => {
            menu.addItem((item) => {
                item.setTitle(v.text);
                item.onClick(() => {
                    // 選択したテキストをカーソル位置に挿入する
                    const cursor = editor.getCursor();
                    editor.replaceRange(v.text, cursor);

                    // 挿入した文字数分、カーソルを移動する
                    const offset = editor.posToOffset(cursor);
                    const length = v.text.length;
                    editor.setCursor(editor.offsetToPos(offset + length));
                });
            });
        });

        menu.showAtMouseEvent(PluginContext.mouseEvent);
    };
}

export class Command extends PluginAction {
    private plugin: Plugin;

    constructor(pluginStateRepository: PluginStateRepository, plugin: Plugin) {
        super(pluginStateRepository);
        this.plugin = plugin;
    }

    /**
     * コマンドの登録
     */
    add = (): void => {
        this.plugin.addCommand({
            id: "register",
            name: PluginContext.translation.register,
            icon: "database",
            editorCallback: (editor) => {
                this.registerSelectedTextToFavorites(editor);
            },
        });
        this.plugin.addCommand({
            id: "paste",
            name: PluginContext.translation.paste,
            icon: "clipboard-paste",
            editorCallback: (editor) => {
                this.showFavoritesMenu(editor);
            },
        });
    };
}

export class EditorMenu extends PluginAction {
    private plugin: Plugin;

    constructor(pluginStateRepository: PluginStateRepository, plugin: Plugin) {
        super(pluginStateRepository);
        this.plugin = plugin;
    }

    /**
     * 編集モードにおいて、右クリックで開くメニューへの登録
     */
    add = (): void => {
        this.plugin.registerEvent(
            this.plugin.app.workspace.on("editor-menu", (menu, editor) => {
                menu.addItem((item) => {
                    item.setTitle(PluginContext.translation.obstampRegister)
                        .setIcon("database")
                        .onClick(() => {
                            this.registerSelectedTextToFavorites(editor);
                        });
                });

                menu.addItem((item) => {
                    item.setTitle(PluginContext.translation.obstampPaste)
                        .setIcon("clipboard-paste")
                        .onClick(() => {
                            this.showFavoritesMenu(editor);
                        });
                });
            })
        );
    };
}
