import Link from "next/link";
import { bins, labelize, sourceTypes, statuses, type IdeaFilters } from "@/lib/ideas";

export function Filters({ filters }: { filters: IdeaFilters }) {
  return (
    <form className="grid gap-3 rounded-md border border-stone-200 bg-white p-4 shadow-sm md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
      <label className="block">
        <span className="text-xs font-medium uppercase text-stone-500">Search</span>
        <input
          name="q"
          defaultValue={filters.q ?? ""}
          placeholder="title, one-liner, theme, audience"
          className="mt-1 h-10 w-full rounded border border-stone-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
        />
      </label>
      <Select label="Source" name="source_type" value={filters.source_type} options={sourceTypes} />
      <Select label="Status" name="status" value={filters.status} options={statuses} />
      <Select label="Bin" name="bin" value={filters.bin} options={bins} />
      <div className="flex items-end gap-2">
        <button className="h-10 rounded bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-stone-800">
          Filter
        </button>
        <Link
          href="/ideas"
          className="flex h-10 items-center rounded border border-stone-200 px-3 text-sm font-medium text-stone-700 hover:bg-stone-100"
        >
          Reset
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
      <span className="text-xs font-medium uppercase text-stone-500">{label}</span>
      <select
        name={name}
        defaultValue={value ?? "all"}
        className="mt-1 h-10 w-full rounded border border-stone-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {labelize(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
