import { data } from "@/app/lib/data";
import { ProductAiEnhancement } from "@/app/ui/dashboard/product-ai-enhacement";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";
import { Separator } from "@/shadcn/ui/separator";
import { SiShopify } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TbExternalLink } from "react-icons/tb";

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ productId: string }>;
	searchParams: Promise<{ shop: string }>;
}): Promise<React.JSX.Element> {
	const [{ productId }, { shop }] = await Promise.all([
		await params,
		await searchParams,
	]);
	const shopData = await data.getShopProduct(shop, productId);
	const product = shopData?.Products[0];

	if (!productId || !shop || !product) {
		notFound();
	}

	const context = JSON.stringify(shopData);

	return (
		<section>
			<div className="flex">
				<h1 className="text-bolder text-2xl">{product.handle}</h1>
			</div>
			<Separator className="my-4" />

			<Link
				href={product.onlineStoreUrl}
				className="flex items-center my-4 underline underline-offset-4"
			>
				{product.onlineStoreUrl.split(".myshopify.com/")[1]}
				<SiShopify color="black" className="size-5 ml-1" />
				<TbExternalLink className="ml-1" />
			</Link>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				<div
					className={cn(
						"p-4 bg-secondary border rounded h-72 overflow-hidden",
						SPACING.SM,
					)}
				>
					<div>
						<h2 className="text-lg font-semibold">Image</h2>
						{product.ProductImage?.altText && (
							<p className="text-muted-foreground text-sm">
								<Link
									href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/img#alt"
									className="underline underline-offset-4"
								>
									Alt
								</Link>
								{product.ProductImage.altText}
							</p>
						)}

						{!product.ProductImage?.altText && (
							<span className="border rounded-md px-2 text-sm">
								Aucune description d'image
							</span>
						)}
					</div>

					<div className="overflow-scroll h-full">
						<Image
							className="aspect-square rounded objectfill size-fit"
							src={product.ProductImage?.url ?? "https://picsum.photos/200/300"}
							alt={product.ProductImage?.altText ?? "Image produit"}
							width={100}
							height={100}
						/>
					</div>
				</div>

				<div
					className={cn(
						"p-4 bg-secondary border rounded h-72 overflow-hidden",
						SPACING.SM,
					)}
				>
					<div>
						<h2 className="text-lg font-semibold">Description</h2>

						{product.description && (
							<p className="text-muted-foreground text-sm">
								{product.description.split(" ").length} mots.
							</p>
						)}

						{!product.description && (
							<span className="border rounded-md px-2 text-sm">
								Aucune description d'image
							</span>
						)}
					</div>

					<div className="overflow-scroll h-full">
						<p>{product.description}</p>
					</div>
				</div>

				<div
					className={cn(
						"p-4 bg-secondary border rounded h-72 overflow-hidden",
						SPACING.SM,
					)}
				>
					<div>
						<h2 className="text-lg font-semibold">Tags</h2>
						{product.tags.length > 0 && (
							<p className="text-muted-foreground text-sm">
								{product.tags.length} tags
							</p>
						)}

						{product.tags.length === 0 && (
							<span className="border rounded-md px-2 text-sm">Aucun tag</span>
						)}
					</div>

					<div className="overflow-scroll h-full flex flex-wrap gap-1 content-start">
						{product.tags.map((tag) => (
							<span
								key={tag}
								className="border bg-primary-foreground rounded-md px-2 text-sm"
							>
								{tag}
							</span>
						))}
					</div>
				</div>

				<div
					className={cn(
						"p-4 bg-secondary border rounded h-72 overflow-hidden",
						SPACING.SM,
					)}
				>
					<div>
						<h2 className="text-lg font-semibold">Informations SEO</h2>
						{product.ProductSEO?.title && (
							<p className="text-muted-foreground text-sm">
								Informations SEO du produit.
							</p>
						)}

						{!product.ProductSEO?.title && (
							<span className="border rounded-md px-2 text-sm">
								Aucune information SEO
							</span>
						)}
					</div>

					<div className={cn("overflow-scroll h-full", SPACING.SM)}>
						{product?.ProductSEO?.title && (
							<div>
								<h3 className="text-sm font-semibold">Titre</h3>
								<p>{product.ProductSEO?.title}</p>
							</div>
						)}

						{product?.ProductSEO?.description && (
							<div>
								<h3 className="text-sm font-semibold">Description</h3>
								<p>{product.ProductSEO?.description}</p>
							</div>
						)}
					</div>
				</div>

				<ProductAiEnhancement context={context} />
			</div>
		</section>
	);
}
