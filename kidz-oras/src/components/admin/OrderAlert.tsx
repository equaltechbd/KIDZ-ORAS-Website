"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-hot-toast";

export default function OrderAlert() {
  const supabase = createClient();

  useEffect(() => {
    // Supabase Real-time Listener (Orders টেবিলের জন্য)
    const channel = supabase
      .channel('realtime-orders')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          // ১. নতুন অর্ডার আসার সাথে সাথে জোরে সাউন্ড প্লে হবে
          const audio = new Audio('/alarm.mp3'); 
          audio.play().catch(e => console.log("Audio play blocked by browser. Please interact with the page first.", e));
          
          // ২. স্ক্রিনে সুন্দর অ্যালার্ট দেখাবে
          toast.success(
            `🎉 নতুন অর্ডার! ${payload.new.customer_name} - ৳${payload.new.total_amount}`,
            { duration: 8000, style: { padding: '16px', background: '#10b981', color: '#fff', fontWeight: 'bold' } }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return null; // এটি ব্যাকগ্রাউন্ডে কাজ করবে, তাই UI তে কিছু দেখাবে না
}