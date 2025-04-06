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
import { SiShopify } from "@icons-pack/react-simple-icons";
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
			<TableCaption>Une liste des collections.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Image</TableHead>
					<TableHead>Titre</TableHead>
					<TableHead className="flex justify-start items-center gap-1">
						URL Shopify <SiShopify color="black" className="size-5" />
					</TableHead>
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
