import { useAtom } from "jotai";
import PluginContext from "../../models/pluginContext";
import { checksListAtom, favoritesListAtom } from "../reactStates";
import PluginStateRepository from "../../models/pluginStateRepository";

/**
 * チェックが付いている要素だけを削除する
 */
const DeleteButton = ({
    pluginStateRepository,
}: {
    pluginStateRepository: PluginStateRepository;
}): JSX.Element => {
    const [favoritesList, setFavoritesList] = useAtom(favoritesListAtom);
    const [checksList, setChecksList] = useAtom(checksListAtom);

    const handleClick = (): void => {
        const ids = checksList.getCheckedIDs();
        PluginContext.favoritesList = favoritesList.removed(ids);
        setFavoritesList(PluginContext.favoritesList);
        pluginStateRepository.save(PluginContext.favoritesList.values);
        setChecksList((list) => list.removedAllCheckedItems());
    };

    return (
        <button className="qbs-flex-1 mod-warning" onClick={handleClick}>
            {PluginContext.translation.delete}
        </button>
    );
};

export default DeleteButton;
