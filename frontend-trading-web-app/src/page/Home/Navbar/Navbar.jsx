import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { Menu, SearchIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SideBar from "./SideBar"

const Navbar = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="px-4 py-4 border-b flex items-center justify-between">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            className="w-72 border-r-0 flex flex-col justify-center"
            side="left"
          >
            <SheetHeader>
              <SheetTitle>
                <div className="text-3xl flex justify-center items-center gap-1">
                  <Avatar>
                    <AvatarImage src="https://cdn.pixabay.com/photo/2017/08/14/14/38/bitcoin-2640692_1280.png" />
                  </Avatar>
                  <div>
                    <span className="font-bold text-orange-400">trade</span>
                    <span>world</span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>

            <SideBar />
          </SheetContent>
        </Sheet>

        <Link to="/" className="text-sm lg:text-base font-semibold">
          Trade World
        </Link>

        <Button variant="outline" className="hidden md:flex items-center gap-3">
          <SearchIcon className="h-4 w-4" />
          <span>Search</span>
        </Button>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <Avatar>
          <AvatarFallback>
            {auth.user?.fullName?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default Navbar