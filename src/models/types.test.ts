import { describe, expect, test } from "vitest";
import {
    Favorite,
    isFavorite,
    isFavorites,
    isPluginState,
    PluginState,
} from "./types";

describe("isFavorite()のテスト", () => {
    test("Favorite型であるかどうかの判定1", () => {
        const favorite: Favorite = {
            id: "1",
            text: "first",
        };
        const result = isFavorite(favorite);
        expect(result).toBeTruthy();
    });

    test("Favorite型であるかどうかの判定2", () => {
        const favorite = {
            id: 1,
            text: "first",
        };
        const result = isFavorite(favorite);
        expect(result).toBeFalsy();
    });

    test("Favorite型であるかどうかの判定3", () => {
        const favorite = {
            id: "1",
            text: 1,
        };
        const result = isFavorite(favorite);
        expect(result).toBeFalsy();
    });
});

describe("isFavorites()のテスト", () => {
    test("Favorite[]型であるかどうかの判定1", () => {
        const favorites: Favorite[] = [];
        const result = isFavorites(favorites);
        expect(result).toBeTruthy();
    });

    test("Favorite[]型であるかどうかの判定2", () => {
        const favorites = null;
        const result = isFavorites(favorites);
        expect(result).toBeFalsy();
    });
});

describe("isPluginState()のテスト", () => {
    test("PluginState型であるかどうかの判定1", () => {
        const state: PluginState = {
            favorites: [],
        };
        const result = isPluginState(state);
        expect(result).toBeTruthy();
    });

    test("PluginState型であるかどうかの判定2", () => {
        const state = null;
        const result = isPluginState(state);
        expect(result).toBeFalsy();
    });
});
