import { SidebarTrigger } from "@/components/ui/sidebar";
import Logout from "./Logout";

const Header = () => {
  return (
    <div className="border-b h-14">
      <div className="h-full w-full flex items-center justify-between px-4">
        <SidebarTrigger />
        <div>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Header;
