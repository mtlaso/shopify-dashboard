import { logger } from "@/app/lib/logging";
import type { Shop } from "@/db/generated/client";
import { auth, prisma } from "@/lib/auth";
import { headers } from "next/headers";
import "server-only";

/**
 * getShops retourne les boutiques de l'Utilisateur connecté.
 * @returns {Promise<Shop[]>} Les boutiques de l'Utilisateur connecté.
 * @throws {Error} Erreur inattendue lors de la récupération des boutiques de l'utilisateur.
 */
async function getShops(): Promise<Shop[]> {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) {
			throw new Error("Utilisateur non connecté.");
		}

		return (await prisma.shop.findMany({
			where: { userId: session.user.id },
		})) as Shop[];
	} catch (err) {
		logger.error(err);
		throw new Error(
			"Erreur inattendue lors de la récupération des boutiques de l'utilisateur.",
		);
	}
}

/**
 * getShopCountriesShippingTo retourne les pays de livraison de la boutique de l'Utilisateur connecté.
 * @param {string} shopId - L'identifiant de la boutique.
 * @returns {Promise<string[]>|null} Les pays de livraison de la boutique de l'Utilisateur connecté.
 * @throws {Error} Erreur lors de la récupération des destinations de livraison.
 */
async function getShopCountriesShippingTo(
	shopId: string,
): Promise<string[] | null> {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) {
			throw new Error("Utilisateur non connecté.");
		}

		const res = await prisma.shop.findFirst({
			where: { userId: session.user.id, id: shopId },
			select: {
				shipsToCountries: true,
			},
		});

		return res?.shipsToCountries || null;
	} catch (err) {
		logger.error(err);
		throw new Error(
			"Erreur lors de la récupération des destinations de livraison",
		);
	}
}

/**
 * getShopData retourne les données de la boutique de l'utilisateur connecté.
 * @param {string} shopId - L'identifiant de la boutique.
 * @throws {Error} Erreur inattendue lors de la récupération des boutiques de l'utilisateur.
 */
// biome-ignore lint/nursery/useExplicitType: Type trop complexe pour être explicitement déclaré.
async function getShopData(shopId: string) {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) {
			throw new Error("Utilisateur non connecté.");
		}

		return await prisma.shop.findFirst({
			where: { userId: session.user.id, id: shopId },
		});
	} catch (err) {
		logger.error(err);
		throw new Error(
			"Erreur inattendue lors de la récupération d'une boutique de l'utilisateur.",
		);
	}
}

/**
 * getShopProductData retourne les données des produits de la boutique de l'utilisateur connecté.
 * @param {string} shopId - L'identifiant de la boutique.
 * @throws {Error} Erreur inattendue lors de la récupération des boutiques de l'utilisateur.
 */
// biome-ignore lint/nursery/useExplicitType: Type trop complexe pour être explicitement déclaré.
async function getShopProductsData(shopId: string) {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) {
			throw new Error("Utilisateur non connecté.");
		}

		return await prisma.shop.findFirst({
			where: { id: shopId, userId: session.user.id },
			include: {
				products: {
					include: {
						ProductSEO: true,
						featuredMedia: true,
					},
				},
			},
		});
	} catch (err) {
		logger.error(err);
		throw new Error(
			"Erreur inattendue lors de la récupération des boutiques de l'utilisateur.",
		);
	}
}

/**
 * getShopProduct retourne les données d'un produit de la boutique de l'utilisateur connecté.
 * @param {string} shopId - L'identifiant de la boutique.
 * @param {string} productId - L'identifiant du produit.
 * @throws {Error} Erreur inattendue lors de la récupération du produit.
 */
// biome-ignore lint/nursery/useExplicitType: Type trop complexe pour être explicitement déclaré.
async function getShopProduct(shopId: string, productId: string) {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) {
			throw new Error("Utilisateur non connecté.");
		}

		return await prisma.shop.findFirst({
			where: { id: shopId, userId: session.user.id },
			include: {
				Products: {
					where: { id: productId },
					take: 1,
					include: {
						ProductSEO: true,
						ProductImage: true,
					},
				},
			},
		});
	} catch (err) {
		logger.error(err);
		throw new Error(
			"Erreur inattendue lors de la récupération de produit de l'utilisateur.",
		);
	}
}

/**
 * data permet d'effectuer des operations de récupération de données.
 */
export const data = {
	getShops,
	getShopCountriesShippingTo,
	getShopData,
	getShopProductsData,
	getShopProduct,
};
