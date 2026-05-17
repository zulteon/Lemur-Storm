import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { IdeaCard } from "@/components/IdeaCard";
import { PageHeader } from "@/components/PageHeader";
import { getIdeas } from "@/lib/ideas";

export default async function ShortlistPage() {
  const ideas = (await getIdeas()).filter((idea) => idea.status === "shortlisted");

  return (
    <AppShell>
      <PageHeader
        eyebrow="Human picks"
        title="Shortlist"
        description="Ideas that survived the first review pass and deserve validation, prototyping, or deeper scoring."
        action={
          <Link href="/ideas?status=shortlisted" className="rounded border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100">
            Filter in ideas
          </Link>
        }
      />
      {ideas.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500">
          No shortlisted ideas yet.
        </div>
      )}
    </AppShell>
  );
}
