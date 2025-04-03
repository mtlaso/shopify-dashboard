import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest): Promise<NextResponse> {
	const sessionCookie = (await cookies()).get(
		process.env.VERCEL_ENV === "production"
			? "__Secure-better-auth.session_token"
			: "better-auth.session_token",
	)?.value;

	/**
    Utiliser 'optimistic authorization' en vérifiant uniquement la présence du cookie d'autentification.
    La vérification de session est faite quand on tente d'accéder à des données directement.
    https://nextjs.org/docs/app/building-your-application/authentication#authorization
  */
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"], // Specify the routes the middleware applies to
};
