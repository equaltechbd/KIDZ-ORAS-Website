"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { 
  Menu, Bell, Search, TrendingUp, TrendingDown, DollarSign, 
  ShoppingCart, Activity, CreditCard, MoreVertical, ArrowUpRight
} from "lucide-react";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // 🔴 'flex' ক্লাসটি রিমুভ করে দেওয়া হয়েছে যাতে সাইডবার এবং মেইন কন্টেন্ট ওভারল্যাপ না করে
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30">
      
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      {/* 🔴 'w-full' এবং 'flex-1' রিমুভ করা হয়েছে, এখন শুধু সাইডবারের ২৫০px মার্জিন থাকবে */}
      <div className="md:ml-[260px] flex flex-col min-h-screen">
        
        {/* Modern Top Header (Profile Removed, Search Centered) */}
        <header className="bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-30 border-b border-[#1f1f1f] flex justify-between items-center h-16 px-4 md:px-8">
          
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-[#F49547] p-2 rounded-lg">
              <Menu size={24} />
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 bg-[#121212] border border-[#1f1f1f] rounded-full px-4 py-2 w-full max-w-2xl focus-within:border-[#F49547]/50 focus-within:ring-1 focus-within:ring-[#F49547]/50 transition-all">
              <Search size={18} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Search stock, orders, etc..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600 focus:ring-0"
              />
              <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono font-bold bg-[#1a1a1a] px-1.5 py-0.5 rounded">
                <span>⌘</span><span>K</span>
              </div>
            </div>
          </div>
          
          {/* Notification Bell Only */}
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#1a1a1a] transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F49547] border-2 border-[#050505] rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Main View */}
        <main className="p-4 md:p-8 space-y-8">
          
          {/* Page Title */}
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">eCommerce Overview</h2>
            <p className="text-gray-400 mt-1 text-sm">Track your sales performance and commerce metrics.</p>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-sm font-medium">Total Sales</p>
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <DollarSign size={18} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-2">৳ ১২৮,৪৩০</h3>
              <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                <TrendingUp size={16} />
                <span>+১৮.২%</span>
                <span className="text-gray-600 ml-1 font-normal">from last month</span>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-sm font-medium">Total Orders</p>
                <div className="p-2 bg-[#F49547]/10 text-[#F49547] rounded-lg">
                  <ShoppingCart size={18} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-2">৫৮,৩৭৫</h3>
              <div className="flex items-center gap-1.5 text-red-400 text-sm font-medium">
                <TrendingDown size={16} />
                <span>-২.৮%</span>
                <span className="text-gray-600 ml-1 font-normal">from last month</span>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-sm font-medium">Conversion Rate</p>
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                  <Activity size={18} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-2">৩.২৪%</h3>
              <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                <TrendingUp size={16} />
                <span>+০.৮%</span>
                <span className="text-gray-600 ml-1 font-normal">from last month</span>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-sm font-medium">Avg Order Value</p>
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                  <CreditCard size={18} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-2">৳ ৬৪.৫০</h3>
              <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                <TrendingUp size={16} />
                <span>+৪.৮%</span>
                <span className="text-gray-600 ml-1 font-normal">from last month</span>
              </div>
            </div>
          </div>

          {/* Grid for Table and Side Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#121212] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[#1f1f1f] flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-white">Recent Orders</h3>
                  <p className="text-sm text-gray-500 mt-1">Latest transactions from your store</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2a2a] rounded-lg text-sm font-medium transition-colors">
                  View All <ArrowUpRight size={16} className="text-[#F49547]" />
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0a0a0a]/50 text-gray-400 text-xs tracking-wider border-b border-[#1f1f1f]">
                      <th className="py-4 px-6 font-medium">ORDER INFO</th>
                      <th className="py-4 px-6 font-medium">CUSTOMER</th>
                      <th className="py-4 px-6 font-medium">AMOUNT</th>
                      <th className="py-4 px-6 font-medium">STATUS</th>
                      <th className="py-4 px-6 font-medium text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors group">
                      <td className="py-4 px-6">
                        <p className="font-mono text-white font-medium">#KO-1001</p>
                        <p className="text-xs text-gray-500 mt-1">Sep 01, 2026</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xs font-bold text-gray-400">SI</div>
                          <div>
                            <p className="text-gray-300 font-medium">Samiul Islam</p>
                            <p className="text-xs text-gray-500">samiul@email.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-white">৳ ১,২০০</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-xs font-medium border border-yellow-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Pending
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-gray-500 hover:text-white p-1 rounded-md hover:bg-[#2a2a2a] transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                    
                    <tr className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors group">
                      <td className="py-4 px-6">
                        <p className="font-mono text-white font-medium">#KO-1002</p>
                        <p className="text-xs text-gray-500 mt-1">Sep 01, 2026</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xs font-bold text-gray-400">RH</div>
                          <div>
                            <p className="text-gray-300 font-medium">Rafiq Hasan</p>
                            <p className="text-xs text-gray-500">rafiq@email.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-white">৳ ২,৪৫০</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Completed
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-gray-500 hover:text-white p-1 rounded-md hover:bg-[#2a2a2a] transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Categories Area */}
            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-white mb-1">Top Categories</h3>
              <p className="text-sm text-gray-500 mb-6">Revenue by product types</p>
              
              <div className="space-y-5 flex-1">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">Toys & Games</span>
                    <span className="text-white font-bold">৳ ৪৫,০০০</span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#F49547] h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">Kids Clothing</span>
                    <span className="text-white font-bold">৳ ৩২,৫০০</span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "55%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">School Supplies</span>
                    <span className="text-white font-bold">৳ ১২,৪০০</span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}