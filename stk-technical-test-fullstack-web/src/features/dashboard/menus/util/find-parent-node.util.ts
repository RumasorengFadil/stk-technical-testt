// utils/find-parent-node.ts

import { MenuTreeNode } from "../types/menu-tree.type";


export function findParentNode(
    tree: MenuTreeNode[],
    nodeId: string
): MenuTreeNode | null {
    for (const node of tree) {
        // Apakah child langsung?
        if (node.children.some((child) => child.id === nodeId)) {
            return node;
        }

        // Cek ke bawah
        const parent = findParentNode(node.children, nodeId);

        if (parent) {
            return parent;
        }
    }

    return null;
}