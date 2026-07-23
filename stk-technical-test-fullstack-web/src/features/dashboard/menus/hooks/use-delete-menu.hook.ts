import { menuService } from "@/features/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { menuKeys } from "./use-create-menu.hook";

export const useDeleteMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => menuService.deleteMenu(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: menuKeys.lists() });
        },
    });
};