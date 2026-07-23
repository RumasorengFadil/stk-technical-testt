import { MenuTreeNode } from "../types/menu-tree.type";
import { recalculateDepth } from "./recalculate-depth.util";

export function insertMenuNode(
    tree: MenuTreeNode[],
    parentId: string | null,
    newNode: MenuTreeNode,
    insertIndex?: number
): MenuTreeNode[] {

    const node = {
        ...newNode,
        parentId,
    };

    // Insert ke root
    if (parentId === null) {

        const roots = [...tree];

        if (
            insertIndex === undefined ||
            insertIndex < 0 ||
            insertIndex > roots.length
        ) {
            roots.push(node);
        } else {
            roots.splice(insertIndex, 0, node);
        }

        return recalculateDepth(
            roots.map((item, index) => ({
                ...item,
                order: index + 1,
            }))
        );
    }

    function insert(nodes: MenuTreeNode[]): MenuTreeNode[] {

        return nodes.map((item) => {

            if (item.id === parentId) {

                const children = [...item.children];

                if (
                    insertIndex === undefined ||
                    insertIndex < 0 ||
                    insertIndex > children.length
                ) {
                    children.push(node);
                } else {
                    children.splice(insertIndex, 0, node);
                }

                return {
                    ...item,
                    children: children.map((child, index) => ({
                        ...child,
                        order: index + 1,
                    })),
                };
            }

            return {
                ...item,
                children: insert(item.children),
            };

        });

    }

    return recalculateDepth(insert(tree));

}