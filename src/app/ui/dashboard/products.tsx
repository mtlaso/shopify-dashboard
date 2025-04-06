import { data } from "@/app/lib/data";
import { shopUrlState } from "@/app/lib/stores/shop-state";
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

export async function Products({
	selectedShopId,
}: {
	selectedShopId: string;
}): Promise<React.JSX.Element> {
	const products = await data.getShopProductsData(selectedShopId);

	return (
		<>
			<h2 className="text-bolder text-xl">Produits</h2>
			<Table>
				<TableCaption>Une liste des produits en vente.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Image</TableHead>
						<TableHead>Produit</TableHead>
						<TableHead className="flex justify-start items-center gap-1">
							URL Shopify
							<SiShopify color="black" className="size-5" />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products?.products.map((product) => (
						<TableRow key={product.id}>
							<TableCell className="font-medium">
								{product.featuredMedia?.mediaContentType === "VIDEO" && (
									<video
										className="aspect-square rounded"
										src={product.featuredMedia?.featuredMediaVideo?.url}
										width={30}
										height={30}
										muted
										controls={false}
									/>
								)}

								{product.featuredMedia?.mediaContentType === "IMAGE" && (
									<Image
										className="aspect-square rounded"
										src={
											product.featuredMedia?.featuredMediaImage?.url ??
											"https://picsum.photos/200/300"
										}
										alt="Image produit"
										width={30}
										height={30}
									/>
								)}

								{product.featuredMedia?.mediaContentType ===
									"EXTERNAL_VIDEO" && (
									<video
										className="aspect-square rounded"
										src={product.featuredMedia?.featuredMediaExternalVideo?.url}
										width={30}
										height={30}
										muted
										controls={false}
									/>
								)}
							</TableCell>
							<TableCell>
								<Link
									href={{
										pathname: `/dashboard/product/${product.id}`,
										query: {
											[shopUrlState.SHOP_KEY]: selectedShopId,
										},
									}}
									prefetch={true}
									className="underline underline-offset-4"
								>
									{product.handle}
								</Link>
							</TableCell>
							<TableCell>
								<Link
									href={product.onlineStoreUrl}
									prefetch={false}
									target="_blank"
									className="underline underline-offset-4"
								>
									{product.onlineStoreUrl.split(".myshopify.com/")[1]}
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
