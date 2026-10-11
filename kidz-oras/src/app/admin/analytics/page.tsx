"use client";

import { Calendar, Download, DollarSign, ShoppingCart, Users, Activity, MoreVertical } from "lucide-react";

export default function AnalyticsPage() {
  return (
    // এখান থেকে Sidebar, Header এবং md:ml-[260px] মুছে ফেলা হয়েছে
    <div className="space-y-6 pb-10 text-[#e5e2e1]">
      
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

      {/* Key Metrics Grid - Zero State */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
            <div className="p-2 bg-[#F49547]/10 text-[#F49547] rounded-lg"><DollarSign size={18} /></div>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight mb-2">৳ ০</h3>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
            ০.০% <span className="font-normal">vs last week</span>
          </div>
        </div>

        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-sm font-medium">Total Orders</p>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><ShoppingCart size={18} /></div>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight mb-2">০</h3>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
            ০.০% <span className="font-normal">vs last week</span>
          </div>
        </div>

        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-sm font-medium">Store Visitors</p>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Users size={18} /></div>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight mb-2">০</h3>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
            ০.০% <span className="font-normal">vs last week</span>
          </div>
        </div>

        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-sm font-medium">Conversion Rate</p>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Activity size={18} /></div>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight mb-2">০.০%</h3>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
            ০.০% <span className="font-normal">vs last week</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Line Chart (Empty State) */}
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
          
          <div className="flex-1 relative w-full min-h-[250px] flex items-center justify-center border-2 border-dashed border-[#1f1f1f] rounded-xl">
             <p className="text-gray-600 text-sm">কোনো সেলস ডেটা নেই</p>
          </div>
        </div>

        {/* Donut Chart (Empty State) */}
        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Order Status</h3>
            <MoreVertical size={16} className="text-gray-500 cursor-pointer" />
          </div>
          
          <div className="relative w-48 h-48 rounded-full flex items-center justify-center mb-8 border-4 border-[#1f1f1f]">
            <div className="absolute w-36 h-36 rounded-full flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">০</span>
              <span className="text-xs text-gray-500">Total Orders</span>
            </div>
          </div>

          {/* Legends */}
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-700"></span><span className="text-gray-300">Completed</span></div>
              <span className="font-bold text-white">০</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-700"></span><span className="text-gray-300">Pending</span></div>
              <span className="font-bold text-white">০</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-700"></span><span className="text-gray-300">Canceled</span></div>
              <span className="font-bold text-white">০</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-700"></span><span className="text-gray-300">Returned</span></div>
              <span className="font-bold text-white">০</span>
            </div>
          </div>
        </div>

      </div>

      {/* Traffic Sources & Target */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Traffic Sources Progress Bars (Empty State) */}
        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-1">Traffic Sources</h3>
          <p className="text-sm text-gray-500 mb-6">Where your customers are coming from</p>
          
          <div className="flex-1 flex items-center justify-center py-12">
             <p className="text-gray-600 text-sm">ট্রাফিক ডেটা আপডেট হচ্ছে...</p>
          </div>
        </div>

        {/* Monthly Target (Empty State) */}
        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col justify-center items-center text-center">
          <h3 className="text-lg font-bold text-white mb-6 w-full text-left">Monthly Target</h3>
          
          <div className="relative w-48 h-24 overflow-hidden mb-4">
            <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-[#1a1a1a] border-t-gray-700 border-r-gray-700 transform -rotate-45"></div>
            <div className="absolute bottom-0 w-full text-center">
              <span className="text-3xl font-bold text-white">০%</span>
            </div>
          </div>
          
          <h4 className="text-md font-bold text-white mb-1">Getting Started!</h4>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">Start selling to see your target progress here.</p>
          
          <div className="flex justify-between w-full max-w-xs p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
            <div>
              <p className="text-xs text-gray-500 font-medium">Target</p>
              <p className="text-sm font-bold text-white">৳ ০</p>
            </div>
            <div className="w-px bg-[#2a2a2a]"></div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Achieved</p>
              <p className="text-sm font-bold text-[#F49547]">৳ ০</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}