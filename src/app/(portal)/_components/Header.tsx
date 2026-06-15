import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  return (
    <div className="border-b h-14">
      <div className="h-full w-full flex items-center justify-between px-4">
        <SidebarTrigger />
        <div className="text-end">
          <h1 className="text-sm tracking-tight font-semibold mb-1/2">
            Good Morning, Sophia
          </h1>
          <p className="text-xs font-medium text-muted-foreground">
            Wednesday · April 22
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
