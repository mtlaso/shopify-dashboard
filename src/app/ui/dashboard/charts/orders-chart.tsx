import { data } from "@/app/lib/data";
import { shopUrlState } from "@/app/lib/stores/shop-state";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
				"flex flex-col justifycenter h-42 p-4 bg-secondary border rounded",
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
					{orders && (
						<Link
							href={{
								pathname: "/dashboard/orders",
								query: {
									[shopUrlState.SHOP_KEY]: selectedShopId,
								},
							}}
							className="underline underline-offset-4"
						>
							{new Intl.NumberFormat("fr-CA", { useGrouping: "true" }).format(
								orders.length,
							)}
						</Link>
					)}

					{!orders && "Aucune donnée"}
				</span>
			</div>
		</div>
	);
}
