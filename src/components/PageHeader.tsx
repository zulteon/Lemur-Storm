export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-6 py-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#9a4b12]">{eyebrow}</p> : null}
        <h2 className="mt-3 font-serif text-6xl font-black leading-none tracking-normal text-[#572208] md:text-8xl">
          {title}
        </h2>
        <p className="mt-6 max-w-3xl text-xl leading-9 text-[#7a351c]">{description}</p>
      </div>
      {action}
    </div>
  );
}
