"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { 
  Menu, Bell, Camera, User, Phone, Mail, 
  Lock, Shield, Briefcase, MapPin, Save, Info
} from "lucide-react";

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 🔴 ম্যাজিক বাটন স্টেট (শুধু আপনাকে পার্থক্য বোঝানোর জন্য) 🔴
  const [isAdminView, setIsAdminView] = useState(true);

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30 flex">
      
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen w-full relative">
        
        {/* Header */}
        <header className="bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-30 border-b border-[#1f1f1f] flex justify-between items-center h-16 px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-[#F49547] p-2 rounded-lg">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-white tracking-tight hidden md:block">Profile Settings</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* 🔴 ম্যাজিক টগল বাটন 🔴 */}
            <button 
              onClick={() => setIsAdminView(!isAdminView)}
              className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                isAdminView ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
              }`}
              title="Click to see how employees see this page"
            >
              <Shield size={14} />
              {isAdminView ? 'Viewing as: Admin' : 'Viewing as: Employee'}
            </button>

            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#1a1a1a] transition-colors relative">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Profile Content */}
        <main className="p-4 md:p-8 w-full max-w-5xl mx-auto pb-20">
          
          {/* Banner & Avatar Section */}
          <div className="relative mb-16">
            {/* Background Banner */}
            <div className="h-40 md:h-56 w-full rounded-2xl bg-gradient-to-r from-[#1a1a1a] via-[#1f1f1f] to-[#1a1a1a] border border-[#2a2a2a] overflow-hidden relative">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#F49547 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            </div>
            
            {/* Avatar & Basic Info */}
            <div className="absolute -bottom-12 left-6 md:left-10 flex items-end gap-5">
              <div className="relative group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#050505] bg-[#1a1a1a] overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Vfj2tOVTojC_dn1c4lD0LhWFz3lz9_AJdIkGRJZF48kgrpzGunfwZmtiSCWSc5pWjOGrPRHfEfOHQ6gfJLv_F8E8dRRFcCjflG0PHJ_uM4H4TLMiZi8AbrRVHSpYCc_794n5Uqbr-6S3o5QYqp8sZr07isEsUOKQkFPobHV7tTv2ianbJJFhV6Y9fKk9ahsN_aV3kMg9zCY3IAHPphz8ctmH_QfzUDcrhcoWOdqehePfoKNPa7gs" alt="Profile" className="w-full h-full object-cover" />
                </div>
                {/* Camera Icon Overlay */}
                <button className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-4 border-transparent">
                  <Camera size={24} className="text-white mb-1" />
                  <span className="text-[10px] text-white font-bold">Change</span>
                </button>
              </div>
              
              <div className="mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Hasib Al Hasan</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-[#F49547] font-medium">Order Manager</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                  <span className="text-sm text-gray-400">Dhaka, BD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Personal & Security Details (Editable by Employee) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Personal Information Card */}
              <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <User size={18} className="text-[#F49547]" /> Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input type="text" defaultValue="Hasib Al Hasan" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50 transition-all" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase">Phone Number</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input type="text" defaultValue="01712345678" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 pl-10 pr-4 text-sm text-white font-mono focus:outline-none focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input type="email" defaultValue="abddurhasib@gmail.com" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50 transition-all" />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase">Home Address</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-4 text-gray-500" />
                      <textarea rows={2} defaultValue="Mirpur 10, Dhaka" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50 transition-all resize-none"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Password & Security Card */}
              <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Lock size={18} className="text-[#F49547]" /> Update Password
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase">Confirm Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50 transition-all" />
                  </div>
                </div>
              </div>
              
              {/* Save Button */}
              <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-[#F49547] hover:bg-[#d87c33] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-[#F49547]/20">
                  <Save size={18} /> Save Changes
                </button>
              </div>

            </div>

            {/* Right Column: Administrative & Employment Details */}
            <div className="space-y-6">
              
              {/* Employment Card (Admin Controlled Logic) */}
              <div className={`border rounded-2xl p-6 shadow-sm relative overflow-hidden transition-colors ${isAdminView ? 'bg-[#121212] border-[#F49547]/30' : 'bg-[#161616] border-[#1f1f1f]'}`}>
                
                {/* Visual Indicator of Control */}
                {!isAdminView && (
                  <div className="absolute top-0 right-0 bg-[#1f1f1f] text-gray-400 px-3 py-1 rounded-bl-xl text-[10px] font-bold flex items-center gap-1">
                    <Lock size={10} /> Locked by Admin
                  </div>
                )}
                {isAdminView && (
                  <div className="absolute top-0 right-0 bg-[#F49547]/10 text-[#F49547] px-3 py-1 rounded-bl-xl text-[10px] font-bold flex items-center gap-1">
                    <Shield size={10} /> Admin Control
                  </div>
                )}

                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Briefcase size={18} className={isAdminView ? "text-[#F49547]" : "text-gray-500"} /> Employment Details
                </h3>
                <p className="text-xs text-gray-500 mb-6 flex items-center gap-1">
                  <Info size={12} /> {isAdminView ? 'You can edit these roles.' : 'Only Admin can modify these.'}
                </p>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase">Assigned Role</label>
                    <select 
                      disabled={!isAdminView} 
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-white focus:outline-none appearance-none transition-colors ${
                        isAdminView ? 'bg-[#1a1a1a] border-[#2a2a2a] focus:border-[#F49547]/50 cursor-pointer' : 'bg-[#111] border-[#1f1f1f] text-gray-400 cursor-not-allowed opacity-80'
                      }`}
                    >
                      <option>Super Admin</option>
                      <option selected>Order Manager</option>
                      <option>Support Agent</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase">Work Status</label>
                    <select 
                      disabled={!isAdminView} 
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-white focus:outline-none appearance-none transition-colors ${
                        isAdminView ? 'bg-[#1a1a1a] border-[#2a2a2a] focus:border-[#F49547]/50 cursor-pointer' : 'bg-[#111] border-[#1f1f1f] text-gray-400 cursor-not-allowed opacity-80'
                      }`}
                    >
                      <option selected>Work From Home (Remote)</option>
                      <option>In-Office Duty</option>
                    </select>
                  </div>

                  {!isAdminView && (
                    <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg mt-4">
                      <p className="text-xs text-red-400/80 leading-relaxed text-center">
                        Contact your Super Admin if you need to update your role or work location.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}