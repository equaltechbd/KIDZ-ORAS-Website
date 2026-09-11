/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Menu, X, Bell, LayoutDashboard, ShoppingCart, Package, 
  Settings, LogOut, Search, Filter, Eye, Edit, Trash2,
  CheckCircle2, Clock, XCircle, PackageOpen
} from "lucide-react";

export default function AdminOrdersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ডেমো অর্ডার লিস্ট
  const orders = [
    { id: "#KO-1005", customer: "হাসিব আল হাসান", date: "Sep 05, 2026", items: 2, total: "৳ ১,২৬০", status: "Pending", method: "COD" },
    { id: "#KO-1004", customer: "সাদিয়া ইসলাম", date: "Sep 04, 2026", items: 1, total: "৳ ৬৫০", status: "Processing", method: "bKash" },
    { id: "#KO-1003", customer: "নুসরাত জাহান", date: "Sep 03, 2026", items: 3, total: "৳ ২,৪৫০", status: "Completed", method: "COD" },
    { id: "#KO-1002", customer: "শফিকুল ইসলাম", date: "Sep 02, 2026", items: 1, total: "৳ ৩৫০", status: "Cancelled", method: "COD" },
    { id: "#KO-1001", customer: "রাফসান জানি", date: "Sep 01, 2026", items: 2, total: "৳ ১,২০০", status: "Completed", method: "Nagad" },
  ];

  // স্ট্যাটাস অনুযায়ী ব্যাজ কালার
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Pending":
        return <span className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20"><Clock size={12} /> Pending</span>;
      case "Processing":
        return <span className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20"><PackageOpen size={12} /> Processing</span>;
      case "Completed":
        return <span className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20"><CheckCircle2 size={12} /> Completed</span>;
      case "Cancelled":
        return <span className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20"><XCircle size={12} /> Cancelled</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-gray-500/10 text-gray-400 text-xs font-bold border border-gray-500/20">{status}</span>;
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30">
      
      {/* ---------------- Desktop Sidebar ---------------- */}
      <nav className="hidden md:flex flex-col bg-[#131313] fixed left-0 top-0 h-full w-[260px] border-r border-[#1f1f1f] py-4 z-40">
        <div className="px-6 mb-8 mt-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F49547]/10 flex items-center justify-center border border-[#F49547]/20">
            <span className="font-bold text-[#F49547] text-xl">K</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Kidz Oras Admin</h1>
            <p className="text-xs text-gray-400">Management Suite</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1c1b1b] rounded-lg transition-all border-l-4 border-transparent">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 border-l-4 border-[#F49547] text-white font-semibold bg-[#1c1b1b] rounded-r-lg transition-all">
            <ShoppingCart size={20} className="text-[#F49547]" />
            <span>Orders</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1c1b1b] rounded-lg transition-all border-l-4 border-transparent">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1c1b1b] rounded-lg transition-all border-l-4 border-transparent">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </div>

        <div className="px-4 mt-auto pt-4 border-t border-[#1f1f1f]">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* ---------------- Mobile Sidebar Overlay & Nav ---------------- */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      <nav className={`md:hidden fixed left-0 top-0 h-full w-[260px] bg-[#131313] border-r border-[#1f1f1f] flex flex-col py-4 z-50 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-end px-4 mb-2">
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#1c1b1b]">
            <X size={24} />
          </button>
        </div>
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F49547]/10 flex items-center justify-center border border-[#F49547]/20">
            <span className="font-bold text-[#F49547] text-xl">K</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Kidz Oras Admin</h1>
            <p className="text-xs text-gray-400">Management Suite</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1c1b1b] rounded-lg border-l-4 border-transparent">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 border-l-4 border-[#F49547] text-white font-semibold bg-[#1c1b1b] rounded-r-lg">
            <ShoppingCart size={20} className="text-[#F49547]" />
            <span>Orders</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1c1b1b] rounded-lg">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1c1b1b] rounded-lg">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </nav>

      {/* ---------------- Top Header ---------------- */}
      <header className="bg-[#131313]/80 backdrop-blur-md sticky top-0 z-30 border-b border-[#1f1f1f] flex justify-between items-center h-16 px-4 md:px-8 md:ml-[260px]">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-[#F49547] p-2 rounded-lg">
            <Menu size={24} />
          </button>
          <div className="text-lg font-bold text-white hidden md:block">Order Management</div>
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
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">All Orders</h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Manage and track customer orders.</p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#F49547] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50 transition-all outline-none placeholder-gray-600"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-[#1f1f1f] text-gray-300 rounded-lg text-sm hover:text-white hover:border-gray-700 transition-colors">
              <Filter size={16} />
              Filter Status
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#0a0a0a] text-gray-500 uppercase text-xs tracking-wider border-b border-[#1f1f1f]">
                  <th className="py-4 px-6 font-medium">Order ID</th>
                  <th className="py-4 px-6 font-medium">Customer</th>
                  <th className="py-4 px-6 font-medium">Date</th>
                  <th className="py-4 px-6 font-medium text-center">Items</th>
                  <th className="py-4 px-6 font-medium text-right">Total</th>
                  <th className="py-4 px-6 font-medium text-center">Status</th>
                  <th className="py-4 px-6 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.map((order, idx) => (
                  <tr key={idx} className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors group">
                    <td className="py-4 px-6 font-mono text-white group-hover:text-[#F49547] transition-colors">{order.id}</td>
                    <td className="py-4 px-6">
                      <div className="text-gray-200 font-medium">{order.customer}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{order.method}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-mono text-xs">{order.date}</td>
                    <td className="py-4 px-6 text-center text-gray-300">{order.items}</td>
                    <td className="py-4 px-6 text-right text-white font-medium">{order.total}</td>
                    <td className="py-4 px-6 text-center">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-3 text-gray-500">
                        <button className="hover:text-white transition-colors" title="View Details">
                          <Eye size={18} />
                        </button>
                        <button className="hover:text-[#F49547] transition-colors" title="Edit Order">
                          <Edit size={18} />
                        </button>
                        <button className="hover:text-red-400 transition-colors" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination (Static UI) */}
          <div className="p-4 border-t border-[#1f1f1f] flex items-center justify-between text-sm text-gray-500">
            <div>Showing 1 to 5 of 24 orders</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#0a0a0a] border border-[#1f1f1f] rounded hover:text-white hover:border-gray-700 transition-colors disabled:opacity-50" disabled>Prev</button>
              <button className="px-3 py-1 bg-[#F49547]/10 text-[#F49547] border border-[#F49547]/20 rounded font-bold">1</button>
              <button className="px-3 py-1 bg-[#0a0a0a] border border-[#1f1f1f] rounded hover:text-white hover:border-gray-700 transition-colors">2</button>
              <button className="px-3 py-1 bg-[#0a0a0a] border border-[#1f1f1f] rounded hover:text-white hover:border-gray-700 transition-colors">Next</button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}