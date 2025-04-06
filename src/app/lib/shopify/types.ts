import type { MediaContentType } from "@/db/generated/client";

export type Edge<T> = {
	node: T;
};

export type Connection<T> = {
	edges: Array<Edge<T>>;
};

export type Localization = {
	availableCountries: {
		name: string;
		isoCode: string;
	}[];
};

export type Money = {
	amount: string;
};

export type SEO = {
	title: string;
	description: string;
};

export type Media = {
	id: string;
	alt: string;
	mediaContentType: MediaContentType;
	originalSource: Video;
	originUrl: ExternalVideo;
	image: MediaImage;
};

export type MediaImage = {
	url: string;
};

export type ExternalVideo = {
	originUrl: string;
};

export type Video = {
	url: string;
};

export type ProductVariant = {
	id: string;
	title: string;
	product: {
		id: string;
		handle: string;
		onlineStoreUrl: string;
	};
};

export type ShopifyProduct = {
	id: string;
	handle: string;
	title: string;
	description: string;
	variants: Connection<ProductVariant>;
	featuredMedia: Media;
	seo: SEO;
	tags: string[];
	onlineStoreUrl: string;
};

export type ShopifyShop = {
	id: string;
	name: string;
	description: string;
	shipsToCountries: string[];
};

export type ShopifyOrder = {
	id: string;
	name: string;
	totalPriceSet: {
		shopMoney: {
			amount: number;
		};
	};
	unpaid: boolean;
	/**
	 * ISO 8601 date.
	 * Ex: "2023-09-25T14:30:00Z"
	 */
	processedAt: Date;
};

export type ShopifyProductsOperation = {
	data: {
		products: Connection<ShopifyProduct>;
		shop: ShopifyShop;
		orders: Connection<ShopifyOrder>;
	};
	variables: {
		query?: string;
	};
};
