import { logger } from "@/app/lib/logging";
import { shopifyShopNameSchema } from "@/app/lib/types";
import { auth } from "@/lib/auth";
import cookieSignature from "cookie-signature";
import { nanoid } from "nanoid";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<unknown>> {
	const session = await auth.api.getSession(req);
	if (!session) {
		return NextResponse.redirect("/login");
	}

	const shopName = req.nextUrl.searchParams.get("shopName");
	const validatedFields = shopifyShopNameSchema.safeParse(shopName);

	if (!validatedFields.success) {
		return NextResponse.json(
			{ error: "Nom boutique invalide" },
			{ status: 400 },
		);
	}

	const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
	const SHOPIFY_REDIRECT_URL = process.env.SHOPIFY_REDIRECT_URL;
	const COOKIE_SECRET = process.env.COOKIE_SECRET;

	if (!SHOPIFY_CLIENT_ID || !SHOPIFY_REDIRECT_URL || !COOKIE_SECRET) {
		logger.error("Variables d'environnement manquantes pour Shopify OAuth", {
			SHOPIFY_CLIENT_ID:
				SHOPIFY_CLIENT_ID === undefined ? "undefined" : "defined",
			SHOPIFY_REDIRECT_URL:
				SHOPIFY_REDIRECT_URL === undefined ? "undefined" : "defined",
			COOKIE_SECRET: COOKIE_SECRET === undefined ? "undefined" : "defined",
		});

		return NextResponse.json(
			{ error: "Une erreur est survenue" },
			{ status: 500 },
		);
	}

	const scopes = "read_products,write_products";

	const nonce = nanoid();
	const signedNonce = cookieSignature.sign(nonce, COOKIE_SECRET);

	const url = new URL(
		`https://${shopName}.myshopify.com/admin/oauth/authorize`,
	);

	url.searchParams.append("client_id", SHOPIFY_CLIENT_ID);
	url.searchParams.append("scope", scopes);
	url.searchParams.append("redirect_uri", SHOPIFY_REDIRECT_URL);
	url.searchParams.append("state", signedNonce);
	// url.searchParams.append("grant_options[]", "per-user");

	const res = NextResponse.next({
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});

	res.cookies.set("nonce", signedNonce);

	logger.info(
		"Redirection vers Shopify pour initier OAuth",
		decodeURIComponent(url.toString()),
	);
	return NextResponse.redirect(url.toString());
}
