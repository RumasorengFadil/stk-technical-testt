import { MenuTreeNode } from "../types/menu-tree.type";

export function findMenuNode(
    tree: MenuTreeNode[],
    id: string
): MenuTreeNode | null {

    for (const node of tree) {

        if (node.id === id) {
            return node;
        }

        const found = findMenuNode(
            node.children,
            id
        );

        if (found) {
            return found;
        }
    }

    return null;
}