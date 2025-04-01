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

		logger.info("id", session);

		return (await prisma.shop.findMany({})) as Shop[];
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
};
