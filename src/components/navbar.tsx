"use client"

import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 flex h-16 items-center relative">
        <div className="absolute right-4">
          <ThemeToggle />
        </div>
        <div className="w-full text-center">
          <h1 className="text-xl font-bold">性格診断アプリ</h1>
        </div>
      </div>
    </nav>
  )
} 