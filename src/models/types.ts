/* eslint-disable @typescript-eslint/no-explicit-any */
export const LanguageEnum = {
    en: "en",
    ja: "ja",
} as const;

/* -------------------------------------------------------------------------- */

export const FavoriteKey = {
    id: "id",
    text: "text",
} as const;

export type Favorite = {
    readonly id: string;
    readonly text: string;
};

export const isFavorite = (value: any): value is Favorite => {
    if (value == null) return false;
    if (typeof value[FavoriteKey.id] !== "string") return false;
    if (typeof value[FavoriteKey.text] !== "string") return false;
    return true;
};

export const isFavorites = (value: any): value is Favorite[] => {
    if (!Array.isArray(value)) return false;
    return value.every((v) => isFavorite(v));
};

/* -------------------------------------------------------------------------- */

export const PluginStateKey = {
    favorites: "favorites",
} as const;

export type PluginState = {
    readonly favorites: Favorite[];
};

export const isPluginState = (value: any): value is PluginState => {
    if (value == null) return false;
    if (!isFavorites(value[PluginStateKey.favorites])) return false;
    return true;
};

/* -------------------------------------------------------------------------- */

export type Check = {
    readonly id: string;
    readonly checked: boolean;
};
