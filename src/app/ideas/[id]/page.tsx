import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/PageHeader";
import { getIdea, labelize } from "@/lib/ideas";

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idea = await getIdea(id);

  if (!idea) {
    notFound();
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow={idea.id}
        title={idea.title}
        description={idea.one_liner}
        action={
          <Link href="/ideas" className="rounded-full border border-[#c98e4d] bg-[#f5ecd9] px-5 py-3 text-sm font-bold text-[#7b351c] hover:bg-[#f0dfbd]">
            Vissza az ötletekhez
          </Link>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          <Panel title="Alap áttekintés">
            <Detail label="Téma" value={idea.theme} />
            <Detail label="Célcsoport" value={idea.target_group} />
            <Detail label="Probléma" value={idea.problem} large />
            <Detail label="Megoldás" value={idea.solution} large />
            <Detail label="Egyediség" value={idea.uniqueness} large />
            <Detail label="AI szerepe" value={idea.ai_role} large />
          </Panel>
          <Panel title="SWOT">
            <Detail label="Erősség" value={idea.swot_strength} large />
            <Detail label="Gyengeség" value={idea.swot_weakness} large />
            <Detail label="Lehetőség" value={idea.swot_opportunity} large />
            <Detail label="Veszély" value={idea.swot_threat} large />
          </Panel>
          <Panel title="Döntési jegyzetek">
            <Detail label="Elutasítás oka" value={idea.rejection_reason || "Nincs rögzített elutasítási ok."} large />
            <Detail label="Felélesztési stratégia" value={idea.revival_strategy || "Nincs rögzített felélesztési stratégia."} large />
          </Panel>
        </section>
        <aside className="space-y-5">
          <Panel title="Besorolás">
            <div className="flex flex-wrap gap-2">
              <Badge tone="blue">{labelize(idea.source_type)}</Badge>
              <Badge tone={idea.status === "shortlisted" ? "green" : idea.status === "rejected" ? "red" : "amber"}>
                {labelize(idea.status)}
              </Badge>
              <Badge tone={idea.bin === "none" ? "neutral" : "violet"}>{labelize(idea.bin)}</Badge>
            </div>
            <Detail label="Gyártási költség" value={labelize(idea.production_cost)} />
            <Detail label="Gyártási idő" value={labelize(idea.production_time)} />
            <Detail label="Létrehozva" value={new Date(idea.created_at).toLocaleDateString("hu-HU")} />
            <Detail label="Frissítve" value={new Date(idea.updated_at).toLocaleDateString("hu-HU")} />
          </Panel>
          <Panel title="Pontszámok">
            <Score label="Összesen" value={idea.score_total} />
            <Score label="Piac" value={idea.score_market} />
            <Score label="Megvalósíthatóság" value={idea.score_feasibility} />
            <Score label="Vadság" value={idea.score_wildness} />
            <Score label="Skálázhatóság" value={idea.scalability} max={10} />
            <Score label="Kockázat" value={idea.risk} max={10} />
            <Score label="Potenciál" value={idea.potential} max={10} />
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[26px] border border-[#c98e4d] bg-[#f5ecd9] p-5 shadow-[0_10px_24px_rgba(92,46,18,0.08)]">
      <h3 className="mb-4 font-serif text-2xl font-black text-[#572208]">{title}</h3>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function Detail({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-[#b26324]">{label}</dt>
      <dd className={`mt-1 text-[#572208] ${large ? "text-base leading-7" : "text-sm font-semibold"}`}>{value}</dd>
    </div>
  );
}

function Score({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const width = Math.max(4, Math.min(100, (value / max) * 100));

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-[#7a351c]">{label}</span>
        <span className="font-black text-[#572208]">{value}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-[#ead4a8]">
        <div className="h-2 rounded-full bg-[#8b3f0f]" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
