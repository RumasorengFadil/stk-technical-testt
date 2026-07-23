import { api } from "@/lib/api";
import { MenuRequest } from "./dashboard/menus/types/menu-request.type";
import { Menu } from "./dashboard/menus/types/menu.type";
import { ReorderMenuRequest } from "./dashboard/menus/types/reorder-menu-request.type";

export const menuService = {
    // Get all menus
    getMenus: async (): Promise<Menu[]> => {
        // Backend mengembalikan array [Menu[]], sesuaikan jika dibungkus object { items: Menu[] }
        const { data } = await api.get<Menu[]>('/menus');
        return data;
    },

    // Get menu by ID
    getMenuById: async (id: string): Promise<Menu> => {
        const { data } = await api.get<Menu>(`/menus/${id}`);
        return data;
    },

    // Create menu
    createMenu: async (payload: MenuRequest): Promise<Menu> => {
        const { data } = await api.post<Menu>('/menus', payload);
        return data;
    },

    // Update menu
    updateMenu: async (id: string, payload: Partial<MenuRequest>): Promise<Menu> => {
        const { data } = await api.put<Menu>(`/menus/${id}`, payload);
        return data;
    },

    // Reorder & Move menu items (Batch)
    reorderMenus: async (payload: ReorderMenuRequest): Promise<void> => {
        await api.put('/menus/reorder', payload);
    },

    // Delete menu
    deleteMenu: async (id: string): Promise<void> => {
        await api.delete(`/menus/${id}`);
    },
};