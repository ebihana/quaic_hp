"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, BookOpen, Upload, BarChart3 } from "lucide-react"
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
      name: "Competition Overview",
      href: "/competition/overview",
      icon: FileText,
    },
    {
      name: "AI Recipe",
      href: "/ai-recipe",
      icon: BookOpen,
    },
    {
      name: "Submission",
      href: "/submission",
      icon: Upload,
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: BarChart3,
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
        {menuItems.map((item) => {
          return (
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
          )
        })}
      </nav>
    </div>
  )
}
