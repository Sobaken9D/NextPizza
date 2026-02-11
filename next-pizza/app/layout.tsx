// next Route Groups - (route) and (dashboard) - группы роутов со своими лаяотами
// next Route Parallel - что-то типа асинхронного рендера страниц // после этого типа перезагрузи страницу

import {Nunito} from 'next/font/google';
import "./globals.css";
import React from "react";

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={nunito.variable}>
    <head>
      <link
        data-rh="true"
        rel="icon"
        href="/assets/logo.png"
      />
    </head>
      {/*Сами страницы*/}
      {children}
    </body>
    </html>
  );
}
