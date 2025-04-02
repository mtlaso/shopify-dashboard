import { shopUrlState } from "@/app/lib/stores/shop-state";
import { ShipsToCountriesChart } from "@/app/ui/dashboard/charts/ships-to-countries-chart";
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

			<section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Suspense fallback={<p>chargement...</p>}>
					<ShipsToCountriesChart selectedShopId={selectedShopId} />
				</Suspense>
			</section>
		</section>
	);
}
