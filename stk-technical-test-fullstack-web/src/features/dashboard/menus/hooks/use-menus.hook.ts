import { menuService } from "@/features/api";
import { useQuery } from "@tanstack/react-query";
import { menuKeys } from "./use-create-menu.hook";

export const useMenus = () => {
    return useQuery({
        queryKey: menuKeys.lists(),
        queryFn: menuService.getMenus,
    });
};