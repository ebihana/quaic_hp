"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function CompetitionNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Overview",
      href: "/competition/overview",
    },
    {
      name: "Data",
      href: "/competition/data",
    },
    {
      name: "Models",
      href: "/competition/models",
    },
    {
      name: "Discussion",
      href: "/competition/discussion",
    },
    {
      name: "Leaderboard",
      href: "/competition/leaderboard",
    },
  ]

  return (
    <nav className="flex border-b">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 -mb-px",
            pathname === item.href
              ? "border-blue-700 text-blue-700"
              : "border-transparent text-muted-foreground hover:text-blue-700",
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
