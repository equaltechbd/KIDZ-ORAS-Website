/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-5 py-10 flex flex-col items-center gap-4 text-center bg-gray-50 border-t border-gray-100 pb-28 md:pb-12 mt-auto">
      <img alt="Kidz Oras Logo" className="h-10 md:h-12 object-contain mx-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC0YhxuqDqWbty1htb0Yd6mkvYHD3ywPuHP9rBTZSYt-R2UzfXss5UWV2kwhK15afkeDbX5Amwt43ulZXEfrgN4lr2pZbNvyPDQAYKRnwsQMr3GTPnFfLgCzXGbavMK4UU0Qn3IVaUMVLx7Q6BRGZruWq2_zqEN_F6idMXGvOvWS1-xM6flCK1mGhJNxH_9pKx_SHpXxOr1j6t6M-w8u3zJlXglYTq-cYVm0VXwM_r_X8NU-Z5Y64RO205_SJI-rlXxw" />
      <p className="font-bold text-base md:text-lg text-gray-600">
        আপনার সোনামণির হাসিমুখের সঙ্গী - Kidz Oras
      </p>
      <div className="flex flex-wrap justify-center gap-6 font-medium text-sm text-gray-500 mt-2">
        <Link href="/policies" className="hover:text-[#E52565]">গোপনীয়তা নীতি</Link>
        <Link href="/policies" className="hover:text-[#E52565]">শর্তাবলী</Link>
        <Link href="/policies" className="hover:text-[#E52565]">রিফান্ড পলিসি</Link>
      </div>
      <p className="text-sm text-gray-400 mt-4">
        © 2026 Kidz Oras. All rights reserved.
      </p>
    </footer>
  );
}