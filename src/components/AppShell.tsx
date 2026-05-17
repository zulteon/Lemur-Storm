import Link from "next/link";

const navItems = [
  { href: "/ideas", label: "Ötletek" },
  { href: "/shortlist", label: "Válogatás" },
  { href: "/bins", label: "Kupacok" },
  { href: "/ideas/new", label: "Új ötlet" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#efe2bd] text-[#4a1f0b]">
      <header className="bg-[#452817] text-[#fff6df]">
        <div className="mx-auto flex max-w-[1540px] flex-col gap-4 px-6 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/ideas" className="w-fit">
            <h1 className="text-3xl font-extrabold tracking-normal text-[#fff6df]">Lemur Storm</h1>
          </Link>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#f7e9c9] transition hover:bg-[#5a321c]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1540px] px-6 py-10 sm:px-8 lg:py-14">{children}</main>
    </div>
  );
}
