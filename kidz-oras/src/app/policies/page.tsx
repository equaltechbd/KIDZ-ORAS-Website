/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, RefreshCcw, FileText, Home, Store, User } from "lucide-react";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#221a15] font-sans pb-24 md:pb-16">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#E52565] transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg md:text-xl font-bold text-[#E52565]">পলিসি সমূহ</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="pt-20 md:pt-28 max-w-3xl mx-auto px-4 md:px-6 flex flex-col gap-6">
        
        {/* Privacy Policy Section */}
        <section className="bg-white rounded-xl p-5 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-12 h-12 rounded-full bg-[#E52565]/10 text-[#E52565] flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">প্রাইভেসি পলিসি</h2>
          </div>
          <div className="text-sm md:text-base text-gray-600 space-y-4 leading-relaxed">
            <p>
              Kidz Oras-এ আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা কেবল আপনার নাম, ফোন নম্বর এবং ঠিকানা সংগ্রহ করি, যা একচেটিয়াভাবে অর্ডার প্রক্রিয়াকরণ এবং ডেলিভারির উদ্দেশ্যে ব্যবহৃত হয়।
            </p>
            <p>
              আমরা কোনোভাবেই আপনার ব্যক্তিগত তথ্য তৃতীয় কোনো পক্ষের কাছে বিক্রি বা শেয়ার করি না। আপনার ডেটা সুরক্ষিত রাখতে আমরা প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>
        </section>

        {/* Return & Refund Policy Section */}
        <section className="bg-white rounded-xl p-5 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-12 h-12 rounded-full bg-[#F49547]/10 text-[#F49547] flex items-center justify-center shrink-0">
              <RefreshCcw size={24} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">রিটার্ন ও রিফান্ড পলিসি</h2>
          </div>
          <div className="text-sm md:text-base text-gray-600 space-y-4 leading-relaxed">
            <p>
              আমরা চাই আমাদের প্রতিটি পণ্য আপনার এবং আপনার শিশুর মুখে হাসি ফোটাক। তবে কোনো কারণে সমস্যা হলে নিম্নলিখিত শর্তে রিটার্ন বা এক্সচেঞ্জ সম্ভব:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>ত্রুটিপূর্ণ বা ভুল পণ্য পাওয়ার <span className="font-bold text-gray-900">৩ দিনের মধ্যে</span> রিটার্ন বা এক্সচেঞ্জ করতে হবে।</li>
              <li>পণ্যটি অবশ্যই অব্যবহৃত এবং আসল প্যাকেজিংয়ে (ট্যাগ সহ, যদি থাকে) থাকতে হবে।</li>
            </ul>
            <div className="bg-[#F8F9FA] p-4 rounded-lg mt-5 border-l-4 border-[#F49547] text-sm text-gray-700">
              <strong>বিঃদ্রঃ:</strong> নির্দিষ্ট পণ্যের ক্যাটাগরি অনুযায়ী রিটার্ন পলিসি ভিন্ন হতে পারে, যা সংশ্লিষ্ট পণ্যের পেজে উল্লেখ থাকে।
            </div>
          </div>
        </section>

        {/* Terms & Conditions Section */}
        <section className="bg-white rounded-xl p-5 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-12 h-12 rounded-full bg-[#41C1C0]/10 text-[#41C1C0] flex items-center justify-center shrink-0">
              <FileText size={24} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">শর্তাবলী</h2>
          </div>
          <div className="text-sm md:text-base text-gray-600 space-y-4 leading-relaxed">
            <p>
              Kidz Oras থেকে কেনাকাটা করার অর্থ হলো আপনি আমাদের সাধারণ শর্তাবলীর সাথে সম্মত।
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>অর্ডার করার সময় আপনাকে সঠিক এবং হালনাগাদ তথ্য প্রদান করতে হবে।</li>
              <li>স্টকের প্রাপ্যতা বা মূল্য নির্ধারণে কোনো অনিচ্ছাকৃত ভুলের কারণে আমরা যেকোনো অর্ডার বাতিল করার অধিকার সংরক্ষণ করি। সেক্ষেত্রে আপনাকে দ্রুত অবহিত করা হবে।</li>
            </ul>
          </div>
        </section>

      </main>

      {/* Mobile Bottom NavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md px-2 py-3 flex justify-around items-center border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link href="/" className="flex flex-col items-center justify-center text-gray-500 hover:text-[#E52565] transition-colors px-6">
          <Home size={22} />
          <span className="font-bold text-[10px] mt-1">হোম</span>
        </Link>
        <Link href="/shop" className="flex flex-col items-center justify-center text-gray-500 hover:text-[#E52565] transition-colors px-6">
          <Store size={22} />
          <span className="font-bold text-[10px] mt-1">শপ</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center text-[#E52565] px-6">
          <User size={22} />
          <span className="font-bold text-[10px] mt-1">অ্যাকাউন্ট</span>
        </Link>
      </nav>

    </div>
  );
}