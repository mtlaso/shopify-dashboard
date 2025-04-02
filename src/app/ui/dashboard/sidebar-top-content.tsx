"use client";

import { useShopStore } from "@/app/lib/store/shop";
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

export function SidebarTopContent({
	shops,
}: { shops: Shop[] }): React.JSX.Element {
	const selectedShopId = useShopStore((state) => state.selectedShopId);
	const setSelectedShop = useShopStore((state) => state.setSelectedShop);

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
								onClick={(): void => {
									setSelectedShop(shop.id);
								}}
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
