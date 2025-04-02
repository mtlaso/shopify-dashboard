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

export type ProductOption = {
	id: string;
	name: string;
	values: string[];
};

export type Money = {
	amount: string;
	currencyCode: string;
};

export type SEO = {
	title: string;
	description: string;
};

export type Image = {
	url: string;
	altText: string;
	width: number;
	height: number;
};

export type ProductVariant = {
	id: string;
	title: string;
	availableForSale: boolean;
	selectedOptions: {
		name: string;
		value: string;
	}[];
	price: Money;
};

export type ShopifyProduct = {
	id: string;
	handle: string;
	availableForSale: boolean;
	title: string;
	description: string;
	descriptionHtml: string;
	options: ProductOption[];
	priceRange: {
		maxVariantPrice: Money;
		minVariantPrice: Money;
	};
	variants: Connection<ProductVariant>;
	featuredImage: Image;
	images: Connection<Image>;
	seo: SEO;
	tags: string[];
	onlineStoreUrl: string;
	updatedAt: string;
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
