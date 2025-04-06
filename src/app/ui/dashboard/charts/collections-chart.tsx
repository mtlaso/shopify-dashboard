import { data } from "@/app/lib/data";
import { shopUrlState } from "@/app/lib/stores/shop-state";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";
import Link from "next/link";

export async function CollectionsChart({
	selectedShopId,
}: {
	selectedShopId: string;
}): Promise<React.JSX.Element> {
	const res = await data.getShopCollections(selectedShopId);
	const collections = res?.collections;

	return (
		<div
			className={cn(
				"flex flex-col justifycenter h-42 p-4 bg-secondary border rounded",
				SPACING.SM,
			)}
		>
			<div>
				<h1 className="text-bolder font-semibold">Collections</h1>
				<p className="text-muted-foreground text-sm">
					Le nombre de collections
				</p>
			</div>

			<div className="flex flex-col justify-center items-center h-full">
				<span className="font-semibold text-lg">
					{collections && (
						<Link
							href={{
								pathname: "/dashboard/collections",
								query: {
									[shopUrlState.SHOP_KEY]: selectedShopId,
								},
							}}
							className="underline underline-offset-4"
						>
							{new Intl.NumberFormat("fr-CA", { useGrouping: "true" }).format(
								collections.length,
							)}
						</Link>
					)}

					{!collections && "Aucune donnée"}
				</span>
			</div>
		</div>
	);
}
