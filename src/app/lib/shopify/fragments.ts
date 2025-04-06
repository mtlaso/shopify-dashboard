const media = /* GraphQL */ `
  fragment media on Media {
     id
     alt
     mediaContentType
      ... on Video {
        originalSource {
          url
        }
      }
      ... on MediaImage {
        image {
          url
        }
      }
      ... on ExternalVideo {
        originUrl
      }
  }
`;

const seo = /* GraphQL */ `
  fragment seo on SEO {
    description
    title
  }
`;

const product = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    title
    description
    onlineStoreUrl
    tags
    variants(first: 10) {
      edges {
        node {
          id
          title
          product {
            id
            handle
            onlineStoreUrl
          }
        }
      }
    }
    featuredMedia {
      ...media
    }
    seo {
      ...seo
    }
  }
  ${media}
  ${seo}
`;

const order = /* GraphQL */ `
  fragment order on Order {
    id
    totalPriceSet {
      shopMoney {
        amount
      }
    }
    unpaid
    processedAt
  }
`;

/**
 * shopifyFragments permet de regrouper les fragments utilisés dans les requêtes GraphQL de shopify.
 */
export const shopifyFragments = {
	media,
	seo,
	product,
	order,
};
