"use client";

import React, { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./Dashboard.module.css";

interface VisitFrequencyResponse {
  average_visits_per_patient: number;
  visit_histogram: Record<string, number>;
}

export function VisitFrequencyChart({
  startDate = "2022-02-02",
  endDate = "2025-02-02",
}: {
  startDate?: string;
  endDate?: string;
}) {
  const [data, setData] = useState<VisitFrequencyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://crm-stats-backend-232897014995.asia-northeast3.run.app/api/v1/stats/business/customers/visit-frequency?start_date=${startDate}&end_date=${endDate}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<VisitFrequencyResponse>;
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message));
  }, [startDate, endDate]);

  const histogram = data?.visit_histogram ?? {};
  const sortedEntries = useMemo(
    () =>
      Object.entries(histogram).sort(
        (a, b) => parseInt(a[0], 10) - parseInt(b[0], 10)
      ),
    [histogram]
  );
  const labels = sortedEntries.map(([k]) => k);
  const values = sortedEntries.map(([, v]) => v);

  const option = useMemo(
    () => ({
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: labels,
        axisLabel: { rotate: 45 },
      },
      yAxis: { type: "value", name: "count" },
      series: [
        {
          type: "bar",
          data: values,
          itemStyle: {
            color: (params: any) =>
              ["#bae7ff", "#fff1b8", "#ffd6e7", "#d9f7be"][
                params.dataIndex % 4
              ],
          },
        },
      ],
    }),
    [labels, values]
  );

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!data) return <div>Loading…</div>;
  return (
    <ReactECharts
      option={option}
      className={styles.chartWrapper}
      style={{ height: 240 }}
    />
  );
}
