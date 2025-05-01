"use client";

import React, { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";

interface VisitStatusResponse {
  total_customers: number;
  new_customers: number;
  returning_customers: number;
}

export function VisitStatusChart({
  startDate = "2023-02-02",
  endDate = "2025-02-02",
}: {
  startDate?: string;
  endDate?: string;
}) {
  const [data, setData] = useState<VisitStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://crm-stats-backend-232897014995.asia-northeast3.run.app/api/v1/stats/business/customers/visit-status?start_date=${startDate}&end_date=${endDate}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<VisitStatusResponse>;
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message));
  }, [startDate, endDate]);

  const newCount = data?.new_customers ?? 0;
  const retCount = data?.returning_customers ?? 0;
  const total = newCount + retCount;

  const percentNew = total > 0 ? (newCount / total) * 100 : 0;
  const percentReturn = total > 0 ? (retCount / total) * 100 : 0;

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      series: [
        {
          type: "pie",
          radius: "70%",
          data: [
            { value: percentNew, name: "초진" },
            { value: percentReturn, name: "재진" },
          ],
          label: {
            position: "inside",
            color: "#fff",
            fontSize: 14,
            formatter: (params: any) => {
              if (params.value === 0) return "";
              return `${params.name}\n (${params.percent}%)`;
            },
          },
          color: ["#f8c8c8", "#babaff"],
        },
      ],
    }),
    [percentNew, percentReturn]
  );

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }
  if (!data) {
    return <div>Loading…</div>;
  }

  return <ReactECharts option={option} style={{ height: 240 }} />;
}
