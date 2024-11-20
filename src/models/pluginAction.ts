import { Editor, Menu, Notice, Plugin } from "obsidian";
import PluginStateRepository from "./pluginStateRepository";
import PluginContext from "./pluginContext";
import { EditorView } from "@codemirror/view";
import { Favorite } from "./types";

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
     * ペースト実行時の処理
     */
    protected handlePasteClick = (editor: Editor, favorite: Favorite) => {
        // 選択したお気に入りテキストをカーソル位置に挿入する
        const cursor = editor.getCursor();
        editor.replaceRange(favorite.text, cursor);

        // 挿入した文字数分、カーソルを移動する
        const position = editor.posToOffset(cursor);
        const length = favorite.text.length;
        editor.setCursor(editor.offsetToPos(position + length));
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
                const favorites = PluginContext.favoritesList.values;
                if (favorites.length === 0) {
                    new Notice(
                        PluginContext.translation.textNotRegisteredInTheList
                    );
                    return;
                }

                const menu = new Menu();
                favorites.forEach((favorite) => {
                    menu.addItem((item) => {
                        item.setTitle(favorite.text);
                        item.onClick(() => {
                            this.handlePasteClick(editor, favorite);
                        });
                    });
                });

                // お気に入り一覧のメニューをキャレット（テキストカーソル）の位置に表示する
                // @ts-expect-error, not typed
                const editorView = editor.cm as EditorView;
                const cursor = editor.getCursor();
                const position = editor.posToOffset(cursor);
                const coordinate = editorView.coordsAtPos(position);
                menu.showAtPosition({
                    x: coordinate?.left ?? 0,
                    y: coordinate?.top ?? 0,
                });
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
     * 編集モードにおける、右クリックで開くメニューへの登録
     */
    // prettier-ignore
    add = (): void => {
        this.plugin.registerEvent(
            this.plugin.app.workspace.on("editor-menu", (menu, editor) => {
                menu.addItem((item) => {
                    item.setTitle(PluginContext.translation.qbstampRegister)
                        .setIcon("database")
                        .onClick(() => {
                            this.registerSelectedTextToFavorites(editor);
                        });
                });

                menu.addItem((item) => {
                    item.setTitle(PluginContext.translation.qbstampPaste)
                        .setIcon("clipboard-paste");

                    // @ts-expect-error, not typed
                    const submenu = item.setSubmenu() as Menu;
                    PluginContext.favoritesList.values.forEach((favorite) => {
                        submenu.addItem((item) => {
                            item.setTitle(favorite.text);
                            item.onClick(() => {
                                this.handlePasteClick(editor, favorite);
                            });
                        });
                    });
                });
            })
        );
    };
}
