import { menuService } from "@/features/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReorderMenuRequest } from "../types/reorder-menu-request.type";
import { menuKeys } from "./use-create-menu.hook";

export const useReorderMenus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ReorderMenuRequest) => menuService.reorderMenus(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: menuKeys.lists() });
        },
    });
};