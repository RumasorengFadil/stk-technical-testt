import { MenuTreeNode } from "../types/menu-tree.type";

export function toggleMenuNode(
    tree: MenuTreeNode[],
    id: string
): MenuTreeNode[] {
    return tree.map((node) => {
        if (node.id === id) {
            return {
                ...node,
                isExpanded: !node.isExpanded,
            };
        }

        return {
            ...node,
            children: toggleMenuNode(
                node.children,
                id,
            ),
        };
    });
}