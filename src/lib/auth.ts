import { PrismaClient } from "@/db/generated/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const auth = betterAuth({
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // Durée en secondes.
		},
	},
	emailAndPassword: {
		enabled: true,
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
