import { MenuTreeNode } from "../types/menu-tree.type";

interface RemoveMenuNodeResult {
    tree: MenuTreeNode[];
    removedNode: MenuTreeNode | null;
}

export function removeMenuNode(
    tree: MenuTreeNode[],
    id: string
): RemoveMenuNodeResult {
    let removedNode: MenuTreeNode | null = null;

    function remove(nodes: MenuTreeNode[]): MenuTreeNode[] {
        return nodes
            .filter((node) => {
                if (node.id === id) {
                    removedNode = node;
                    return false;
                }

                return true;
            })
            .map((node) => ({
                ...node,
                children: remove(node.children),
            }));
    }

    return {
        tree: remove(tree),
        removedNode,
    };
}