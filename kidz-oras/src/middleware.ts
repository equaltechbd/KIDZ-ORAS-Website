import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const isAuthPage = request.nextUrl.pathname.startsWith('/admin/login')
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')

  // যদি লগইন করা না থাকে এবং /admin এ ঢোকার চেষ্টা করে, তবে লগইনে পাঠিয়ে দেবে
  if (isAdminPage && !isAuthPage && !user) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // যদি লগইন করা থাকে এবং আবার লগইন পেজে যায়, তবে ড্যাশবোর্ডে পাঠিয়ে দেবে
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}