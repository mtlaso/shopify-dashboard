import { logger } from "@/app/lib/logging";
import type { Store } from "@/db/generated/client";
import { auth, prisma } from "@/lib/auth";
import { headers } from "next/headers";
import "server-only";

/**
 * getUserStores retourne les boutiques de l'Utilisateur connecté.
 * @returns {Promise<Store[]>} Les boutiques de l'Utilisateur connecté.
 * @throws {Error} Erreur inattendue lors de la récupération des boutiques de l'utilisateur.
 */
async function getUserStores(): Promise<Store[]> {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) {
			throw new Error("Utilisateur non connecté.");
		}

		return (await prisma.store.findMany({
			where: {
				userId: session.user.id,
			},
		})) as Store[];
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
	getUserStores,
};
