import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home(): React.JSX.Element {
	redirect("/signin");
	return (
		<Link href="/signin" className="underline underline-offset-4">
			Connexion
		</Link>
	);
}
