import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className=" w-full max-w-96 flex flex-col space-y-3">
            <Skeleton className="aspect-video rounded-xl" />
            <div className="flex space-x-4 h-24">
                <div>
                    <Skeleton className="h-9 w-9 rounded-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    )
}