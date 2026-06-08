import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import Header from "./_components/Header";
import React from "react";

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default PortalLayout;
