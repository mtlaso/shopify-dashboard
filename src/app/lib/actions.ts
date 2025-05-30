"use server";
import { logger } from "@/app/lib/logging";
import { ShopifyClient, ShopifyInvalidApiKeyError } from "@/app/lib/shopify";
import {
	addShopifyShopFormSchema,
	deleteShopFormSchema,
	signinFormSchema,
	signupFormSchema,
} from "@/app/lib/types";
import { auth, prisma } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * State permet de définir le type de retour pour les actions.
 */
type State<T, E extends string = keyof T & string> = {
	errors: { [key in E]?: string[] } | null;
	data: T | null;
	errmsg: string | null;
	successmsg?: string | null;
};

export type SignupState = State<{
	name: string;
	email: string;
	password: string | null;
	passwordConfirm: string | null;
}>;

export async function signup(
	_prevState: SignupState,
	formData: FormData,
): Promise<SignupState> {
	const validatedFields = signupFormSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
		passwordConfirm: formData.get("password-confirm"),
	});

	if (!validatedFields.success) {
		return {
			errmsg: null,
			errors: validatedFields.error.flatten().fieldErrors,
			data: {
				name: formData.get("name") as string,
				email: formData.get("email") as string,
				password: formData.get("password") as string,
				passwordConfirm: formData.get("password-confirm") as string,
			},
			successmsg: null,
		};
	}

	try {
		const t = await auth.api.signUpEmail({
			body: {
				name: validatedFields.data.name,
				email: validatedFields.data.email,
				password: validatedFields.data.password,
			},
		});

		logger.info(`Nouveau compte créé : ${t.user.email}`);
	} catch (err) {
		let errmsg = "";
		logger.error(err);

		if (err instanceof APIError) {
			errmsg = "Un utilisateur avec ce courriel existe déjà.";
		} else {
			errmsg = "Une erreur est survenue lors de l'inscription.";
		}

		return {
			errmsg,
			errors: null,
			data: {
				name: formData.get("name") as string,
				email: formData.get("email") as string,
				password: null,
				passwordConfirm: null,
			},
			successmsg: null,
		};
	}

	redirect("/dashboard");
}

export type SigninState = State<{
	email: string;
	password: string | null;
}>;

export async function signin(
	_prevState: SigninState,
	formData: FormData,
): Promise<SigninState> {
	const validatedFields = signinFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			errmsg: null,
			errors: validatedFields.error.flatten().fieldErrors,
			data: {
				email: formData.get("email") as string,
				password: formData.get("password") as string,
			},
			successmsg: null,
		};
	}

	try {
		const t = await auth.api.signInEmail({
			body: {
				email: validatedFields.data.email,
				password: validatedFields.data.password,
			},
		});

		logger.info(`Utilisateur connecté : ${t.user.email}`);
	} catch (err) {
		let errmsg = "";
		logger.error(err);

		if (err instanceof APIError) {
			errmsg = "Courriel et/ou mot de passe invalide.";
		} else {
			errmsg = "Une erreur est survenue lors de la connexion.";
		}

		return {
			errmsg,
			errors: null,
			data: {
				email: formData.get("email") as string,
				password: null,
			},
			successmsg: null,
		};
	}

	redirect("/dashboard");
}

export async function signout(): Promise<void> {
	logger.info("déconnexion en cours...");

	try {
		const session = await auth.api.getSession({ headers: await headers() });
		logger.info("Utilisateur déconnecté :", session?.user.email);
	} catch (err) {
		logger.error(err);
	}

	await auth.api.signOut({
		headers: await headers(),
	});
	redirect("/");
}

export type AddShopifyShopState = State<{
	shopUrlHost: string;
	accessToken: string;
}>;

