"use client";


import CustomFormField from "@/components/custom-form-field";
import FormDialog from "@/components/form-dialog";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { MenuFormSchema, menuSchema } from "../schema/menu-form-schema";
import { MenuTreeNode } from "../types/menu-tree.type";


export default function CreateMenuFormDialog({ node, onCreate }: { node: MenuTreeNode, parentName: string, onCreate: (data: MenuFormSchema) => void }) {
    const form = useForm<MenuFormSchema>({
        resolver: zodResolver(menuSchema),
        defaultValues: {
            depth: node.depth,
            order: node.order,
            parentId: node.parentId,
            name: "",
            isActive: true,
            icon: null,
            path: null,
            id: node.id,
        }
    })
    return (
        <FormDialog
            header={{
                title: "Create Menu"
            }}
            tooltip={{
                title: "Create",
            }}
            trigger={{
                icon: Plus,
            }}
        >
            <form onSubmit={form.handleSubmit((data, e) => {
                e?.preventDefault();
                onCreate(data);
            })}>
                <FieldGroup>
                    <CustomFormField
                        form={form}
                        label="Name"
                        name="name"
                        type="text"
                        className="p-6"
                    />
                </FieldGroup>
                <Button
                    // onClick={onSave}
                    type="submit"
                    className="mt-4 w-full rounded-full bg-primary py-6"
                >
                    Save
                </Button>
            </form>

        </FormDialog>
    );
}