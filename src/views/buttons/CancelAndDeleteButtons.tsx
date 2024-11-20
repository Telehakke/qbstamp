import { useAtomValue } from "jotai";
import { checksListAtom } from "../reactStates";
import CancelButton from "./CancelButton";
import DeleteButton from "./DeleteButton";
import PluginStateRepository from "../../models/pluginStateRepository";

const CancelAndDeleteButtons = ({
    pluginStateRepository,
}: {
    pluginStateRepository: PluginStateRepository;
}): JSX.Element => {
    const checksList = useAtomValue(checksListAtom);
    const length = checksList.getCheckedLength();

    return (
        <>
            {length > 0 && (
                <div className="qbs-row-buttons">
                    <CancelButton />
                    <DeleteButton
                        pluginStateRepository={pluginStateRepository}
                    />
                </div>
            )}
        </>
    );
};

export default CancelAndDeleteButtons;
