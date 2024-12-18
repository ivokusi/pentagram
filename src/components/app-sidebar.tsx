'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TypeIcon as type, type LucideIcon, Telescope, Brush, Settings, Hexagon } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

type NavItem = {
  title: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { title: 'Explore', href: '/explore', icon: Telescope },
  { title: 'Create', href: '/create', icon: Brush },
  { title: 'Manage', href: '/manage', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="pb-0">
        <div className="flex items-center gap-2 py-2 pl-2">
          <Hexagon className="h-6 w-6" />
          <h1 className="text-lg font-semibold">Pentagram</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-0">
        <SidebarGroup>
          <SidebarGroupContent>
            {navItems.map((item) => (
              <div key={item.title}>
                <Link href={item.href} className={`flex items-center p-2 hover:bg-gray-100 rounded-lg ${pathname === item.href ? 'bg-gray-100' : ''}`}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

