"use client"
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DndContext, DragEndEvent, MouseSensor, pointerWithin, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

import { MenuFormSchema } from "../schema/menu-form-schema";
import { MenuTreeNode } from "../types/menu-tree.type";
import TreeNode from "./menu-tree-node";

interface TreeNodeData {
    id: string | number;
    name: string;
    children?: TreeNodeData[];
    expanded?: boolean;
}

interface MenuTreePanelProps {
    tree: MenuTreeNode[];
    selectedId?: string;
    selectedMenu?: string;

    onExpandAll: () => void;
    onCollapseAll: () => void;
    onToggle: (id: string) => void;
    onSelect: (parentName: string, node?: MenuTreeNode) => void;
    onCreate: (data: MenuFormSchema) => void;
    onDelete: (id: string) => void;
    onDragDrop: (event: DragEndEvent) => void;
}

const MenuTreePanel = ({
    tree,
    selectedId,
    selectedMenu = "System Management",
    onExpandAll,
    onCollapseAll,
    onToggle,
    onSelect,
    onCreate,
    onDelete,
    onDragDrop
}: MenuTreePanelProps) => {
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5, // Membedakan klik mouse dengan drag
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250, // Harus ditekan 250ms sebelum bisa di-drag di layar sentuh
                tolerance: 5,
            },
        })
    );

    return (
        <div className="space-y-4">
            {/* Menu Selector */}
            <div className="mb-6 space-y-4">
                <FieldLabel>
                    Menu
                </FieldLabel>

                <Select value={selectedMenu}>
                    <SelectTrigger className={"w-full p-6 border-0 bg-gray-100 max-w-96"}>
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem className={"p-4"} value={selectedMenu}>{selectedMenu}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <Button className={"p-5 px-8 rounded-full bg-gray-800 text-white hover:bg-gray-800/80"} onClick={onExpandAll}>
                    Expand All
                </Button>

                <Button className={"p-5 px-8 rounded-full"} variant="outline" onClick={onCollapseAll}>
                    Collapse All
                </Button>
            </div>

            {/* Tree */}
            <div className="rounded-lg border bg-card p-4">
                <DndContext sensors={sensors} onDragEnd={onDragDrop} collisionDetection={pointerWithin}>
                    {tree.map((node) => (
                        <TreeNode
                            key={node.id}
                            node={node}
                            parentName={node.name}
                            selectedId={selectedId}
                            onToggle={onToggle}
                            onSelect={onSelect}
                            onCreate={onCreate}
                            onDelete={onDelete}
                        />
                    ))}
                </DndContext>
            </div>

        </div>
    );
};

export default MenuTreePanel;