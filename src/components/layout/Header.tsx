"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "대시보드", path: "/" },
  { label: "DESK", path: "/desk" },
  { label: "예약 관리", path: "/reservations" },
  { label: "상담실", path: "/consultation" },
  { label: "현황판", path: "/overview" },
  { label: "진료실", path: "/treatment" },
  { label: "고객관리", path: "/customer" },
  { label: "어드민", path: "/admin" },
  { label: "통계", path: "/statistics" },
  { label: "마케팅", path: "/marketing-analysis" },
  { label: "TM", path: "/tm" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ label, path }) => {
          const isActive =
            pathname === path || (path !== "/" && pathname.startsWith(path));

          return (
            <Link
              key={path}
              href={path}
              className={[styles.navItem, isActive ? styles.active : ""].join(
                " "
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
