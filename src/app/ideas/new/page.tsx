import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { bins, labelize, productionCosts, productionTimes, sourceTypes, statuses } from "@/lib/ideas";
import { createIdea } from "./actions";

export default function NewIdeaPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Manual capture"
        title="New idea"
        description="Add a local idea card to data/ideas.json. Scores are calculated from potential, scalability, risk, and source type."
        action={
          <Link href="/ideas" className="rounded border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100">
            Cancel
          </Link>
        }
      />
      <form action={createIdea} className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          <Panel title="Idea">
            <Input name="title" label="Title" required />
            <Input name="one_liner" label="One-liner" required />
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="theme" label="Theme" required />
              <Input name="target_group" label="Target group" required />
            </div>
          </Panel>
          <Panel title="Review notes">
            <Textarea name="problem" label="Problem" />
            <Textarea name="solution" label="Solution" />
            <Textarea name="uniqueness" label="Uniqueness" />
            <Textarea name="ai_role" label="AI role" />
          </Panel>
          <Panel title="SWOT">
            <Textarea name="swot_strength" label="Strength" />
            <Textarea name="swot_weakness" label="Weakness" />
            <Textarea name="swot_opportunity" label="Opportunity" />
            <Textarea name="swot_threat" label="Threat" />
          </Panel>
        </section>
        <aside className="space-y-5">
          <Panel title="Classification">
            <Select name="source_type" label="Source type" options={sourceTypes} defaultValue="manual" />
            <Select name="status" label="Status" options={statuses} defaultValue="new" />
            <Select name="bin" label="Bin" options={bins} defaultValue="none" />
            <Select name="production_cost" label="Production cost" options={productionCosts} defaultValue="low" />
            <Select name="production_time" label="Production time" options={productionTimes} defaultValue="short" />
          </Panel>
          <Panel title="Signals">
            <NumberInput name="scalability" label="Scalability" defaultValue={5} />
            <NumberInput name="risk" label="Risk" defaultValue={5} />
            <NumberInput name="potential" label="Potential" defaultValue={5} />
          </Panel>
          <Panel title="Decision notes">
            <Textarea name="rejection_reason" label="Rejection reason" />
            <Textarea name="revival_strategy" label="Revival strategy" />
            <button className="w-full rounded bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
              Create idea
            </button>
          </Panel>
        </aside>
      </form>
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

function Input({ name, label, required = false }: { name: string; label: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase text-stone-500">{label}</span>
      <input
        name={name}
        required={required}
        className="mt-1 h-10 w-full rounded border border-stone-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
      />
    </label>
  );
}

function Textarea({ name, label }: { name: string; label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase text-stone-500">{label}</span>
      <textarea
        name={name}
        rows={4}
        className="mt-1 w-full rounded border border-stone-200 bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-emerald-500"
      />
    </label>
  );
}

function Select({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: readonly string[];
  defaultValue: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase text-stone-500">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-1 h-10 w-full rounded border border-stone-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {labelize(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function NumberInput({ name, label, defaultValue }: { name: string; label: string; defaultValue: number }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase text-stone-500">{label}</span>
      <input
        name={name}
        type="number"
        min={1}
        max={10}
        defaultValue={defaultValue}
        className="mt-1 h-10 w-full rounded border border-stone-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
      />
    </label>
  );
}
