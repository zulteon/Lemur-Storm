import Link from "next/link";
import { Badge } from "@/components/Badge";
import type { Idea } from "@/lib/ideas";
import { labelize } from "@/lib/ideas";

function statusTone(status: Idea["status"]) {
  if (status === "shortlisted" || status === "validation" || status === "build") {
    return "green" as const;
  }
  if (status === "rejected") {
    return "red" as const;
  }
  if (status === "human_review" || status === "ai_filtered") {
    return "amber" as const;
  }
  return "blue" as const;
}

export function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <Link
      href={`/ideas/${idea.id}`}
      className="group flex min-h-72 flex-col justify-between rounded-md border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge tone={statusTone(idea.status)}>{labelize(idea.status)}</Badge>
          <Badge>{labelize(idea.source_type)}</Badge>
          {idea.bin !== "none" ? <Badge tone="violet">{labelize(idea.bin)}</Badge> : null}
        </div>
        <div>
          <h2 className="text-lg font-semibold leading-6 text-stone-950 group-hover:text-emerald-800">
            {idea.title}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-600">{idea.one_liner}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs uppercase text-stone-400">Theme</dt>
            <dd className="font-medium text-stone-800">{idea.theme}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-stone-400">Audience</dt>
            <dd className="font-medium text-stone-800">{idea.target_group}</dd>
          </div>
        </dl>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2 border-t border-stone-100 pt-4 text-center">
        <Score label="Total" value={idea.score_total} />
        <Score label="Market" value={idea.score_market} />
        <Score label="Build" value={idea.score_feasibility} />
        <Score label="Wild" value={idea.score_wildness} />
      </div>
    </Link>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-base font-semibold text-stone-950">{value}</div>
      <div className="text-[11px] uppercase text-stone-400">{label}</div>
    </div>
  );
}
