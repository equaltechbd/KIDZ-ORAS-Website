import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // বিল্ড টাইমে এরর ঠেকানোর জন্য ফলব্যাক (Fallback) অ্যাড করা হলো
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key';

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}