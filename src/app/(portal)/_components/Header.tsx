import { SidebarTrigger } from "@/components/ui/sidebar";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  return (
    <div className="border-b h-14">
      <div className="h-full w-full flex items-center justify-between px-4">
        <SidebarTrigger />
        <div>
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
