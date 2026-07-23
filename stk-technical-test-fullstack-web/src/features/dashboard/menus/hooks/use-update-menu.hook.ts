import { menuService } from "@/features/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MenuRequest } from "../types/menu-request.type";
import { menuKeys } from "./use-create-menu.hook";

export const useUpdateMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<MenuRequest> }) =>
            menuService.updateMenu(id, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: menuKeys.lists() });
            queryClient.invalidateQueries({ queryKey: menuKeys.detail(variables.id) });
        },
    });
};