import { type UrlKeys, createLoader, parseAsString } from "nuqs/server";

const SHOP_KEY = "shop";

/**
 * searchParams contient les search params de gestion d'etat (state management).
 */
const searchParams = {
	selectedShopId: parseAsString.withDefault(""),
};

/**
 * urlKeys contient les clés des search params.
 */
const urlKeys: UrlKeys<typeof searchParams> = {
	selectedShopId: "shop",
};

/**
 * loader permet de charger les search params.
 */
const loader = createLoader(searchParams);

/**
 * shopUrlState permet de gérer l'état (state management).
 */
export const shopUrlState = {
	searchParams,
	urlKeys,
	loader,
	SHOP_KEY,
} as const;
