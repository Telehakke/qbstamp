import { useSetAtom } from "jotai";
import PluginContext from "../../models/pluginContext";
import { checksListAtom } from "../reactStates";

/**
 * チェック状態を全てクリアする
 */
const CancelButton = (): JSX.Element => {
    const setChecksList = useSetAtom(checksListAtom);

    const handleClick = (): void => {
        setChecksList((list) => list.uncheckedAll());
    };

    return (
        <button className="qbs-flex-1" onClick={handleClick}>
            {PluginContext.translation.cancel}
        </button>
    );
};

export default CancelButton;
