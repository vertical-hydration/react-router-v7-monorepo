import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { Home, Inbox, ListOrderedIcon } from "lucide-react";
import { Form, Link, Outlet } from "react-router";
import AppLayout, {
  type NavigationItem,
  type UserMenu,
} from "~/components/layout";
import { NavigationMenuDemo } from "~/components/top-nav-menu";
import type { Route } from "./+types/layout";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Food Pantry",
      url: "",

      items: [
        {
          title: "Home",
          url: "/",
          icon: Home,
        },
        {
          title: "Reservations",
          url: "/reservations",
          icon: ListOrderedIcon,
        },
      ],
    },
  ],
};
export const loader = async ({ request }: Route.LoaderArgs) => {
  const user: UserMenu = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  const navigation: NavigationItem[] = [
    { name: "Dashboard", to: "#" },
    { name: "Reservations", to: "/reservations" },
    // { name: 'Projects', to: '#' },
    // { name: 'Calendar', to: '#' },
  ];
  const userNavigation: NavigationItem[] = [
    { name: "Your profile", to: "/profile" },
    { name: "Settings", to: "/settings" },
    { name: "Sign out", to: "/signout" },
  ];

  return { navigation, userNavigation, user };
};

export default function MainLayout({ loaderData }: Route.ComponentProps) {
  return (
    <AppLayout
      navigation={loaderData.navigation}
      userNavigation={loaderData.userNavigation}
      user={loaderData.user}
    >
      <Outlet />
    </AppLayout>
  );
}
