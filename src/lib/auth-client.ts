import { createAuthClient } from "better-auth/react";

/**
 * authClient utilisé pour intéragir avec le serveur d'authentification.
 */
export const authClient = createAuthClient({
	baseURL: process.env.APP_URL as string,
});
