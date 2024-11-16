import { useSetAtom } from "jotai";
import PluginContext from "../models/pluginContext";
import { ReactNode } from "react";
import { checksListAtom, favoritesListAtom } from "./reactStates";
import { ChecksList } from "../models/checkList";

/**
 * 状態を初期化する
 */
const Initialization = ({ children }: { children: ReactNode }): JSX.Element => {
    const setFavoritesList = useSetAtom(favoritesListAtom);
    setFavoritesList(PluginContext.favoritesList);

    const setChecks = useSetAtom(checksListAtom);
    const ids = PluginContext.favoritesList.values.map((v) => v.id);
    setChecks(ChecksList.create(ids));

    return <>{children}</>;
};

export default Initialization;
