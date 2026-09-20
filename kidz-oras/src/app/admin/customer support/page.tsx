"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { 
  Menu, Bell, Search, Send, Paperclip, MoreVertical, 
  CheckCircle2, Phone, MessageCircle, Globe, Clock, 
  Image as ImageIcon, UserCircle
} from "lucide-react";
import Link from "next/link";

// --- Mock Data ---
const chatList = [
  {
    id: "TKT-101",
    name: "নাসরিন সুলতানা",
    platform: "Facebook",
    lastMessage: "আপনাদের ডেলিভারি চার্জ কত?",
    time: "10:24 AM",
    unread: 2,
    status: "active",
    avatar: "N"
  },
  {
    id: "TKT-102",
    name: "শফিকুল ইসলাম",
    platform: "Website",
    lastMessage: "আমি একটি প্রোডাক্ট রিটার্ন করতে চাই।",
    time: "09:15 AM",
    unread: 0,
    status: "active",
    avatar: "S"
  },
  {
    id: "TKT-103",
    name: "Tariqul Anam",
    platform: "WhatsApp",
    lastMessage: "Thanks, I received the parcel today.",
    time: "Yesterday",
    unread: 0,
    status: "resolved",
    avatar: "T"
  }
];

const currentChatMessages = [
  { id: 1, sender: "customer", text: "হ্যালো, বেবি সুতি রমপারের সাইজ ১২ মাস বয়সী বাচ্চার জন্য হবে?", time: "10:20 AM" },
  { id: 2, sender: "admin", text: "জি আপু, ১২ মাসের বাচ্চার জন্য আমাদের কাছে L সাইজটি এভেইলেবল আছে। আপনি চাইলে অর্ডার করতে পারেন।", time: "10:22 AM" },
  { id: 3, sender: "customer", text: "আপনাদের ডেলিভারি চার্জ কত?", time: "10:24 AM" }
];

