import PluginStateRepository from "../../models/pluginStateRepository";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import PluginContext from "../../models/pluginContext";
import SortableListItem from "./SortableListItem";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useAtom } from "jotai";
import { favoritesListAtom } from "../reactStates";

/**
 * お気に入りの一覧を表示するためのリストビュー
 */
const FavoritesListView = ({
    pluginStateRepository,
}: {
    pluginStateRepository: PluginStateRepository;
}): JSX.Element => {
    const [favoritesList, setFavoritesList] = useAtom(favoritesListAtom);

    // ドラッグ操作をポインター、またはキーボードで行えるようにする
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // ドラッグ中の項目と、その真下にある項目を入れ替える
    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;
        if (over == null) return;
        if (active.id === over.id) return;

        const oldIndex = favoritesList.findIndex(active.id.toString());
        const newIndex = favoritesList.findIndex(over.id.toString());
        if (oldIndex == null || newIndex == null) return;

        PluginContext.favoritesList = favoritesList.reorderedFavorites(
            oldIndex,
            newIndex
        );
        setFavoritesList(PluginContext.favoritesList);
        pluginStateRepository.save(PluginContext.favoritesList.values);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={favoritesList.values.map((v) => v.id)}
                strategy={verticalListSortingStrategy}
            >
                {favoritesList.values.map((v) => (
                    <SortableListItem key={v.id} favorite={v} />
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default FavoritesListView;
