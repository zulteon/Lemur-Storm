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
    <div className="mb-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#9a4b12]">{eyebrow}</p> : null}
        <h2 className="mt-2 font-serif text-5xl font-black leading-none tracking-normal text-[#572208] md:text-7xl">
          {title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#7a351c]">{description}</p>
      </div>
      {action}
    </div>
  );
}
