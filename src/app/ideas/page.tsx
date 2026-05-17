import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Filters } from "@/components/Filters";
import { IdeaCard } from "@/components/IdeaCard";
import { PageHeader } from "@/components/PageHeader";
import { filterIdeas, getIdeas, type IdeaFilters } from "@/lib/ideas";

export default async function IdeasPage({
  searchParams,
}: {
  searchParams: Promise<IdeaFilters>;
}) {
  const filters = await searchParams;
  const ideas = filterIdeas(await getIdeas(), filters);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Lemur Storm"
        title="Ötletkártyák"
        description="AI-generált és kézzel rögzített ötletek belső áttekintése. Gyors szűrés, tiszta kártyák, kevesebb zaj."
        action={
          <Link href="/ideas/new" className="rounded-full bg-[#7b351c] px-6 py-4 text-base font-bold text-[#fff6df] hover:bg-[#5b2815]">
            Új ötlet
          </Link>
        }
      />
      <div className="space-y-5">
        <Filters filters={filters} />
        <div className="flex items-center justify-between text-sm font-semibold text-[#8b4b20]">
          <span>{ideas.length} ötlet látható</span>
          <span>Legutóbbi frissítés szerint</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
        {ideas.length === 0 ? (
          <div className="rounded-[26px] border border-dashed border-[#c98e4d] bg-[#f5ecd9] p-10 text-center text-sm text-[#7a351c]">
            Nincs találat ezekkel a szűrőkkel.
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
