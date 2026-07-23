import { MenuTreeNode } from "../types/menu-tree.type";
import { findParentNode } from "./find-parent-node.util";

export function reorderBefore(
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
            const toIndex = list.findIndex(node => node.id === targetId);

            if (fromIndex === -1 || toIndex === -1) {
                return nodes;
            }

            const [moving] = list.splice(fromIndex, 1);

            list.splice(toIndex, 0, moving);

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
            const toIndex = children.findIndex(child => child.id === targetId);

            if (fromIndex === -1 || toIndex === -1) {
                return node;
            }

            const [moving] = children.splice(fromIndex, 1);

            children.splice(toIndex, 0, moving);

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