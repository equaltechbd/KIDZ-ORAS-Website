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

  // যদি ইউজার লগইন পেজে থাকে, তাহলে সাইডবার বা হেডার লোড হবে না, কোনো স্পিনারও দেখাবে না
  if (pathname === "/admin/login") {
    return <div className="bg-[#050505] min-h-screen">{children}</div>;
  }

  // ড্যাশবোর্ডের আসল লেআউট
  return (
    <div className="bg-[#0a0a0a] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30">
      <OrderAlert />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
      <main className="md:ml-[260px] p-4 md:p-8 min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
}