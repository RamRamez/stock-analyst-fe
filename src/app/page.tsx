"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

type Share = {
  insCode: string;
  isin?: string;
  symbol?: string;
  name?: string;
  last?: number;
  close?: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
  value?: number;
  updatedAt?: string;
};

function useShares() {
  return useQuery<Share[]>({
    queryKey: ["shares"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/shares`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load shares");
      return res.json();
    },
    refetchInterval: 10000,
  });
}

export default function Home() {
  const { data, isLoading, isError } = useShares();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data ?? [];
    return (data ?? []).filter((s) =>
      [s.name, s.symbol, s.insCode, s.isin].some((t) => (t || "").toLowerCase().includes(q)),
    );
  }, [query, data]);

  return (
    <div className="py-10">
      <section className="mb-8">
        <div className="relative">
          <div className="absolute inset-0 -z-10 h-40 bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-fuchsia-600/30 blur-3xl rounded-2xl" />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h1 className="text-3xl font-semibold tracking-tight mb-3">Market Dashboard</h1>
            <p className="text-white/70 mb-6">Search and explore real-time prices across the exchange.</p>
            <div className="flex gap-3 items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, symbol, ISIN, or code..."
                className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </section>

      {isLoading && <div className="text-white/80">Loading...</div>}
      {isError && <div className="text-rose-300">Error loading shares</div>}
      {!isLoading && filtered?.length === 0 && <div className="text-white/60">No results</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered?.slice(0, 60).map((s) => (
          <Link key={s.insCode} href={`/share/${s.insCode}`} className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-white/60">{s.symbol || s.insCode}</div>
                <div className="text-lg font-medium">{s.name || s.insCode}</div>
              </div>
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-80 group-hover:opacity-100" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-black/20 p-3">
                <div className="text-white/60">Last</div>
                <div className="text-white font-semibold">{s.last ?? '-'}</div>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <div className="text-white/60">Volume</div>
                <div className="text-white font-semibold">{s.volume ?? '-'}</div>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <div className="text-white/60">Open</div>
                <div className="text-white font-semibold">{s.open ?? '-'}</div>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <div className="text-white/60">High</div>
                <div className="text-white font-semibold">{s.high ?? '-'}</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-white/50">Updated: {s.updatedAt ? new Date(s.updatedAt).toLocaleTimeString() : '-'}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
