"use client";

import React, { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";

interface AgeGroupDistributionResponse {
  age_group_distribution: Record<string, number>;
}

export function AgeFunnelChart({
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
      `https://crm-stats-backend-232897014995.asia-northeast3.run.app/api/v1/stats/business/customers/age-group-distribution?start_date=${startDate}&end_date=${endDate}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<AgeGroupDistributionResponse>;
      })
      .then((json) => setData(json.age_group_distribution))
      .catch((err) => setError(err.message));
  }, [startDate, endDate]);

  const order = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
  const chartData = useMemo(() => {
    if (!data) return [];
    return order
      .map((name) => ({ name, value: data[name] ?? 0 }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}",
      },
      series: [
        {
          name: "연령대",
          type: "funnel",
          left: "15%",
          right: "15%",
          top: "10%",
          bottom: "10%",
          sort: "descending",
          gap: 4,
          minSize: "20%",
          maxSize: "80%",
          label: {
            show: true,
            position: "inside",
            formatter: "{c}",
            fontSize: 14,
            color: "#333",
          },
          itemStyle: {
            borderRadius: 8,
          },
          data: chartData,
        },
      ],
    }),
    [chartData]
  );

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!data) return <div>Loading…</div>;

  return (
    <ReactECharts option={option} style={{ width: "100%", height: 240 }} />
  );
}
