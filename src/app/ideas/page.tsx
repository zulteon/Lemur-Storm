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
        eyebrow="Review queue"
        title="Idea cards"
        description="Scan AI-generated and manually captured product ideas. Filter the queue, open details, and move promising cards toward validation."
        action={
          <Link href="/ideas/new" className="rounded bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
            New idea
          </Link>
        }
      />
      <div className="space-y-5">
        <Filters filters={filters} />
        <div className="flex items-center justify-between text-sm text-stone-500">
          <span>{ideas.length} ideas visible</span>
          <span>Sorted by latest update</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
        {ideas.length === 0 ? (
          <div className="rounded-md border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500">
            No ideas match the current filters.
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
