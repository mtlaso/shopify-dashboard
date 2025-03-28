import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/shadcn/ui/sidebar";
import { Home, ShoppingCartIcon } from "lucide-react";

const items = [
	{
		title: "Accueil",
		url: "#",
		icon: Home,
	},
	{
		title: "Boutique",
		url: "#",
		icon: ShoppingCartIcon,
	},
];

export function SidebarMainContent(): React.JSX.Element {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>App</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<a href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
