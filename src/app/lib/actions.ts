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
 * State permet de définir un type de retour pour les actions.
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
			errmsg = "Courriel ou mot de passe invalide.";
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
		logger.info("URL de la boutique :", validatedFields.data.shopUrlHost);

		const client = new ShopifyClient(
			validatedFields.data.shopUrlHost,
			validatedFields.data.accessToken,
		);

		// Vérifier si la clé API est valide en effectuant une requête sur l'API GraphQL Storefront API de Shopify.
		const data = await client.getShopProducts();
		logger.info("Ajout données...", data);

		await prisma.$transaction(async (tx) => {
			const shop = await tx.shop.create({
				data: {
					shopifyId: data.shop.id,
					name: data.shop.name,
					description: data.shop.description,
					shipsToCountries: data.shop.shipsToCountries,
					accessToken: validatedFields.data.accessToken,
					userId: session.user.id,
				},
			});

			const shopProducts = await tx.product.createManyAndReturn({
				data: data.products.map((product) => ({
					shopId: shop.id,
					shopifyId: product.id,
					handle: product.handle,
					availableForSale: product.availableForSale,
					description: product.description,
					title: product.title,
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

			await tx.productImage.createMany({
				data: data.products.map((product, i) => ({
					url: product.featuredImage?.url,
					altText: product.featuredImage?.altText,
					width: product.featuredImage?.width,
					height: product.featuredImage?.height,
					productId: shopProducts[i].id,
				})),
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
		// data: null
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
