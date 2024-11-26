"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SpeedInsights } from "@vercel/speed-insights/next"
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
              {children}
              <SpeedInsights />
            </main>
          </SidebarProvider>
        )}
        {isLoginPage && <main>
          {children}
          <SpeedInsights />
        </main>}
        <Toaster />
      </body>
    </html>
  );
}
