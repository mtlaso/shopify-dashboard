import { data } from "@/app/lib/data";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shadcn/ui/table";

export async function Orders({
	selectedShopId,
}: {
	selectedShopId: string;
}): Promise<React.JSX.Element> {
	const res = await data.getShopOrders(selectedShopId);
	const orders = res?.orders;

	return (
		<Table>
			<TableCaption>Une liste des commandes.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100]px">Nom</TableHead>
					<TableHead>date (date locale)</TableHead>
					<TableHead>Est payé</TableHead>
					<TableHead>Prix</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders?.map((order) => (
					<TableRow key={order.id}>
						<TableCell className="font-medium">{order.name}</TableCell>
						<TableCell>
							{order.processedAt?.toLocaleDateString("fr-ca", {
								dateStyle: "long",
							})}
						</TableCell>
						<TableCell>{order.unpaid ? "Non payé" : "Payé"}</TableCell>
						<TableCell>
							{new Intl.NumberFormat("fr-CA", { useGrouping: "true" }).format(
								Number(order.orderPrice?.amount),
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
