import { data } from "@/app/lib/data";
import { logger } from "@/app/lib/logging";
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
import { SiShopify } from "@icons-pack/react-simple-icons";

export default async function Page(): Promise<React.JSX.Element> {
	const userStores = await data.getUserStores();
	logger.info(userStores);
	return (
		<section>
			<h1 className="text-bolder text-2xl">Boutiques</h1>
			<Separator className="my-4" />
			{userStores.length === 0 && (
				<p className="text-muted-foreground">
					Vous n'avez pas encore de boutique.
				</p>
			)}

			<Button className="mt-4">
				<SiShopify className="text-white" />
				Ajouter une boutique
			</Button>
		</section>
	);
}
