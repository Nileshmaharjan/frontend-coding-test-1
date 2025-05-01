"use client";

import React, { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";

interface AgeDistributionResponse {
  age_distribution: Record<string, number>;
}

export function AgeFunnelChart({
  startDate = "2022-02-02",
  endDate = "2025-02-02",
}: {
  startDate?: string;
  endDate?: string;
}) {
  const [data, setData] = useState<
    AgeDistributionResponse["age_distribution"] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://crm-stats-backend-232897014995.asia-northeast3.run.app/api/v1/stats/business/customers/age-distribution?start_date=${startDate}&end_date=${endDate}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<AgeDistributionResponse>;
      })
      .then((json) => setData(json.age_distribution))
      .catch((err) => setError(err.message));
  }, [startDate, endDate]);

  const order = ["20대 이하", "30대", "40대", "50대", "60대 이상"];
  const chartData = useMemo(() => {
    if (!data) return [];
    return order.map((name) => ({
      name,
      value: data[name] ?? 0,
    }));
  }, [data]);

  const option = useMemo(
    () => ({
      tooltip: { trigger: "item", formatter: "{b}: {c}" },
      series: [
        {
          type: "funnel",
          left: "10%",
          width: "80%",
          sort: "descending",
          gap: 2,
          label: {
            position: "inside",
            formatter: "{b}\n{c}",
          },
          data: chartData,
        },
      ],
    }),
    [chartData]
  );

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!data) return <div>Loading…</div>;
  return <ReactECharts option={option} style={{ height: 240 }} />;
}
