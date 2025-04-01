import { data } from "@/app/lib/data";
import { logger } from "@/app/lib/logging";
import { AddShopifyStoreForm } from "@/app/ui/dashboard/stores/add-shopify-shop-form";
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

export default async function Page(): Promise<React.JSX.Element> {
	const userShops = await data.getUserShops();
	logger.info("usershops", userShops);
	return (
		<section>
			<h1 className="text-bolder text-2xl">Boutiques</h1>
			<Separator className="my-4" />
			{userShops.length === 0 && (
				<p className="text-muted-foreground">
					Vous n'avez pas encore de boutique.
				</p>
			)}

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
		</section>
	);
}
