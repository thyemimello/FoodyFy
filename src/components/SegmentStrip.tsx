import { motion } from "framer-motion";
import { SEGMENTS } from "../data/segments";

/** Versão compacta da órbita, usada abaixo de 1280px. */
export default function SegmentStrip({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex w-full items-center justify-center gap-3 sm:gap-5">
      {SEGMENTS.map((seg, i) => {
        const isActive = i === active;
        return (
          <button
            key={seg.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={seg.name}
            className="group relative shrink-0 outline-none"
          >
            <motion.span
              className="relative block rounded-full"
              initial={false}
              animate={{ width: isActive ? 82 : 58, height: isActive ? 82 : 58 }}
              transition={{ type: "spring", stiffness: 130, damping: 18 }}
            >
              <span
                className="absolute -inset-2 rounded-full transition-opacity duration-500"
                style={{
                  opacity: isActive ? 1 : 0,
                  background:
                    "radial-gradient(circle, rgba(255,138,0,.45) 0%, rgba(255,138,0,0) 68%)",
                }}
              />
              <span
                className="absolute -inset-[2px] rounded-full transition-all duration-500"
                style={{
                  background: isActive
                    ? "conic-gradient(from 210deg, #FF8A00, #FFC83D, #E53935, #FF8A00)"
                    : "linear-gradient(160deg, rgba(255,255,255,.2), rgba(255,255,255,.04))",
                }}
              />
              <span
                className="absolute inset-0 grid place-items-center overflow-hidden rounded-full ring-1 ring-black/50"
                style={{
                  background: seg.disc,
                  boxShadow: "inset 0 -10px 22px rgba(0,0,0,.55)",
                  opacity: isActive ? 1 : 0.75,
                }}
              >
                <img
                  src={seg.photo}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="relative text-[26px] leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,.6)]">
                  {seg.emoji}
                </span>
              </span>
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}