export default function CustomerSupportPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [replyText, setReplyText] = useState("");

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return <MessageCircle size={14} className="text-blue-500" />;
      case 'WhatsApp': return <Phone size={14} className="text-emerald-500" />;
      case 'Website': return <Globe size={14} className="text-[#F49547]" />;
      default: return <MessageCircle size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30 flex overflow-hidden">
      
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[260px] flex flex-col h-screen w-full relative">
        
        {/* Header */}
        <header className="bg-[#050505]/80 backdrop-blur-xl shrink-0 z-30 border-b border-[#1f1f1f] flex justify-between items-center h-16 px-4 md:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-[#F49547] p-2 rounded-lg">
              <Menu size={24} />
            </button>
            <div className="hidden md:block mr-8">
              <h1 className="text-xl font-bold text-white tracking-wide">KIDZ ORAS</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/orders" className="hidden md:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-500/20 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              New Order (৩)
            </Link>
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#1a1a1a] transition-colors relative">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Support Inbox Content */}
        <main className="p-4 md:p-6 flex-1 flex flex-col overflow-hidden w-full max-w-7xl mx-auto">
          
          <div className="flex justify-between items-end mb-4 shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Customer Support</h2>
              <p className="text-gray-400 mt-1 text-sm">Manage inquiries from Website, Facebook, and WhatsApp.</p>
            </div>
          </div>

          {/* Chat Interface Container */}
          <div className="flex-1 flex flex-col md:flex-row bg-[#121212] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-sm min-h-0">
            
            {/* Left Side: Chat List */}
            <div className="w-full md:w-80 border-r border-[#1f1f1f] flex flex-col bg-[#0a0a0a]">
              
              {/* Search & Filter */}
              <div className="p-4 border-b border-[#1f1f1f] space-y-4">
                <div className="relative group">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#F49547] transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search messages..." 
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50" 
                  />
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveTab("all")}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeTab === 'all' ? 'bg-[#1a1a1a] text-[#F49547] border border-[#2a2a2a]' : 'text-gray-500 hover:text-white'}`}
                  >
                    Open
                  </button>
                  <button 
                    onClick={() => setActiveTab("resolved")}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeTab === 'resolved' ? 'bg-[#1a1a1a] text-emerald-400 border border-[#2a2a2a]' : 'text-gray-500 hover:text-white'}`}
                  >
                    Resolved
                  </button>
                </div>
              </div>

              {/* List of Chats */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {chatList.map((chat, idx) => (
                  <div 
                    key={chat.id} 
                    className={`flex items-start gap-3 p-4 border-b border-[#1f1f1f] cursor-pointer transition-colors ${idx === 0 ? 'bg-[#1a1a1a] border-l-2 border-l-[#F49547]' : 'hover:bg-[#111]'}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#333] flex items-center justify-center font-bold text-gray-300 shrink-0">
                      {chat.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className={`text-sm truncate ${idx === 0 ? 'font-bold text-white' : 'font-semibold text-gray-300'}`}>{chat.name}</h4>
                        <span className="text-[10px] text-gray-500">{chat.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {getPlatformIcon(chat.platform)}
                        <p className={`text-xs truncate ${chat.unread > 0 ? 'font-semibold text-gray-300' : 'text-gray-500'}`}>
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-[#F49547] text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-lg shadow-[#F49547]/20">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Active Chat Window */}
            <div className="flex-1 flex flex-col bg-[#121212]">
              
              {/* Chat Header */}
              <div className="h-16 px-6 border-b border-[#1f1f1f] bg-[#0a0a0a]/50 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F49547]/10 border border-[#F49547]/20 flex items-center justify-center font-bold text-[#F49547]">
                    N
                  </div>
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                      নাসরিন সুলতানা
                      <span className="px-2 py-0.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-[10px] text-gray-400 font-mono">TKT-101</span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs mt-0.5">
                      <span className="flex items-center gap-1 text-blue-400 font-medium">
                        <MessageCircle size={12} /> Facebook
                      </span>
                      <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                      <span className="flex items-center gap-1 text-emerald-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-colors">
                    <UserCircle size={14} /> View Profile
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-lg text-xs font-bold transition-colors">
                    <CheckCircle2 size={14} /> Mark Resolved
                  </button>
                  <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                <div className="text-center">
                  <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-[10px] font-bold text-gray-500">
                    Today, 10:20 AM
                  </span>
                </div>

                {currentChatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-5 py-3 ${
                      msg.sender === 'admin' 
                        ? 'bg-[#F49547] text-white rounded-br-sm shadow-lg shadow-[#F49547]/10' 
                        : 'bg-[#1a1a1a] border border-[#2a2a2a] text-gray-200 rounded-bl-sm'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className={`flex items-center gap-1 mt-2 text-[10px] font-medium ${msg.sender === 'admin' ? 'text-white/70 justify-end' : 'text-gray-500'}`}>
                        <Clock size={10} /> {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Area */}
              <div className="p-4 bg-[#0a0a0a]/50 border-t border-[#1f1f1f] shrink-0">
                <div className="flex items-end gap-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-2 focus-within:border-[#F49547]/50 transition-colors">
                  
                  <button className="p-2 text-gray-500 hover:text-white transition-colors shrink-0">
                    <Paperclip size={18} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-white transition-colors shrink-0">
                    <ImageIcon size={18} />
                  </button>
                  
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..." 
                    className="flex-1 max-h-32 bg-transparent text-sm text-white focus:outline-none resize-none py-2 px-1"
                    rows={1}
                  />
                  
                  <button className="p-2.5 bg-[#F49547] text-white rounded-xl hover:bg-[#d87c33] transition-colors shrink-0 shadow-lg shadow-[#F49547]/20">
                    <Send size={18} className="-ml-0.5" />
                  </button>
                </div>
                <div className="text-center mt-2">
                  <p className="text-[10px] text-gray-600 font-medium">Replying as: Hasib Al Hasan (Admin)</p>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}