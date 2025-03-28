"use client";
import { type SigninState, signin } from "@/app/lib/actions";
import { APP_NAME, VALIDATIONS } from "@/app/lib/types";
import { SPACING } from "@/app/ui/spacing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { KeyRoundIcon } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

export function SigninForm({
	className,
	...props
}: React.ComponentProps<"form">): React.JSX.Element {
	const initialState: SigninState = {
		errors: null,
		errmsg: null,
		data: null,
	};

	const [state, action, pending] = useActionState(signin, initialState);

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

				<div className={cn("flex flex-col", SPACING.SM)}>
					<Button disabled={pending} type="submit" className="w-full">
						Connexion
					</Button>

					{state?.errmsg && (
						<p className="mt-2 text-sm text-pink-500">{state.errmsg}</p>
					)}
				</div>
			</div>

			<div className="text-center text-sm">
				Vous n'avez{" "}
				<Link href="/signup" className="underline underline-offset-4">
					pas de compte ?
				</Link>
			</div>
		</form>
	);
}
