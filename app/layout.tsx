import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
//import AppLayout from '../components/layouts/AppLayout'

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

export const metadata: Metadata = {
  title: "InstaShop",
  description: "Shop with ease, we are always online and ready to serve your needs. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased md: max-w-[500px] m-auto`}>
        {children}
      </body>
    </html>
  );
}
