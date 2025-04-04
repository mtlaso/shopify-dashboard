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
	alt: string;
	mediaContentType: MediaContentType;
	Video: Video;
	ExternalVideo: ExternalVideo;
	MediaImage: MediaImage;
};

export type MediaImage = {
	image: {
		url: string;
	};
};

export type ExternalVideo = {
	originUrl: string;
};

export type Video = {
	sources: {
		url: string;
	}[];
};

export type MediaContentType =
	| "VIDEO"
	| "EXTERNAL_VIDEO"
	| "IMAGE"
	| "MODEL_3D";

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

export type ShopifyProductsOperation = {
	data: {
		products: Connection<ShopifyProduct>;
		shop: ShopifyShop;
	};
	variables: {
		query?: string;
	};
};
