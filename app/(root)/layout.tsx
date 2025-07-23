import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <header className="h-10 flex items-center justify-between">
          <SidebarTrigger />
          <Button variant="ghost" className="ml-auto" onClick={logout}>
            登出
          </Button>
          <ModeToggle />
        </header>
        <main className="flex-1 p-2">{children}</main>
      </div>
    </SidebarProvider>
  );
}
