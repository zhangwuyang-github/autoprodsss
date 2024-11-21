"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const isLoginPage = path === "/login";

  return (
    <html>
      <body>
        {!isLoginPage && (
          <SidebarProvider>
            <AppSideBar />
            <main>
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        )}
        {isLoginPage && <main>{children}</main>}
        <Toaster />
      </body>
    </html>
  );
}
