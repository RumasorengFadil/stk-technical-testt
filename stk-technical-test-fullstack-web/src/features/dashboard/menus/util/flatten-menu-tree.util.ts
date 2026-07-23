import { MenuTreeNode } from "../types/menu-tree.type";

export function flattenMenuTree(
    tree: MenuTreeNode[]
): MenuTreeNode[] {
    const result: MenuTreeNode[] = [];

    function traverse(nodes: MenuTreeNode[]) {
        for (const node of nodes) {
            result.push(node);

            if (node.children.length > 0) {
                traverse(node.children);
            }
        }
    }

    traverse(tree);

    return result;
}