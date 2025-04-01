"use client";
import { type DeleteShopState, deleteShop } from "@/app/lib/actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Button } from "@/shadcn/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteShopForm({ id }: { id: string }): React.JSX.Element {
	const _initialState: DeleteShopState = {
		errors: null,
		errmsg: null,
		data: null,
		successmsg: null,
	};

	// const [state, action, pending] = useActionState(deleteShop, initialState)
	const [pending, startTransition] = useTransition();

	const handleDeleteShop = (): void => {
		toast.success("Boutique Shopify supprimée avec succès.");
		startTransition(async () => {
			try {
				const res = await deleteShop(id);
				if (res?.errors) {
					toast.error(res.errmsg);
				}
			} catch (_err) {
				toast.error(
					"Une erreur est survenue lors de la suppression de la boutique.",
				);
			}
		});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">Supprimer</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
					<AlertDialogDescription>
						Cette action est irréversible.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Annuler</AlertDialogCancel>
					<AlertDialogAction disabled={pending} onClick={handleDeleteShop}>
						Continuer
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
