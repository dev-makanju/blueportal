'use client'
import localFont from "next/font/local";
import "./globals.css";
import AppLayout from '../components/layouts/AppLayout'
import { usePathname } from 'next/navigation';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  const pathname = usePathname();

  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';


  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {isAuthPage ? (
          children
        ) : (
          <AppLayout>
            {children}
          </AppLayout>
        )}
      </body>
    </html>
  );
}
