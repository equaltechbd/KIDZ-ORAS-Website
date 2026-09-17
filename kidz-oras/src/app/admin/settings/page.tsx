"use client";

import { useState } from "react";
import { Settings, Image as ImageIcon, FileText, Save, LayoutTemplate, Plus, Trash2, ShieldCheck, UserPlus, Users } from "lucide-react";

export default function SettingsPage() {
  // ৪টি ট্যাব: general, slider, legal, এবং নতুন staff
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="text-[#E52565]" /> স্টোর সেটিংস
          </h1>
          <p className="text-gray-500 text-sm mt-1">ওয়েবসাইটের সম্পূর্ণ কন্ট্রোল এবং স্টাফ পারমিশন</p>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
          <ShieldCheck size={16} /> সুপার অ্যাডমিন মোড অ্যাক্টিভ
        </div>
      </div>

      {/* 🔘 Navigation Tabs 🔘 */}
      <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
        <button 
          onClick={() => setActiveTab("general")} 
          className={`pb-3 font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'general' ? 'text-[#E52565] border-b-2 border-[#E52565]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <LayoutTemplate size={18}/> সাধারণ সেটিংস
        </button>
        <button 
          onClick={() => setActiveTab("slider")} 
          className={`pb-3 font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'slider' ? 'text-[#E52565] border-b-2 border-[#E52565]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <ImageIcon size={18}/> স্লাইডার ও ব্যানার
        </button>
        <button 
          onClick={() => setActiveTab("legal")} 
          className={`pb-3 font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'legal' ? 'text-[#E52565] border-b-2 border-[#E52565]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <FileText size={18}/> পেজ ও পলিসি
        </button>
        {/* New Staff Access Tab */}
        <button 
          onClick={() => setActiveTab("staff")} 
          className={`pb-3 font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'staff' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <ShieldCheck size={18}/> স্টাফ ও এক্সেস
        </button>
      </div>

      {/* 📄 Tab Content Area 📄 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
        
        {/* 1. General Settings */}
        {activeTab === "general" && (
          <div className="space-y-5 max-w-2xl animate-in fade-in duration-300">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">ওয়েবসাইটের নাম</label>
              <input type="text" defaultValue="KIDZ-ORAS" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-[#E52565] outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">লোগো (URL / Link)</label>
              <input type="text" placeholder="https://..." defaultValue="/logo.png" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-[#E52565] outline-none transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">সাপোর্ট নাম্বার (ফোন)</label>
                <input type="text" defaultValue="01822-379494" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-[#E52565] outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">সাপোর্ট ইমেইল</label>
                <input type="email" defaultValue="support@kidz-oras.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-[#E52565] outline-none transition-colors" />
              </div>
            </div>
          </div>
        )}

        {/* 2. Slider Control */}
        {activeTab === "slider" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">হোমপেজ স্লাইডার ইমেজ</h3>
              <button className="bg-[#E52565]/10 text-[#E52565] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-[#E52565]/20 transition-colors">
                <Plus size={16}/> স্লাইডার যোগ করুন
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center bg-gray-50/50">
              <div className="w-full md:w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500 font-bold overflow-hidden shrink-0">ব্যানার ১</div>
              <div className="flex-1 w-full space-y-2">
                <input type="text" placeholder="ছবির লিংক (Image URL)" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#E52565]" defaultValue="https://example.com/banner1.jpg" />
                <input type="text" placeholder="ক্লিক করলে কোথায় যাবে?" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#E52565]" defaultValue="/shop" />
              </div>
              <button className="text-red-500 p-3 bg-white border border-red-100 rounded-xl hover:bg-red-50 transition-colors shadow-sm"><Trash2 size={18}/></button>
            </div>
          </div>
        )}

        {/* 3. Legal & Pages */}
        {activeTab === "legal" && (
          <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">About Us (আমাদের সম্পর্কে)</label>
              <textarea rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:border-[#E52565] outline-none resize-y transition-colors" placeholder="আমাদের ওয়েবসাইট সম্পর্কে বিস্তারিত লিখুন..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Privacy Policy (প্রাইভেসি পলিসি)</label>
              <textarea rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:border-[#E52565] outline-none resize-y transition-colors" placeholder="আপনার প্রাইভেসি পলিসি এখানে লিখুন..."></textarea>
            </div>
          </div>
        )}

        {/* 4. Staff & Access Control (NEW) */}
        {activeTab === "staff" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Add New Staff */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 md:p-6 max-w-3xl">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <UserPlus size={18} /> নতুন স্টাফ বা ওয়ার্কার যুক্ত করুন
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <input type="email" placeholder="স্টাফের ইমেইল এড্রেস" className="flex-1 bg-white border border-blue-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500" />
                <select className="bg-white border border-blue-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 font-semibold text-gray-700 md:w-48">
                  <option value="manager">Order Manager</option>
                  <option value="editor">Content Editor</option>
                  <option value="admin">Super Admin</option>
                </select>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm">
                  ইনভাইট পাঠান
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">* Order Manager শুধুমাত্র অর্ডার দেখতে পারবে। Settings বা Products ডিলিট করতে পারবে না।</p>
            </div>

            {/* Current Staff List */}
            <div className="max-w-3xl">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users size={18} /> বর্তমান স্টাফ লিস্ট
              </h3>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="p-4 font-semibold">স্টাফের নাম/ইমেইল</th>
                      <th className="p-4 font-semibold">রোল (Access Level)</th>
                      <th className="p-4 font-semibold text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {/* Super Admin (You) */}
                    <tr>
                      <td className="p-4 font-bold text-gray-900">hasib@kidz-oras.com (আপনি)</td>
                      <td className="p-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Super Admin</span>
                      </td>
                      <td className="p-4 text-right text-gray-400 text-xs">পরিবর্তনযোগ্য নয়</td>
                    </tr>
                    {/* Demo Worker */}
                    <tr>
                      <td className="p-4 font-semibold text-gray-700">worker1@kidz-oras.com</td>
                      <td className="p-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">Order Manager</span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-red-500 font-bold text-xs bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">রিমুভ করুন</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        )}

        {/* Save Button (Only show if not on staff tab) */}
        {activeTab !== "staff" && (
          <div className="mt-8 pt-5 border-t border-gray-100 flex justify-end">
            <button className="bg-gray-900 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-black transition-colors shadow-md">
              <Save size={18} /> পরিবর্তনগুলো সেভ করুন
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}