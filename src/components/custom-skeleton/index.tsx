import { Skeleton } from "../ui/skeleton"

interface CustomSkeletonProps {
    className: string;
    loading: boolean;
    children?: React.ReactNode;
}

export const CustomSkeleton = ({ className, loading, children }: CustomSkeletonProps) => {
    if (!loading) return children;
    return (
        <Skeleton className={className} />
    )
}