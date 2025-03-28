import { SidebarFooterContent } from "@/app/ui/dashboard/sidebar-footer-content";
import { SidebarMainContent } from "@/app/ui/dashboard/sidebar-main-content";
import { SidebarTopContent } from "@/app/ui/dashboard/sidebar-top-content";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/shadcn/ui/sidebar";

export function AppSidebar(): React.JSX.Element {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarTopContent />
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
