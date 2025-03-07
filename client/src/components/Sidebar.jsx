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
  SendToBack,
  Calendar,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/button/Button";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser({ name: data.name, email: data.email, role: data.role });
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        // Clear any client-side authentication data if needed here.
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menuSections =
    user.role === "Moving Company"
      ? [
          {
            title: "Overview",
            items: [
              { id: "home", href: "/dashboard", icon: Home, label: "Dashboard" },
              { id: "find-move", href: "/dashboard/find-move", icon: Users, label: "Find Move" },
            ],
          },
        ]
      : [
          {
            title: "Overview",
            items: [
              { id: "home", href: "/dashboard", icon: Home, label: "Dashboard" },
              { id: "moves", href: "/dashboard/moves", icon: SendToBack, label: "Moves" },
            ],
          },
          {
            title: "Moving",
            items: [
              { id: "book", href: "/dashboard/book-move", icon: ReceiptText, label: "Book a Move" },
              { id: "inventory", href: "/dashboard/inventory", icon: Package, label: "Inventory" },
              { id: "bids", href: "/dashboard/bids", icon: ListCheck, label: "Bids" },
            ],
          },
        ];

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
                      <Link
                        key={item.id}
                        href={item.href}
                        className="flex items-center px-4 py-3 text-sm rounded-xl transition-all group relative text-gray-600 hover:bg-blue-50 hover:text-[#0063ff]"
                      >
                        <item.icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-[#0063ff]" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
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
                  {user.name || "Loading..."}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email || "Loading..."}</p>
              </div>
              <div className="relative">
                <ChevronRight className={`h-5 w-5 transition-transform ${isProfileMenuOpen ? "rotate-90" : ""}`} />
              </div>
            </div>
            {isProfileMenuOpen && (
              <div className="mb-2 space-y-1 px-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 rounded hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
