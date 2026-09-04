import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

// হিন্দ শিলিগুড়ি ফন্ট কনফিগারেশন
const hindSiliguri = Hind_Siliguri({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: "Kidz Oras - Premium Educational Toys",
  description: "Premium educational toys and baby essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${hindSiliguri.variable} font-sans antialiased bg-[#FAFAFA] text-[#2D3436]`}>
        {children}
      </body>
    </html>
  );
}