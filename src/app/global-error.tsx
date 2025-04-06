"use client";

import { logger } from "@/app/lib/logging";
import { Button } from "@/shadcn/ui/button";
import Link from "next/link";

export default function GlobalError({
	err,
	reset,
}: {
	err: Error & { digest?: string };
	reset: () => void;
}): React.JSX.Element {
	logger.info(err);
	return (
		<html lang="fr">
			<body>
				<div className="min-h-screen flex flex-col justify-center items-center gap-4">
					<h1 className="text-2xl text-center">
						Une erreur inattendue s'est produite
					</h1>
					<Button onClick={(): void => reset()} type="submit">
						Réessayer
					</Button>

					<Link
						className="underline underline-offset-4"
						target="_blank"
						href={"https://us.norton.com/blog/how-to/how-to-clear-cookies"}
					>
						Si rien ne fonctionne, supprimez vos cookies et recommencez.
					</Link>
				</div>
			</body>
		</html>
	);
}
