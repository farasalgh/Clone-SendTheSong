"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6">
      <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-3xl md:text-4xl font-bold font-['Reenie_Beanie']">solifess</h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Button asChild variant="ghost" className="text-gray-800 hover:text-gray-600">
            <Link href="/message">Kirim</Link>
          </Button>
          <Button asChild variant="ghost" className="text-gray-800 hover:text-gray-600">
            <Link href="/search-message">Temukan</Link>
          </Button>
          <Button asChild variant="ghost" className="text-gray-800 hover:text-gray-600">
            <Link href="/dukungan">Dukungan</Link>
          </Button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white">
          <div className="flex flex-col space-y-2 p-4">
            <Button asChild variant="ghost" className="w-full justify-start text-gray-800 hover:text-gray-600">
              <Link href="/message">Kirim</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start text-gray-800 hover:text-gray-600">
              <Link href="/search-message">Temukan</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start text-gray-800 hover:text-gray-600">
              <Link href="/dukungan">Dukungan</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}