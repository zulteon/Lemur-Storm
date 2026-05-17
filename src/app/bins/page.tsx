import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { IdeaCard } from "@/components/IdeaCard";
import { PageHeader } from "@/components/PageHeader";
import { bins, getIdeas, labelize } from "@/lib/ideas";

export default async function BinsPage() {
  const ideas = await getIdeas();
  const grouped = bins.map((bin) => ({
    bin,
    ideas: ideas.filter((idea) => idea.bin === bin),
  }));

  return (
    <AppShell>
      <PageHeader
        eyebrow="Sorting table"
        title="Bins"
        description="Review the shape of the idea backlog by bin. Spark and dead bins make it easier to revisit edge cases later."
      />
      <div className="space-y-6">
        {grouped.map(({ bin, ideas: binIdeas }) => (
          <section key={bin} className="rounded-md border border-stone-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-stone-950">{labelize(bin)}</h3>
                <Badge tone={bin === "none" ? "neutral" : bin === "spark_bin" ? "green" : "violet"}>
                  {binIdeas.length} ideas
                </Badge>
              </div>
            </div>
            {binIdeas.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {binIdeas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            ) : (
              <p className="rounded border border-dashed border-stone-200 p-5 text-sm text-stone-500">
                No ideas in this bin yet.
              </p>
            )}
          </section>
        ))}
      </div>
    </AppShell>
  );
}
