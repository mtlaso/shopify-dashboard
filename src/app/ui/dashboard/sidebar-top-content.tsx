import { APP_NAME } from "@/app/lib/types";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton } from "@/shadcn/ui/sidebar";
import { ChevronDown } from "lucide-react";

export function SidebarTopContent(): React.JSX.Element {
	return (
		<div className="group-data-[collapsible=icon]:hidden">
			<h1 className="p-2 text-xl font-bold">{APP_NAME}</h1>
			<SidebarMenu>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton>
							Sélectionnez boutique
							<ChevronDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[--radix-popper-anchor-width]">
						<DropdownMenuItem>
							<span>Acme Inc</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<span>Acme Corp.</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenu>
		</div>
	);
}
