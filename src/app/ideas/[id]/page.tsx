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
          <Link href="/ideas" className="rounded border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100">
            Back to ideas
          </Link>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          <Panel title="Core review">
            <Detail label="Theme" value={idea.theme} />
            <Detail label="Target group" value={idea.target_group} />
            <Detail label="Problem" value={idea.problem} large />
            <Detail label="Solution" value={idea.solution} large />
            <Detail label="Uniqueness" value={idea.uniqueness} large />
            <Detail label="AI role" value={idea.ai_role} large />
          </Panel>
          <Panel title="SWOT">
            <Detail label="Strength" value={idea.swot_strength} large />
            <Detail label="Weakness" value={idea.swot_weakness} large />
            <Detail label="Opportunity" value={idea.swot_opportunity} large />
            <Detail label="Threat" value={idea.swot_threat} large />
          </Panel>
          <Panel title="Decision notes">
            <Detail label="Rejection reason" value={idea.rejection_reason || "No rejection reason recorded."} large />
            <Detail label="Revival strategy" value={idea.revival_strategy || "No revival strategy recorded."} large />
          </Panel>
        </section>
        <aside className="space-y-5">
          <Panel title="Classification">
            <div className="flex flex-wrap gap-2">
              <Badge tone="blue">{labelize(idea.source_type)}</Badge>
              <Badge tone={idea.status === "shortlisted" ? "green" : idea.status === "rejected" ? "red" : "amber"}>
                {labelize(idea.status)}
              </Badge>
              <Badge tone={idea.bin === "none" ? "neutral" : "violet"}>{labelize(idea.bin)}</Badge>
            </div>
            <Detail label="Production cost" value={labelize(idea.production_cost)} />
            <Detail label="Production time" value={labelize(idea.production_time)} />
            <Detail label="Created" value={new Date(idea.created_at).toLocaleDateString()} />
            <Detail label="Updated" value={new Date(idea.updated_at).toLocaleDateString()} />
          </Panel>
          <Panel title="Scores">
            <Score label="Total" value={idea.score_total} />
            <Score label="Market" value={idea.score_market} />
            <Score label="Feasibility" value={idea.score_feasibility} />
            <Score label="Wildness" value={idea.score_wildness} />
            <Score label="Scalability" value={idea.scalability} max={10} />
            <Score label="Risk" value={idea.risk} max={10} />
            <Score label="Potential" value={idea.potential} max={10} />
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-500">{title}</h3>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function Detail({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase text-stone-400">{label}</dt>
      <dd className={`mt-1 text-stone-800 ${large ? "text-sm leading-6" : "text-sm font-medium"}`}>{value}</dd>
    </div>
  );
}

function Score({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const width = Math.max(4, Math.min(100, (value / max) * 100));

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-stone-700">{label}</span>
        <span className="font-semibold text-stone-950">{value}</span>
      </div>
      <div className="mt-2 h-2 rounded bg-stone-100">
        <div className="h-2 rounded bg-emerald-600" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
