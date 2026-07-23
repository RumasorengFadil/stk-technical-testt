import ButtonWithLoading from "@/components/button-with-loading";
import CustomFormField from "@/components/custom-form-field";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MenuFormSchema, menuSchema } from "../schema/menu-form-schema";
import { MenuTreeNode } from "../types/menu-tree.type";

interface MenuNode {
    id: string | number;
    depth: number;
    name: string;
}

interface MenuDetailFormProps {
    selectedNode?: MenuTreeNode;
    parentName: string;
    isPending: boolean,
    onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSave: (data: MenuFormSchema) => void;
}

const MenuDetailForm = ({
    selectedNode,
    parentName,
    isPending,
    onNameChange,
    onSave,
}: MenuDetailFormProps) => {

    const form = useForm<MenuFormSchema>({
        resolver: zodResolver(menuSchema),
        defaultValues: {
            id: "",
            name: "",
            isActive: false,
            parentId: "",
            path: "",
            depth: 0,
            order: 0,
            icon: null,
        }
    })

    useEffect(() => {
        if (selectedNode) {
            form.reset({
                id: selectedNode.id ?? "",
                name: selectedNode.name ?? "",
                order: selectedNode.order ?? 0,
                icon: selectedNode.icon ?? null,
                isActive: selectedNode.isActive ?? true,
                parentId: selectedNode.parentId ?? "",
                path: selectedNode.path ?? "",
                depth: selectedNode.depth ?? 0,
            })
        }
    }, [selectedNode, form])

    if (!selectedNode) {
        return (
            <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-100 text-sm text-gray-400">
                Choose menu from the left side to see the detail
            </div>
        );
    }

    return (
        <div className="flex max-w-lg flex-col gap-6">
            <form onSubmit={form.handleSubmit(data => onSave(data))}>
                <FieldGroup>
                    <CustomFormField
                        label="Menu ID"
                        form={form}
                        name="id"
                        type="text"
                        readOnly
                        className="p-6"
                    />

                    <div className="md:w-1/2">
                        <CustomFormField
                            label="Depth"
                            form={form}
                            name="depth"
                            type="number"
                            readOnly
                            className="p-6 bg-gray-200"
                        />
                    </div>

                    <Field className="md:w-1/2">
                        <FieldLabel>Parent Data</FieldLabel>
                        <Input
                            name="name"
                            type="text"
                            className="p-6"
                            value={parentName}
                            readOnly
                        />
                    </Field>

                    <div className="md:w-1/2">
                        <CustomFormField
                            label="Name"
                            form={form}
                            name="name"
                            type="text"
                            className="p-6"
                        />
                    </div>

                </FieldGroup>

                <div className="h-16 pt-4 rounded-full">
                    <ButtonWithLoading
                        disabled={isPending}
                        isLoading={isPending}
                        type="submit"
                        className="w-full h-full rounded-full bg-primary"
                    >
                        Update
                    </ButtonWithLoading>
                </div>
            </form>
        </div>
    );
};

export default MenuDetailForm;
