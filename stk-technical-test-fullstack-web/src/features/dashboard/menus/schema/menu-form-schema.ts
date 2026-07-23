import { z } from "zod";

export const menuSchema = z.object({
    id: z.string(),
    parentId: z.string().nullable(),
    name: z.string().min(1),
    path: z.string().nullable(),
    icon: z.string().nullable(),
    order: z.coerce.number().int().min(0),
    isActive: z.boolean(),
    depth: z.coerce.number(),
});


export type MenuFormSchema = z.infer<typeof menuSchema>;