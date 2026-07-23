"use client";

import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    data?: any;
    type?: "line" | "inside";
    isInvalidDrop?: boolean;
    isDragging?: boolean;
    disabled?: boolean; // 1. Tambahkan prop disabled
}

export function DropZone({
    id,
    data,
    type = "line",
    isInvalidDrop = false,
    isDragging = false,
    disabled = false, // Default false
    children,
    className = "",
    ...rest
}: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id,
        data,
    });

    if (type === "inside") {
        let dropStateClasses = "border-transparent border";

        if (isOver) {
            if (isInvalidDrop) {
                dropStateClasses = "bg-red-50 border-red-400 border-dashed rounded-md";
            } else {
                dropStateClasses = "bg-green-50 border-green-400 border-dashed rounded-md shadow-sm";
            }
        } else if (isDragging) {
            dropStateClasses = "opacity-50 bg-white shadow-lg border-gray-200 rounded-md border";
        }

        return (
            <div
                ref={setNodeRef}
                className={clsx(dropStateClasses, className, "transition-all duration-200")}
                {...rest}
            >
                {children}
            </div>
        );
    }

    return (
        <div ref={setNodeRef} className="w-full h-3 -my-1.5 z-20 relative flex items-center justify-center">
            <div
                className={clsx(
                    "h-[2px] w-full transition-all duration-200 rounded-full",
                    isOver ? "bg-blue-500 shadow-sm" : "bg-transparent"
                )}
            />
        </div>
    );
}