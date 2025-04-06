import { shopUrlState } from "@/app/lib/stores/shop-state";
import { AmountProductsChart } from "@/app/ui/dashboard/charts/amount-products-chart";
import { OrdersChart } from "@/app/ui/dashboard/charts/orders-chart";
import { SEOInsightsChart } from "@/app/ui/dashboard/charts/seo-insights.chart";
import { ShipsToCountriesChart } from "@/app/ui/dashboard/charts/ships-to-countries-chart";
import { Products } from "@/app/ui/dashboard/products";
import { SPACING } from "@/app/ui/spacing";
import { Separator } from "@/shadcn/ui/separator";
import { Suspense } from "react";

export default async function Page(props: {
	searchParams?: Promise<{
		[shopUrlState.SHOP_KEY]?: string;
	}>;
}): Promise<React.JSX.Element> {
	const searchParams = await props.searchParams;
	const selectedShopId = searchParams?.[shopUrlState.SHOP_KEY];

	if (!selectedShopId) {
		return (
			<section>
				<h1 className="text-bolder text-2xl">Accueil</h1>
				<Separator className="my-4" />
				<p>Vous n'avez pas sélectionné de boutique</p>
			</section>
		);
	}

	return (
		<section>
			<h1 className="text-bolder text-2xl">Accueil</h1>
			<Separator className="my-4" />

			<div className={SPACING.MD}>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					<Suspense fallback={<p>chargement...</p>}>
						<SEOInsightsChart selectedShopId={selectedShopId} />
					</Suspense>
					<Suspense fallback={<p>chargement...</p>}>
						<ShipsToCountriesChart selectedShopId={selectedShopId} />
					</Suspense>
					<Suspense fallback={<p>chargement...</p>}>
						<AmountProductsChart selectedShopId={selectedShopId} />
					</Suspense>
					<Suspense fallback={<p>chargement...</p>}>
						<OrdersChart selectedShopId={selectedShopId} />
					</Suspense>
				</div>

				<div>
					<Suspense>
						<Products selectedShopId={selectedShopId} />
					</Suspense>
				</div>
			</div>
		</section>
	);
}
