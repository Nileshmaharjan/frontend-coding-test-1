"use client";

import React, { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import styles from "./Dashboard.module.css";

interface FunnelResponse {
  funnel_distribution: Record<string, number>;
}

export function InFlowChart({
  startDate = "2022-02-02",
  endDate = "2025-02-02",
}: {
  startDate?: string;
  endDate?: string;
}) {
  const [data, setData] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://crm-stats-backend-232897014995.asia-northeast3.run.app/api/v1/stats/business/customers/funnel-distribution?start_date=${startDate}&end_date=${endDate}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<FunnelResponse>;
      })
      .then((json) => setData(json.funnel_distribution))
      .catch((err) => setError(err.message));
  }, [startDate, endDate]);

  const categories = useMemo(() => (data ? Object.keys(data) : []), [data]);
  const values = useMemo(
    () => (data ? categories.map((k) => data[k]) : []),
    [data, categories]
  );

  const option = useMemo(
    () => ({
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: categories,
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
    [categories, values]
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
