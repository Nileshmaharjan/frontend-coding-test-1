"use client";

import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./Dashboard.module.css";
import { VisitStatusChart } from "./VisitStatusChart";
import { GenderChart } from "./GenderStatusChart";
import { NationalityChart } from "./NationalityStatusChart";
import { AgeFunnelChart } from "./AgeFunnelChart";
import { RetentionRateChart } from "./RetentionStatusChart";
import { InFlowChart } from "./InflowChart";
import { VisitFrequencyChart } from "./VisitFrequencyChart";

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      {/* Row 1 */}
      <section className={styles.card}>
        <h3>방문 현황</h3>
        <VisitStatusChart startDate="2023-02-02" endDate="2025-02-02" />
      </section>

      <section className={styles.card}>
        <h3>성별 분석</h3>
        <GenderChart startDate="2023-02-02" endDate="2025-02-02" />
      </section>

      <section className={styles.card}>
        <h3>국적 분석</h3>
        <NationalityChart startDate="2023-02-02" endDate="2025-02-02" />
      </section>

      <section className={`${styles.card} ${styles.barCard}`}>
        <h3>유입 분석</h3>
        <InFlowChart startDate="2023-02-02" endDate="2025-02-02" />
      </section>

      <section className={`${styles.card} ${styles.retentionCard}`}>
        <h3>고객 유지율</h3>
        <RetentionRateChart startDate="2023-02-02" endDate="2025-02-02" />
      </section>

      {/* Row 2 */}
      <section className={`${styles.card} ${styles.funnelCard}`}>
        <h3>연령대 분석</h3>
        <AgeFunnelChart startDate="2023-02-02" endDate="2025-02-02" />
      </section>

      <section className={`${styles.card} ${styles.lineCard}`}>
        <h3>방문 빈도</h3>
        <VisitFrequencyChart />
      </section>
    </div>
  );
}
