import { logger } from "@/app/lib/logging";
import { shopifyQueries } from "@/app/lib/shopify/queries";
import type {
	Connection,
	ShopifyProduct,
	ShopifyProductsOperation,
} from "@/app/lib/shopify/types";

type ShopifyFetchProps<T> = {
	/**
	 * En-têtes de la requête.
	 */
	headers?: HeadersInit;

	/**
	 * Requête GraphQL.
	 */
	query: string;

	/**
	 * Variables de la requête GraphQL.
	 */
	variables?: ExtractVariables<T>;
};

/**
 * ShopifyClient permet d'effectuer des opérations sur l'API GraphQL Admin API de Shopify.
 */
export class ShopifyClient {
	/**
	 * url de la boutique Shopify (ex : https://maboutique.myshopify.com).
	 */
	private endpoint: URL;
	/**
	 * Token d'accès à l'API GraphQL Admin API de Shopify.
	 */
	private accessToken: string;

	/**
	 * Constructeur de la classe ShopifyClient.
	 * @param shopUrlHost URL host de la boutique Shopify SANS 'https://' (ex : maboutique.myshopify.com).
	 * @param accessToken Token d'accès à l'API GraphQL Admin API de Shopify.
	 */
	constructor(shopUrlHost: string, accessToken: string) {
		this.endpoint = new URL(
			`https://${shopUrlHost}/admin/api/2025-01/graphql.json`,
		);
		this.accessToken = accessToken;
	}

	/**
	 * shopifyFetch permet d'effectuer des requêtes sur l'API de Shopify.
	 * @returns Promise<{ status: number; body: T } | never>
	 * @throws ShopifyInvalidApiKeyError si la clé API est invalide.
	 * @throws ShopifyUnknownError si une erreur inconnue est survenue.
	 */
	private async shopifyFetch<T>({
		headers,
		query,
		variables,
	}: ShopifyFetchProps<T>): Promise<{ status: number; body: T } | never> {
		try {
			logger.info("Requête Shopify :", query);
			const result = await fetch(this.endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Shopify-Access-Token": this.accessToken,
					...headers,
				},
				body: JSON.stringify({
					...(query && { query }),
					...(variables && { variables }),
				}),
			});

			const body = await result.json();

			if (body.errors) {
				throw body.errors;
			}

			return {
				status: result.status,
				body,
			};
		} catch (err) {
			logger.error("Shopify fetch error", err);

			if (String(err).includes("Invalid ")) {
				throw new ShopifyInvalidApiKeyError(String(err), query);
			}

			throw new ShopifyUnknownError(`unkown error: ${err}`, query);
		}
	}

	/**
	 * getProducts permet de récupérer les produits de la boutique Shopify.
	 */
	// biome-ignore lint/nursery/useExplicitType: type complexe.
	public async getShopProducts() {
		const res = await this.shopifyFetch<ShopifyProductsOperation>({
			query: shopifyQueries.getShopProducts,
		});

		return {
			products: reshapeProducts(removeEdgesAndNodes(res.body.data.products)),
			shop: res.body.data.shop,
			orders: removeEdgesAndNodes(res.body.data.orders),
		};
	}
}

type ExtractVariables<T> = T extends { variables: object }
	? T["variables"]
	: never;

// biome-ignore lint/nursery/useExplicitType: type complexe.
const reshapeProducts = (products: ShopifyProduct[]) => {
	const reshapedProducts = [];

	for (const product of products) {
		if (product) {
			const reshapedProduct = reshapeProduct(product);

			if (reshapedProduct) {
				reshapedProducts.push(reshapedProduct);
			}
		}
	}

	return reshapedProducts;
};

// biome-ignore lint/nursery/useExplicitType: type complexe.
const reshapeProduct = (product: ShopifyProduct) => {
	const { variants, ...rest } = product;

	return {
		...rest,
		variants: removeEdgesAndNodes(variants),
	};
};

const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
	return array.edges.map((edge) => edge?.node);
};

export interface ShopifyErrorLike {
	status: number;
	message: Error;
	cause?: Error;
}

export class ShopifyInvalidApiKeyError extends Error {
	public query: string;
	constructor(message: string, query: string) {
		super(message);
		this.name = "ShopifyInvalidApiKeyError";
		this.query = query;
	}
}

export class ShopifyUnknownError extends Error {
	public query: string;
	constructor(message: string, query: string) {
		super(message);
		this.name = "ShopifyUnknownError";
		this.query = query;
	}
}
