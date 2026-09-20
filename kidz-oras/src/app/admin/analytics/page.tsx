"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { 
  Menu, Bell, Calendar, Download, TrendingUp, 
  DollarSign, ShoppingCart, Users, Activity, ArrowUpRight, MoreVertical 
} from "lucide-react";

export default function AnalyticsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30 flex">
      
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen w-full relative">
        
        {/* Header - Brand Name & New Order Alert */}
        <header className="bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-30 border-b border-[#1f1f1f] flex justify-between items-center h-16 px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-[#F49547] p-2 rounded-lg">
              <Menu size={24} />
            </button>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-white tracking-wide">KIDZ ORAS</h1>
              <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Premium Kids Fashion</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* New Order Alert Button */}
            <button className="hidden md:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-500/20 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              New Order (৩)
            </button>
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#1a1a1a] transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F49547] rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Analytics Content */}
        <main className="p-4 md:p-8 space-y-6 w-full pb-20">
          
          {/* Top Section & Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Revenue Analytics</h2>
              <p className="text-gray-400 mt-1 text-sm">Detailed performance metrics of your store.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#121212] border border-[#1f1f1f] rounded-xl text-sm font-medium hover:bg-[#1a1a1a] transition-colors">
                <Calendar size={16} className="text-gray-400" />
                <span>Last 30 Days</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F49547] text-white rounded-xl text-sm font-bold hover:bg-[#d87c33] transition-colors shadow-lg shadow-[#F49547]/20">
                <Download size={16} />
                <span className="hidden md:inline">Export Report</span>
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <div className="p-2 bg-[#F49547]/10 text-[#F49547] rounded-lg"><DollarSign size={18} /></div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-2">৳ ৯,৮৩,৪১০</h3>
              <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                <TrendingUp size={16} /> <span>+৩.৩৪%</span> <span className="text-gray-600 font-normal">vs last week</span>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-sm font-medium">Total Orders</p>
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><ShoppingCart size={18} /></div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-2">৫৮,৩৭৫</h3>
              <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                <TrendingUp size={16} /> <span>+৫.২%</span> <span className="text-gray-600 font-normal">vs last week</span>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-sm font-medium">Store Visitors</p>
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Users size={18} /></div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-2">২,৩৭,৭৮২</h3>
              <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                <TrendingUp size={16} /> <span>+৮.০২%</span> <span className="text-gray-600 font-normal">vs last week</span>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-sm font-medium">Conversion Rate</p>
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Activity size={18} /></div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-2">৩.৮%</h3>
              <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                <TrendingUp size={16} /> <span>+১.২%</span> <span className="text-gray-600 font-normal">vs last week</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Line Chart (Mock SVG) */}
            <div className="lg:col-span-2 bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Sales Overview</h3>
                  <p className="text-sm text-gray-500">Daily performance for the current month</p>
                </div>
                <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-[#2a2a2a]">
                  <button className="px-3 py-1 text-xs font-bold text-white bg-[#2a2a2a] rounded-md shadow-sm">Revenue</button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-white transition-colors">Orders</button>
                </div>
              </div>
              
              <div className="flex-1 relative w-full min-h-[250px] flex items-end">
                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-600 font-mono pb-8">
                  <span>15k</span><span>10k</span><span>5k</span><span>0</span>
                </div>
                {/* Horizontal Grid Lines */}
                <div className="absolute left-8 right-0 top-0 h-full flex flex-col justify-between pb-8">
                  <div className="border-b border-[#1f1f1f] w-full"></div>
                  <div className="border-b border-[#1f1f1f] w-full"></div>
                  <div className="border-b border-[#1f1f1f] w-full"></div>
                  <div className="border-b border-[#1f1f1f] w-full"></div>
                </div>
                {/* Mock SVG Line Chart (EzMart Style) */}
                <div className="absolute left-8 right-0 top-0 bottom-8 overflow-hidden">
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F49547" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#F49547" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,30 Q10,25 20,28 T40,15 T60,25 T80,10 T100,20 L100,40 L0,40 Z" fill="url(#gradientArea)" />
                    <path d="M0,30 Q10,25 20,28 T40,15 T60,25 T80,10 T100,20" fill="none" stroke="#F49547" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Tooltip Dot */}
                    <circle cx="40" cy="15" r="2" fill="#050505" stroke="#F49547" strokeWidth="1" />
                  </svg>
                  {/* Mock Tooltip */}
                  <div className="absolute left-[35%] top-[10%] bg-[#1a1a1a] border border-[#F49547]/50 px-2 py-1 rounded text-xs font-bold text-white shadow-lg shadow-[#F49547]/10 -translate-x-1/2 -translate-y-full">
                    ৳ ১৪,৫২১
                  </div>
                </div>
                {/* X-Axis Labels */}
                <div className="absolute left-8 right-0 bottom-0 flex justify-between text-xs text-gray-600 font-mono">
                  <span>10 Aug</span><span>12 Aug</span><span>14 Aug</span><span>16 Aug</span><span>18 Aug</span><span>20 Aug</span>
                </div>
              </div>
            </div>

            {/* Donut Chart (Order Status) */}
            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Order Status</h3>
                <MoreVertical size={16} className="text-gray-500 cursor-pointer" />
              </div>
              
              {/* CSS Conic Gradient Donut Chart */}
              <div className="relative w-48 h-48 rounded-full flex items-center justify-center mb-8" 
                   style={{ background: 'conic-gradient(#10b981 0% 60%, #F49547 60% 85%, #ef4444 85% 95%, #3b82f6 95% 100%)' }}>
                {/* Inner Circle to make it a donut */}
                <div className="absolute w-36 h-36 bg-[#121212] rounded-full flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">৯৯২</span>
                  <span className="text-xs text-gray-500">Total Orders</span>
                </div>
              </div>

              {/* Legends */}
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="text-gray-300">Completed</span></div>
                  <span className="font-bold text-white">৫৮৪</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#F49547]"></span><span className="text-gray-300">Pending</span></div>
                  <span className="font-bold text-white">২৩৪</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="text-gray-300">Canceled</span></div>
                  <span className="font-bold text-white">৪৭</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-gray-300">Returned</span></div>
                  <span className="font-bold text-white">১২৭</span>
                </div>
              </div>
            </div>

          </div>

          {/* Traffic Sources & Target */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Traffic Sources Progress Bars */}
            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-1">Traffic Sources</h3>
              <p className="text-sm text-gray-500 mb-6">Where your customers are coming from</p>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">Direct Traffic</span>
                    <span className="text-white font-bold">৪০%</span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#F49547] h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">Organic Search (Google)</span>
                    <span className="text-white font-bold">৩০%</span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">Social Media (FB, Insta)</span>
                    <span className="text-white font-bold">১৫%</span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">Referral & Others</span>
                    <span className="text-white font-bold">১৫%</span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Target */}
            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-lg font-bold text-white mb-6 w-full text-left">Monthly Target</h3>
              
              {/* Half Donut / Gauge Chart */}
              <div className="relative w-48 h-24 overflow-hidden mb-4">
                <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-[#1a1a1a] border-t-[#F49547] border-r-[#F49547] transform -rotate-45"></div>
                <div className="absolute bottom-0 w-full text-center">
                  <span className="text-3xl font-bold text-white">৮৫%</span>
                </div>
              </div>
              
              <h4 className="text-md font-bold text-white mb-1">Great Progress! 🎉</h4>
              <p className="text-sm text-gray-500 mb-6 max-w-xs">Our achievement increased by ৳২০০,০০০, let's reach 100% this month.</p>
              
              <div className="flex justify-between w-full max-w-xs p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Target</p>
                  <p className="text-sm font-bold text-white">৳ ৬০০,০০০</p>
                </div>
                <div className="w-px bg-[#2a2a2a]"></div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Achieved</p>
                  <p className="text-sm font-bold text-[#F49547]">৳ ৫১০,০০০</p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}