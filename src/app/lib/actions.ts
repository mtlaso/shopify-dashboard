"use server";
import { logger } from "@/app/lib/logging";
import { signinFormSchema, signupFormSchema } from "@/app/lib/types";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * State permet de définir un type de retour pour les actions.
 */
type State<T, E extends string = keyof T & string> = {
	errors: { [key in E]?: string[] } | null;
	data: T | null;
	errmsg: string | null;
};

export type SignupState = State<{
	name: string;
	email: string;
	password: string | null;
	passwordConfirm: string | null;
}>;

export async function signup(
	_prevState: SignupState,
	formData: FormData,
): Promise<SignupState> {
	const validatedFields = signupFormSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
		passwordConfirm: formData.get("password-confirm"),
	});

	if (!validatedFields.success) {
		return {
			errmsg: null,
			errors: validatedFields.error.flatten().fieldErrors,
			data: {
				name: formData.get("name") as string,
				email: formData.get("email") as string,
				password: formData.get("password") as string,
				passwordConfirm: formData.get("password-confirm") as string,
			},
		};
	}

	try {
		const t = await auth.api.signUpEmail({
			body: {
				name: validatedFields.data.name,
				email: validatedFields.data.email,
				password: validatedFields.data.password,
			},
		});

		logger.info(`Nouveau compte créé : ${t.user.email}`);
	} catch (err) {
		let errmsg = "";
		logger.error(err);

		if (err instanceof APIError) {
			errmsg = "Un utilisateur avec ce courriel existe déjà.";
		} else {
			errmsg = "Une erreur est survenue lors de l'inscription.";
		}

		return {
			errmsg,
			errors: null,
			data: {
				name: formData.get("name") as string,
				email: formData.get("email") as string,
				password: null,
				passwordConfirm: null,
			},
		};
	}

	redirect("/dashboard");
}

export type SigninState = State<{
	email: string;
	password: string | null;
}>;

export async function signin(
	_prevState: SigninState,
	formData: FormData,
): Promise<SigninState> {
	const validatedFields = signinFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			errmsg: null,
			errors: validatedFields.error.flatten().fieldErrors,
			data: {
				email: formData.get("email") as string,
				password: formData.get("password") as string,
			},
		};
	}

	try {
		const t = await auth.api.signInEmail({
			body: {
				email: validatedFields.data.email,
				password: validatedFields.data.password,
			},
		});

		logger.info(`Utilisateur connecté : ${t.user.email}`);
	} catch (err) {
		let errmsg = "";
		logger.error(err);

		if (err instanceof APIError) {
			errmsg = "Courriel ou mot de passe invalide.";
		} else {
			errmsg = "Une erreur est survenue lors de la connexion.";
		}

		return {
			errmsg,
			errors: null,
			data: {
				email: formData.get("email") as string,
				password: null,
			},
		};
	}

	redirect("/dashboard");
}

export async function signout(): Promise<void> {
	logger.info("déconnexion en cours...");

	try {
		const session = await auth.api.getSession({ headers: await headers() });
		logger.info("Utilisateur déconnecté :", session?.user.email);
	} catch (err) {
		logger.error(err);
	}

	await auth.api.signOut({
		headers: await headers(),
	});
	redirect("/");
}
