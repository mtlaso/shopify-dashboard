import { DeleteShopForm } from "@/app/ui/dashboard/shops/delete-shop-form";
import { SPACING } from "@/app/ui/spacing";
import type { Shop } from "@/db/generated/client";
import { cn } from "@/lib/utils";

export function ShopItem({ shop }: { shop: Shop }): React.JSX.Element {
	return (
		<div
			className={cn(
				"flex flex-col p-4 break-all bg-secondary border rounded",
				SPACING.SM,
			)}
		>
			<div>
				<h1 className="text-bolder font-semibold">{shop.name}</h1>
				<p className="text-muted-foreground text-sm">{shop.shopifyId}</p>
			</div>

			<div>
				<DeleteShopForm id={shop.id} />
			</div>
		</div>
	);
}
