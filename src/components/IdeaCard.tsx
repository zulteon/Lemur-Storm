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
      className="group flex min-h-72 flex-col justify-between rounded-[26px] border border-[#c98e4d] bg-[#f5ecd9] p-5 shadow-[0_10px_24px_rgba(92,46,18,0.08)] transition hover:-translate-y-0.5 hover:bg-[#f8efd9] hover:shadow-[0_14px_28px_rgba(92,46,18,0.14)]"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge tone={statusTone(idea.status)}>{labelize(idea.status)}</Badge>
          <Badge>{labelize(idea.source_type)}</Badge>
          {idea.bin !== "none" ? <Badge tone="violet">{labelize(idea.bin)}</Badge> : null}
        </div>
        <div>
          <h2 className="font-serif text-2xl font-black leading-7 text-[#572208] group-hover:text-[#8b3f0f]">
            {idea.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-base leading-7 text-[#7a351c]">{idea.one_liner}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-[#b26324]">Téma</dt>
            <dd className="font-semibold text-[#572208]">{idea.theme}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-[#b26324]">Célcsoport</dt>
            <dd className="font-semibold text-[#572208]">{idea.target_group}</dd>
          </div>
        </dl>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2 border-t border-[#ddb171] pt-4 text-center">
        <Score label="Össz" value={idea.score_total} />
        <Score label="Piac" value={idea.score_market} />
        <Score label="Épít" value={idea.score_feasibility} />
        <Score label="Vad" value={idea.score_wildness} />
      </div>
    </Link>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-lg font-black text-[#572208]">{value}</div>
      <div className="text-[11px] font-bold uppercase text-[#a65b1e]">{label}</div>
    </div>
  );
}
