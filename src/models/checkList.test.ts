import { describe, expect, test } from "vitest";
import { ChecksList } from "./checkList";
import { Check } from "./types";

test("create()のテスト", () => {
    const list = ChecksList.create(["1", "2"]);
    const expected: Check[] = [
        { id: "1", checked: false },
        { id: "2", checked: false },
    ];
    expect(list.values).toEqual(expected);
});

test("changed()のテスト", () => {
    const list = ChecksList.create(["1", "2"]);
    const newList = list.changed("1", true);
    const expected: Check[] = [
        { id: "1", checked: true },
        { id: "2", checked: false },
    ];
    expect(newList.values).toEqual(expected);
});

test("uncheckedAll()のテスト", () => {
    const list = ChecksList.create(["1", "2"]);
    let newList = list.changed("1", true);
    newList = newList.changed("2", true);
    newList = newList.uncheckedAll();
    const expected: Check[] = [
        { id: "1", checked: false },
        { id: "2", checked: false },
    ];
    expect(newList.values).toEqual(expected);
});

describe("removedAllOfChecked()のテスト", () => {
    test("すべて削除される", () => {
        const list = ChecksList.create(["1", "2"]);
        let newList = list.changed("1", true);
        newList = newList.changed("2", true);
        newList = newList.removedAllCheckedItems();
        expect(newList.values).toEqual([]);
    });

    test("削除されない", () => {
        const list = ChecksList.create(["1", "2"]);
        const newList = list.removedAllCheckedItems();
        const expected: Check[] = [
            { id: "1", checked: false },
            { id: "2", checked: false },
        ];
        expect(newList.values).toEqual(expected);
    });
});

test("checkedLength()のテスト", () => {
    const list = ChecksList.create(["1", "2", "3"]);
    const newList = list.changed("1", true);
    expect(newList.getCheckedLength()).toBe(1);
});

test("checkedIDs()のテスト", () => {
    const list = ChecksList.create(["1", "2", "3"]);
    const newList = list.changed("1", true);
    expect(newList.getCheckedIDs()).toEqual(["1"]);
});

describe("find()のテスト", () => {
    test("id=1の要素を取得", () => {
        const list = ChecksList.create(["1", "2"]);
        const result = list.find("1");
        expect(result).toEqual({ id: "1", checked: false });
    });

    test("idが存在しない場合、undefinedを返す", () => {
        const list = ChecksList.create(["1", "2"]);
        const result = list.find("3");
        expect(result).toBeUndefined();
    });
});
