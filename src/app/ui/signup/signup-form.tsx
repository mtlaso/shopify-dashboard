"use client";
import { type SignupState, signup } from "@/app/lib/actions";
import { APP_NAME, VALIDATIONS } from "@/app/lib/types";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { KeyRoundIcon } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"form">): React.JSX.Element {
	const initialState: SignupState = {
		errors: null,
		errmsg: null,
		data: null,
	};
	const [state, action, pending] = useActionState(signup, initialState);

	return (
		<form
			action={action}
			className={cn("flex flex-col w-full max-w-sm", SPACING.LG, className)}
			{...props}
		>
			<div className={cn("flex flex-col items-center", SPACING.MD)}>
				<div className="flex items-center justify-center">
					<KeyRoundIcon className="size-6" />
				</div>
				<h1 className="text-xl font-bold">{APP_NAME}</h1>
			</div>

			<div className={cn("flex flex-col", SPACING.MD)}>
				<div className={SPACING.SM}>
					<Label htmlFor="name">Nom</Label>
					<Input
						defaultValue={state?.data?.name}
						className={cn({
							"border-pink-500 text-pink-600": state?.errors?.name,
						})}
						id="name"
						type="name"
						name="name"
						placeholder="Tyler Durden"
						required
					/>
					{state?.errors?.name && (
						<p className="text-pink-500 text-sm">{state.errors.name}</p>
					)}
				</div>

				<div className={SPACING.SM}>
					<Label htmlFor="email">Courriel</Label>
					<Input
						defaultValue={state?.data?.email}
						className={cn({
							"border-pink-500 text-pink-600": state?.errors?.email,
						})}
						id="email"
						type="email"
						name="email"
						placeholder="m@example.com"
						required
					/>
					{state?.errors?.email && (
						<p className="text-pink-500 text-sm">{state.errors.email}</p>
					)}
				</div>

				<div className={SPACING.SM}>
					<Label htmlFor="password">Mot de passe</Label>
					<Input
						name="password"
						className={cn({
							"border-pink-500 text-pink-600": state?.errors?.email,
						})}
						id="password"
						type="password"
						required
						minLength={VALIDATIONS.password.min}
						maxLength={VALIDATIONS.password.max}
					/>
					{state?.errors?.password && (
						<ol>
							{state.errors.password.map((err) => (
								<li key={err} className="text-pink-500 text-sm">
									- {err}
								</li>
							))}
						</ol>
					)}
				</div>

				<div className={SPACING.SM}>
					<Label htmlFor="password-confirm">Confirmer votre mot de passe</Label>
					<Input
						name="password-confirm"
						className={cn({
							"border-pink-500 text-pink-600": state?.errors?.email,
						})}
						id="password-confirm"
						type="password"
						required
						minLength={VALIDATIONS.password.min}
						maxLength={VALIDATIONS.password.max}
					/>
					{state?.errors?.passwordConfirm && (
						<p className="text-pink-500 text-sm">
							{state.errors.passwordConfirm}
						</p>
					)}
				</div>

				<div className={cn("flex flex-col", SPACING.SM)}>
					<Button disabled={pending} type="submit" className="w-full">
						Créer compte
					</Button>

					{state?.errmsg && (
						<p className="mt-2 text-sm text-pink-500">{state.errmsg}</p>
					)}
				</div>
			</div>

			<div className="text-center text-sm">
				Vous avez{" "}
				<Link href="/signin" className="underline underline-offset-4">
					déja un compte ?
				</Link>
			</div>
		</form>
	);
}
