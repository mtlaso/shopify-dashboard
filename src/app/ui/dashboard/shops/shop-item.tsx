import { DeleteShopForm } from "@/app/ui/dashboard/shops/delete-shop-form";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shadcn/ui/card";

type Props = {
	name: string;
	id: string;
	shopifyId: string;
	accessToken: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string | null;
};

export function ShopItem({ shop }: { shop: Props }): React.JSX.Element {
	return (
		<Card className="break-all">
			<CardHeader>
				<CardTitle>{shop.name}</CardTitle>
				<CardDescription>{shop.shopifyId}</CardDescription>
				<CardDescription>{shop.accessToken}</CardDescription>
			</CardHeader>

			<CardFooter>
				<DeleteShopForm id={shop.id} />
			</CardFooter>
		</Card>
	);
}
