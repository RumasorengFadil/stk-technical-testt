import { MenuTreeNode } from "../types/menu-tree.type";
import { findParentNode } from "./find-parent-node.util";

export function reorderAfter(
    tree: MenuTreeNode[],
    activeId: string,
    targetId: string
): MenuTreeNode[] {

    const activeParent = findParentNode(tree, activeId);
    const targetParent = findParentNode(tree, targetId);

    // parent harus sama
    if (activeParent?.id !== targetParent?.id) {
        return tree;
    }

    function reorder(nodes: MenuTreeNode[]): MenuTreeNode[] {

        // Root
        if (activeParent === null) {

            const list = [...nodes];

            const fromIndex = list.findIndex(node => node.id === activeId);
            const targetIndex = list.findIndex(node => node.id === targetId);

            if (fromIndex === -1 || targetIndex === -1) {
                return nodes;
            }

            const [moving] = list.splice(fromIndex, 1);

            const insertIndex =
                fromIndex < targetIndex
                    ? targetIndex
                    : targetIndex + 1;

            list.splice(insertIndex, 0, moving);

            return list.map((node, index) => ({
                ...node,
                order: index + 1,
            }));
        }

        return nodes.map(node => {

            if (node.id !== activeParent.id) {

                return {
                    ...node,
                    children: reorder(node.children),
                };

            }

            const children = [...node.children];

            const fromIndex = children.findIndex(child => child.id === activeId);
            const targetIndex = children.findIndex(child => child.id === targetId);

            if (fromIndex === -1 || targetIndex === -1) {
                return node;
            }

            const [moving] = children.splice(fromIndex, 1);

            const insertIndex =
                fromIndex < targetIndex
                    ? targetIndex
                    : targetIndex + 1;

            children.splice(insertIndex, 0, moving);

            return {
                ...node,
                children: children.map((child, index) => ({
                    ...child,
                    order: index + 1,
                })),
            };

        });

    }

    return reorder(tree);

}