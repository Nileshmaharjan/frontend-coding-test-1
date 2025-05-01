"use client";

import React, { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";

interface NationalityDistributionResponse {
  nationality_distribution: { [key: string]: number };
}

export function NationalityChart({
  startDate = "2022-02-02",
  endDate = "2025-02-02",
}: {
  startDate?: string;
  endDate?: string;
}) {
  const [data, setData] = useState<NationalityDistributionResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://crm-stats-backend-232897014995.asia-northeast3.run.app/api/v1/stats/business/customers/nationality-distribution?start_date=${startDate}&end_date=${endDate}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<NationalityDistributionResponse>;
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message));
  }, [startDate, endDate]);

  const chartData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.nationality_distribution).map(
      ([name, count]) => ({
        name,
        value: count,
      })
    );
  }, [data]);

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
        formatter: "{b}: {d}%",
      },
      series: [
        {
          type: "pie",
          radius: "70%",
          data: chartData,
          label: {
            show: true,
            position: "inside",
            color: "#fff",
            fontSize: 14,
            formatter: (params: any) =>
              params.value > 0
                ? `${params.name}\n${params.percent.toFixed(2)}%`
                : "",
          },
        },
      ],
    }),
    [chartData]
  );

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!data) return <div>Loading…</div>;
  return <ReactECharts option={option} style={{ height: 300 }} />;
}
