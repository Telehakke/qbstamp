import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FavoritesListView from "./listView/FavoritesListView";
import PluginStateRepository from "../models/pluginStateRepository";
import Initialization from "./Initialization";
import CancelAndDeleteButtons from "./buttons/CancelAndDeleteButtons";

const ReactRoot = (
    element: HTMLElement,
    pluginStateRepository: PluginStateRepository
): void => {
    createRoot(element).render(
        <StrictMode>
            <Initialization>
                <FavoritesListView
                    pluginStateRepository={pluginStateRepository}
                />
                <CancelAndDeleteButtons
                    pluginStateRepository={pluginStateRepository}
                />
            </Initialization>
        </StrictMode>
    );
};

export default ReactRoot;
