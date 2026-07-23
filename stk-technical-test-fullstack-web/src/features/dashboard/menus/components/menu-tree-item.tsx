"use client"
import DeleteFormDialog from "@/components/delete-form-dialog";
import { useDndContext, useDraggable } from "@dnd-kit/core";
import { ChevronDown, ChevronRight } from "lucide-react";
import { MenuFormSchema } from "../schema/menu-form-schema";
import { MenuTreeNode } from "../types/menu-tree.type";
import { isDescendant } from "../util/is-decendant.util";
import CreateMenuFormDialog from "./create-menu-form-dialog";
import { DropZone } from "./drop-zone";

interface Props {
    node: MenuTreeNode;
    parentName: string
    isSelected: boolean,
    onToggle(id: string): void;
    onSelect(parentName: string, node?: MenuTreeNode): void;
    onCreate: (data: MenuFormSchema) => void;
    onDelete: (id: string) => void;
}

export default function MenuTreeItem({
    node,
    parentName,
    isSelected,
    onToggle,
    onSelect,
    onCreate,
    onDelete
}: Props) {
    const { active } = useDndContext();

    const {
        attributes,
        listeners,
        setNodeRef: setDragRef,
        transform,
        isDragging,
    } = useDraggable({
        id: node.id,
        data: { node }
    });

    const style: React.CSSProperties = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        zIndex: isDragging ? 50 : "auto",
        position: isDragging ? "relative" : "static",
        transition: isDragging ? "none" : "transform 200ms ease, opacity 200ms ease",
    };
    const hasChildren = node.children.length > 0;
    const activeNode = active?.data?.current?.node as MenuTreeNode | undefined;

    const isSelf = active?.id === node.id;
    const isChildOfActive = activeNode ? isDescendant(activeNode, node.id) : false;

    const isInvalidDrop = isSelf || isChildOfActive;

    return (
        <div className="flex flex-col relative">

            {!isInvalidDrop && (
                <DropZone
                    id={`before-${node.id}`}
                    data={{ node, type: 'before' }}
                />
            )}

            <div
                ref={setDragRef}
                style={style}
                {...attributes}
            >
                <DropZone
                    id={`inside-${node.id}`}
                    data={{ node, type: 'inside' }}
                    type="inside"
                    disabled={isInvalidDrop} // Fitur drop dimatikan
                    isInvalidDrop={isInvalidDrop}
                    isDragging={isDragging}
                    className={`group flex items-center gap-2 px-2 py-1.5 cursor-grab ${isSelected ? 'text-[#0f172a]' : 'text-[#475569]'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(parentName, node);
                    }}
                    {...listeners}
                >
                    <div
                        className="w-5 h-5 flex items-center justify-center mr-1 cursor-pointer z-10 bg-transparent"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (hasChildren) onToggle(node.id);
                        }}
                    >
                        {hasChildren && (
                            <span className="text-gray-400 hover:text-gray-600 transition-colors">
                                {node.isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </span>
                        )}
                    </div>

                    <span className={`text-[14px] ${isSelected ? 'font-medium' : ''}`}>{node.name}</span>

                    {isSelected && (
                        <div onPointerDown={(e) => e.stopPropagation()} className="flex items-center gap-1">
                            <CreateMenuFormDialog node={node} parentName={parentName} onCreate={onCreate} />
                            <DeleteFormDialog deletingItem={{ id: node.id }} confirmDelete={onDelete} />
                        </div>
                    )}
                </DropZone>
            </div>

            {/* Hanya render DropZone AFTER jika node ini BUKAN dirinya sendiri / anaknya */}
            {!isInvalidDrop && (
                <DropZone
                    id={`after-${node.id}`}
                    data={{ node, type: 'after' }}
                />
            )}
        </div>
    );
}