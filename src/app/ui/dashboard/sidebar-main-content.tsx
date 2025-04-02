"use client";

import { shopUrlState } from "@/app/lib/stores/shop-state";
import { cn } from "@/lib/utils";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/shadcn/ui/sidebar";
import { Home, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const items = [
	{
		title: "Accueil",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "Boutiques",
		url: "/dashboard/shops",
		icon: ShoppingCartIcon,
	},
];

export function SidebarMainContent(): React.JSX.Element {
	const pathname = usePathname();
	const queryParams = useSearchParams();
	const shopId = queryParams.get(shopUrlState.SHOP_KEY);

	return (
		<SidebarGroup>
			<SidebarGroupLabel>App</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<Link
									href={{
										pathname: item.url,
										query: {
											[shopUrlState.SHOP_KEY]: shopId,
										},
									}}
									className={cn({
										"font-medium bg-accent": pathname === item.url,
									})}
								>
									<item.icon />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
