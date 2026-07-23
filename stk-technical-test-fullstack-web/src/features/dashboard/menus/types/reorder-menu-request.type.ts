export interface ReorderMenuItem {
    id: string;
    parentId: string | null;
    order: number;
}

export interface ReorderMenuRequest {
    items: ReorderMenuItem[];
}