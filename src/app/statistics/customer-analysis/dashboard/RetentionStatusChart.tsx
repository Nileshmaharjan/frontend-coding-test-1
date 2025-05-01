"use client";

import React, { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./Dashboard.module.css";

interface RetentionRateResponse {
  retention_rate: number;
  retained_patients: number;
  total_eligible_patients: number;
  retention_histogram: Record<string, number>;
}

export function RetentionRateChart({
  startDate = "2022-02-02",
  endDate = "2025-02-02",
  retentionDays = 90,
}: {
  startDate?: string;
  endDate?: string;
  retentionDays?: number;
}) {
  const [data, setData] = useState<RetentionRateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://crm-stats-backend-232897014995.asia-northeast3.run.app/api/v1/stats/business/customers/retention-rate?start_date=${startDate}&end_date=${endDate}&retention_days=${retentionDays}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<RetentionRateResponse>;
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [startDate, endDate, retentionDays]);

  const rate = useMemo(() => data?.retention_rate ?? 0, [data]);

  const gaugeOpt = useMemo(
    () => ({
      series: [
        {
          type: "pie",
          radius: ["60%", "80%"],
          startAngle: 180,
          hoverAnimation: false,
          label: { show: false },
          data: [
            { value: rate, itemStyle: { color: "#4ea8de" } },
            { value: 100 - rate, itemStyle: { color: "#f0f0f0" } },
          ],
        },
      ],
    }),
    [rate]
  );

  const total = data?.total_eligible_patients ?? 0;
  const ret = data?.retained_patients ?? 0;

  const buckets = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.retention_histogram);
  }, [data]);

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!data) return <div>Loading…</div>;

  return (
    <div className={`${styles.card} ${styles.retentionCard}`}>
      <h3>고객 유지율</h3>

      <div className={styles.retentionChart}>
        <ReactECharts
          option={gaugeOpt}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className={styles.retentionRateText}>{rate.toFixed(2)}%</div>

      <div className={styles.statsRow2}>
        <div>
          <div className={styles.periodLabel}>전체 고객</div>
          <div className={styles.periodValue}>{total}</div>
        </div>
        <div>
          <div className={styles.periodLabel}>재방문 고객</div>
          <div className={styles.periodValue}>{ret}</div>
        </div>
      </div>

      <div className={styles.statsRow3}>
        {buckets.slice(0, 3).map(([label, value]) => (
          <div key={label}>
            <div className={styles.periodLabel}>{label}</div>
            <div className={styles.periodValue}>{value}</div>
          </div>
        ))}
      </div>

      <div className={styles.statsRow3}>
        {buckets.slice(3, 6).map(([label, value]) => (
          <div key={label}>
            <div className={styles.periodLabel}>{label}</div>
            <div className={styles.periodValue}>{value}</div>
          </div>
        ))}
      </div>

      <div className={styles.statsFull}>
        {buckets[6] && (
          <div>
            <div className={styles.periodLabel}>{buckets[6][0]}</div>
            <div className={styles.periodValue}>{buckets[6][1]}</div>
          </div>
        )}
      </div>
    </div>
  );
}
