/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
// আমাদের আসল সাইডবার কম্পোনেন্ট ইম্পোর্ট করা হলো
import Sidebar from "@/components/admin/Sidebar";
import { 
  Menu, Bell, TrendingUp, DollarSign, ShoppingBag, 
  Clock, Grid, ArrowRight 
} from "lucide-react";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // সম্পূর্ণ অ্যাডমিন প্যানেলের পার্মানেন্ট ডার্ক থিম
    <div className="bg-[#0a0a0a] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30">
      
      {/* ---------------- লাইভ Sidebar Component ---------------- */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* ---------------- Top Header ---------------- */}
      <header className="bg-[#131313]/80 backdrop-blur-md sticky top-0 z-30 border-b border-[#1f1f1f] flex justify-between items-center h-16 px-4 md:px-8 md:ml-[260px]">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-[#F49547] p-2 rounded-lg">
            <Menu size={24} />
          </button>
          <div className="text-lg font-bold text-white hidden md:block">Overview</div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#1c1b1b] transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#1c1b1b] border border-[#1f1f1f] overflow-hidden">
            <img alt="Admin Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Vfj2tOVTojC_dn1c4lD0LhWFz3lz9_AJdIkGRJZF48kgrpzGunfwZmtiSCWSc5pWjOGrPRHfEfOHQ6gfJLv_F8E8dRRFcCjflG0PHJ_uM4H4TLMiZi8AbrRVHSpYCc_794n5Uqbr-6S3o5QYqp8sZr07isEsUOKQkFPobHV7tTv2ianbJJFhV6Y9fKk9ahsN_aV3kMg9zCY3IAHPphz8ctmH_QfzUDcrhcoWOdqehePfoKNPa7gs" />
          </div>
        </div>
      </header>

      {/* ---------------- Main Content ---------------- */}
      <main className="md:ml-[260px] p-4 md:p-8 min-h-[calc(100vh-64px)]">
        
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Welcome back. Here is your daily summary.</p>
        </div>

        {/* Stats Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Stat Card 1: Revenue */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 md:p-6 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#F49547]/5 rounded-full blur-2xl group-hover:bg-[#F49547]/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <DollarSign size={20} className="text-[#F49547]" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full text-xs font-bold">
                <TrendingUp size={14} />
                <span>+১২%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">মোট সেলস (Total Revenue)</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">৳ ৩২,৫০০</h3>
            </div>
          </div>

          {/* Stat Card 2: Orders */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 md:p-6 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#41C1C0]/5 rounded-full blur-2xl group-hover:bg-[#41C1C0]/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <ShoppingBag size={20} className="text-[#41C1C0]" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">মোট অর্ডার (Total Orders)</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">১২৪</h3>
            </div>
          </div>

          {/* Stat Card 3: Pending */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 md:p-6 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <Clock size={20} className="text-yellow-500" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">পেন্ডিং অর্ডার (Pending Orders)</p>
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 tracking-tight">১৫</h3>
            </div>
          </div>

          {/* Stat Card 4: Products */}
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 md:p-6 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <Grid size={20} className="text-blue-400" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">মোট প্রোডাক্ট (Total Products)</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">৪৫</h3>
            </div>
          </div>

        </div>

        {/* Recent Orders Table Area */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
          <div className="p-5 md:p-6 border-b border-[#1f1f1f] flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Recent Orders</h3>
            <button className="text-[#F49547] hover:text-[#F49547]/80 font-medium text-sm transition-colors flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#0a0a0a] text-gray-500 uppercase text-xs tracking-wider border-b border-[#1f1f1f]">
                  <th className="py-3 px-6 font-medium">Order ID</th>
                  <th className="py-3 px-6 font-medium">Customer Name</th>
                  <th className="py-3 px-6 font-medium">Date</th>
                  <th className="py-3 px-6 font-medium text-right">Total Amount</th>
                  <th className="py-3 px-6 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                
                {/* Row 1 */}
                <tr className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors cursor-pointer group">
                  <td className="py-4 px-6 font-mono text-white group-hover:text-[#F49547] transition-colors">#KO-1001</td>
                  <td className="py-4 px-6 text-gray-300">Samiul Islam</td>
                  <td className="py-4 px-6 text-gray-500 font-mono text-xs">Sep 01, 2026</td>
                  <td className="py-4 px-6 text-right text-white font-medium">৳ ১,২০০</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">
                      Pending
                    </span>
                  </td>
                </tr>
                
                {/* Row 2 */}
                <tr className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors cursor-pointer group">
                  <td className="py-4 px-6 font-mono text-white group-hover:text-[#F49547] transition-colors">#KO-1002</td>
                  <td className="py-4 px-6 text-gray-300">Rafiq Hasan</td>
                  <td className="py-4 px-6 text-gray-500 font-mono text-xs">Sep 01, 2026</td>
                  <td className="py-4 px-6 text-right text-white font-medium">৳ ২,৪৫০</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      Completed
                    </span>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors cursor-pointer group">
                  <td className="py-4 px-6 font-mono text-white group-hover:text-[#F49547] transition-colors">#KO-1003</td>
                  <td className="py-4 px-6 text-gray-300">Nusrat Jahan</td>
                  <td className="py-4 px-6 text-gray-500 font-mono text-xs">Aug 31, 2026</td>
                  <td className="py-4 px-6 text-right text-white font-medium">৳ ৮৫০</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      Completed
                    </span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}