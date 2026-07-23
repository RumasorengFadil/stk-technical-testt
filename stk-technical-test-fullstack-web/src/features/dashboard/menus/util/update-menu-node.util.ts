import { MenuTreeNode } from "../types/menu-tree.type";

export function updateMenuNode(
    tree: MenuTreeNode[],
    id: string,
    updater: Partial<MenuTreeNode>
): MenuTreeNode[] {

    return tree.map(node => {

        if (node.id === id) {
            return {
                ...node,
                ...updater
            };
        }

        return {
            ...node,
            children: updateMenuNode(
                node.children,
                id,
                updater
            )
        };

    });

}