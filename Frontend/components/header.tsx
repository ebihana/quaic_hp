"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignInModal, RegisterModal } from "@/components/auth-modals"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, User } from "lucide-react"

export default function Header() {
  const { user, logout } = useAuth()

  if (user) {
    return (
      <header className="border-b bg-white h-16 px-6 flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    )
  }

  return (
    <header className="border-b bg-white h-16 px-6 flex items-center justify-end">
      <div className="flex gap-2">
        <SignInModal>
          <Button variant="outline" className="border-blue-700 text-blue-500 hover:bg-blue-50">
            Sign in
          </Button>
        </SignInModal>
        <RegisterModal>
          <Button className="bg-blue-700 hover:bg-blue-700">Register</Button>
        </RegisterModal>
      </div>
    </header>
  )
}
