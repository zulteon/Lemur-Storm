import Link from "next/link";

const navItems = [
  { href: "/ideas", label: "Ideas" },
  { href: "/shortlist", label: "Shortlist" },
  { href: "/bins", label: "Bins" },
  { href: "/ideas/new", label: "New idea" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-950">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/ideas" className="w-fit">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Lemur Storm</p>
            <h1 className="text-2xl font-semibold tracking-normal text-stone-950">Idea Forge</h1>
          </Link>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
