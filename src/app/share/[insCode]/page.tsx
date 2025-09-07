"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export default function SharePage() {
  const params = useParams<{ insCode: string }>();
  const insCode = params?.insCode;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["share", insCode],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/shares/${insCode}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    refetchInterval: 10000,
    enabled: Boolean(insCode),
  });

  if (!insCode) return <div className="p-6 text-rose-300">Invalid share</div>;
  if (isLoading) return <div className="p-6 text-white/80">Loading...</div>;
  if (isError) return <div className="p-6 text-rose-300">Failed to load</div>;

  const s = data || {};

  return (
    <div className="py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 relative">
          <div className="absolute inset-0 -z-10 h-40 bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-fuchsia-600/30 blur-3xl rounded-2xl" />
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">{s.symbol || s.insCode}</div>
            <h1 className="text-2xl font-semibold">{s.name || s.insCode}</h1>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{s.last ?? '-'}</div>
            <div className="text-xs text-gray-400">Updated: {s.updatedAt ? new Date(s.updatedAt).toLocaleTimeString() : '-'}</div>
          </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Open" value={s.open} />
          <Stat label="High" value={s.high} />
          <Stat label="Low" value={s.low} />
          <Stat label="Close" value={s.close} />
          <Stat label="Volume" value={s.volume} />
          <Stat label="Value" value={s.value} />
          <Stat label="Trades" value={s.tradeCount} />
        </div>

        <div className="mt-6">
          <pre className="text-xs bg-black/30 text-white/90 p-4 rounded-xl border border-white/10 overflow-auto">{JSON.stringify(s, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/60">{label}</div>
      <div className="text-lg font-medium">{value ?? '-'}</div>
    </div>
  );
}


