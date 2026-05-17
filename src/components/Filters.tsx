import Link from "next/link";
import { bins, labelize, sourceTypes, statuses, type IdeaFilters } from "@/lib/ideas";

export function Filters({ filters }: { filters: IdeaFilters }) {
  return (
    <form className="grid gap-4 rounded-[26px] border border-[#c98e4d] bg-[#f5ecd9] p-5 shadow-[0_10px_24px_rgba(92,46,18,0.08)] md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wide text-[#9a4b12]">Keresés</span>
        <input
          name="q"
          defaultValue={filters.q ?? ""}
          placeholder="cím, egysoros, téma, célcsoport"
          className="mt-1 h-11 w-full rounded-full border border-[#d5a05f] bg-[#fff8e8] px-4 text-sm text-[#572208] outline-none placeholder:text-[#b77a3b] focus:border-[#8b3f0f]"
        />
      </label>
      <Select label="Forrás" name="source_type" value={filters.source_type} options={sourceTypes} />
      <Select label="Állapot" name="status" value={filters.status} options={statuses} />
      <Select label="Kupac" name="bin" value={filters.bin} options={bins} />
      <div className="flex items-end gap-2">
        <button className="h-11 rounded-full bg-[#7b351c] px-5 text-sm font-bold text-[#fff6df] hover:bg-[#5b2815]">
          Szűrés
        </button>
        <Link
          href="/ideas"
          className="flex h-11 items-center rounded-full border border-[#c98e4d] px-4 text-sm font-bold text-[#7b351c] hover:bg-[#f0dfbd]"
        >
          Törlés
        </Link>
      </div>
    </form>
  );
}

function Select({
  label,
  name,
  value,
  options,
}: {
  label: string;
  name: string;
  value?: string;
  options: readonly string[];
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-[#9a4b12]">{label}</span>
      <select
        name={name}
        defaultValue={value ?? "all"}
        className="mt-1 h-11 w-full rounded-full border border-[#d5a05f] bg-[#fff8e8] px-4 text-sm text-[#572208] outline-none focus:border-[#8b3f0f]"
      >
        <option value="all">Mind</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {labelize(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
