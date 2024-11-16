import { atom } from "jotai";
import FavoritesList from "../models/favoritesList";
import { ChecksList } from "../models/checkList";

export const favoritesListAtom = atom(new FavoritesList());
export const checksListAtom = atom(ChecksList.create([]));
