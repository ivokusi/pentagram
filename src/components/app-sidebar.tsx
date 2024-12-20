"use client"

import { ChevronUp, Pentagon, Home, Pen, Search, User2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"
import { Authenticated, Unauthenticated, useQuery } from "convex/react"
import { Button } from "./ui/button"
import { useState } from "react"
import { RedirectToSignIn, SignOutButton, useUser } from "@clerk/clerk-react"
import { api } from "../../convex/_generated/api"

interface MenuItem {
  title: string
  url: string
  icon: React.ElementType,
  authorized: boolean
}

// Menu items.
const items: MenuItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    authorized: true
  },
  {
    title: "Explore",
    url: "/explore",
    icon: Search,
    authorized: true
  },
  {
    title: "Create",
    url: "/create",
    icon: Pen,
    authorized: false
  }
]

export function AppSidebar() {
  
  const pathname = usePathname()
  const [redirectToSignIn, setRedirectToSignIn] = useState(false)
  const { isSignedIn, user } = useUser()
  const convexUser = useQuery(api.functions.users.current)
  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton disabled className="!opacity-100">
              <Pentagon />
              <span className="text-lg font-semibold">Pentagram</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                (item.authorized || isSignedIn) && (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                )
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Authenticated>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    {user?.imageUrl ? (
                      <img src={user.imageUrl} alt={user?.fullName ?? ''} className="w-6 h-6 rounded-full" />
                    ) : (
                      <User2 className="w-6 h-6" />
                    )} {convexUser?.username ?? ''}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <SignOutButton>
                      <span className="w-full">Sign out</span>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </Authenticated>
        <Unauthenticated>
            <SidebarMenu>
              <SidebarMenuItem>
                <Button className="w-full" onClick={() => setRedirectToSignIn(true)}>Sign in</Button>
              </SidebarMenuItem>
            </SidebarMenu>  
            {redirectToSignIn && <RedirectToSignIn />}
        </Unauthenticated>
      </SidebarFooter>
    </Sidebar>
  )
}
