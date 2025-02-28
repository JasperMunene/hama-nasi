"use client"

import {
  ReceiptText,
  ListCheck,
  Settings2,
  Menu,
  Home,
  ChevronRight,
  Bell,
  UserCircle,
  LogOut,
  Users
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('home')
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function handleNavigation(item) {
    setActiveItem(item)
    setIsMobileMenuOpen(false)
  }

  function handleLogout() {
    console.log("Logging out...");
  }

  function handleSwitchAccount() {
    console.log("Switching account...");
  }

  function NavItem({
    href,
    icon: Icon,
    id,
    children,
  }) {
    const isActive = activeItem === id

    return (
      <Link
        href={href}
        onClick={() => handleNavigation(id)}
        className={cn(
          "flex items-center px-4 py-3 text-sm rounded-lg transition-all group relative",
          isActive 
            ? "text-white bg-[#0000C7] shadow-md" 
            : "text-gray-600 hover:bg-blue-50 hover:text-[#0000C7]"
        )}
      >
        <Icon className={cn(
          "h-5 w-5 mr-3 flex-shrink-0 transition-colors",
          isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"
        )} />
        <span className="font-medium text-lg">{children}</span>
        {isActive && (
          <ChevronRight className="h-5 w-5 ml-auto text-white" />
        )}
      </Link>
    )
  }

  return (
    <>
      <Button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-700" />
      </Button>
      
      <nav
        className={cn(
          "fixed inset-y-0 left-0 z-[70] w-72 bg-white transform transition-transform duration-200 ease-in-out",
          "lg:translate-x-0 lg:static lg:w-72 border-r border-gray-100 shadow-sm",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-gray-100">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0000C7] flex items-center justify-center">
                <span className="text-lg font-bold text-white">H</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Hama Nasi
              </span>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-8">
              <div>
                <div className="px-4 mb-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Main Menu
                  </h2>
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home} id="home">
                    Home
                  </NavItem>
                  <NavItem href="/dashboard/book-move" icon={ReceiptText} id="book">
                    Book a Move
                  </NavItem>
                  <NavItem href="/dashboard/inventory" icon={ListCheck} id="inventory">
                    Inventory
                  </NavItem>
                  <NavItem href="/dashboard/settings" icon={Settings2} id="settings">
                    Settings
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100 relative">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-[#0000C7]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  John Smith
                </p>
                <p className="text-xs text-gray-500 truncate">
                  john@example.com
                </p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Bell className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
            {isProfileMenuOpen && (
              <div className="absolute bottom-16 left-4 bg-white shadow-lg rounded-lg w-48">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  View Profile
                </Link>
                <button onClick={handleSwitchAccount} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Switch Account
                </button>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
