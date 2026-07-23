import { menuService } from "@/features/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MenuRequest } from "../types/menu-request.type";

export const menuKeys = {
    all: ['menus'] as const,
    lists: () => [...menuKeys.all, 'list'] as const,
    detail: (id: string) => [...menuKeys.all, 'detail', id] as const,
};

export const useCreateMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newMenu: MenuRequest) => menuService.createMenu(newMenu),
        onSuccess: () => {
            // Refresh data list otomatis setelah berhasil buat menu
            queryClient.invalidateQueries({ queryKey: menuKeys.lists() });
        },
    });
};