import { data } from "@/app/lib/data";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";

export async function AmountProductsChart({
	selectedShopId,
}: {
	selectedShopId: string;
}): Promise<React.JSX.Element> {
	const l = await data.getUserShopData(selectedShopId);

	return (
		<div
			className={cn(
				"flex flex-col justifycenter h-72 w-1/2 p-4 bg-secondary border rounded",
				SPACING.SM,
			)}
		>
			<div>
				<h1 className="text-bolder font-semibold">Nombre de produits</h1>
				<p className="text-muted-foreground text-sm">
					Le nombre de produits que vous avez dans votre boutique.
				</p>
			</div>

			<div className="flex flex-col justify-center items-center h-full wfull">
				{l.length}
			</div>
		</div>
	);
}
