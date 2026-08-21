type Props = { className?: string; showDomain?: boolean };

export function FoodfyMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <g
        stroke="url(#markGrad)"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 66C8 62 6 40 24 36 22 18 44 8 54 21c14-11 32 0 28 17 14 6 12 26-2 28" />
        <path d="M24 66v22h56V66z" />
        <path d="M38 57l3 15c.5 4 3 6 6 6h6c3 0 5.5-2 6-6l3-15" />
      </g>
      <defs>
        <linearGradient id="markGrad" x1="0" y1="0" x2="100" y2="100">
          <stop stopColor="#FF9E1F" />
          <stop offset="1" stopColor="#F26A0C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Logo({ className = "", showDomain = true }: Props) {
  return (
    <a href="#top" className={`group flex items-center gap-2.5 ${className}`}>
      <FoodfyMark className="h-9 w-9 drop-shadow-[0_0_14px_rgba(255,138,0,0.45)] transition-transform duration-500 group-hover:-rotate-6" />
      <span className="text-[26px] font-bold leading-none tracking-tight text-brand-cream">
        FoodFy
        {showDomain && <span className="text-brand-orange">.club</span>}
      </span>
    </a>
  );
}
