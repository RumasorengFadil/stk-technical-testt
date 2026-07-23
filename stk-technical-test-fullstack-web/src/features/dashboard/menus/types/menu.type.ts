export interface Menu {
    id: string;

    parentId: string | null;

    name: string;

    /**
     * example:
     * /dashboard
     * /system/menu
     */
    path: string | null;

    /**
     * lucide-react icon name
     */
    icon: string | null;

    /**
     * order on parent
     */
    order: number;

    isActive: boolean;

    createdAt: string;

    updatedAt: string;
}