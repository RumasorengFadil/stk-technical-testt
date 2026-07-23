import { MenuTreeNode } from "../types/menu-tree.type";

export function collapseAllMenuNodes(
    tree: MenuTreeNode[]
): MenuTreeNode[] {
    return tree.map((node) => ({
        ...node,
        isExpanded: false,
        children: collapseAllMenuNodes(node.children),
    }));
}