"use client";
import { shopUrlState } from "@/app/lib/stores/shop-state";
import { APP_NAME } from "@/app/lib/types";
import type { Shop } from "@/db/generated/client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton } from "@/shadcn/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";

export function SidebarTopContent({
	shops,
}: { shops: Shop[] }): React.JSX.Element {
	const pathname = usePathname();
	const [{ selectedShopId }, setSelectedShopId] = useQueryStates(
		shopUrlState.searchParams,
		{
			urlKeys: shopUrlState.urlKeys,
		},
	);

	const handleSelectShop = (shopId: string): void => {
		const prevSelectedShopId = selectedShopId;
		setSelectedShopId({ selectedShopId: shopId });

		if (prevSelectedShopId !== shopId && pathname === "/dashboard") {
			toast.info("Veuillez rafraichir la page", {
				position: "top-center",
			});
		}
	};

	return (
		<div className="group-data-[collapsible=icon]:hidden">
			<h1 className="p-2 text-xl font-bold">{APP_NAME}</h1>
			<SidebarMenu>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton>
							{selectedShopId
								? shops.find((shop) => shop.id === selectedShopId)?.name
								: "Sélectionnez boutique"}
							<ChevronDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[--radix-popper-anchor-width]">
						{shops.map((shop) => (
							<DropdownMenuItem
								key={shop.id}
								onClick={(): void => handleSelectShop(shop.id)}
							>
								<span>{shop.name}</span>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenu>
		</div>
	);
}
