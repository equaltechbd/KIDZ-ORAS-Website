"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  X, LayoutDashboard, ShoppingCart, Package, 
  Settings, LogOut, Users, BarChart3, TrendingUp, 
  Star, Receipt, Headphones 
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

  // আপডেটেড মেনু লিস্ট
  const sidebarGroups = [
    {
      title: "OVERVIEW",
      links: [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
        { name: "Reviews", href: "/admin/reviews", icon: Star },
        { name: "Business Records", href: "/admin/reports", icon: BarChart3 },
      ]
    },
    {
      title: "COMMERCE",
      links: [
        { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: "12" },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Invoices", href: "/admin/invoices", icon: Receipt },
        { name: "Customer Support", href: "/admin/support", icon: Headphones },
      ]
    },
    {
      title: "SYSTEM",
      links: [
        { name: "Settings", href: "/admin/settings", icon: Settings },
      ]
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Top spacing since logo is removed from here */}
      <div className="pt-6"></div>

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

      {/* 🔴 Profile & Logout Section (Side-by-Side Layout) 🔴 */}
      <div className="p-4 mt-auto border-t border-[#1f1f1f] bg-[#131313]">
        <div className="flex items-center justify-between gap-2 bg-[#1a1a1a] p-2 rounded-xl border border-[#2a2a2a] hover:border-[#F49547]/50 transition-colors">
          
          {/* Clickable Profile Area (Goes to /admin/profile) */}
          <Link href="/admin/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 flex-1 overflow-hidden cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-[#2a2a2a] border border-[#333] overflow-hidden shrink-0">
              <img alt="Admin Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Vfj2tOVTojC_dn1c4lD0LhWFz3lz9_AJdIkGRJZF48kgrpzGunfwZmtiSCWSc5pWjOGrPRHfEfOHQ6gfJLv_F8E8dRRFcCjflG0PHJ_uM4H4TLMiZi8AbrRVHSpYCc_794n5Uqbr-6S3o5QYqp8sZr07isEsUOKQkFPobHV7tTv2ianbJJFhV6Y9fKk9ahsN_aV3kMg9zCY3IAHPphz8ctmH_QfzUDcrhcoWOdqehePfoKNPa7gs" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-semibold text-white group-hover:text-[#F49547] transition-colors truncate">Hasib Al Hasan</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-gray-400">Super Admin</span>
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-0.5" title="Working from Home">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Remote
                </span>
              </div>
            </div>
          </Link>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 shrink-0"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav className="hidden md:block bg-[#131313] fixed left-0 top-0 h-full w-[260px] border-r border-[#1f1f1f] z-40">
        <SidebarContent />
      </nav>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
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