import { SignupForm } from "@/app/ui/signup/signup-form";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";

export default function Page(): React.JSX.Element {
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
