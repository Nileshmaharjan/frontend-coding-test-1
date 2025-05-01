"use client";

import "./globals.css"; // your existing global resets, etc.
import styles from "./layout.module.css";
import { ReactNode } from "react";
import Header from "@/components/layout/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={styles.container}>
        <Header />

        <div className={styles.main}>{children}</div>
      </body>
    </html>
  );
}
