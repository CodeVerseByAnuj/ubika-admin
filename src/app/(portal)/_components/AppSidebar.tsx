"use client";
import * as React from "react";
import { BookOpen, ChevronRight, SquareTerminal, User } from "lucide-react";

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

// Sample Data
const data = [
  {
    title: "Home",
    url: "/",
    icon: SquareTerminal,
    isActive: true,
    items: [],
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    isActive: true,
    items: [],
  },

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
    title: "Patient",
    url: "#",
    icon: BookOpen,
    items: [
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
      {
        title: "Medications",
        url: "/patient/medications",
      },
      {
        title: "Labs",
        url: "/patient/labs",
      },
      {
        title: "Letters",
        url: "/patient/letters",
      },
    ],
  },
];

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader className="border-b h-14 flex flex-row items-center px-4 overflow-hidden">
        <h1
          className="
      font-semibold text-2xl
      whitespace-nowrap
      group-data-[collapsible=icon]:hidden
    "
        >
          Ubika
        </h1>
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
      <SidebarFooter>
        <ProfileMenu />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
