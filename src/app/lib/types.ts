import { z } from "zod";

export const APP_NAME = "[ecommrc]";

/**
 * VALIDATIONS contient les valeurs de configuration de champs.
 */
export const VALIDATIONS: {
	[key: string]: { min: number; max: number; regex?: RegExp };
} = {
	name: {
		min: 2,
		max: 70,
	},
	password: {
		min: 8,
		max: 182,
		regex: /^(?=.*[A-Za-z])(?=.*\d).+$/,
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
		passwordConfirm: z.string(),
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
