import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-white/70 flex items-center justify-between">
        <div>© {new Date().getFullYear()} Stock Analyst</div>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <Link href="/" className="hover:text-white">Home</Link>
        </div>
      </div>
    </footer>
  );
}


