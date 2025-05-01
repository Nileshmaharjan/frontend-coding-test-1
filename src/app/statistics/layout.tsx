"use client";

import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function StatisticsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-auto bg-gray-50">{children}</div>
    </div>
  );
}
