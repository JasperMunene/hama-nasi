import { cookies } from "next/headers"
import { AppSidebar } from "@/components/Sidebar";

export default async function RootLayout({ children }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
       <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">{children}</main>
       </div>
    )
}
