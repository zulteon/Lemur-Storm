"use server";

import { redirect } from "next/navigation";
import {
  appendIdea,
  bins,
  productionCosts,
  productionTimes,
  sourceTypes,
  statuses,
  type IdeaBin,
  type IdeaStatus,
  type ProductionCost,
  type ProductionTime,
  type SourceType,
} from "@/lib/ideas";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function number(formData: FormData, key: string) {
  return Number(formData.get(key) ?? 0);
}

function enumValue<T extends readonly string[]>(values: T, value: string, fallback: T[number]) {
  return values.includes(value) ? (value as T[number]) : fallback;
}

export async function createIdea(formData: FormData) {
  const source_type = enumValue(sourceTypes, text(formData, "source_type"), "manual") as SourceType;
  const status = enumValue(statuses, text(formData, "status"), "new") as IdeaStatus;
  const bin = enumValue(bins, text(formData, "bin"), "none") as IdeaBin;
  const production_cost = enumValue(productionCosts, text(formData, "production_cost"), "low") as ProductionCost;
  const production_time = enumValue(productionTimes, text(formData, "production_time"), "short") as ProductionTime;

  const idea = await appendIdea({
    title: text(formData, "title"),
    one_liner: text(formData, "one_liner"),
    theme: text(formData, "theme"),
    target_group: text(formData, "target_group"),
    problem: text(formData, "problem"),
    solution: text(formData, "solution"),
    uniqueness: text(formData, "uniqueness"),
    ai_role: text(formData, "ai_role"),
    production_cost,
    production_time,
    scalability: number(formData, "scalability"),
    risk: number(formData, "risk"),
    potential: number(formData, "potential"),
    swot_strength: text(formData, "swot_strength"),
    swot_weakness: text(formData, "swot_weakness"),
    swot_opportunity: text(formData, "swot_opportunity"),
    swot_threat: text(formData, "swot_threat"),
    source_type,
    status,
    bin,
    rejection_reason: text(formData, "rejection_reason"),
    revival_strategy: text(formData, "revival_strategy"),
  });

  redirect(`/ideas/${idea.id}`);
}
