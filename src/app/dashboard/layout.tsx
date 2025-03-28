import { AppSidebar } from "@/app/ui/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/shadcn/ui/sidebar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): React.JSX.Element {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
