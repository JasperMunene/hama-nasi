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
  {/* Profile (Hidden When Dropdown is Open) */}
  {!isProfileMenuOpen && (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-100 transition-all duration-200 cursor-pointer"
      onClick={() => setIsProfileMenuOpen(true)}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
        <UserCircle className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">John Smith</p>
        <p className="text-xs text-gray-600 truncate">john@example.com</p>
      </div>
      <Button variant="ghost" size="icon" className="ml-auto">
        <Bell className="h-5 w-5 text-blue-500 hover:text-blue-700 transition" />
      </Button>
    </div>
  )}

  {/* Dropdown Menu (Moves Profile Inside When Open) */}
  {isProfileMenuOpen && (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 translate-y-[-12px] bg-white shadow-2xl rounded-xl w-64 border border-gray-200 transition-all duration-300 animate-fade-in">
      {/* Profile Inside Dropdown */}
      <div
        className="flex flex-col items-center gap-2 px-4 py-5 bg-gradient-to-br from-blue-500 to-[#0000C7] border-b rounded-t-xl cursor-pointer"
        onClick={() => setIsProfileMenuOpen(false)}
      >
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md">
          <UserCircle className="w-8 h-8 text-blue-600" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-white">John Smith</p>
          <p className="text-xs text-blue-200">john@example.com</p>
        </div>
      </div>

      {/* Dropdown Menu Items */}
      <Link
        href="/profile"
        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-blue-100 transition-all duration-200"
      >
        <UserCircle className="w-5 h-5 text-blue-600" />
        View Profile
      </Link>
      <button
        onClick={handleSwitchAccount}
        className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-blue-100 transition-all duration-200"
      >
        <Users className="w-5 h-5 text-blue-600" />
        Switch Account
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-100 transition-all duration-200 rounded-b-xl"
      >
        <LogOut className="w-5 h-5 text-red-600" />
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
