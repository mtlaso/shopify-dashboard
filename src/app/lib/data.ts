import { logger } from "@/app/lib/logging";
import type { Shop } from "@/db/generated/client";
import { auth, prisma } from "@/lib/auth";
import { headers } from "next/headers";
import "server-only";

/**
 * getUserShops retourne les boutiques de l'Utilisateur connecté.
 * @returns {Promise<Shop[]>} Les boutiques de l'Utilisateur connecté.
 * @throws {Error} Erreur inattendue lors de la récupération des boutiques de l'utilisateur.
 */
async function getUserShops(): Promise<Shop[]> {
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
 * getUserShopCountriesShippingTo retourne les pays de livraison de la boutique de l'Utilisateur connecté.
 * @param {string} shopId - L'identifiant de la boutique.
 * @returns {Promise<string[]>|null} Les pays de livraison de la boutique de l'Utilisateur connecté.
 * @throws {Error} Erreur lors de la récupération des destinations de livraison.
 */
async function getUserShopCountriesShippingTo(
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
 * getUserShopData retourne les données de la boutique de l'utilisateur connecté.
 * @param {string} shopId - L'identifiant de la boutique.
 * @throws {Error} Erreur inattendue lors de la récupération des boutiques de l'utilisateur.
 */
// biome-ignore lint/nursery/useExplicitType: Type trop complexe pour être explicitement déclaré.
async function getUserShopData(shopId: string) {
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
			"Erreur inattendue lors de la récupération des boutiques de l'utilisateur.",
		);
	}
}

/**
 * getUserShopProductData retourne les données des produits de la boutique de l'utilisateur connecté.
 * @param {string} shopId - L'identifiant de la boutique.
 * @throws {Error} Erreur inattendue lors de la récupération des boutiques de l'utilisateur.
 */
// biome-ignore lint/nursery/useExplicitType: Type trop complexe pour être explicitement déclaré.
async function getUserShopProductsData(shopId: string) {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) {
			throw new Error("Utilisateur non connecté.");
		}

		return await prisma.shop.findFirst({
			where: { id: shopId, userId: session.user.id },
			include: {
				Products: {
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
			"Erreur inattendue lors de la récupération des boutiques de l'utilisateur.",
		);
	}
}

/**
 * data permet d'effectuer des operations de récupération de données.
 */
export const data = {
	getUserShops,
	getUserShopCountriesShippingTo,
	getUserShopData,
	getUserShopProductsData,
};
