"use client";

import { useState } from "react";
import { Search, Users, MoreHorizontal, Star, MapPin, Phone, Mail } from "lucide-react";

export default function CustomersPage() {
  // আপাতত ডেমো ডেটা দিয়ে ডিজাইন করা হচ্ছে (পরে এটি Supabase থেকে অটোমেটিক আসবে)
  const [customers, setCustomers] = useState([
    { id: 1, name: "রাকিব হাসান", phone: "01711XXXXXX", email: "rakib@email.com", address: "ধানমন্ডি, ঢাকা", totalOrders: 5, totalSpent: 4500, isVIP: true },
    { id: 2, name: "তাসনিম আক্তার", phone: "01822XXXXXX", email: "tasnim@email.com", address: "মিরপুর ১০, ঢাকা", totalOrders: 1, totalSpent: 850, isVIP: false },
    { id: 3, name: "মাহমুদুল করিম", phone: "01933XXXXXX", email: "mahmudul@email.com", address: "গুলশান ২, ঢাকা", totalOrders: 12, totalSpent: 15200, isVIP: true }
  ]);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="text-[#E52565]" /> কাস্টমার লিস্ট
        </h1>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="নাম বা নাম্বার দিয়ে খুঁজুন..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E52565] focus:ring-1 focus:ring-[#E52565] transition-all"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                <th className="p-4 font-semibold">কাস্টমার</th>
                <th className="p-4 font-semibold">কন্টাক্ট ইনফো</th>
                <th className="p-4 font-semibold">ঠিকানা</th>
                <th className="p-4 font-semibold text-center">মোট অর্ডার</th>
                <th className="p-4 font-semibold text-right">মোট খরচ</th>
                <th className="p-4 font-semibold text-center">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                  
                  {/* Name & VIP Tag */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          {customer.name}
                          {customer.isVIP && (
                            <span className="flex items-center gap-1 text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">
                              <Star size={10} className="fill-yellow-500 text-yellow-500" /> VIP
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5"><Phone size={14} className="text-gray-400"/> {customer.phone}</span>
                      <span className="flex items-center gap-1.5"><Mail size={14} className="text-gray-400"/> {customer.email}</span>
                    </div>
                  </td>

                  {/* Address */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <MapPin size={14} className="text-gray-400 shrink-0"/> 
                      <span className="line-clamp-1">{customer.address}</span>
                    </div>
                  </td>

                  {/* Total Orders */}
                  <td className="p-4 text-center">
                    <span className="inline-block bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full text-sm">
                      {customer.totalOrders} টি
                    </span>
                  </td>

                  {/* Total Spent */}
                  <td className="p-4 text-right">
                    <span className="font-bold text-[#E52565]">৳{customer.totalSpent}</span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-center">
                    <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}