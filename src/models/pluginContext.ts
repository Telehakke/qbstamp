import { moment } from "obsidian";
import FavoritesList from "./favoritesList";
import Translator from "./translator";

export default class PluginContext {
    static readonly translation = Translator.getTranslation(moment.locale());
    static favoritesList = new FavoritesList();
    static mouseEvent = new MouseEvent("");
}
