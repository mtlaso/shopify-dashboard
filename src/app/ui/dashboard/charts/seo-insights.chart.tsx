import { data } from "@/app/lib/data";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";

export async function SEOInsightsChart({
	selectedShopId,
}: {
	selectedShopId: string;
}): Promise<React.JSX.Element> {
	const userShopData = await data.getUserShopData(selectedShopId);

	return (
		<div
			className={cn(
				"flex flex-col p-4 h-72 bg-secondary border rounded",
				SPACING.SM,
			)}
		>
			<div>
				<h1 className="text-bolder font-semibold">Informations SEO</h1>
				<p className="text-muted-foreground text-sm">
					Informations SEO pour votre site.
				</p>
			</div>

			{userShopData && (
				<div>
					<h2>Nom : {userShopData?.name}</h2>
					<div className="flex">
						<h2>
							Description :
							{userShopData?.description && userShopData.description}
							{!userShopData?.description && (
								<span className="border rounded-md px-2 mx-2">
									Aucune description
								</span>
							)}
						</h2>
					</div>
				</div>
			)}

			{!userShopData && <p>Aucune donnée</p>}
		</div>
	);
}
