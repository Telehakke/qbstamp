import { Favorite } from "./types";

export default class FavoritesList {
    private readonly _values: Favorite[];

    constructor(favorites?: Favorite[]) {
        this._values = favorites ?? [];
    }

    get values(): Favorite[] {
        return [...this._values];
    }

    /**
     * プロパティをコピーした、新しいインスタンスを返す
     */
    private copied = (): FavoritesList => {
        return new FavoritesList([...this._values]);
    };

    /**
     * 指定したテキストをリストに追加した、新しいインスタンスを返す
     */
    appended = (text: string): FavoritesList => {
        const favorite: Favorite = {
            id: Date.now().toString(),
            text: text,
        };
        const copied = this.copied();
        copied._values.push(favorite);
        return copied;
    };

    /**
     * idに一致する要素をリストから削除した、新しいインスタンスを返す
     */
    removed = (ids: string[]): FavoritesList => {
        const result = this._values.filter((v) => !ids.includes(v.id));
        return new FavoritesList(result);
    };

    /**
     * idに一致するfavoritesのインデックスを返す
     */
    findIndex = (id: string): number | null => {
        const index = this._values.findIndex((v) => v.id === id);
        if (index < 0) return null;

        return index;
    };

    /**
     * favoritesの要素を入れ替えた、新しいインスタンスを返す
     */
    reorderedFavorites = (
        oldIndex: number,
        newIndex: number
    ): FavoritesList => {
        if (oldIndex < 0 || oldIndex >= this._values.length) return this;
        if (newIndex < 0 || newIndex >= this._values.length) return this;

        const state = this.copied();
        const favorite = state._values[oldIndex];
        state._values.splice(oldIndex, 1);
        state._values.splice(newIndex, 0, favorite);
        return state;
    };
}
