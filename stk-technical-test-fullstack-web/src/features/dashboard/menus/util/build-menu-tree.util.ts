import { MenuTreeNode } from "../types/menu-tree.type";
import { Menu } from "../types/menu.type";

export function buildMenuTree(
    menus: Menu[]
): MenuTreeNode[] {
    const map = new Map<string, MenuTreeNode>();

    const roots: MenuTreeNode[] = [];

    // 1. Create all node
    menus.forEach((menu) => {
        map.set(menu.id, {
            ...menu,
            depth: 0,
            children: [],
            isExpanded: true,
        });
    });

    // 2. Connecting parent-child
    map.forEach((node) => {
        if (node.parentId === null) {
            roots.push(node);
            return;
        }

        const parent = map.get(node.parentId);

        if (!parent) {
            roots.push(node);
            return;
        }

        parent.children.push(node);
    });

    // 3. Calc depth
    const assignDepth = (
        nodes: MenuTreeNode[],
        depth: number
    ) => {
        nodes.forEach((node) => {
            node.depth = depth;

            assignDepth(node.children, depth + 1);
        });
    };

    assignDepth(roots, 0);

    // 4. sort
    const sortTree = (nodes: MenuTreeNode[]) => {
        nodes.sort((a, b) => a.order - b.order);

        nodes.forEach((node) => sortTree(node.children));
    };

    sortTree(roots);

    return roots;
}