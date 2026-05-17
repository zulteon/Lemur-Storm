import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";

export const productionCosts = ["low", "medium", "high"] as const;
export const productionTimes = ["short", "medium", "long"] as const;
export const sourceTypes = ["wild_rng", "standard_rng", "manual"] as const;
export const statuses = [
  "new",
  "ai_filtered",
  "human_review",
  "shortlisted",
  "validation",
  "build",
  "rejected",
] as const;
export const bins = [
  "none",
  "too_broad",
  "no_buyer",
  "too_hard",
  "weak_monetization",
  "no_team_fit",
  "spark_bin",
  "dead_bin",
] as const;

export type ProductionCost = (typeof productionCosts)[number];
export type ProductionTime = (typeof productionTimes)[number];
export type SourceType = (typeof sourceTypes)[number];
export type IdeaStatus = (typeof statuses)[number];
export type IdeaBin = (typeof bins)[number];

export type Idea = {
  id: string;
  title: string;
  one_liner: string;
  theme: string;
  target_group: string;
  problem: string;
  solution: string;
  uniqueness: string;
  ai_role: string;
  production_cost: ProductionCost;
  production_time: ProductionTime;
  scalability: number;
  risk: number;
  potential: number;
  swot_strength: string;
  swot_weakness: string;
  swot_opportunity: string;
  swot_threat: string;
  source_type: SourceType;
  status: IdeaStatus;
  bin: IdeaBin;
  score_total: number;
  score_market: number;
  score_feasibility: number;
  score_wildness: number;
  rejection_reason: string;
  revival_strategy: string;
  created_at: string;
  updated_at: string;
};

export type IdeaFilters = {
  source_type?: string;
  status?: string;
  bin?: string;
  q?: string;
};

export type NewIdeaInput = Omit<
  Idea,
  | "id"
  | "created_at"
  | "updated_at"
  | "score_total"
  | "score_market"
  | "score_feasibility"
  | "score_wildness"
>;

const dataDir = path.join(process.cwd(), "data");
const primaryIdeasPath = path.join(dataDir, "ideas.json");

function normalizeText(value: string) {
  return value.toLowerCase().trim();
}

function uniqueIdeas(ideas: Idea[]) {
  const seen = new Set<string>();
  return ideas.filter((idea) => {
    if (seen.has(idea.id)) {
      return false;
    }
    seen.add(idea.id);
    return true;
  });
}

export async function getIdeas(): Promise<Idea[]> {
  const files = await readdir(dataDir);
  const jsonFiles = files.filter((file) => file.endsWith(".json")).sort();
  const ideasByFile = await Promise.all(
    jsonFiles.map(async (file) => {
      const raw = await readFile(path.join(dataDir, file), "utf8");
      return JSON.parse(raw) as Idea[];
    }),
  );

  return uniqueIdeas(ideasByFile.flat()).sort((a, b) => {
    return b.updated_at.localeCompare(a.updated_at);
  });
}

export async function getIdea(id: string) {
  const ideas = await getIdeas();
  return ideas.find((idea) => idea.id === id);
}

export function filterIdeas(ideas: Idea[], filters: IdeaFilters) {
  const query = normalizeText(filters.q ?? "");

  return ideas.filter((idea) => {
    const matchesSource =
      !filters.source_type || filters.source_type === "all" || idea.source_type === filters.source_type;
    const matchesStatus = !filters.status || filters.status === "all" || idea.status === filters.status;
    const matchesBin = !filters.bin || filters.bin === "all" || idea.bin === filters.bin;
    const searchable = [
      idea.title,
      idea.one_liner,
      idea.theme,
      idea.target_group,
    ]
      .map(normalizeText)
      .join(" ");
    const matchesQuery = !query || searchable.includes(query);

    return matchesSource && matchesStatus && matchesBin && matchesQuery;
  });
}

export async function appendIdea(input: NewIdeaInput) {
  const now = new Date().toISOString();
  const primaryIdeas = JSON.parse(await readFile(primaryIdeasPath, "utf8")) as Idea[];
  const nextIdea: Idea = {
    ...input,
    id: `idea-${Date.now()}`,
    score_market: Math.round((input.potential * 0.7 + input.scalability * 0.3) * 10),
    score_feasibility: Math.round(((10 - input.risk) * 0.6 + input.scalability * 0.4) * 10),
    score_wildness: input.source_type === "wild_rng" ? 88 : input.source_type === "manual" ? 58 : 44,
    score_total: Math.round((input.potential * 0.45 + input.scalability * 0.35 + (10 - input.risk) * 0.2) * 10),
    created_at: now,
    updated_at: now,
  };

  await writeFile(primaryIdeasPath, `${JSON.stringify([nextIdea, ...primaryIdeas], null, 2)}\n`);
  return nextIdea;
}

export function labelize(value: string) {
  const labels: Record<string, string> = {
    all: "Mind",
    wild_rng: "Vad generált",
    standard_rng: "Standard generált",
    manual: "Kézi",
    new: "Új",
    ai_filtered: "AI előszűrt",
    human_review: "Emberi áttekintés",
    shortlisted: "Kiemelt",
    validation: "Validálás",
    build: "Építés",
    rejected: "Elutasítva",
    none: "Nincs bin",
    too_broad: "Túl tág",
    no_buyer: "Nincs vevő",
    too_hard: "Túl nehéz",
    weak_monetization: "Gyenge monetizáció",
    no_team_fit: "Nem csapat-fit",
    spark_bin: "Szikra bin",
    dead_bin: "Halott bin",
    low: "Alacsony",
    medium: "Közepes",
    high: "Magas",
    short: "Rövid",
    long: "Hosszú",
  };

  return labels[value] ?? value.replaceAll("_", " ");
}
