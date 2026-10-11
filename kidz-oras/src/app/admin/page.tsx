"use client";

import { DollarSign, ShoppingCart, Activity, CreditCard } from "lucide-react";

export default function AdminDashboard() {
  return (
    // এখান থেকে Sidebar, Header এবং md:ml-[260px] মুছে ফেলা হয়েছে, কারণ এগুলো layout.tsx থেকে আসবে
    <div className="space-y-8 pb-10 text-[#e5e2e1]">
      
      {/* Page Title */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">eCommerce Overview</h2>
          <p className="text-gray-400 mt-1 text-sm">Track your sales performance (Real-time data will appear here)</p>
        </div>
      </div>

      {/* Premium Stats Grid - All Real-time Zero Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-sm font-medium">Total Sales</p>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><DollarSign size={18} /></div>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight mb-2">৳ ০</h3>
          <div className="text-gray-500 text-sm font-medium">০.০% from last month</div>
        </div>

        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-sm font-medium">Total Orders</p>
            <div className="p-2 bg-[#F49547]/10 text-[#F49547] rounded-lg"><ShoppingCart size={18} /></div>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight mb-2">০</h3>
          <div className="text-gray-500 text-sm font-medium">০.০% from last month</div>
        </div>

        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-sm font-medium">Conversion Rate</p>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Activity size={18} /></div>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight mb-2">০.০০%</h3>
          <div className="text-gray-500 text-sm font-medium">০.০% from last month</div>
        </div>

        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#333] transition-colors shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-sm font-medium">Avg Order Value</p>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><CreditCard size={18} /></div>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight mb-2">৳ ০</h3>
          <div className="text-gray-500 text-sm font-medium">০.০% from last month</div>
        </div>
      </div>

      {/* Graphical Widgets Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Line Chart Widget (Empty State) */}
        <div className="lg:col-span-2 bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Sales Overview</h3>
              <p className="text-sm text-gray-500">Daily performance for the current month</p>
            </div>
          </div>
          
          <div className="flex-1 relative w-full min-h-[200px] flex items-center justify-center border-2 border-dashed border-[#1f1f1f] rounded-xl">
            <p className="text-gray-600 text-sm">কোনো সেলস ডেটা নেই</p>
          </div>
        </div>

        {/* Order Status Donut Chart Widget (Empty State) */}
        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm">
          <h3 className="text-lg font-bold text-white mb-6 w-full text-left">Order Status</h3>
          <div className="relative w-36 h-36 rounded-full flex items-center justify-center mb-6 border-4 border-[#1f1f1f]">
            <div className="absolute w-24 h-24 rounded-full flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">০</span>
              <span className="text-[10px] text-gray-500">Orders</span>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-700"></span><span className="text-gray-500">Completed (0)</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-700"></span><span className="text-gray-500">Pending (0)</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-700"></span><span className="text-gray-500">Canceled (0)</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-700"></span><span className="text-gray-500">Returned (0)</span></div>
          </div>
        </div>
      </div>

      {/* Grid for Table and Side Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders Table (Empty State) */}
        <div className="lg:col-span-2 bg-[#121212] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-6 border-b border-[#1f1f1f]">
            <h3 className="text-lg font-bold text-white">Recent Orders</h3>
            <p className="text-sm text-gray-500 mt-1">Latest transactions from your store</p>
          </div>
          <div className="flex-1 flex items-center justify-center py-16">
            <p className="text-gray-600 text-sm">নতুন কোনো অর্ডার পাওয়া যায়নি</p>
          </div>
        </div>

        {/* Top Categories Area (Empty State) */}
        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-white mb-1">Top Categories</h3>
          <p className="text-sm text-gray-500 mb-6">Revenue by product types</p>
          
          <div className="flex-1 flex items-center justify-center py-10">
            <p className="text-gray-600 text-sm">পর্যাপ্ত ডেটা নেই</p>
          </div>
        </div>
      </div>

    </div>
  );
}