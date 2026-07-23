import { MenuTreeNode } from "../types/menu-tree.type";
import { findMenuNode } from "./find-menu-node.util";
import { findParentNode } from "./find-parent-node.util";
import { insertMenuNode } from "./insert-menu-node.util";
import { isDescendant } from "./is-decendant.util";
import { removeMenuNode } from "./remove-menu-node.util";

export type DropPosition =
    | "before"
    | "inside"
    | "after";

export function moveTreeNode(
    tree: MenuTreeNode[],
    activeId: string,
    targetId: string,
    position: DropPosition
): MenuTreeNode[] {

    const activeNode = findMenuNode(tree, activeId);
    const targetNode = findMenuNode(tree, targetId);

    if (!activeNode || !targetNode) {
        return tree;
    }

    if (activeId === targetId) {
        return tree;
    }

    if (isDescendant(activeNode, targetId)) {
        return tree;
    }

    const targetParent = findParentNode(tree, targetId);

    const {
        tree: removedTree,
        removedNode,
    } = removeMenuNode(tree, activeId);

    if (!removedNode) {
        return tree;
    }

    switch (position) {

        case "inside":

            return insertMenuNode(
                removedTree,
                targetNode.id,
                removedNode
            );

        case "before": {

            const siblings =
                targetParent
                    ? targetParent.children
                    : removedTree;

            const index = siblings.findIndex(
                item => item.id === targetId
            );

            return insertMenuNode(
                removedTree,
                targetParent?.id ?? null,
                removedNode,
                index
            );

        }

        case "after": {

            const siblings =
                targetParent
                    ? targetParent.children
                    : removedTree;

            const index = siblings.findIndex(
                item => item.id === targetId
            );

            return insertMenuNode(
                removedTree,
                targetParent?.id ?? null,
                removedNode,
                index + 1
            );

        }

    }


}