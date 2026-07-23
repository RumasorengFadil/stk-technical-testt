import { Menu } from "./menu.type";

export interface MenuTreeNode extends Menu {
    depth: number;

    children: MenuTreeNode[];

    /**
     * untuk expand collapse
     */
    isExpanded?: boolean;
}