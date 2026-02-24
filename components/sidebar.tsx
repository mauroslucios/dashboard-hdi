"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, FileText, Home, Settings, AlertCircle, Users, Map, ChevronLeft, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-sm"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex flex-col bg-white border-r shadow-sm transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!collapsed && <h2 className="text-lg font-semibold">Dengue Monitor</h2>}
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-2">
            <NavItem icon={Home} label="Dashboard" collapsed={collapsed} active />
            <NavItem icon={BarChart3} label="Statistics" collapsed={collapsed} />
            <NavItem icon={Map} label="Map View" collapsed={collapsed} />
            <NavItem icon={AlertCircle} label="Alerts" collapsed={collapsed} />
            <NavItem icon={Users} label="Patients" collapsed={collapsed} />
            <NavItem icon={FileText} label="Reports" collapsed={collapsed} />
          </nav>
        </div>

        <div className="border-t p-4">
          <NavItem icon={Settings} label="Settings" collapsed={collapsed} />
        </div>
      </div>
    </>
  )
}

interface NavItemProps {
  icon: React.ElementType
  label: string
  collapsed: boolean
  active?: boolean
}

function NavItem({ icon: Icon, label, collapsed, active }: NavItemProps) {
  return (
    <Link
      href="#"
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active ? "bg-orange-600 text-white font-medium" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}

