const image = /* GraphQL */ `
  fragment image on Image {
    url
    altText
    width
    height
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
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${image}
  ${seo}
`;

/**
 * shopifyFragments permet de regrouper les fragments utilisés dans les requêtes GraphQL de shopify.
 */
export const shopifyFragments = {
	image,
	seo,
	product,
};
