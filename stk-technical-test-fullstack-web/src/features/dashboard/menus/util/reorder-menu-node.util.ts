import { arrayMove } from "@dnd-kit/sortable";
import { MenuTreeNode } from "../types/menu-tree.type";

export function reorderMenuNode(
    tree: MenuTreeNode[],
    parentId: string | null,
    activeId: string,
    overId: string
): MenuTreeNode[] {

    function reorder(nodes: MenuTreeNode[]): MenuTreeNode[] {

        if (parentId === null) {

            const oldIndex = nodes.findIndex(
                n => n.id === activeId
            );

            const newIndex = nodes.findIndex(
                n => n.id === overId
            );

            if (oldIndex !== -1 && newIndex !== -1) {

                return arrayMove(
                    nodes,
                    oldIndex,
                    newIndex
                ).map((node, index) => ({
                    ...node,
                    order: index + 1,
                }));

            }

        }

        return nodes.map(node => {

            if (node.id === parentId) {

                const oldIndex =
                    node.children.findIndex(
                        c => c.id === activeId
                    );

                const newIndex =
                    node.children.findIndex(
                        c => c.id === overId
                    );

                if (
                    oldIndex !== -1 &&
                    newIndex !== -1
                ) {

                    return {

                        ...node,

                        children: arrayMove(
                            node.children,
                            oldIndex,
                            newIndex
                        ).map((child, index) => ({
                            ...child,
                            order: index + 1,
                        })),

                    };

                }

            }

            return {

                ...node,

                children: reorder(node.children),

            };

        });

    }

    return reorder(tree);

}