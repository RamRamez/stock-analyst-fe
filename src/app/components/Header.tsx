import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/10 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500" />
          <span className="text-lg font-semibold tracking-tight">Stock Analyst</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
          <a href="https://tsetmc.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TSETMC</a>
          <a href="https://docs.nestjs.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">API</a>
        </nav>
      </div>
    </header>
  );
}


