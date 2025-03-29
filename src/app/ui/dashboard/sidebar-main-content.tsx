"use client";

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
import { usePathname } from "next/navigation";

const items = [
	{
		title: "Accueil",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "Boutiques",
		url: "/dashboard/stores",
		icon: ShoppingCartIcon,
	},
];

export function SidebarMainContent(): React.JSX.Element {
	const pathname = usePathname();
	return (
		<SidebarGroup>
			<SidebarGroupLabel>App</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<Link
									href={item.url}
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
