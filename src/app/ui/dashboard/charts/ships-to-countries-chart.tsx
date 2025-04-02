import { data } from "@/app/lib/data";
import { SPACING } from "@/app/ui/spacing";
import countries from "@/lib/countries.json";
import { cn } from "@/lib/utils";

export async function ShipsToCountriesChart({
	selectedShopId,
}: {
	selectedShopId: string;
}): Promise<React.JSX.Element> {
	const list = await data.getUserShopCountriesShippingTo(selectedShopId);

	const elements = [];
	for (const country of countries) {
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
					Pays admissibles à livraisons
				</h1>
				<p className="text-muted-foreground text-sm">
					Les pays dans lesquels vous livrez vos commandes.
				</p>
			</div>

			<div className="overflow-scroll">{elements}</div>
		</div>
	);
}
