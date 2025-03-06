"use client";

import React, { useState, useEffect } from "react";
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
  Users,
  Activity,
  Calendar,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/button/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function AppSidebar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setRole(data.role);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  


  // Define navigation sections based on the user's role.
  // For a moving company, we show just the Dashboard and a Movers link.
  const menuSections =
    role === "Moving Company"
      ? [
          {
            title: "Overview",
            items: [
              { id: "home", href: "/dashboard", icon: Home, label: "Dashboard" },
              {
                id: "movers",
                href: "/dashboard/movers",
                icon: Users,
                label: "Movers",
              },
            ],
          },
        ]
      : [
          {
            title: "Overview",
            items: [
              { id: "home", href: "/dashboard", icon: Home, label: "Dashboard" },
              {
                id: "activity",
                href: "/dashboard/activity",
                icon: Activity,
                label: "Activity",
              },
            ],
          },
          {
            title: "Moving",
            items: [
              {
                id: "book",
                href: "/dashboard/book-move",
                icon: ReceiptText,
                label: "Book a Move",
              },
              {
                id: "inventory",
                href: "/dashboard/inventory",
                icon: Package,
                label: "Inventory",
              },
              {
                id: "bids",
                href: "/dashboard/bids",
                icon: ListCheck,
                label: "Bids",
              },
            ],
          },
          {
            title: "Account",
            items: [
              {
                id: "settings",
                href: "/dashboard/settings",
                icon: Settings2,
                label: "Settings",
              },
            ],
          },
        ];

  function handleNavigation(item) {
    setActiveItem(item);
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }

  function NavItem({ href, icon: Icon, id, children }) {
    const isActive = activeItem === id;

    return (
      <Link
        href={href}
        onClick={() => handleNavigation(id)}
        className={cn(
          "flex items-center px-4 py-3 text-sm rounded-xl transition-all group relative",
          isActive
            ? "text-white bg-[#0063ff] shadow-lg shadow-blue-500/20"
            : "text-gray-600 hover:bg-blue-50 hover:text-[#0063ff]"
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5 mr-3 flex-shrink-0 transition-colors",
            isActive ? "text-white" : "text-gray-400 group-hover:text-[#0063ff]"
          )}
        />
        <span className="font-medium">{children}</span>
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute right-3"
            transition={{ type: "spring", duration: 0.6 }}
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </motion.div>
        )}
      </Link>
    );
  }

  return (
    <>
      <Button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-[#001a4d]" />
      </Button>

      <nav
        className={cn(
          "fixed inset-y-0 left-0 z-[70] w-80 bg-white/80 backdrop-blur-xl transform transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:w-80 border-r border-gray-100 shadow-xl shadow-gray-100/50",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="h-20 px-6 flex items-center justify-between border-b border-gray-100/50">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0063ff] to-[#001a4d] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-xl transition-shadow">
                <span className="text-lg font-bold text-white">HN</span>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-[#001a4d] to-[#0063ff] bg-clip-text text-transparent">
                Hama Nasi
              </span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-10">
              {menuSections.map((section) => (
                <div key={section.title}>
                  <div className="px-4 mb-4">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <NavItem
                        key={item.id}
                        href={item.href}
                        icon={item.icon}
                        id={item.id}
                      >
                        {item.label}
                      </NavItem>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-gray-100/50 relative">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0063ff] to-[#001a4d] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-xl transition-shadow">
                <UserCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate group-hover:text-[#0063ff] transition-colors">
                  John Smith
                </p>
                <p className="text-xs text-gray-500 truncate">john@example.com</p>
              </div>
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-400 group-hover:text-[#0063ff] transition-colors" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </div>
            </div>

            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="absolute left-6 right-6 bottom-24 bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100"
                >
                  <div className="px-4 py-4 bg-gradient-to-r from-[#0063ff] to-[#001a4d] text-white">
                    <p className="text-sm font-medium">John Smith</p>
                    <p className="text-xs text-blue-200">john@example.com</p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/profile"
                      className="flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0063ff] rounded-lg transition-colors"
                    >
                      <UserCircle className="h-5 w-5 mr-3 text-[#0063ff]" />
                      View Profile
                    </Link>
                    <button
                      onClick={() => console.log("Switching Account")}
                      className="flex items-center w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0063ff] rounded-lg transition-colors"
                    >
                      <Users className="h-5 w-5 mr-3 text-[#0063ff]" />
                      Switch Account
                    </button>
                    <button
                      onClick={() => console.log("Logging Out")}
                      className="flex items-center w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                    >
                      <LogOut className="h-5 w-5 mr-3 text-red-600" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </>
  );
}
