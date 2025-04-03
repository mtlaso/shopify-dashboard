import { data } from "@/app/lib/data";
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
	const userShops = await data.getShops();

	return (
		<SidebarProvider defaultOpen={isSideBarOpen}>
			<AppSidebar shops={userShops} />
			<main className="m-4 w-full">
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
