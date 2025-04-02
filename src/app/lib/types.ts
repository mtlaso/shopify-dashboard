import { z } from "zod";

export const APP_NAME = "[ecommrc]";
export const SELECTED_SHOP_COOKIE_NAME = "selected_shop_cookie_name";
export const SELECTED_SHOP_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type valKeys =
	| "name"
	| "password"
	| "shopUrlHost"
	| "accessToken"
	| "deleteShop";
type valValues = {
	min: number;
	max: number;
	regex?: RegExp;
};

/**
 * VALIDATIONS contient les valeurs de configuration de champs.
 */
export const VALIDATIONS: Record<valKeys, valValues> = {
	name: {
		min: 2,
		max: 70,
	},
	password: {
		min: 8,
		max: 182,
		regex: /^(?=.*[A-Za-z])(?=.*\d).+$/,
	},
	shopUrlHost: {
		min: 10, // http://a.a (10 caractères)
		max: 2083,
		regex: /^[a-zA-Z0-9-]+\.myshopify\.com$/,
	},
	accessToken: {
		min: 5,
		max: 255,
	},
	deleteShop: {
		min: 5,
		max: 255,
	},
} as const;

export const signupFormSchema = z
	.object({
		name: z
			.string()
			.min(VALIDATIONS.name.min, {
				message: `Minumum ${VALIDATIONS.name.min} caractères.`,
			})
			.max(VALIDATIONS.name.max, {
				message: `Maximum ${VALIDATIONS.name.max} caractères.`,
			})
			.trim(),
		email: z.string().email({ message: "Entrez un courriel valide." }).trim(),
		password: z
			.string()
			.min(VALIDATIONS.password.min, {
				message: `Minumum ${VALIDATIONS.password.min} caractères.`,
			})
			.max(VALIDATIONS.password.max, {
				message: `Maximum ${VALIDATIONS.password.max} caractères.`,
			})
			.regex(VALIDATIONS.password.regex as RegExp, {
				message: "Le mot de passe doit contenir une lettre et un chiffre.",
			})
			.trim(),
		passwordConfirm: z.string().trim(),
	})
	.superRefine((val, ctx) => {
		if (val.password !== val.passwordConfirm) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Les mots de passe ne correspondent pas.",
				path: ["passwordConfirm"],
			});
		}
	});

export const signinFormSchema = z.object({
	email: z.string().email({ message: "Entrez un courriel valide." }).trim(),
	password: z
		.string()
		.min(VALIDATIONS.password.min, {
			// Vider le message par défaut.
			message: "",
		})
		.max(VALIDATIONS.password.max, {
			// Vider le message par défaut.
			message: "",
		})
		.trim(),
});

export const addShopifyShopFormSchema = z.object({
	shopUrlHost: z
		.string()
		.trim()
		.min(VALIDATIONS.shopUrlHost.min, {
			message: `Minimum ${VALIDATIONS.shopUrlHost.min} caractères.`,
		})
		.max(VALIDATIONS.shopUrlHost.max, {
			message: `Maximum ${VALIDATIONS.shopUrlHost.max} caractères.`,
		})
		.regex(VALIDATIONS.shopUrlHost.regex as RegExp, {
			message: 'Le lien doit être du format "xxx.myshopify.com"',
		}),
	accessToken: z
		.string()
		.min(VALIDATIONS.accessToken.min, {
			message: `Minimum ${VALIDATIONS.accessToken.min} caractères.`,
		})
		.max(VALIDATIONS.accessToken.max, {
			message: `Maximum ${VALIDATIONS.accessToken.max} caractères.`,
		})
		.trim(),
});

export const deleteShopFormSchema = z.object({
	id: z
		.string()
		.trim()
		.min(VALIDATIONS.deleteShop.min, {
			message: `Minimum ${VALIDATIONS.deleteShop.min} caractères.`,
		})
		.max(VALIDATIONS.deleteShop.max, {
			message: `Maximum ${VALIDATIONS.deleteShop.max} caractères.`,
		}),
});
