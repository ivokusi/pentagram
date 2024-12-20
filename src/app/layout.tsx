import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ConvexClientProvider } from "@/utils/convex-client-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { ClerkProvider } from "@clerk/nextjs";
import { cookies } from "next/headers"
import "./globals.css";

export default async function Layout({ children }: { children: React.ReactNode }) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html>
      <body>
        <ClerkProvider publishableKey="pk_test_bGliZXJhbC1sYXJrLTY1LmNsZXJrLmFjY291bnRzLmRldiQ">
          <ConvexClientProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar />
              <SidebarTrigger className="m-5" />
              <main className="flex-1 w-full">
                {children}
              </main>
            </SidebarProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
