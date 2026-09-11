/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Menu, X, Bell, LayoutDashboard, ShoppingCart, Package, 
  Settings as SettingsIcon, LogOut, Store, User, Shield, 
  CreditCard, Save
} from "lucide-react";

export default function AdminSettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

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
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1c1b1b] rounded-lg transition-all border-l-4 border-transparent">
            <ShoppingCart size={20} />
            <span>Orders</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1c1b1b] rounded-lg transition-all border-l-4 border-transparent">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 border-l-4 border-[#F49547] text-white font-semibold bg-[#1c1b1b] rounded-r-lg transition-all">
            <SettingsIcon size={20} className="text-[#F49547]" />
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
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1c1b1b] rounded-lg border-l-4 border-transparent">
            <ShoppingCart size={20} />
            <span>Orders</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1c1b1b] rounded-lg border-l-4 border-transparent">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 border-l-4 border-[#F49547] text-white font-semibold bg-[#1c1b1b] rounded-r-lg">
            <SettingsIcon size={20} className="text-[#F49547]" />
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
          <div className="text-lg font-bold text-white hidden md:block">System Settings</div>
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
      <main className="md:ml-[260px] p-4 md:p-8 min-h-[calc(100vh-64px)] max-w-6xl mx-auto">
        
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Settings</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Manage your store preferences and admin account.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Settings Tabs Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden flex flex-col">
              <button 
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-5 py-4 text-left transition-colors border-l-4 ${activeTab === "profile" ? "border-[#F49547] bg-[#1a1a1a] text-white font-medium" : "border-transparent text-gray-400 hover:bg-[#161616] hover:text-white"}`}
              >
                <User size={18} className={activeTab === "profile" ? "text-[#F49547]" : ""} />
                Admin Profile
              </button>
              <button 
                onClick={() => setActiveTab("store")}
                className={`flex items-center gap-3 px-5 py-4 text-left transition-colors border-l-4 ${activeTab === "store" ? "border-[#F49547] bg-[#1a1a1a] text-white font-medium" : "border-transparent text-gray-400 hover:bg-[#161616] hover:text-white"}`}
              >
                <Store size={18} className={activeTab === "store" ? "text-[#F49547]" : ""} />
                Store Details
              </button>
              <button 
                onClick={() => setActiveTab("payment")}
                className={`flex items-center gap-3 px-5 py-4 text-left transition-colors border-l-4 ${activeTab === "payment" ? "border-[#F49547] bg-[#1a1a1a] text-white font-medium" : "border-transparent text-gray-400 hover:bg-[#161616] hover:text-white"}`}
              >
                <CreditCard size={18} className={activeTab === "payment" ? "text-[#F49547]" : ""} />
                Payment & Delivery
              </button>
              <button 
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-3 px-5 py-4 text-left transition-colors border-l-4 ${activeTab === "security" ? "border-[#F49547] bg-[#1a1a1a] text-white font-medium" : "border-transparent text-gray-400 hover:bg-[#161616] hover:text-white"}`}
              >
                <Shield size={18} className={activeTab === "security" ? "text-[#F49547]" : ""} />
                Security
              </button>
            </div>
          </div>

          {/* Settings Content Area */}
          <div className="flex-1">
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 md:p-8">
              
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white border-b border-[#1f1f1f] pb-4">Personal Information</h3>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Vfj2tOVTojC_dn1c4lD0LhWFz3lz9_AJdIkGRJZF48kgrpzGunfwZmtiSCWSc5pWjOGrPRHfEfOHQ6gfJLv_F8E8dRRFcCjflG0PHJ_uM4H4TLMiZi8AbrRVHSpYCc_794n5Uqbr-6S3o5QYqp8sZr07isEsUOKQkFPobHV7tTv2ianbJJFhV6Y9fKk9ahsN_aV3kMg9zCY3IAHPphz8ctmH_QfzUDcrhcoWOdqehePfoKNPa7gs" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg text-sm hover:bg-[#222] transition-colors">
                      Change Avatar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="Abddur Hasib" 
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-3 px-4 text-white focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="abddurhasib@gmail.com" 
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-3 px-4 text-white focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Phone Number</label>
                      <input 
                        type="tel" 
                        defaultValue="01822379494" 
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-3 px-4 text-white focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Role</label>
                      <input 
                        type="text" 
                        defaultValue="Super Admin" 
                        disabled
                        className="w-full bg-[#161616] border border-[#1f1f1f] rounded-lg py-3 px-4 text-gray-500 cursor-not-allowed outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Store Details Tab */}
              {activeTab === "store" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white border-b border-[#1f1f1f] pb-4">Store Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Store Name</label>
                      <input 
                        type="text" 
                        defaultValue="Kidz Oras" 
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-3 px-4 text-white focus:border-[#F49547]/50 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Support Email</label>
                      <input 
                        type="email" 
                        defaultValue="support@kidzoras.com" 
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-3 px-4 text-white focus:border-[#F49547]/50 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-400">Store Address</label>
                      <textarea 
                        rows={3}
                        defaultValue="Banani Road No. 12-19, Dhaka North, Dhaka" 
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-3 px-4 text-white focus:border-[#F49547]/50 transition-all outline-none resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment & Delivery Tab */}
              {activeTab === "payment" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white border-b border-[#1f1f1f] pb-4">Payment & Delivery</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Delivery Charge (Inside Dhaka)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">৳</span>
                        <input 
                          type="number" 
                          defaultValue="60" 
                          className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-3 pl-8 pr-4 text-white focus:border-[#F49547]/50 transition-all outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Delivery Charge (Outside Dhaka)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">৳</span>
                        <input 
                          type="number" 
                          defaultValue="120" 
                          className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-3 pl-8 pr-4 text-white focus:border-[#F49547]/50 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white border-b border-[#1f1f1f] pb-4">Change Password</h3>
                  
                  <div className="grid grid-cols-1 gap-6 max-w-md">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Current Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-3 px-4 text-white focus:border-[#F49547]/50 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-3 px-4 text-white focus:border-[#F49547]/50 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Confirm New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-3 px-4 text-white focus:border-[#F49547]/50 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-10 flex items-center justify-end gap-4 border-t border-[#1f1f1f] pt-6">
                <button className="px-6 py-2.5 text-gray-400 hover:text-white transition-colors font-medium">
                  Cancel
                </button>
                <button className="flex items-center gap-2 bg-[#F49547] hover:bg-[#F49547]/90 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-[#F49547]/20">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}