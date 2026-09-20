"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  X, LayoutDashboard, ShoppingCart, Package, 
  Settings, LogOut, Users, BarChart3, TrendingUp, UserCog, Receipt
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  // প্রফেশনাল ক্যাটাগরি ভিত্তিক মেনু স্ট্রাকচার
  const sidebarGroups = [
    {
      title: "OVERVIEW",
      links: [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
      ]
    },
    {
      title: "COMMERCE",
      links: [
        { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: "12" }, // ব্যাজ যুক্ত করা হলো
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Reports", href: "/admin/reports", icon: BarChart3 },
      ]
    },
    {
      title: "SYSTEM",
      links: [
        { name: "Settings", href: "/admin/settings", icon: Settings },
        { name: "Staff & Roles", href: "/admin/staff", icon: UserCog },
      ]
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 mb-8 mt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#F49547] flex items-center justify-center shadow-lg shadow-[#F49547]/20">
          <span className="font-bold text-white text-xl">K</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">Kidz Oras</h1>
          <p className="text-xs text-gray-400 font-medium tracking-wider uppercase mt-0.5">Admin Suite</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-6 scrollbar-hide">
        {sidebarGroups.map((group, index) => (
          <div key={index}>
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive 
                        ? "bg-[#F49547]/10 text-[#F49547] font-medium" 
                        : "text-gray-400 hover:text-white hover:bg-[#1c1b1b]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={isActive ? "text-[#F49547]" : "text-gray-500 group-hover:text-gray-300 transition-colors"} />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#F49547] text-white' : 'bg-[#1f1f1f] text-gray-300'}`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Modern Logout Button */}
      <div className="p-4 mt-auto border-t border-[#1f1f1f] bg-[#131313]">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200 group"
        >
          <div className="p-1.5 rounded-md group-hover:bg-red-400/20 transition-colors">
            <LogOut size={18} />
          </div>
          <span className="font-medium">Logout Account</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:block bg-[#131313] fixed left-0 top-0 h-full w-[260px] border-r border-[#1f1f1f] z-40">
        <SidebarContent />
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <nav className={`md:hidden fixed left-0 top-0 h-full w-[260px] bg-[#131313] shadow-2xl flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="absolute right-4 top-4">
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#1f1f1f] transition-colors">
            <X size={20} />
          </button>
        </div>
        <SidebarContent />
      </nav>
    </>
  );
}