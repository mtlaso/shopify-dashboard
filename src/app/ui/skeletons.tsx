import { Skeleton } from "@/shadcn/ui/skeleton";

export function CardSkeleton(): React.JSX.Element {
	return (
		<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in">
			<Skeleton className="h-[125px] w-[310px] rounded-xl" />
			<Skeleton className="h-[125px] w-[310px] rounded-xl" />
			<Skeleton className="h-[125px] w-[310px] rounded-xl" />
			<Skeleton className="h-[125px] w-[310px] rounded-xl" />
		</section>
	);
}
