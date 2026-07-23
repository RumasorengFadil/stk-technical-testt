import { Folder, LayoutDashboard, LucideIcon } from "lucide-react";
import React from "react";

interface BreadcrumbItem {
    label?: string;
    icon?: LucideIcon;
}

interface PageHeaderProps {
    title: string;
    icon?: LucideIcon;
    breadcrumbs: BreadcrumbItem[];
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    icon: Icon = LayoutDashboard,
    breadcrumbs,
}) => {
    return (
        <div className="mb-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm mb-12">
                <Folder className="fill-gray-300 stroke-gray-300" />

                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <span className="text-gray-400">/</span>
                        )}
                        <span
                            className={`font-medium ${index === breadcrumbs.length - 1
                                ? "text-[#0f172a]"
                                : "text-gray-500"
                                }`}
                        >
                            {crumb.label}
                        </span>
                    </React.Fragment>
                ))}
            </div>

            {/* Title */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0057b7] text-white flex items-center justify-center shadow-md">
                    <Icon size={24} strokeWidth={2.5} />
                </div>

                <h1 className="text-[32px] font-bold tracking-tight text-[#0f172a]">
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default PageHeader;