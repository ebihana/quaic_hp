"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Trophy, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Competition",
      href: "/competition",
      icon: Trophy,
    },
    {
      name: "Tutorial",
      href: "/tutorial",
      icon: BookOpen,
    },
  ]

  return (
    <div className="w-64 border-r bg-primary text-primary-foreground h-screen sticky top-0">
      <div className="p-6">
        <div className="w-full flex justify-center items-center gap-3">
          <div className="bg-white rounded-lg p-1">
            <Image src="/images/quaic-logo.png" alt="QuAic Logo" width={60} height={60} className="rounded-lg" />
          </div>
          
        </div>
      </div>
      <nav className="space-y-1 px-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-blue-700 text-white"
                : "text-blue-100 hover:bg-blue-700 hover:text-white",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
