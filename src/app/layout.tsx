import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex flex-1 h-screen overflow-hidden">
            <AppSidebar />
            <div className="flex-1 flex flex-col overflow-hidden transition-all ease-in-out duration-300 group-data-[state=collapsed]/sidebar:flex-[1_1_100%] p-5">
              <header className="flex h-16 items-center gap-4 bg-background px-6">
                <SidebarTrigger />
                <h1 className="font-semibold">Explore</h1>
              </header>
              <main className="flex-1">
                <SidebarInset className="h-full">
                  {children}
                </SidebarInset>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
