import { SidebarFooterContent } from "@/app/ui/dashboard/sidebar-footer-content";
import { SidebarMainContent } from "@/app/ui/dashboard/sidebar-main-content";
import { SidebarTopContent } from "@/app/ui/dashboard/sidebar-top-content";
import type { Shop } from "@/db/generated/client";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/shadcn/ui/sidebar";

export function AppSidebar({
	shops,
}: {
	shops: Shop[];
}): React.JSX.Element {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarTopContent shops={shops} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarMainContent />
			</SidebarContent>
			<SidebarFooter>
				<SidebarFooterContent />
			</SidebarFooter>
		</Sidebar>
	);
}
