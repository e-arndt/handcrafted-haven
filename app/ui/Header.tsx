"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
}

export default function Header() {
  return (
    <header className="bg-[#7A9B76]">
      
      {/* TOP BAR */}
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Handcrafted Haven logo"
            width={128}
            height={128}
            priority
          />
          <span className="text-2xl font-heading font-bold text-[#0A4F5C]">
            
          </span>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-6 text-sm">
          
          {/* Auth */}
          <div className="flex gap-1">
            <Link href="/login" className="hover:underline">
              Sign in
            </Link>
            <span>or</span>
            <Link href="/register" className="hover:underline">
              Create an Account
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2">
            <input
              type="text"
              placeholder="Search all products..."
              className="rounded border px-3 py-1 text-sm focus:outline-none focus:ring"
            />
            <button aria-label="Search">🔍</button>
          </div>

          {/* Cart */}
          <Link href="/cart" className="flex items-center gap-1">
            🛒 <span className="hidden sm:inline">Cart</span>
          </Link>

        </div>
      </div>

      {/* BOTTOM BAR */}
    </header>
  );
}
