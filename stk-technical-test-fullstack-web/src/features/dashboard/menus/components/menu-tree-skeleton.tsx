import { Skeleton } from "@/components/ui/skeleton";

export function MenuTreeSkeleton() {
    return (
        <div className="flex gap-8">
            {/* Left Content */}
            <div className="flex-1 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <Skeleton className="h-7 w-24" />
                </div>

                {/* Select */}
                <Skeleton className="h-14 w-full max-w-3xl rounded-2xl" />

                {/* Buttons */}
                <div className="flex gap-4">
                    <Skeleton className="h-12 w-40 rounded-full" />
                    <Skeleton className="h-12 w-40 rounded-full" />
                </div>

                {/* Tree Card */}
                <div className="rounded-2xl border p-8 space-y-8">
                    {/* Parent */}
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-sm" />
                        <Skeleton className="h-7 w-64" />
                    </div>

                    {/* Child */}
                    <div className="ml-8 flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-sm" />
                        <Skeleton className="h-6 w-56" />
                    </div>

                    {/* Child */}
                    <div className="ml-8 flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-sm" />
                        <Skeleton className="h-6 w-48" />
                    </div>

                    {/* Child */}
                    <div className="ml-8 flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-sm" />
                        <Skeleton className="h-6 w-52" />
                    </div>
                </div>
            </div>
        </div>
    );
}