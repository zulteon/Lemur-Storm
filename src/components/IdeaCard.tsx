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
  const averageScore = Math.round(
    (idea.score_total + idea.score_market + idea.score_feasibility + idea.score_wildness) / 4,
  );

  return (
    <Link
      href={`/ideas/${idea.id}`}
      className="group flex min-h-72 flex-col justify-between overflow-hidden rounded-[26px] border border-[#c98e4d] bg-[#f5ecd9] shadow-[0_18px_38px_rgba(74,31,11,0.22)] transition hover:-translate-y-0.5 hover:bg-[#f8efd9] hover:shadow-[0_24px_46px_rgba(74,31,11,0.28)]"
    >
      <div>
        <div className="bg-[#713318] px-5 py-4 text-center">
          <h2 className="font-serif text-2xl font-black leading-7 text-[#f8e8c5] group-hover:text-[#fff1cf]">
            {idea.title}
          </h2>
        </div>
        <div className="space-y-4 p-5">
          <p className="line-clamp-3 text-base leading-7 text-[#7a351c]">{idea.one_liner}</p>
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
      </div>
      <div className="mx-5 mb-5 border-t border-[#ddb171] pt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-[#a65b1e]">Átlagpont</span>
          <span className="font-serif text-2xl font-black text-[#7b351c]">{averageScore}/100</span>
        </div>
        <div className="h-4 overflow-hidden rounded-full border border-[#c98e4d] bg-[#ead4a8] shadow-inner">
          <div
            className="h-full rounded-full bg-[#8f4217]"
            style={{ width: `${Math.max(0, Math.min(100, averageScore))}%` }}
          />
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          <Badge tone={statusTone(idea.status)} compact>
            {labelize(idea.status)}
          </Badge>
          <Badge compact>{labelize(idea.source_type)}</Badge>
          {idea.bin !== "none" ? (
            <Badge tone="violet" compact>
              {labelize(idea.bin)}
            </Badge>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
