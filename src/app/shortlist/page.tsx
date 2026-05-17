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
        eyebrow="Kiemelt ötletek"
        title="Válogatás"
        description="Azok az ötletek, amelyek túlélték az első áttekintési kört, és megérdemelnek validálást vagy prototípust."
        action={
          <Link href="/ideas?status=shortlisted" className="rounded-full border border-[#c98e4d] bg-[#f5ecd9] px-5 py-3 text-sm font-bold text-[#7b351c] hover:bg-[#f0dfbd]">
            Mutasd a listában
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
        <div className="rounded-[26px] border border-dashed border-[#c98e4d] bg-[#f5ecd9] p-10 text-center text-sm text-[#7a351c]">
          Még nincs kiemelt ötlet.
        </div>
      )}
    </AppShell>
  );
}
