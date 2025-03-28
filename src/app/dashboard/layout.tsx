import { AppSidebar } from "@/app/ui/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/shadcn/ui/sidebar";
import { cookies } from "next/headers";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): Promise<React.JSX.Element> {
	const cookieStore = await cookies();
	const isSideBarOpen = cookieStore.get("sidebar_state")?.value === "true";

	return (
		<SidebarProvider defaultOpen={isSideBarOpen}>
			<AppSidebar />
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
