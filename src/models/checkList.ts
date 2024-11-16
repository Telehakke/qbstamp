import { Check } from "./types";

export class ChecksList {
    private readonly _values: Check[];

    private constructor(values: Check[]) {
        this._values = values;
    }

    get values(): Check[] {
        return [...this._values];
    }

    /**
     * idの配列をもとにインスタンスを作成する
     */
    static create = (ids: string[]): ChecksList => {
        const values = ids.map((v) => {
            const value: Check = { id: v, checked: false };
            return value;
        });
        return new ChecksList(values);
    };

    /**
     * 指定したIDの要素のチェック状態を変更した新しいインスタンスを返す
     */
    changed = (id: string, state: boolean): ChecksList => {
        const newValues = this._values.map((v) => {
            if (v.id !== id) return v;

            const value: Check = { id: v.id, checked: state };
            return value;
        });
        return new ChecksList(newValues);
    };

    /**
     * 全ての要素のチェック状態をfalseに変更した新しいインスタンスを返す
     */
    uncheckedAll = (): ChecksList => {
        const newValues = this._values.map((v) => {
            return { ...v, checked: false };
        });
        return new ChecksList(newValues);
    };

    /**
     * チェック済みの要素を全て削除した新しいインスタンスを返す
     */
    removedAllCheckedItems = (): ChecksList => {
        const newValues = this._values.filter((v) => !v.checked);
        return new ChecksList(newValues);
    };

    /**
     * チェック済みの要素の総数を返す
     */
    getCheckedLength = (): number => {
        return this._values.filter((v) => v.checked).length;
    };

    /**
     * チェック済みの要素のIDを配列で返す
     */
    getCheckedIDs = (): string[] => {
        return this._values.filter((v) => v.checked).map((v) => v.id);
    };

    /**
     * idに一致する最初の要素を返す
     */
    find = (id: string): Check | undefined => {
        return this._values.find((v) => v.id === id);
    };
}
