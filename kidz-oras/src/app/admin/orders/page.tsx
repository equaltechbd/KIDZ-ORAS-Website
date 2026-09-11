"use client";

import { Search, Filter, Eye, Edit, Trash2, CheckCircle2, Clock, XCircle, PackageOpen } from "lucide-react";

export default function AdminOrdersPage() {
  const orders = [
    { id: "#KO-1005", customer: "হাসিব আল হাসান", date: "Sep 05, 2026", items: 2, total: "৳ ১,২৬০", status: "Pending", method: "COD" },
    { id: "#KO-1004", customer: "সাদিয়া ইসলাম", date: "Sep 04, 2026", items: 1, total: "৳ ৬৫০", status: "Processing", method: "bKash" },
    { id: "#KO-1003", customer: "নুসরাত জাহান", date: "Sep 03, 2026", items: 3, total: "৳ ২,৪৫০", status: "Completed", method: "COD" },
    { id: "#KO-1002", customer: "শফিকুল ইসলাম", date: "Sep 02, 2026", items: 1, total: "৳ ৩৫০", status: "Cancelled", method: "COD" },
    { id: "#KO-1001", customer: "রাফসান জানি", date: "Sep 01, 2026", items: 2, total: "৳ ১,২০০", status: "Completed", method: "Nagad" },
  ];

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
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">All Orders</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Manage and track customer orders.</p>
        </div>
      </div>

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
                      <button className="hover:text-white transition-colors" title="View Details"><Eye size={18} /></button>
                      <button className="hover:text-[#F49547] transition-colors" title="Edit Order"><Edit size={18} /></button>
                      <button className="hover:text-red-400 transition-colors" title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
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
    </>
  );
}