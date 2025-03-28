import { SignupForm } from "@/app/ui/signup/signup-form";
import { SPACING } from "@/app/ui/spacing";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page(): Promise<React.JSX.Element> {
	const session = await auth.api.getSession({ headers: await headers() });
	if (session) {
		redirect("/dashboard");
	}

	return (
		<main
			className={cn(
				"min-h-dvh p-6 md:p-10 flex flex-col items-center justify-center",
				SPACING.MD,
			)}
		>
			<SignupForm />
		</main>
	);
}
