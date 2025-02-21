import { Menu, TableIcon as TableBar, CalendarRange, Truck, Calculator, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: Menu, label: "Menu", color: "text-green-600" },
  { icon: TableBar, label: "Table Services", color: "text-gray-600" },
  { icon: CalendarRange, label: "Reservation", color: "text-gray-600" },
  { icon: Truck, label: "Delivery", color: "text-gray-600" },
  { icon: Calculator, label: "Accounting", color: "text-gray-600" },
  { icon: Settings, label: "Settings", color: "text-gray-600" },
]

export function AppSidebar() {
  return (
    <div className="w-64 p-4 border-r h-screen">
      <div className="flex items-center gap-2 mb-8">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg"
          alt="Chili POS Logo"
          className="w-8 h-8"
        />
        <span className="font-semibold">CHILI POS</span>
      </div>
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <Button key={index} variant="ghost" className={`w-full justify-start ${item.color}`}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
      <Button variant="ghost" className="w-full justify-start mt-auto text-gray-600 absolute bottom-4">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}

