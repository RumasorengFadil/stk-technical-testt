"use client"

import PageHeader from "@/components/page-header";
import MenuDetailForm from "@/features/dashboard/menus/components/menu-detail-form";
import { MenuTreeSkeleton } from "@/features/dashboard/menus/components/menu-tree-skeleton";
import { toggleMenuNode } from "@/features/dashboard/menus/components/toggle-menu-node";
import { useCreateMenu } from "@/features/dashboard/menus/hooks/use-create-menu.hook";
import { useDeleteMenu } from "@/features/dashboard/menus/hooks/use-delete-menu.hook";
import { useMenus } from "@/features/dashboard/menus/hooks/use-menus.hook";
import { useReorderMenus } from "@/features/dashboard/menus/hooks/use-reorder-menu.hook";
import { useUpdateMenu } from "@/features/dashboard/menus/hooks/use-update-menu.hook";
import { MenuFormSchema } from "@/features/dashboard/menus/schema/menu-form-schema";
import { MenuRequest } from "@/features/dashboard/menus/types/menu-request.type";
import { MenuTreeNode } from "@/features/dashboard/menus/types/menu-tree.type";
import { ReorderMenuRequest } from "@/features/dashboard/menus/types/reorder-menu-request.type";
import { buildMenuTree } from "@/features/dashboard/menus/util/build-menu-tree.util";
import { collapseAllMenuNodes } from "@/features/dashboard/menus/util/collape-all-menu-node";
import { expandAllMenuNodes } from "@/features/dashboard/menus/util/expand-all-menu-node.util";
import { flattenMenuTree } from "@/features/dashboard/menus/util/flatten-menu-tree.util";
import { DropPosition, moveTreeNode } from "@/features/dashboard/menus/util/move-menu-node.util";
import { parseDropId } from "@/features/dashboard/menus/util/parse-drop-id.util";
import { DragEndEvent } from "@dnd-kit/core";
import dynamic from "next/dynamic";
import { ChangeEvent, useEffect, useState } from "react";

const MenuTreePanel = dynamic(
    () => import("@/features/dashboard/menus/components/menu-tree-panel"),
    { ssr: false }
);

export default function PageClient() {
    // Fetch raw menu list and loading state from backend using React Query
    const { data: rawMenus, isPending } = useMenus();

    // Mutation hooks for CRUD and Reorder operations
    const { mutate: createMenu, isPending: isCreatePending } = useCreateMenu();
    const { mutate: updateMenu, isPending: isUpdatePending } = useUpdateMenu();
    const { mutate: deleteMenu } = useDeleteMenu();
    const { mutate: reorderMenus } = useReorderMenus();

    // Local UI states
    const [tree, setTree] = useState<MenuTreeNode[]>([]);
    const [selectedNode, setSelectedNode] = useState<MenuTreeNode>();
    const [parentNameStr, setParentNameStr] = useState('Systems');

    // Synchronize server data (React Query) into local tree state
    useEffect(() => {
        if (rawMenus) {
            const builtTree = buildMenuTree(rawMenus);
            setTree(builtTree);

            // Keep selected node updated if it exists and changes on the server
            if (selectedNode) {
                const findNodeRecursive = (nodes: MenuTreeNode[]): MenuTreeNode | undefined => {
                    for (const node of nodes) {
                        if (node.id === selectedNode.id) return node;
                        if (node.children) {
                            const found = findNodeRecursive(node.children);
                            if (found) return found;
                        }
                    }
                };
                const updatedCurrentNode = findNodeRecursive(builtTree);
                if (updatedCurrentNode) setSelectedNode(updatedCurrentNode);
            }
        }
    }, [rawMenus]);

    // Handle expanding/collapsing individual tree nodes
    const handleToggle = (id: string) => {
        setTree((prev) => toggleMenuNode(prev, id));
    };

    // Handle node selection for detail viewing/editing
    const handleSelectNode = (parentName: string, node?: MenuTreeNode) => {
        setSelectedNode(node);
        setParentNameStr(parentName || '-');
    };

    // Handle local name change state for the selected node form
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (selectedNode) {
            setSelectedNode({ ...selectedNode, name: e.target.value });
        }
    };

    // Handle updating an existing menu item
    const handleSave = (formData: MenuFormSchema) => {
        if (!selectedNode) return;

        const payload: Partial<MenuRequest> = {
            name: formData.name,
            path: formData.path,
            icon: formData.icon,
            isActive: formData.isActive,
        };

        updateMenu({ id: selectedNode.id, payload });
    };

    // Handle creating a new child/root menu item
    const handleCreate = (formData: MenuFormSchema) => {
        const menuRequest: MenuRequest = {
            isActive: formData.isActive,
            name: formData.name,
            order: formData.order,
            parentId: formData.id, // Parent ID from the selected reference node
            icon: formData.icon,
            path: formData.path,
        };

        createMenu(menuRequest);
    };

    // Handle deleting a menu item
    const handleDelete = (id: string) => {
        deleteMenu(id, {
            onSuccess: () => {
                if (selectedNode?.id === id) {
                    setSelectedNode(undefined);
                }
            },
        });
    };

    // Handle drag and drop reordering / parent moving
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeNode = active.data.current?.node as MenuTreeNode;
        const targetNode = over.data.current?.node as MenuTreeNode;
        const { position } = parseDropId(over.id as string);

        if (!activeNode || !targetNode) return;

        // Optimistically update the local tree state for instant UI feedback
        const newTree = moveTreeNode(
            tree,
            activeNode.id,
            targetNode.id,
            position as DropPosition
        );
        setTree(newTree);

        // Send batch reorder/move payload to backend API
        const reorderMenuRequest: ReorderMenuRequest = {
            items: flattenMenuTree(newTree).map((item) => ({
                id: item.id,
                parentId: item.parentId,
                order: item.order,
            })),
        };

        reorderMenus(reorderMenuRequest);
    };

    return (
        <div>
            <PageHeader
                title="Menus"
                breadcrumbs={[{ label: "Menus" }]}
            />

            <div className="grid grid-row-2 lg:grid-cols-[1fr_1fr] gap-12">
                {isPending ? (
                    <MenuTreeSkeleton />
                ) : (
                    <MenuTreePanel
                        onCollapseAll={() => setTree((prev) => collapseAllMenuNodes(prev))}
                        onExpandAll={() => setTree((prev) => expandAllMenuNodes(prev))}
                        tree={tree}
                        selectedId={selectedNode?.id}
                        onSelect={handleSelectNode}
                        onToggle={handleToggle}
                        onCreate={handleCreate}
                        onDelete={handleDelete}
                        onDragDrop={handleDragEnd}
                    />
                )}

                <MenuDetailForm
                    selectedNode={selectedNode}
                    parentName={parentNameStr}
                    isPending={isUpdatePending}
                    onNameChange={handleNameChange}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
}