export interface MenuRequest {
    parentId: string | null;
    name: string;
    path?: string | null;
    icon?: string | null;
    order: number;
    isActive: boolean | null;
}