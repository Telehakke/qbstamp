import { LanguageEnum } from "./types";

export type Translation = {
    registeredTextList: string;
    obstampRegister: string;
    obstampPaste: string;
    register: string;
    paste: string;
    textWasRegisteredInTheList: string;
    noTextSelected: string;
    textNotRegisteredInTheList: string;
    cancel: string;
    delete: string;
};

const translationEN: Translation = {
    registeredTextList: "Registered text list",
    obstampRegister: "Obstamp: Register",
    obstampPaste: "Obstamp: Paste",
    register: "Register",
    paste: "Paste",
    textWasRegisteredInTheList: "Text was registered in the list.",
    noTextSelected: "No text selected.",
    textNotRegisteredInTheList: "Text not registered in the list.",
    cancel: "Cancel",
    delete: "Delete",
};

const translationJA: Translation = {
    registeredTextList: "登録したテキストの一覧",
    obstampRegister: "Obstamp: 登録",
    obstampPaste: "Obstamp: 貼り付け",
    register: "登録",
    paste: "貼り付け",
    textWasRegisteredInTheList: "テキストを登録しました",
    noTextSelected: "テキストが選択されていません",
    textNotRegisteredInTheList: "テキストが登録されていません",
    cancel: "キャンセル",
    delete: "削除",
};

export default class Translator {
    private static readonly translations: Map<string, Translation> = new Map([
        [LanguageEnum.en, translationEN],
        [LanguageEnum.ja, translationJA],
    ]);

    static getTranslation = (language: string): Translation => {
        return this.translations.get(language) ?? translationEN;
    };
}