import { logger } from "@/app/lib/logging";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<unknown>> {
	logger.info(
		"Callback de Shopify /api/shopify/oauth/callback",
		req.nextUrl.href,
	);
	return NextResponse.json({ message: "Ok" });
}

// export async function GET(req: NextRequest): Promise<NextResponse<unknown>> {
//   logger.info("Callback de Shopify /api/shopify/oauth/callback", req.nextUrl.toString());

//   const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
//   const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;
//   const COOKIE_SECRET = process.env.COOKIE_SECRET;
//   if (!COOKIE_SECRET || !SHOPIFY_CLIENT_ID || !SHOPIFY_CLIENT_SECRET) {
//     logger.error("Variables d'environnement manquantes pour Shopify OAuth", {
//       SHOPIFY_CLIENT_ID:
//         SHOPIFY_CLIENT_ID === undefined ? "undefined" : "defined",
//       COOKIE_SECRET: COOKIE_SECRET === undefined ? "undefined" : "defined",
//       SHOPIFY_CLIENT_SECRET: SHOPIFY_CLIENT_SECRET === undefined ? "undefined" : "defined",
//     })

//     return NextResponse.json(
//       { error: "Une erreur est survenue" },
//       { status: 500 },
//     );
//   }

//   // const code = req.nextUrl.searchParams.get("code");
//   // if (!code) {
//   //   logger.error("Code manquant dans la requête")
//   //   return NextResponse.json({ error: "Code manquant" }, { status: 400 });
//   // }

//   const nonce = req.cookies.get("nonce")
//   if (!nonce) {
//     logger.error("Nonce manquant dans les cookies")

//     return NextResponse.json({ error: "Nonce manquant" }, { status: 400 });
//   }

//   const isSignedProper = cookieSignature.unsign(nonce.value, COOKIE_SECRET)
//   if (!isSignedProper) {
//     logger.error("Nonce invalide")
//     return NextResponse.json({ error: "Signature nonce invalide" }, { status: 400 });
//   }

//   // URL example : https://example.org/some/redirect/uri?code={authorization_code}&hmac=da9d83c171400a41f8db91a950508985&host={base64_encoded_hostname}&shop={shop_origin}&state={nonce}&timestamp=1409617544
//   // https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/authorization-code-grant#step-1-verify-the-installation-request
//   const shopifyHmac = req.nextUrl.searchParams.get("hmac");
//   if (!shopifyHmac) {
//     logger.error("HMAC manquant dans la requête")
//     return NextResponse.json({ error: "HMAC manquant" }, { status: 400 });
//   }

//   // Retirer le paramètre hmac de la requête pour le calcul du hash.
//   const urlWithoutHmac = new URL(req.nextUrl.href);
//   urlWithoutHmac.searchParams.delete("hmac");

//   // Trier les paramètres par ordre alphabétique.
//   // https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/authorization-code-grant#remove-the-hmac-parameter-from-the-query-string
//   urlWithoutHmac.searchParams.sort();

//   // Concaténer les paramètres de la requête en une seule chaîne de caractères et calculer le hash SHA-256.
//   const hash = crypto.createHmac('sha256', SHOPIFY_CLIENT_SECRET)
//     // Retirer le premier caractère "?" de la chaîne de caractères.
//     .update(urlWithoutHmac.search.slice(1))
//     .digest('hex');

//   if (shopifyHmac !== hash) {
//     logger.error("Les HMAC sont invalides")
//     return NextResponse.json({ error: "HMAC invalide" }, { status: 400 });
//   }

//   // TODO: active en prod car en dev c'est localhost.
//   // // Vérifier que le shop termine par ".myshopify.com".
//   // if (!req.nextUrl.hostname.endsWith(".myshopify.com")) {
//   //   logger.error("URL de boutique invalide")
//   //   return NextResponse.json({ error: "URL de boutique invalide" }, { status: 400 });
//   // }

//   // Demander access_token à Shopify.
//   const shopName = req.nextUrl.searchParams.get("shop");
//   const accessTokenUrl = new URL(`https://${shopName}/admin/oauth/access_token`);
//   accessTokenUrl.searchParams.append("client_id", SHOPIFY_CLIENT_ID);
//   accessTokenUrl.searchParams.append("client_secret", SHOPIFY_CLIENT_SECRET);
//   // accessTokenUrl.searchParams.append("code", code)

//   // requete et puis sauvegarder l'access_token.
//   // logger.info("Récupération de l'access_token", accessTokenUrl.toString());
//   // const accessTokenResponse = await fetch(accessTokenUrl.toString(), {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   // });

//   // if (!accessTokenResponse.ok) {
//   //   logger.error("Erreur lors de la récupération de l'access_token", accessTokenResponse)
//   //   return NextResponse.json({ error: "Une erreur est survenue" }, { status: 400 });
//   // }

//   // const accessTokenData = await accessTokenResponse.json();
//   // logger.info("Access token récupéré", accessTokenData);

//   return NextResponse.json("Hello, world!");
// }
