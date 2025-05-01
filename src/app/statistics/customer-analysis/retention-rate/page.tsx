"use client";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function RetentionPage() {
  const params = new URLSearchParams({
    start_date: "2023-01-01",
    end_date: "2025-04-29",
    retention_days: "180",
    granularity: "daily",
  });

  const { data, error } = useSWR(
    `/api/customer-analysis/retention-rate?${params.toString()}`,
    fetcher
  );

  if (error) return <p>Error loading retention data.</p>;
  if (!data) return <p>Loading retention…</p>;

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h3 className="text-xl font-semibold">Retention Rate (180-day, Daily)</h3>
    </div>
  );
}
