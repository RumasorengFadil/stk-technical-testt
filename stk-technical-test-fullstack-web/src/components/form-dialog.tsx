import { LucideProps, Plus } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { DialogVariants } from "@/enums/dialog-variant.enum";

type IconType = ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;


interface FormDialogProps {
    isDialogOpen?: boolean;
    setIsDialogOpen?: (open: boolean) => void;

    trigger?: {
        show?: boolean;
        icon?: IconType;
        title?: string;
        variants?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null
    };

    tooltip?: {
        show?: boolean;
        title?: string;
    };

    header?: {
        title: string;
        desc?: string;
    };
    className?: string,
    children: React.ReactNode;
}

export default function FormDialog({
    isDialogOpen,
    setIsDialogOpen,
    trigger,
    tooltip,
    header,
    children,
}: FormDialogProps) {
    const finalTrigger = {
        show: true,
        icon: Plus,
        variants: "default",
        ...trigger,
    };

    const finalTooltip = {
        show: true,
        title: "Enter tooltip title",
        ...tooltip,
    };

    const Icon = finalTrigger.icon;

    const triggerButton = (
        <Button
            className={"cursor-pointer rounded-full"}
            variant={finalTrigger.variants as "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null}
            size={
                finalTrigger.variants === DialogVariants.BUTTON
                    ? "default"
                    : "icon"
            }
        >
            {Icon && <Icon className="h-4 w-4" />}

            {finalTrigger.title && finalTrigger.title}
        </Button>
    );

    const dialogTrigger = (
        <DialogTrigger render={triggerButton} />
    );

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            {finalTrigger.show &&
                (finalTooltip.show ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger render={dialogTrigger} />

                            <TooltipContent>
                                {finalTooltip.title}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    dialogTrigger
                ))}

            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {header?.title ?? "Enter your header title"}
                    </DialogTitle>

                    {header?.desc && (
                        <DialogDescription>{header.desc}</DialogDescription>
                    )}
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
}