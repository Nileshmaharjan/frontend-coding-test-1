"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

interface SubItem {
  key: string;
  title: string;
  href: string;
}
interface Category {
  key: string;
  title: string;
  children: SubItem[];
}

const MENU: Category[] = [
  {
    key: "customer-analysis",
    title: "고객 분석",
    children: [
      {
        key: "dashboard",
        title: "대시보드",
        href: "/statistics/customer-analysis/dashboard",
      },
      {
        key: "visit-status",
        title: "방문현황",
        href: "/statistics/customer-analysis/visit-status",
      },
      {
        key: "gender-analysis",
        title: "성별분석",
        href: "/statistics/customer-analysis/gender-analysis",
      },
      {
        key: "inflow-analysis",
        title: "유입분석",
        href: "/statistics/customer-analysis/inflow-analysis",
      },
      {
        key: "nationality-analysis",
        title: "국적분석",
        href: "/statistics/customer-analysis/nationality-analysis",
      },
      {
        key: "age-distribution",
        title: "연령대분석",
        href: "/statistics/customer-analysis/age-distribution",
      },
      {
        key: "visit-frequency",
        title: "방문빈도",
        href: "/statistics/customer-analysis/visit-frequency",
      },
      {
        key: "retention-rate",
        title: "고객유지율",
        href: "/statistics/customer-analysis/retention-rate",
      },
    ],
  },
  { key: "marketing-analysis", title: "마케팅 분석", children: [] },
  { key: "revenue-analysis", title: "매출 분석", children: [] },
  { key: "service-analysis", title: "서비스 분석", children: [] },
  { key: "performance-management", title: "성과 관리", children: [] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openKey, setOpenKey] = useState<string>("customer-analysis");

  useEffect(() => {
    const matched = MENU.find((cat) =>
      pathname.startsWith(`/statistics/${cat.key}`)
    );
    if (matched) setOpenKey(matched.key);
  }, [pathname]);

  const toggle = (key: string) =>
    setOpenKey((prev) => (prev === key ? "" : key));

  return (
    <aside className={styles.sidebar}>
      <h5 className={styles.title}>비지니스 인사이트</h5>
      <nav className={styles.nav}>
        {MENU.map((cat) => {
          const isOpen = openKey === cat.key;

          return (
            <div key={cat.key}>
              <button
                onClick={() => toggle(cat.key)}
                className={
                  `${styles.category} ` +
                  (isOpen ? styles.categoryOpen : styles.categoryClosed)
                }
              >
                <span>{cat.title}</span>
                <Image
                  src="/arrow.svg"
                  alt="펼치기"
                  width={16}
                  height={16}
                  className={
                    `${styles.arrow} ` +
                    (isOpen ? styles.arrowOpen : styles.arrowClosed)
                  }
                />
              </button>

              {isOpen && cat.children.length > 0 && (
                <div className={styles.submenu}>
                  {cat.children.map((sub) => {
                    const isActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.key}
                        href={sub.href}
                        className={
                          `${styles.submenuItem} ` +
                          (isActive ? styles.submenuItemActive : "")
                        }
                      >
                        {!isActive}
                        {sub.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
