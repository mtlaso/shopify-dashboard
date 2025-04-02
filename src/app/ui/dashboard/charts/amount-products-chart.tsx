import { data } from "@/app/lib/data";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";

export async function AmountProductsChart({
	selectedShopId,
}: {
	selectedShopId: string;
}): Promise<React.JSX.Element> {
	const num = await data.getUserShopProductsData(selectedShopId);

	return (
		<div
			className={cn(
				"flex flex-col justifycenter h-72 p-4 bg-secondary border rounded",
				SPACING.SM,
			)}
		>
			<div>
				<h1 className="text-bolder font-semibold">Nombre de produits</h1>
				<p className="text-muted-foreground text-sm">
					Le nombre de produits que vous avez dans votre boutique.
				</p>
			</div>

			<div className="flex flex-col justify-center items-center h-full">
				<span className="font-semibold text-lg">
					{num &&
						new Intl.NumberFormat("fr-CA", { useGrouping: "true" }).format(
							num.length,
						)}
				</span>
			</div>
		</div>
	);
}
