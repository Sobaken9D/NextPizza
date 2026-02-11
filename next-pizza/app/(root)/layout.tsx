import type {Metadata} from "next";
import {Nunito} from 'next/font/google';
import {Header} from "@/shared/components/shared/header";
import React from "react";

// Для CEO
export const metadata: Metadata = {
  title: "Next Pizza | Главная",
};

export default function HomeLayout({
  children,
  modal // передача slot для parallel рендера (название от @modal)
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen'>
      <Header></Header>
      {/*Сами страницы*/}
      {children}
      {modal}
    </main>
  );
}
