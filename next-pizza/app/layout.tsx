// Оболочка всего проекта

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nunito } from 'next/font/google';
import "./globals.css";
import {Header} from "@/components/shared/header";


const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// Для CEO
export const metadata: Metadata = {
  title: "Next Pizza | Главная",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.variable}>
          <main className='min-h-screen'>
              <Header></Header>

              {/*Сами страницы*/}
              {children}
          </main>
      </body>
    </html>
  );
}
