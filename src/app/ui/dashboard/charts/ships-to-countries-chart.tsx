import { data } from "@/app/lib/data";
import { SPACING } from "@/app/ui/spacing";
import countries from "@/lib/countries.json";
import { cn } from "@/lib/utils";

export async function ShipsToCountriesChart({
	selectedShopId,
}: {
	selectedShopId: string;
}): Promise<React.JSX.Element> {
	const list = await data.getShopCountriesShippingTo(selectedShopId);

	const elements = [];
	for (const country of countries) {
		if (!list) {
			elements.push(
				<div key={0} className="flex items-center">
					<p>Aucune donnée</p>
				</div>,
			);
			break;
		}

		if (list.includes(country.code)) {
			elements.push(
				<div key={country.code} className="flex items-center">
					<span>
						{country.flag} {country.code}
					</span>
				</div>,
			);
		}
	}

	return (
		<div
			className={cn(
				"flex flex-col p-4 h-72 bg-secondary border rounded",
				SPACING.SM,
			)}
		>
			<div>
				<h1 className="text-bolder font-semibold">
					Pays admissibles à livraison
				</h1>
				<p className="text-muted-foreground text-sm">
					Les pays dans lesquels vous livrez des commandes.
				</p>
			</div>

			<div className="overflow-scroll">{elements}</div>
		</div>
	);
}
