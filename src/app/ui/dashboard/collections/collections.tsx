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
import Image from "next/image";
import Link from "next/link";

export async function Collections({
	selectedShopId,
}: {
	selectedShopId: string;
}): Promise<React.JSX.Element> {
	const res = await data.getShopCollections(selectedShopId);
	const collections = res?.collections;

	return (
		<Table>
			<TableCaption>Une liste des commandes.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100]px">Image</TableHead>
					<TableHead>Titre</TableHead>
					<TableHead>Lien</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{collections?.map((collection) => (
					<TableRow key={collection.id}>
						<TableCell>
							<Image
								className="aspect-square rounded"
								src={
									collection.collectionImage?.url ??
									"https://picsum.photos/200/300"
								}
								alt="Image produit"
								width={30}
								height={30}
							/>
						</TableCell>
						<TableCell>{collection.title}</TableCell>
						<TableCell>
							<Link
								href={`https://${res?.myshopifyDomain}/collections/${collection.handle}`}
								prefetch={false}
								target="_blank"
								className="underline underline-offset-4"
							>
								{`collections/${collection.handle}`}
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
