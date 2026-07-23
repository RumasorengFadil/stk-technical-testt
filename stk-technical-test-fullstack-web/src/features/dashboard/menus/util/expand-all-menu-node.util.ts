import { MenuTreeNode } from "../types/menu-tree.type";

export function expandAllMenuNodes(
    tree: MenuTreeNode[]
): MenuTreeNode[] {
    return tree.map((node) => ({
        ...node,
        isExpanded: true,
        children: expandAllMenuNodes(node.children),
    }));
}