import { VALIDATIONS } from "@/app/lib/types";
import { PrismaClient } from "@/db/generated/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

// https://www.timsanteford.com/posts/how-to-fix-too-many-database-connections-opened-in-prisma-with-next-js-hot-reload/
const prismaClientSingleton = (): PrismaClient => {
	const pool = new Pool({ connectionString: process.env.DATABASE_URL });
	const _adapter = new PrismaNeon(pool);
	return new PrismaClient({
		datasources: {
			db: {
				url: process.env.DATABASE_URL,
			},
		},
	});
};

// Ensure the global object is extended to store the Prisma client
// biome-ignore lint/suspicious/noShadowRestrictedNames: Pour le dev.
declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Use the existing Prisma client if it exists, or create a new one
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
	// Store the Prisma client in globalThis to reuse in development
	globalThis.prismaGlobal = prisma;
}

export const auth = betterAuth({
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // Durée en secondes.
		},
	},
	emailAndPassword: {
		autoSignIn: true,
		enabled: true,
		minPasswordLength: VALIDATIONS.password.min,
		maxPasswordLength: VALIDATIONS.password.max,
	},
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	plugins: [
		// Doit être en DERNIER.
		// https://www.better-auth.com/docs/integrations/next#server-action-cookies
		// Permet à des fonctions qui ont besoin d'accéder aux cookies (signInEmail, signUpEmail, etc.)
		// dans des servers components d'y avoir accès.
		nextCookies(),
	],
});
