import { toTitleCase } from "@/utils/to-title-case";
import { Eye, EyeOff } from "lucide-react";
import { ComponentPropsWithoutRef, HTMLInputTypeAttribute, useState } from "react";
import { Controller, ControllerFieldState, FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Props<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    form: UseFormReturn<TFieldValues>;
    type: HTMLInputTypeAttribute | undefined;
    name: TName;
    variant?: "input" | "textarea",
    label: string,
} & Omit<
    ComponentPropsWithoutRef<typeof Input>,
    | "form"
    | "name"
    | "value"
    | "defaultValue"
    | "onChange"
>;

export default function CustomFormField<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({ form, name, type, variant = "input", label, ...props }: Props<TFieldValues, TName>) {
    return (
        <Controller
            control={form.control}
            name={name}
            render={({ field, fieldState }) => {
                console.log("fieldstate : " + fieldState);
                return (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                            {toTitleCase(label)} <span className="text-red-500">*</span>
                        </FieldLabel>

                        <ResolveForm variant={variant} fieldState={fieldState} field={field} name={name} type={type} {...props} />
                        <FieldError errors={[fieldState.error]} />
                    </Field>
                )
            }

            }
        />
    );
}


function ResolveForm<TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>>({ type, field, name, variant, fieldState, ...props }: {
        type: HTMLInputTypeAttribute | undefined,
        field: any,
        name: TName;
        variant?: "input" | "textarea";
        fieldState: ControllerFieldState;
    }) {

    switch (variant) {
        case "textarea":
            return <ResolveTextarea field={field} name={name} type={type} {...props} />
                ;

        default:
            return <ResolveFormInput fieldState={fieldState} field={field} name={name} type={type} {...props} />;
    }
}

function ResolveFormInput<TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>>({ type, field, name, fieldState, ...props }: {
        type: HTMLInputTypeAttribute | undefined,
        field: any,
        name: TName;
        fieldState: ControllerFieldState;

    }) {
    if (type === "password") {
        return <InputPassword field={field} />
    } else {
        return <Input
            id={name}
            type={type}
            {...props}
            {...field}
            aria-invalid={fieldState.invalid}
        />
    }
}

function ResolveTextarea<TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>>({ type, field, name, ...props }: {
        type: HTMLInputTypeAttribute | undefined,
        field: any,
        name: TName;
    }) {
    return <Textarea
        id={name}
        type={type}
        {...props}
        {...field}
    />
}


function InputPassword({ field }: { field: any }) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <Input
                id="password"
                type={show ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                {...field}
            />

            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
            >
                {show ? <EyeOff className="text-gray-600" size={18} /> : <Eye className="text-gray-600" size={18} />}
            </button>
        </div>
    )
}