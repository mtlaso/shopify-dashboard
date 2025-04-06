import { shopifyFragments } from "@/app/lib/shopify/fragments";

/**
 * Requête pour récupérer les premiers produits d'une boutique.
 */
const getShopProducts = /* GraphQL */ `
  query getProducts {
    products(first: 20) {
      edges {
        node {
        ...product
        }
      }
    }

    shop {
      id
      name
      shipsToCountries
      description
      myshopifyDomain
    }

    orders(first: 20) {
      edges {
        node {
        ...order
          }
        }
      }

    collections(first: 20) {
        edges {
          node {
            ...collection
          }
        }
      }


  }

  ${shopifyFragments.product}
  ${shopifyFragments.order}
  ${shopifyFragments.collection}
`;

/**
 * shopifyQueries contient les requêtes graphql pour shopify.
 */
export const shopifyQueries = {
	getShopProducts,
};
