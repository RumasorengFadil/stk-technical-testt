import { MenuTreeNode } from "../types/menu-tree.type";

export function recalculateDepth(
    nodes: MenuTreeNode[],
    depth = 0
): MenuTreeNode[] {

    return nodes.map(node => ({

        ...node,

        depth,

        children: recalculateDepth(
            node.children,
            depth + 1
        )

    }));

}