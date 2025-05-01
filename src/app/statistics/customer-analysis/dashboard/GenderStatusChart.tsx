"use client";

import React, { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";

interface GenderDistributionResponse {
  gender_distribution: {
    [key: string]: number;
  };
}

export function GenderChart({
  startDate = "2022-02-02",
  endDate = "2025-02-02",
}: {
  startDate?: string;
  endDate?: string;
}) {
  const [data, setData] = useState<GenderDistributionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://crm-stats-backend-232897014995.asia-northeast3.run.app/api/v1/stats/business/customers/gender-distribution?start_date=${startDate}&end_date=${endDate}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<GenderDistributionResponse>;
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message));
  }, [startDate, endDate]);

  const maleCount = data?.gender_distribution?.["남성"] ?? 0;
  const femaleCount = data?.gender_distribution?.["여성"] ?? 0;
  const total = maleCount + femaleCount;

  const percentMale = total > 0 ? (maleCount / total) * 100 : 0;
  const percentFemale = total > 0 ? (femaleCount / total) * 100 : 0;

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
          data: [
            { value: maleCount, name: "남성" },
            { value: femaleCount, name: "여성" },
          ],
          label: {
            show: true,
            position: "inside",
            color: "#fff",
            fontSize: 14,
            formatter: (params: any) => {
              if (params.value === 0) return "";
              return `${params.name}\n${params.percent.toFixed(2)}%`;
            },
          },
          color: ["#90caf9", "#f48fb1"],
        },
      ],
    }),
    [maleCount, femaleCount]
  );

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }
  if (!data) {
    return <div>Loading…</div>;
  }

  return <ReactECharts option={option} style={{ height: 240 }} />;
}
