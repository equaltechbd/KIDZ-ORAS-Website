"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { 
  Menu, Bell, FileText, Download, Calendar, 
  FileSpreadsheet, Filter, CheckCircle2, FileJson, 
  TrendingUp, Package, Users, Receipt
} from "lucide-react";

// --- Mock Data for Recent Reports ---
const recentReports = [
  { id: "REP-01", name: "August 2026 Sales Summary", type: "Sales", format: "PDF", date: "Sep 01, 2026", size: "2.4 MB" },
  { id: "REP-02", name: "Low Stock Inventory Alert", type: "Inventory", format: "CSV", date: "Aug 28, 2026", size: "145 KB" },
  { id: "REP-03", name: "Customer Acquisition Report", type: "Customers", format: "PDF", date: "Aug 15, 2026", size: "1.1 MB" },
  { id: "REP-04", name: "Q2 Financial Tax Export", type: "Financial", format: "CSV", date: "Jul 01, 2026", size: "3.8 MB" }
];

export default function ReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reportType, setReportType] = useState("sales");
  const [reportFormat, setReportFormat] = useState("pdf");

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30 flex">
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen w-full relative">
        
        {/* Header */}
        <header className="bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-30 border-b border-[#1f1f1f] flex justify-between items-center h-16 px-4 md:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-[#F49547] p-2 rounded-lg">
              <Menu size={24} />
            </button>
            <div className="hidden md:block mr-8">
              <h1 className="text-xl font-bold text-white tracking-wide">KIDZ ORAS</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#1a1a1a] transition-colors relative">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-8 space-y-8 w-full max-w-6xl mx-auto pb-20">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Business Records</h2>
              <p className="text-gray-400 mt-1 text-sm">Generate, view, and download your store's business records.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Generate Report Form */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Filter size={18} className="text-[#F49547]" /> Generate Custom Report
                </h3>

                <div className="space-y-5">
                  {/* Report Type Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Report Category</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setReportType('sales')}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-colors ${reportType === 'sales' ? 'bg-[#F49547]/10 border-[#F49547]/50 text-[#F49547]' : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-400 hover:border-gray-500 hover:text-white'}`}
                      >
                        <TrendingUp size={20} /> <span className="text-xs font-bold">Sales</span>
                      </button>
                      <button 
                        onClick={() => setReportType('inventory')}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-colors ${reportType === 'inventory' ? 'bg-[#F49547]/10 border-[#F49547]/50 text-[#F49547]' : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-400 hover:border-gray-500 hover:text-white'}`}
                      >
                        <Package size={20} /> <span className="text-xs font-bold">Inventory</span>
                      </button>
                      <button 
                        onClick={() => setReportType('customers')}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-colors ${reportType === 'customers' ? 'bg-[#F49547]/10 border-[#F49547]/50 text-[#F49547]' : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-400 hover:border-gray-500 hover:text-white'}`}
                      >
                        <Users size={20} /> <span className="text-xs font-bold">Customers</span>
                      </button>
                      <button 
                        onClick={() => setReportType('financial')}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-colors ${reportType === 'financial' ? 'bg-[#F49547]/10 border-[#F49547]/50 text-[#F49547]' : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-400 hover:border-gray-500 hover:text-white'}`}
                      >
                        <Receipt size={20} /> <span className="text-xs font-bold">Financial</span>
                      </button>
                    </div>
                  </div>

                  {/* Date Range Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Date Range</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <select className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50 appearance-none">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option selected>This Month</option>
                        <option>Last Month</option>
                        <option>This Year (2026)</option>
                        <option>Custom Range...</option>
                      </select>
                    </div>
                  </div>

                  {/* Export Format Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Export Format</label>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setReportFormat('pdf')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-colors ${reportFormat === 'pdf' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-400 hover:bg-[#252525]'}`}
                      >
                        <FileText size={16} /> <span className="text-sm font-bold">PDF</span>
                      </button>
                      <button 
                        onClick={() => setReportFormat('csv')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-colors ${reportFormat === 'csv' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-400 hover:bg-[#252525]'}`}
                      >
                        <FileSpreadsheet size={16} /> <span className="text-sm font-bold">CSV / Excel</span>
                      </button>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 bg-[#F49547] hover:bg-[#d87c33] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-[#F49547]/20 mt-4">
                    <Download size={18} /> Generate & Download
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Recent Reports History */}
            <div className="lg:col-span-2">
              <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-sm">
                
                <div className="p-6 border-b border-[#1f1f1f] flex justify-between items-center bg-[#0a0a0a]/30">
                  <h3 className="text-lg font-bold text-white">Recent Generated Reports</h3>
                  <button className="text-sm text-[#F49547] hover:underline font-medium">Clear History</button>
                </div>

                <div className="p-2">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 hover:bg-[#1a1a1a] rounded-xl transition-colors group border-b border-transparent hover:border-[#2a2a2a]">
                      
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl border ${report.format === 'PDF' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                          {report.format === 'PDF' ? <FileText size={24} /> : <FileSpreadsheet size={24} />}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-[#F49547] transition-colors">{report.name}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500 font-mono">{report.id}</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <span className="text-xs text-gray-400">{report.date}</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <span className="text-xs text-gray-500">{report.size}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden md:inline-flex px-2.5 py-1 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-xs font-semibold text-gray-400">
                          {report.type}
                        </span>
                        <button className="p-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors" title="Download Again">
                          <Download size={18} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Automation Tip */}
                <div className="p-6 border-t border-[#1f1f1f] bg-[#0a0a0a]/50">
                  <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <CheckCircle2 size={20} className="text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-blue-400">Automated Monthly Reports</h5>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        Sales and Tax summary PDFs are automatically generated and sent to the Super Admin's email (abddurhasib@gmail.com) on the 1st of every month.
                      </p>
                    </div>
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