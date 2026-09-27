"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import OrderAlert from "@/components/admin/OrderAlert";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <div className="bg-[#050505] min-h-screen w-full overflow-x-hidden">{children}</div>;
  }

  return (
    // overflow-x-hidden যোগ করা হয়েছে যাতে স্ক্রিনের বাইরে কিছু না যায়
    <div className="bg-[#0a0a0a] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30 overflow-x-hidden w-full relative">
      <OrderAlert />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
      
      {/* অটোমেটিক রিসাইজের জন্য w-[calc(100%-260px)] যোগ করা হয়েছে */}
      <main className="md:ml-[260px] md:w-[calc(100%-260px)] p-4 md:p-8 min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
}