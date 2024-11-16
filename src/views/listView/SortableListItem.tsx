import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { Favorite } from "../../models/types";
import { GripVertical } from "lucide-react";
import { useAtom } from "jotai";
import { checksListAtom } from "../reactStates";

/**
 * ソート可能なリストの項目
 */
const SortableListItem = ({
    favorite,
}: {
    favorite: Favorite;
}): React.JSX.Element => {
    const [checksList, setChecksList] = useAtom(checksListAtom);

    const {
        active,
        attributes,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: favorite.id });

    // ドラッグ操作に合わせて要素を移動させるためのCSSスタイル
    const style: { style: React.CSSProperties } = {
        style: {
            transform: CSS.Transform.toString(transform),
            transition: transition,
            opacity: active?.id == favorite.id ? 0.5 : 1.0,
        },
    };

    // チェック状態を記録する
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setChecksList((list) =>
            list.changed(favorite.id, event.target.checked)
        );
    };

    return (
        <div className="obs-sortable-item" ref={setNodeRef} {...style}>
            <input
                type="checkbox"
                id={favorite.id}
                onChange={handleChange}
                checked={checksList.find(favorite.id)?.checked}
            />
            <label className="obs-flex-1" htmlFor={favorite.id}>
                {favorite.text}
            </label>
            <button
                className="clickable-icon obs-drag-handle"
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
            >
                <GripVertical />
            </button>
        </div>
    );
};

export default SortableListItem;
