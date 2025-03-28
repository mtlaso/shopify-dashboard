import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest): Promise<NextResponse> {
	const sessionCookie = getSessionCookie(req, {
		cookieName: "session_token",
		cookiePrefix: "better-auth",
	});

	if (!sessionCookie) {
		/**
    Utiliser 'optimistic authorization' en vérifiant uniquement la présence d'un cookie.
    La vérification de session est faite quand on tente d'accéder à des données directement.
    https://nextjs.org/docs/app/building-your-application/authentication#authorization
  */
		return NextResponse.redirect(new URL("/", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/app/:path"], // Specify the routes the middleware applies to
};
