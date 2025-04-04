import { shopifyFragments } from "@/app/lib/shopify/fragments";

/**
 * Requête pour récupérer les premiers produits d'une boutique.
 */
const getShopProducts = /* GraphQL */ `
  query getProducts {
    products(first: 10) {
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
    }
  }
  ${shopifyFragments.product}
`;

/**
 * shopifyQueries contient les requêtes graphql pour shopify.
 */
export const shopifyQueries = {
	getShopProducts,
};
