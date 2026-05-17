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
        eyebrow="Rendezőasztal"
        title="Kupacok"
        description="Az ötletek kupacok szerint rendezve. A szikra és halott kupacok segítenek később visszanézni a határeseteket."
      />
      <div className="space-y-6">
        {grouped.map(({ bin, ideas: binIdeas }) => (
          <section key={bin} className="rounded-[26px] border border-[#c98e4d] bg-[#f5ecd9] p-5 shadow-[0_10px_24px_rgba(92,46,18,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-3xl font-black text-[#572208]">{labelize(bin)}</h3>
                <Badge tone={bin === "none" ? "neutral" : bin === "spark_bin" ? "green" : "violet"}>
                  {binIdeas.length} ötlet
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
              <p className="rounded-[18px] border border-dashed border-[#d5a05f] p-5 text-sm text-[#7a351c]">
                Ebben a kupacban még nincs ötlet.
              </p>
            )}
          </section>
        ))}
      </div>
    </AppShell>
  );
}
