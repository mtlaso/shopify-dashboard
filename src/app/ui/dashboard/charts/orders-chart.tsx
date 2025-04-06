import { data } from "@/app/lib/data";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";

export async function OrdersChart({
	selectedShopId,
}: {
	selectedShopId: string;
}): Promise<React.JSX.Element> {
	const res = await data.getShopOrders(selectedShopId);
	const orders = res?.orders;

	return (
		<div
			className={cn(
				"flex flex-col justifycenter h-72 p-4 bg-secondary border rounded",
				SPACING.SM,
			)}
		>
			<div>
				<h1 className="text-bolder font-semibold">Commandes</h1>
				<p className="text-muted-foreground text-sm">
					Le nombres de commandes sur cette période.
				</p>
			</div>

			<div className="flex flex-col justify-center items-center h-full">
				<span className="font-semibold text-lg">
					{orders &&
						new Intl.NumberFormat("fr-CA", { useGrouping: "true" }).format(
							orders.length,
						)}

					{!orders && "Aucune donnée"}
				</span>
			</div>
		</div>
	);
}
