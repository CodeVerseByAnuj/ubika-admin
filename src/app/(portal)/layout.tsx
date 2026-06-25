import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import Header from "./_components/Header";
import { Outlet } from "react-router-dom";

const PortalLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <AppSidebar />

        <main className="flex-1 overflow-x-hidden bg-gray-50/10">
          <Header />
          <div className="p-4 overflow-x-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PortalLayout;
