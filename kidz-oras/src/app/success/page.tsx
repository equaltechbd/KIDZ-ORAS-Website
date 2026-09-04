/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { CheckCircle2, Info, User as UserIcon, Phone, MapPin, Banknote, ShoppingBag, Home, X } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#221a15] font-sans pb-24 md:pb-10">
      
      {/* Header */}
      <header className="w-full top-0 sticky bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <div className="w-10"></div> {/* Spacer for centering */}
          <h1 className="text-lg md:text-xl font-bold text-gray-900">অর্ডার সফল</h1>
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
            <X size={24} />
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 md:px-6 pt-8 flex flex-col gap-6">
        
        {/* Success Confirmation Block */}
        <section className="flex flex-col items-center text-center gap-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-2">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2 shadow-sm">
            <CheckCircle2 size={48} strokeWidth={2.5} />
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-snug">
            ধন্যবাদ! আপনার অর্ডারটি সফলভাবে রিসিভ হয়েছে।
          </h2>
          <p className="text-base text-gray-600 mt-1">
            অর্ডার আইডি: <span className="font-bold text-[#E52565]">#KO-8492</span>
          </p>
        </section>

        {/* Important Notice */}
        <div className="bg-[#F49547]/10 border border-[#F49547]/20 rounded-xl p-4 md:p-5 flex items-start gap-3 md:gap-4">
          <Info size={24} className="text-[#F49547] shrink-0 mt-0.5" />
          <p className="text-sm md:text-base font-medium text-gray-800 leading-relaxed">
            আমাদের একজন প্রতিনিধি খুব শীঘ্রই আপনাকে কল দিয়ে অর্ডারটি কনফার্ম করবেন। অনুগ্রহ করে আপনার মোবাইলটি সচল রাখুন।
          </p>
        </div>

        {/* Order Summary Card */}
        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">অর্ডারের বিবরণ</h3>
          
          <div className="flex items-center gap-4 mb-5">
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#F5F5F5] p-2 border border-gray-100">
              <img 
                alt="কিউট বেবি সুতি রমপার" 
                className="w-full h-full object-cover mix-blend-multiply" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEI_i5EZu8BUTBMfcpY_S8ie6mf5s2uqK4CZ6rol7a_jFa3Wcu1qg4LgFtnsiEmtGvwHK9XD968xqbu2TZWsPd468Bzh8C9x1ppjCAiLU3ejYcqeithJL6CL-dj4m-rsH4v0_6wY1bFSDU4Si08gzFS_Hsq3PfNvjgnZzRSO7wqugIkepUiTjRzYZtwDVZSpn9HfNHQbHKQr2fSxoJJGn6HS4OXB6s5S2fdGjVIFHwSBUAeChOrt5t" 
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2">কিউট বেবি সুতি রমপার</h4>
              <p className="text-xs md:text-sm text-gray-500 mt-1">পরিমাণ: ১ টি</p>
            </div>
            <div className="text-base md:text-lg font-bold text-gray-900">
              ৳৬০০
            </div>
          </div>
          
          <div className="space-y-3 text-sm md:text-base text-gray-600 border-t border-gray-100 pt-4">
            <div className="flex justify-between">
              <span>সাবটোটাল</span>
              <span className="font-bold text-gray-800">৳৬০০</span>
            </div>
            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ</span>
              <span className="font-bold text-gray-800">৳৬০</span>
            </div>
            <div className="flex justify-between text-lg md:text-xl font-bold text-[#E52565] pt-3 border-t border-gray-100 mt-1">
              <span>সর্বমোট</span>
              <span>৳৬৬০</span>
            </div>
          </div>
        </section>

        {/* Delivery Information Card */}
        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">ডেলিভারি ইনফরমেশন</h3>
          <ul className="space-y-4 md:space-y-5">
            <li className="flex items-start gap-3 md:gap-4">
              <div className="p-2 bg-gray-50 rounded-full text-gray-400 mt-0.5">
                <UserIcon size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">নাম</p>
                <p className="text-sm md:text-base font-bold text-gray-900 mt-0.5">হাসিব আল হাসান</p>
              </div>
            </li>
            <li className="flex items-start gap-3 md:gap-4">
              <div className="p-2 bg-gray-50 rounded-full text-gray-400 mt-0.5">
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">মোবাইল</p>
                <p className="text-sm md:text-base font-bold text-gray-900 mt-0.5">01XXXXXXXXX</p>
              </div>
            </li>
            <li className="flex items-start gap-3 md:gap-4">
              <div className="p-2 bg-gray-50 rounded-full text-gray-400 mt-0.5">
                <MapPin size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">ঠিকানা</p>
                <p className="text-sm md:text-base font-bold text-gray-900 mt-0.5">বাসা-১২, রোড-৫, ধানমন্ডি, ঢাকা</p>
              </div>
            </li>
            <li className="flex items-start gap-3 md:gap-4">
              <div className="p-2 bg-gray-50 rounded-full text-gray-400 mt-0.5">
                <Banknote size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">পেমেন্ট মেথড</p>
                <p className="text-sm md:text-base font-bold text-[#E52565] mt-0.5">ক্যাশ অন ডেলিভারি</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/shop" className="w-full bg-[#E52565] hover:bg-[#E52565]/90 text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors text-center flex items-center justify-center gap-2">
            <ShoppingBag size={18} />
            আরও শপিং করুন
          </Link>
          <Link href="/" className="w-full bg-white border-2 border-gray-200 text-gray-700 hover:border-[#E52565] hover:text-[#E52565] font-bold py-3.5 rounded-lg shadow-sm transition-colors text-center flex items-center justify-center gap-2">
            <Home size={18} />
            হোমপেজে ফিরে যান
          </Link>
        </div>

      </main>
    </div>
  );
}