"use client";
import { type AddShopifyShopState, addShopifyShop } from "@/app/lib/actions";
import { SPACING } from "@/app/ui/spacing";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { SiShopify } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { useActionState } from "react";

export function AddShopifyStoreForm(): React.JSX.Element {
	// ecommercethings12.myshopify.com
	const initialState: AddShopifyShopState = {
		errors: null,
		errmsg: null,
		data: null,
		successmsg: null,
	};
	const [state, action, pending] = useActionState(addShopifyShop, initialState);

	return (
		<form className={SPACING.SM} action={action}>
			<div className={SPACING.SM}>
				<Label htmlFor="shop-url-host">URL boutique</Label>
				<Input
					defaultValue={state?.data?.shopUrlHost}
					id="shop-url-host"
					name="shop-url-host"
					placeholder="maboutique.myshopify.com"
					required
					className={cn({
						"border-pink-500 text-pink-600": state?.errors?.shopUrlHost,
					})}
				/>

				{state?.errors?.shopUrlHost && (
					<p className="text-pink-500 text-sm">{state.errors.shopUrlHost}</p>
				)}
			</div>

			<div className={SPACING.SM}>
				<Label htmlFor="access-token">Storefront API access token</Label>
				<Input
					id="access-token"
					defaultValue={state?.data?.accessToken}
					className={cn({
						"border-pink-500 text-pink-600": state?.errors?.accessToken,
					})}
					name="access-token"
					required
				/>

				{state?.errors?.accessToken && (
					<p className="text-pink-500 text-sm">{state.errors.accessToken}</p>
				)}
			</div>

			{state?.successmsg && (
				<p className="text-green-500">{state.successmsg}</p>
			)}

			<Button className="w-full" disabled={pending}>
				<SiShopify color="white" />
				Ajouter une boutique
			</Button>

			{state?.errmsg && (
				<p className="mt-2 text-sm text-pink-500">{state.errmsg}</p>
			)}

			<div className="text-center text-sm">
				<Link
					target="_blank"
					href="/help/shopify-adminapi-accesstoken"
					className="underline underline-offset-4"
				>
					Comment obtenir votre access token ?
				</Link>
			</div>
		</form>
	);
}
