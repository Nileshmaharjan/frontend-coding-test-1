"use client";

import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./Dashboard.module.css";
import { VisitStatusChart } from "./VisitStatusChart";
import { GenderChart } from "./GenderStatusChart";
import { NationalityChart } from "./NationalityStatusChart";
import { AgeFunnelChart } from "./AgeFunnelChart";
import { RetentionRateChart } from "./RetentionStatusChart";

function InflowChart() {
  const option = useMemo(
    () => ({
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: [
          "plane",
          "helicopter",
          "boat",
          "train",
          "subway",
          "bus",
          "car",
          "moto",
          "bicycle",
          "horse",
          "skateboard",
          "others",
        ],
        axisLabel: { rotate: 45 },
      },
      yAxis: { type: "value", name: "count" },
      series: [
        {
          type: "bar",
          data: [0, 6, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0],
          itemStyle: {
            color: (params: any) =>
              ["#bae7ff", "#fff1b8", "#ffd6e7", "#d9f7be"][
                params.dataIndex % 4
              ],
          },
        },
      ],
    }),
    []
  );
  return <ReactECharts option={option} className={styles.chartWrapper} />;
}

function VisitFrequencyChart() {
  const option = useMemo(
    () => ({
      tooltip: { trigger: "axis" },
      legend: {
        data: ["norway", "germany", "us", "france", "japan"],
        right: 10,
        top: "center",
        orient: "vertical",
      },
      grid: { left: "10%", right: "20%", bottom: "10%", containLabel: true },
      xAxis: {
        type: "category",
        data: [
          "plane",
          "helicopter",
          "boat",
          "train",
          "subway",
          "bus",
          "car",
          "moto",
          "bicycle",
          "horse",
          "skateboard",
          "others",
        ],
      },
      yAxis: { type: "value", name: "count" },
      series: [
        {
          name: "norway",
          type: "line",
          data: [920, 760, 880, 730, 880, 570, 590, 780, 590, 920, 900, 850],
        },
        {
          name: "germany",
          type: "line",
          data: [880, 710, 660, 500, 660, 480, 500, 540, 420, 820, 750, 720],
        },
        {
          name: "us",
          type: "line",
          data: [720, 620, 390, 440, 540, 410, 450, 350, 520, 460, 510, 460],
        },
        {
          name: "france",
          type: "line",
          data: [540, 550, 290, 300, 250, 280, 390, 350, 280, 380, 260, 240],
        },
        {
          name: "japan",
          type: "line",
          data: [260, 270, 200, 90, 240, 150, 220, 180, 160, 90, 60, 0],
        },
      ],
    }),
    []
  );
  return <ReactECharts option={option} className={styles.chartWrapper} />;
}

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
        <InflowChart />
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
