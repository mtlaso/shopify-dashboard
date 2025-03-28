import { APP_NAME } from "@/app/lib/types";
import { SPACING } from "@/app/ui/spacing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { KeyRoundIcon } from "lucide-react";
import Link from "next/link";

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"form">): React.JSX.Element {
	return (
		<form
			className={cn("flex flex-col w-full max-w-sm", SPACING.LG, className)}
			{...props}
		>
			<div className={cn("flex flex-col items-center", SPACING.MD)}>
				<div className="flex items-center justify-center">
					<KeyRoundIcon className="size-6" />
				</div>
				<h1 className="text-xl font-bold">{APP_NAME}</h1>
			</div>

			<div className={cn("flex flex-col", SPACING.LG)}>
				<div className={SPACING.SM}>
					<Label htmlFor="email">Courriel</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</div>

				<div className={SPACING.SM}>
					<Label htmlFor="password">Mot de passe</Label>
					<Input id="password" type="password" required />
				</div>

				<div className={SPACING.SM}>
					<Label htmlFor="password-confirm">Confirmer votre mot de passe</Label>
					<Input id="password-confirm" type="password" required />
				</div>

				<div className={cn("flex flex-col", SPACING.SM)}>
					<Button type="submit" className="w-full">
						Créer compte
					</Button>
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
