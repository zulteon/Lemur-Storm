type BadgeTone = "neutral" | "green" | "amber" | "red" | "blue" | "violet";

const tones: Record<BadgeTone, string> = {
  neutral: "border-[#c78b4a] bg-[#f4e8cf] text-[#6b2d12]",
  green: "border-[#7d9b64] bg-[#edf0d6] text-[#48622e]",
  amber: "border-[#d09a4b] bg-[#f8e7bb] text-[#7a351c]",
  red: "border-[#b86a4a] bg-[#f3d6c8] text-[#763018]",
  blue: "border-[#9d8a67] bg-[#f0e5c7] text-[#5f3b1f]",
  violet: "border-[#b88a6b] bg-[#f2dec7] text-[#743a1d]",
};

export function Badge({
  children,
  tone = "neutral",
  compact = false,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border text-xs font-bold ${compact ? "px-2 py-0.5" : "px-3 py-1"} ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
