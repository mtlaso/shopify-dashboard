import { data } from "@/app/lib/data";
import { logger } from "@/app/lib/logging";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/shadcn/ui/collapsible";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Separator } from "@/shadcn/ui/separator";
import { SiShopify } from "@icons-pack/react-simple-icons";
import { ChevronsUpDown } from "lucide-react";

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
					<form className={SPACING.SM}>
						{/* ecommercethings12.myshopify.com */}
						<Label htmlFor="store-url">URL boutique</Label>
						<Input
							id="store-url"
							type="url"
							name="store-url"
							placeholder="https://boutique.shopify.com"
							required
						/>
						<Button className="w-full">
							<SiShopify color="white" />
							Ajouter une boutique
						</Button>
					</form>
				</CollapsibleContent>
			</Collapsible>
		</section>
	);
}
