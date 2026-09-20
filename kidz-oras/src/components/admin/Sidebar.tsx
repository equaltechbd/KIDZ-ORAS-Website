"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, LayoutDashboard, ShoppingCart, Package, Settings, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // 🔴 লগআউট ফাংশন 🔴
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col bg-[#131313] fixed left-0 top-0 h-full w-[260px] border-r border-[#1f1f1f] py-4 z-40">
        <div className="px-6 mb-8 mt-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F49547]/10 flex items-center justify-center border border-[#F49547]/20">
            <span className="font-bold text-[#F49547] text-xl">K</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Kidz Oras Admin</h1>
            <p className="text-xs text-gray-400">Management Suite</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all border-l-4 ${isActive ? "border-[#F49547] text-white font-semibold bg-[#1c1b1b] rounded-l-none" : "border-transparent text-gray-400 hover:text-white hover:bg-[#1c1b1b]"}`}
              >
                <Icon size={20} className={isActive ? "text-[#F49547]" : ""} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Desktop Logout Button */}
        <div className="px-4 mt-auto pt-4 border-t border-[#1f1f1f]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <nav className={`md:hidden fixed left-0 top-0 h-full w-[260px] bg-[#131313] border-r border-[#1f1f1f] flex flex-col py-4 z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-end px-4 mb-2">
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#1c1b1b]">
            <X size={24} />
          </button>
        </div>
        
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F49547]/10 flex items-center justify-center border border-[#F49547]/20">
            <span className="font-bold text-[#F49547] text-xl">K</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Kidz Oras Admin</h1>
            <p className="text-xs text-gray-400">Management Suite</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all border-l-4 ${isActive ? "border-[#F49547] text-white font-semibold bg-[#1c1b1b] rounded-l-none" : "border-transparent text-gray-400 hover:text-white hover:bg-[#1c1b1b]"}`}
              >
                <Icon size={20} className={isActive ? "text-[#F49547]" : ""} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Logout Button */}
        <div className="px-4 mt-auto pt-4 border-t border-[#1f1f1f]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}