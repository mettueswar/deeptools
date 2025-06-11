'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="bg-indigo-600 text-white shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold flex items-center gap-2">
                    DeepTools.Org
                </Link>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-white/90 hover:text-white transition-colors hover:underline">
                        Home
                    </Link>
                    <Link href="/tools/rewriter" className="text-sm font-medium text-white/90 hover:text-white transition-colors hover:underline">
                        Paragraph Rewriter
                    </Link>
                    <Button className="bg-white text-indigo-600 hover:bg-white/90 font-medium transition-colors shadow-sm">
                        Try Pro
                    </Button>
                </nav>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-indigo-700 px-4 py-3 space-y-2">
                    <Link href="/" className="block text-sm font-medium text-white hover:underline" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <Link href="/tools/rewriter" className="block text-sm font-medium text-white hover:underline" onClick={() => setIsOpen(false)}>
                        Paragraph Rewriter
                    </Link>
                    <Button className="w-full bg-white text-indigo-600 hover:bg-white/90 font-medium shadow-sm" onClick={() => setIsOpen(false)}>
                        Try Pro
                    </Button>
                </div>
            )}
        </header>
    )
}
