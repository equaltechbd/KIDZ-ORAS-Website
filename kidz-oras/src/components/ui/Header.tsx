"use client";

import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-10 py-3 md:py-4 bg-white/95 backdrop-blur-md gap-3 shadow-[0_2px_15px_rgba(0,0,0,0.05)] border-b border-gray-100">
      
      {/* Menu & Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <button aria-label="Menu" className="md:hidden text-gray-600 hover:text-[#E52565] transition-colors">
          <Menu size={26} />
        </button>
        <Link href="/" className="flex items-center">
          <img alt="Kidz Oras Logo" className="h-10 md:h-14 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx02yTRDOJbMk7xjU5ULRxzbKNMTucJICwrA1eAywfJxP-zDT5OoqWvEIOHDzC15-nP2b4llzWD7aObmP7FGL0nI2cUNBuiVe25N5UVLo41G3xGLRyzGcjlkax8_2AGm0xJR7RVcx2ik2QmvrBAY4j4RTn4of1i4tuJzTVVf92bP-Wni6VOmsQdqIfkQr75CitP0uesZkol6DpcquXd-Rme4_S3qByKJb1MbE5OnRBToYz08Uik-ceQPH3fQqq5AxIUQ" />
        </Link>
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-1 md:mx-6">
        <div className="relative w-full group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E52565] transition-colors" size={18} />
          <input
            type="text"
            placeholder="পছন্দের পণ্য খুঁজুন..."
            className="w-full bg-[#F5F5F5] border border-transparent rounded-full py-2.5 md:py-3 pl-10 pr-4 text-sm focus:bg-white focus:border-[#E52565]/30 focus:ring-2 focus:ring-[#E52565]/10 transition-all outline-none"
          />
        </div>
      </div>

      {/* Nav Links & Cart */}
      <div className="flex items-center gap-5 md:gap-8 shrink-0">
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-bold text-sm">
          <Link href="/" className="text-gray-600 hover:text-[#E52565] transition-colors">হোম</Link>
          <Link href="/shop" className="text-gray-600 hover:text-[#E52565] transition-colors">শপ</Link>
          <Link href="/policies" className="text-gray-600 hover:text-[#E52565] transition-colors">পলিসি</Link>
        </div>

        <Link href="/cart" className="text-gray-700 hover:text-[#E52565] transition-colors relative mr-1 md:mr-0">
          <ShoppingCart size={24} className="md:w-6 md:h-6" />
          <span className="absolute -top-1.5 -right-2 bg-[#E52565] text-white text-[10px] md:text-xs font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">2</span>
        </Link>
      </div>
    </nav>
  );
}