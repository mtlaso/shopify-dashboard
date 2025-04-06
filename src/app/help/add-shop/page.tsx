import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Page(): React.JSX.Element {
	return (
		<section className={cn("m-8", SPACING.LG)}>
			<div>
				<h1 className="text-2xl font-bold">Ajouter une boutique</h1>
			</div>

			<div className={SPACING.MD}>
				<div className={SPACING.SM}>
					<h2 className="text-xl font-bold">Trouver l'URL de votre boutique</h2>

					<div>
						<ul className="list-decimal list-inside">
							<li>
								Connectez-vous sur le{" "}
								<Link
									className="underline underline-offset-4"
									href={"https://admin.shopify.com"}
								>
									panneau d'administration Shopify de votre magasin
								</Link>{" "}
							</li>
							<li>
								Allez sur
								<span className="font-bold"> Paramètres</span> &gt;
								<Link
									href="https://admin.shopify.com/settings/payments"
									className="underline underline-offset-4"
								>
									<span className="font-bold"> Domaines</span>
								</Link>
							</li>
							<li>
								Séléctionnez{" "}
								<span className="font-bold"> le domaine de redirection</span>.
								(Si le domaine ne fonctionne pas, essayez avec les autres sur la
								liste.)
								<Image
									alt="Image représentant comment trouver l'URL de la boutique Shopify"
									src={"/help-shopify-url.png"}
									width={500}
									height={500}
								/>
							</li>
						</ul>
					</div>
				</div>

				<div className={SPACING.SM}>
					<h2 className="text-xl font-bold"> Trouver votre access token</h2>

					<div>
						<ul className="list-decimal list-inside">
							<li>
								Allez sur
								<span className="font-bold"> Paramètres</span> &gt;
								<Link
									href="https://admin.shopify.com/settings/apps"
									className="underline underline-offset-4"
								>
									<span className="font-bold">
										{" "}
										Applications et canaux de vente
									</span>
								</Link>
							</li>
							<li>
								Cliquez sur{" "}
								<span className="font-bold">Développer des applications</span>
							</li>
							<li>
								Cliquez sur{" "}
								<span className="font-bold">Créer une application</span>
								<ul className="list-decimal list-inside ml-4">
									<li>Donnez un nom à l'application</li>
								</ul>
							</li>

							<li>
								Cliquez sur{" "}
								<span className="font-bold">
									Configurer les périmètres de l'API Admin
								</span>
							</li>
							<li>
								Séléctionnez <span className="font-bold">au minimum</span> les{" "}
								<span className="font-bold">Portées d'accès API Admin</span>{" "}
								suivantes :
								<ul className="list-decimal list-inside ml-4">
									<li>
										<code>write_products</code>
									</li>

									<li>
										<code>read_products</code>
									</li>

									<li>
										<code>write_orders</code>
									</li>

									<li>
										<code>read_orders</code>
									</li>
								</ul>
							</li>

							<li>
								Cliquez sur <span className="font-bold">Enregistrer</span>
							</li>

							<li>
								Cliquez sur{" "}
								<span className="font-bold">Installer l'application</span>
							</li>

							<li>
								Cliquez sur{" "}
								<span className="font-bold">Révéler le jeton une fois</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
