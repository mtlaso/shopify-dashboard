import { data } from "@/app/lib/data";
import { AddShopifyStoreForm } from "@/app/ui/dashboard/shops/add-shopify-shop-form";
import { ShopItem } from "@/app/ui/dashboard/shops/shop-item";
import { CardSkeleton } from "@/app/ui/skeletons";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/shadcn/ui/collapsible";
import { Separator } from "@/shadcn/ui/separator";
import { ChevronsUpDown } from "lucide-react";
import { Suspense } from "react";

export default function Page(): React.JSX.Element {
	return (
		<section className={SPACING.SM}>
			<div>
				<h1 className="text-bolder text-2xl">Boutiques</h1>
				<Separator className="my-4" />

				<Collapsible className={cn("w-[300px]", SPACING.SM)}>
					<div className="flex items-center space-x-2">
						<p className="text-muted-foreground">Ajouter une boutique</p>
						<CollapsibleTrigger asChild>
							<Button variant="outline" size="sm">
								<ChevronsUpDown className="h-4 w-4" />
								<span className="sr-only">Toggle</span>
							</Button>
						</CollapsibleTrigger>
					</div>
					<CollapsibleContent className={SPACING.MD}>
						<AddShopifyStoreForm />
					</CollapsibleContent>
				</Collapsible>
			</div>
			<Suspense fallback={<CardSkeleton />}>
				<ShopsWrapper />
			</Suspense>
		</section>
	);
}

async function ShopsWrapper(): Promise<React.JSX.Element> {
	const userShops = await data.getUserShops();

	return (
		<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{userShops.map((shop) => (
				<ShopItem key={shop.id} shop={shop} />
			))}
		</section>
	);
}
