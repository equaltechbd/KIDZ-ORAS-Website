"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import OrderAlert from "@/components/admin/OrderAlert";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSecurityClearance = async () => {
      // ১. ইউজার লগইন করা আছে কি না চেক করা
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // লগইন করা না থাকলে সরাসরি লগইন পেজ বা হোমে পাঠিয়ে দেবে
        router.push("/admin/login");
        return;
      }

      // ২. আপনি চাইলে এখানে staff_roles টেবিল চেক করে শুধু এমপ্লয়িদের এক্সেস দিতে পারেন
      const { data: roleData } = await supabase
        .from("staff_roles")
        .select("role")
        .eq("email", session.user.email)
        .single();

      if (roleData) {
        setIsAuthorized(true); // এমপ্লয়ি বা অ্যাডমিন হলে পেজ দেখতে পাবে
      } else {
        router.push("/"); // সাধারণ কেউ লগইন করে ফেললে তাকে মেইন সাইটে পাঠাবে
      }
    };

    checkSecurityClearance();
  }, [router, supabase]);

  // সিকিউরিটি চেক হওয়ার সময় লোডিং দেখাবে
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
         <div className="w-8 h-8 border-4 border-[#F49547] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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