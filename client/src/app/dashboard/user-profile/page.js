"use client";

import { useState, useEffect } from "react";
import { UserCircle, Bell, Users, LogOut } from "lucide-react";
import  Button  from "@/components/elements/button/Button";
import Link from "next/link";

export default function UserProfile() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from API or authentication provider
    fetch("http://127.0.0.1:5000/user/profile", { credentials: "include" }) // Ensure authentication
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user profile:", err));
  }, []);

  const handleLogout = () => {
    fetch("http://127.0.0.1:5000/logout", { method: "POST", credentials: "include" })
      .then(() => {
        setUser(null);
        window.location.href = "/login"; // Redirect after logout
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  return (
    <div className="p-4 border-t border-gray-100 relative">
      {/* Profile (Hidden When Dropdown is Open) */}
      {!isProfileMenuOpen && user && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-100 transition-all duration-200 cursor-pointer"
          onClick={() => setIsProfileMenuOpen(true)}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
            <UserCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-600 truncate">{user.email}</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Bell className="h-5 w-5 text-blue-500 hover:text-blue-700 transition" />
          </Button>
        </div>
      )}

      {/* Dropdown Menu */}
      {isProfileMenuOpen && user && (
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
              <p className="text-sm font-semibold text-white">{user.name}</p>
              <p className="text-xs text-blue-200">{user.email}</p>
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
            onClick={() => console.log("Switch Account")}
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
  );
}
