"use client"
import { MenuFormSchema } from "../schema/menu-form-schema";
import { MenuTreeNode as Node } from "../types/menu-tree.type";
import MenuTreeItem from "./menu-tree-item";

interface Props {
    node: Node;
    parentName: string;
    selectedId?: string,
    onCreate: (data: MenuFormSchema) => void;
    onToggle(id: string): void;
    onSelect(parentName: string, node?: Node): void;
    onDelete: (id: string) => void;
}

export default function TreeNode({ node, onToggle, parentName, onSelect, selectedId, onCreate, onDelete }: Props) {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = node.isExpanded;
    const isSelected = selectedId === node.id;

    return (
        <div className="relative">
            <MenuTreeItem
                parentName={parentName}
                node={node}
                isSelected={isSelected}
                onToggle={onToggle}
                onSelect={onSelect}
                onCreate={onCreate}
                onDelete={onDelete}
            />

            {isExpanded && hasChildren && (
                <div className="ml-2.5 pl-4 border-l border-gray-200 flex flex-col relative pb-1">
                    {node.children.map(child => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            selectedId={selectedId}
                            parentName={node.name}
                            onToggle={onToggle}
                            onSelect={onSelect}
                            onCreate={onCreate}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// interface Props {
//     nodes: Node[];
//     onToggle(id: string): void;
// }
// export default function MenuTreeNode({
//     nodes,
//     onToggle,
// }: Props) {
//     return (
//         <>
//             {nodes.map((node) => (
//                 <div key={node.id}>
//                     <MenuTreeItem
//                         node={node}
//                         onToggle={onToggle}
//                     />

//                     {node.isExpanded &&
//                         node.children.length > 0 && (
//                             <MenuTreeNode
//                                 nodes={node.children}
//                                 onToggle={onToggle}
//                             />
//                         )}
//                 </div>
//             ))}
//         </>
//     );
// }