"use client";
import * as React from "react";
import {
  BookOpen,
  ChartArea,
  ChevronRight,
  DatabaseIcon,
  SquareTerminal,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import ApplicationLogoHandler from "./ApplicationLogoHandler";

// Sample Data
const data = [
  {
    title: "Today",
    url: "/",
    icon: SquareTerminal,
    isActive: true,
    items: [],
  },
  // {
  //   title: "Profile",
  //   url: "/profile",
  //   icon: User,
  //   isActive: true,
  //   items: [],
  // },

  // {
  //   title: "Models",
  //   url: "#",
  //   icon: Bot,
  //   items: [
  //     {
  //       title: "Genesis",
  //       url: "#",
  //     },
  //     {
  //       title: "Explorer",
  //       url: "#",
  //     },
  //     {
  //       title: "Quantum",
  //       url: "#",
  //     },
  //   ],
  // },

  {
    title: "Care",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Care Guides",
        url: "/care-guides",
      },
      {
        title: "Allergies",
        url: "/patient/allergies",
      },
      {
        title: "Appointments",
        url: "/patient/appointments",
      },
      {
        title: "Conditions",
        url: "/patient/conditions",
      },
    ],
  },
  {
    title: "Records",
    url: "#",
    icon: DatabaseIcon,
    items: [
      // {
      //   title: "History",
      //   url: "/patient/history",
      // },
      {
        title: "Labs",
        url: "/patient/labs",
      },
      {
        title: "Letters",
        url: "/patient/letters",
      },
      {
        title: "Medications",
        url: "/patient/medications",
      },
    ],
  },

  {
    title: "Wearables",
    url: "/wearables",
    icon: ChartArea,
    isActive: true,
    items: [],
  },
];

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader className="border-b h-14 flex flex-row items-center overflow-hidden">
        <ApplicationLogoHandler />
      </SidebarHeader>

      <SidebarContent className="p-2">
        {/* Main Navigation */}
        {/* <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
        </SidebarGroup> */}

        <SidebarMenu>
          {data.map((item) => {
            const hasChildren = item.items && item.items.length > 0;
            // Agar children hai to collapsible show karo
            if (hasChildren) {
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {/* Parent Menu */}
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}

                        <span>{item.title}</span>

                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {/* Child Menu */}
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            // Agar children nahi hai to normal menu item show karo
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      {/* <SidebarFooter></SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
