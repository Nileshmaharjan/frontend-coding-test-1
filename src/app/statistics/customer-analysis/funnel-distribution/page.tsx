"use client";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function FunnelPage() {
  const { data, error } = useSWR(
    "/api/customer-analysis/funnel-distribution?granularity=daily",
    fetcher
  );

  if (error) return <p>Error loading funnel.</p>;
  if (!data) return <p>Loading funnel…</p>;

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h3 className="text-xl font-semibold">Funnel Distribution (Daily)</h3>
      {/* ← render your funnel chart here with “data” */}
    </div>
  );
}
