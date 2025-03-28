import { SigninForm } from "@/app/ui/signin/signin-form";

export default function Page(): React.JSX.Element {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<SigninForm />
			</div>
		</div>
	);
}
