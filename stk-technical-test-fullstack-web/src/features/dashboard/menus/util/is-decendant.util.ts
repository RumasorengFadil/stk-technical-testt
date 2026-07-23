import { MenuTreeNode } from "../types/menu-tree.type";

export function isDescendant(
    parent: MenuTreeNode,
    targetId: string
): boolean {
    for (const child of parent.children) {
        if (child.id === targetId) {
            return true;
        }

        if (isDescendant(child, targetId)) {
            return true;
        }
    }

    return false;
}