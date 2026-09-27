/* eslint-disable @next/next/no-img-element */
"use client";

import { Menu, Bell } from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function AdminHeader({ onMenuClick, title = "Dashboard Overview" }: AdminHeaderProps) {
  return (
    // অটোমেটিক রিসাইজের জন্য w-[calc(100%-260px)] যোগ করা হয়েছে
    <header className="bg-[#131313]/80 backdrop-blur-md sticky top-0 z-30 border-b border-[#1f1f1f] flex justify-between items-center h-16 px-4 md:px-8 md:ml-[260px] w-full md:w-[calc(100%-260px)]">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden text-gray-400 hover:text-[#F49547] p-2 rounded-lg">
          <Menu size={24} />
        </button>
        <div className="text-lg font-bold text-white hidden md:block">{title}</div>
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
  );
}