export async function addShopifyShop(
	_prevState: AddShopifyShopState,
	formData: FormData,
): Promise<AddShopifyShopState> {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) {
			throw new Error("Utilisateur non connecté.");
		}

		const validatedFields = addShopifyShopFormSchema.safeParse({
			shopUrlHost: formData.get("shop-url-host"),
			accessToken: formData.get("access-token"),
		});

		if (!validatedFields.success) {
			return {
				errmsg: null,
				errors: validatedFields.error.flatten().fieldErrors,
				data: {
					shopUrlHost: formData.get("shop-url-host") as string,
					accessToken: formData.get("access-token") as string,
				},
				successmsg: null,
			};
		}

		const shopAlreadyExists = await prisma.shop.findFirst({
			where: {
				accessToken: validatedFields.data.accessToken,
				userId: session.user.id,
			},
		});

		if (shopAlreadyExists) {
			return {
				errmsg: "Cette boutique Shopify a déjà été ajoutée.",
				errors: null,
				data: {
					shopUrlHost: formData.get("shop-url-host") as string,
					accessToken: formData.get("access-token") as string,
				},
				successmsg: null,
			};
		}

		logger.info("Ajout de la boutique Shopify en cours...");
		logger.info("URL de la boutique", validatedFields.data.shopUrlHost);

		const client = new ShopifyClient(
			validatedFields.data.shopUrlHost,
			validatedFields.data.accessToken,
		);

		// Vérifier si la clé API est valide en effectuant une requête sur l'API de Shopify.
		const data = await client.getShopProducts();
		logger.info("Ajout données...", data);

		await prisma.$transaction(async (tx) => {
			const shop = await tx.shop.create({
				data: {
					shopifyId: data.shop.id,
					myshopifyDomain: data.shop.myshopifyDomain,
					name: data.shop.name,
					description: data.shop.description,
					shipsToCountries: data.shop.shipsToCountries,
					accessToken: validatedFields.data.accessToken,
					userId: session.user.id,
				},
			});

			const shopProducts = await tx.product.createManyAndReturn({
				data: data.products.map((product) => ({
					shopifyId: product.id,
					shopId: shop.id,
					handle: product.handle,
					title: product.title,
					description: product.description,
					tags: product.tags,
					onlineStoreUrl: product.onlineStoreUrl,
				})),
			});

			await tx.productSEO.createMany({
				data: data.products.map((product, i) => ({
					title: product.seo?.title,
					description: product.seo?.description,
					productId: shopProducts[i].id,
				})),
			});

			const productVariants = await tx.productVariant.createManyAndReturn({
				data: data.products
					.flatMap((product) => product.variants)
					.map((variant) => ({
						shopifyId: variant.id,
						title: variant.title,
						productId: shopProducts.find(
							(p) => p.shopifyId === variant.product.id,
						)?.id,
					})),
			});

			await tx.productVariantProduct.createMany({
				data: data.products
					.flatMap((product) => product.variants)
					.map((variant, i) => ({
						shopifyId: variant.product.id,
						handle: variant.product.handle,
						onlineStoreUrl: variant.product.onlineStoreUrl,
						productVariantId: productVariants[i].id,
					})),
			});

			const featuredMedia = await tx.productFeaturedMedia.createManyAndReturn({
				data: data.products.map((product) => ({
					shopifyId: product.featuredMedia.id,
					alt: product.featuredMedia.alt,
					mediaContentType: product.featuredMedia.mediaContentType,
					productId: shopProducts.find((p) => p.shopifyId === product.id)!.id,
				})),
			});

			// Crée FeaturedImageXXX selon mediaContentType.
			for (const product of data.products) {
				const media = product.featuredMedia;
				const mediaContentType = media.mediaContentType;
				const mediaId = featuredMedia.find(
					(fm) => fm.shopifyId === media.id,
				)!.id;

				switch (mediaContentType) {
					case "IMAGE":
						await tx.featuredMediaImage.create({
							data: {
								url: media.image.url,
								productFeaturedMediaId: mediaId,
							},
						});
						break;
					case "VIDEO":
						await tx.featuredMediaVideo.create({
							data: {
								url: media.originalSource.url,
								productFeaturedMediaId: mediaId,
							},
						});
						break;
					case "EXTERNAL_VIDEO":
						await tx.featuredMediaExternalVideo.create({
							data: {
								url: media.originUrl.originUrl,
								productFeaturedMediaId: mediaId,
							},
						});
						break;
					default:
						break;
				}
			}

			const orders = await tx.order.createManyAndReturn({
				data: data.orders.map((order) => ({
					shopifyId: order.id,
					name: order.name,
					unpaid: order.unpaid,
					processedAt: order.processedAt,
					shopId: shop.id,
				})),
			});

			await tx.orderPrice.createMany({
				data: data.orders.map((order, i) => ({
					orderId: orders[i].id,
					amount: Number(order.totalPriceSet.shopMoney.amount),
					currencyCode: order.totalPriceSet.shopMoney.currencyCode,
				})),
			});

			const collections = await tx.collection.createManyAndReturn({
				data: data.collections.map((collection) => ({
					shopifyId: collection.id,
					title: collection.title,
					description: collection.description,
					handle: collection.handle,
					shopId: shop.id,
				})),
			});

			await tx.collectionImage.createMany({
				data: data.collections.map((collection, i) => {
					return {
						collectionId: collections[i].id,
						url: collection.image?.url || null,
					};
				}),
			});
		});
	} catch (err) {
		logger.error(err);

		if (err instanceof ShopifyInvalidApiKeyError) {
			return {
				errmsg: "Une erreur est survenue lors de l'ajout de la boutique.",
				errors: {
					accessToken: ["Clé API invalide."],
				},
				data: {
					shopUrlHost: formData.get("shop-url-host") as string,
					accessToken: formData.get("access-token") as string,
				},
				successmsg: null,
			};
		}

		return {
			errmsg: "Une erreur est survenue lors de l'ajout de la boutique.",
			errors: null,
			data: {
				shopUrlHost: formData.get("shop-url-host") as string,
				accessToken: formData.get("access-token") as string,
			},
			successmsg: null,
		};
	}

	revalidatePath("/dashboard/shops");

	return {
		errmsg: null,
		errors: null,
		data: {
			shopUrlHost: formData.get("shop-url-host") as string,
			accessToken: formData.get("access-token") as string,
		},
		successmsg: "Boutique Shopify ajoutée avec succès.",
	};
}

// action delete shop
export type DeleteShopState = State<{
	id: string;
}>;

export async function deleteShop(id: string): Promise<DeleteShopState> {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) {
			throw new Error("Utilisateur non connecté.");
		}

		const validatedFields = deleteShopFormSchema.safeParse({
			id: id,
		});

		if (!validatedFields.success) {
			return {
				errmsg:
					"Une erreur est survenue lors de la suppression de la boutique.",
				errors: validatedFields.error.flatten().fieldErrors,
				data: {
					id,
				},
			};
		}

		logger.info(
			`Suppression de la boutique Shopify ${validatedFields.data.id}, utilisateur ${session.user.id}`,
		);

		await prisma.shop.delete({
			where: {
				id: validatedFields.data.id,
				userId: session.user.id,
			},
		});
	} catch (err) {
		logger.error(err);

		return {
			errmsg: "Une erreur est survenue lors de la suppression de la boutique.",
			errors: null,
			data: {
				id,
			},
		};
	}

	revalidatePath("/dashboard/shops");

	return {
		errmsg: null,
		errors: null,
		data: null,
	};
}
