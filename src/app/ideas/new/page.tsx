import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { bins, labelize, productionCosts, productionTimes, sourceTypes, statuses } from "@/lib/ideas";
import { createIdea } from "./actions";

export default function NewIdeaPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Kézi rögzítés"
        title="Új ötlet"
        description="Új ötletkártya rögzítése a helyi gyűjteménybe."
        action={
          <Link href="/ideas" className="rounded-full border border-[#c98e4d] bg-[#f5ecd9] px-5 py-3 text-sm font-bold text-[#7b351c] hover:bg-[#f0dfbd]">
            Mégse
          </Link>
        }
      />
      <form action={createIdea} className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          <Panel title="Ötlet">
            <Input name="title" label="Cím" required />
            <Input name="one_liner" label="Egysoros leírás" required />
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="theme" label="Téma" required />
              <Input name="target_group" label="Célcsoport" required />
            </div>
          </Panel>
          <Panel title="Áttekintési jegyzetek">
            <Textarea name="problem" label="Probléma" />
            <Textarea name="solution" label="Megoldás" />
            <Textarea name="uniqueness" label="Egyediség" />
            <Textarea name="ai_role" label="AI szerepe" />
          </Panel>
          <Panel title="SWOT">
            <Textarea name="swot_strength" label="Erősség" />
            <Textarea name="swot_weakness" label="Gyengeség" />
            <Textarea name="swot_opportunity" label="Lehetőség" />
            <Textarea name="swot_threat" label="Veszély" />
          </Panel>
        </section>
        <aside className="space-y-5">
          <Panel title="Besorolás">
            <Select name="source_type" label="Forrás" options={sourceTypes} defaultValue="manual" />
            <Select name="status" label="Állapot" options={statuses} defaultValue="new" />
            <Select name="bin" label="Kupac" options={bins} defaultValue="none" />
            <Select name="production_cost" label="Gyártási költség" options={productionCosts} defaultValue="low" />
            <Select name="production_time" label="Gyártási idő" options={productionTimes} defaultValue="short" />
          </Panel>
          <Panel title="Jelek">
            <NumberInput name="scalability" label="Skálázhatóság" defaultValue={5} />
            <NumberInput name="risk" label="Kockázat" defaultValue={5} />
            <NumberInput name="potential" label="Potenciál" defaultValue={5} />
          </Panel>
          <Panel title="Döntési jegyzetek">
            <Textarea name="rejection_reason" label="Elutasítás oka" />
            <Textarea name="revival_strategy" label="Felélesztési stratégia" />
            <button className="w-full rounded-full bg-[#7b351c] px-4 py-3 text-sm font-bold text-[#fff6df] hover:bg-[#5b2815]">
              Ötlet mentése
            </button>
          </Panel>
        </aside>
      </form>
    </AppShell>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[26px] border border-[#c98e4d] bg-[#f5ecd9] p-5 shadow-[0_10px_24px_rgba(92,46,18,0.08)]">
      <h3 className="mb-4 font-serif text-2xl font-black text-[#572208]">{title}</h3>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function Input({ name, label, required = false }: { name: string; label: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-[#9a4b12]">{label}</span>
      <input
        name={name}
        required={required}
        className="mt-1 h-11 w-full rounded-full border border-[#d5a05f] bg-[#fff8e8] px-4 text-sm text-[#572208] outline-none focus:border-[#8b3f0f]"
      />
    </label>
  );
}

function Textarea({ name, label }: { name: string; label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-[#9a4b12]">{label}</span>
      <textarea
        name={name}
        rows={4}
        className="mt-1 w-full rounded-[18px] border border-[#d5a05f] bg-[#fff8e8] px-4 py-3 text-sm leading-6 text-[#572208] outline-none focus:border-[#8b3f0f]"
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
      <span className="text-xs font-bold uppercase tracking-wide text-[#9a4b12]">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-1 h-11 w-full rounded-full border border-[#d5a05f] bg-[#fff8e8] px-4 text-sm text-[#572208] outline-none focus:border-[#8b3f0f]"
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
      <span className="text-xs font-bold uppercase tracking-wide text-[#9a4b12]">{label}</span>
      <input
        name={name}
        type="number"
        min={1}
        max={10}
        defaultValue={defaultValue}
        className="mt-1 h-11 w-full rounded-full border border-[#d5a05f] bg-[#fff8e8] px-4 text-sm text-[#572208] outline-none focus:border-[#8b3f0f]"
      />
    </label>
  );
}
