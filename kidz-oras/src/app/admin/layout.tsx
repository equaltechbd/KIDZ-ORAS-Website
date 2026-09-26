"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import OrderAlert from "@/components/admin/OrderAlert";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrderAlert />
      {children}
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-[#0a0a0a] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30">
      {/* সেন্ট্রাল সাইডবার (যেখানে সব অরিজিনাল লিংক আছে) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* সেন্ট্রাল হেডার */}
      <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
      
      {/* পেজের মূল কন্টেন্ট */}
      <main className="md:ml-[260px] p-4 md:p-8 min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
}