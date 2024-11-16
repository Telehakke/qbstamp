import { describe, expect, test } from "vitest";
import FavoritesList from "./favoritesList";
import { Favorite } from "./types";

test("appended()のテスト", () => {
    const text = "first";
    const list = new FavoritesList();
    const newList = list.appended(text);
    expect(newList.values[0].text).toBe(text);
});

describe("removed()のテスト", () => {
    const item1: Favorite = { id: "1", text: "first" };
    const item2: Favorite = { id: "2", text: "second" };
    const list = new FavoritesList([item1, item2]);

    test("削除しない", () => {
        const newList = list.removed([]);
        expect(newList.values).toEqual([item1, item2]);
    });

    test("id=1の要素を削除", () => {
        const newList = list.removed(["1"]);
        expect(newList.values).toEqual([item2]);
    });

    test("id=1, id=2の要素を削除", () => {
        const newList = list.removed(["1", "2"]);
        expect(newList.values).toEqual([]);
    });
});

describe("getIndexOfFavorites()のテスト", () => {
    const list = new FavoritesList([{ id: "1", text: "first" }]);

    test("指定したIDの要素のインデックス番号を取得", () => {
        const result = list.findIndex("1");
        expect(result).toBe(0);
    });

    test("存在しないIDを指定した場合、nullを返す", () => {
        const result = list.findIndex("2");
        expect(result).toBeNull();
    });
});

describe("reorderedFavorites()のテスト", () => {
    const item1: Favorite = { id: "1", text: "first" };
    const item2: Favorite = { id: "2", text: "second" };
    const list = new FavoritesList([item1, item2]);

    test("要素を入れ替え", () => {
        const newList = list.reorderedFavorites(1, 0);
        const expected: Favorite[] = [item2, item1];
        expect(newList.values).toEqual(expected);
    });

    test("インデックス外の値を指定した場合、もとのインスタンスを返す1", () => {
        const newList = list.reorderedFavorites(-1, 0);
        expect(newList.values).toEqual(list.values);
    });

    test("インデックス外の値を指定した場合、もとのインスタンスを返す2", () => {
        const newList = list.reorderedFavorites(2, 0);
        expect(newList.values).toEqual(list.values);
    });

    test("インデックス外の値を指定した場合、もとのインスタンスを返す3", () => {
        const newList = list.reorderedFavorites(0, -1);
        expect(newList.values).toEqual(list.values);
    });

    test("インデックス外の値を指定した場合、もとのインスタンスを返す4", () => {
        const newList = list.reorderedFavorites(0, 2);
        expect(newList.values).toEqual(list.values);
    });
});
