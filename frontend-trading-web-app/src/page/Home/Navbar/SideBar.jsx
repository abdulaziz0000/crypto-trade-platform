import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import {
  Home,
  LayoutDashboard,
  Bookmark,
  Activity,
  Wallet,
  Landmark,
  CreditCard,
  User,
  LogOut
} from "lucide-react"

import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "@/State/Auth/Action" // adjust path if needed

const menu = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Portfolio", icon: LayoutDashboard, path: "/portfolio" },
  { name: "Watchlist", icon: Bookmark, path: "/watchlist" },
  { name: "Activity", icon: Activity, path: "/activity" },
  { name: "Wallet", icon: Wallet, path: "/wallet" },
  { name: "Payment Details", icon: Landmark, path: "/paymentDetails" },
  { name: "Withdrawal", icon: CreditCard, path: "/withdrawal" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "StockDetails", icon: User, path: "/stockDetails" },
]

const SideBar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <div className="mt-10 px-4 flex flex-col h-full justify-between">

      {/* Menu Items */}
      <div className="space-y-3">
        {menu.map((item, index) => {
          const Icon = item.icon
          return (
            <SheetClose  key={index} asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center gap-4 py-6 justify-start"
                onClick={() => navigate(item.path)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Button>
 
            </SheetClose>
          )
        })}
      </div>

     <Button
  variant="ghost"
  className="w-full justify-start gap-4 py-6 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
  onClick={handleLogout}
>
  <LogOut className="h-5 w-5" />
  <span>Logout</span>
</Button>

    </div>
  )
}

export default SideBar