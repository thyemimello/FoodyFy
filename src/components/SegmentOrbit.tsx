import { motion } from "framer-motion";
import { SEGMENTS } from "../data/segments";

const N = SEGMENTS.length;
const BOX_W = 540;
const BOX_H = 700;

/** Diâmetro de repouso do card; o ativo cresce por escala. */
const DISCO = 102;
const ESCALA_ATIVA = 1.26;

/**
 * Curva do semicírculo: t vai de 0 (topo) a 1 (base).
 * O seno cria a barriga para a direita; o termo linear inclina a curva,
 * deixando a base um pouco mais à esquerda — igual à referência.
 */
function pointAt(t: number) {
  return {
    x: 108 + 130 * Math.sin(Math.PI * t) - 40 * t,
    y: 56 + t * (BOX_H - 112),
  };
}

const pontos = Array.from({ length: N }, (_, k) => pointAt(k / (N - 1)));

const arcPath = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 64; i++) {
    const t = -0.1 + (i / 64) * 1.2;
    const p = pointAt(t);
    pts.push(`${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`);
  }
  return pts.join(" ");
})();

type Props = {
  active: number;
  onSelect: (i: number) => void;
  scale?: number;
};

/**
 * Carrossel semicircular dos segmentos.
 *
 * Os cards ficam parados: cada segmento tem sempre o mesmo lugar no arco, e o
 * que muda é só o destaque — escala, aro, brilho e o peso do rótulo. A versão
 * anterior girava as posições a cada troca, o que fazia o último card saltar da
 * base para o topo; parado, a leitura da lista continua estável e a transição
 * fica bem mais discreta.
 */
export default function SegmentOrbit({ active, onSelect, scale = 1 }: Props) {
  return (
    <div
      className="relative"
      style={{ width: BOX_W * scale, height: BOX_H * scale }}
      aria-label="Segmentos atendidos pelo FoodFy"
    >
      <div
        className="relative"
        style={{
          width: BOX_W,
          height: BOX_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* trilha orbital pontilhada */}
        <svg
          className="pointer-events-none absolute inset-0 overflow-visible"
          width={BOX_W}
          height={BOX_H}
          fill="none"
        >
          <path
            d={arcPath}
            stroke="url(#arcGrad)"
            strokeWidth="1.4"
            strokeDasharray="2 9"
            strokeLinecap="round"
            opacity="0.7"
          />
          {pontos.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="2.6"
              fill="#FF8A00"
              className="transition-opacity duration-500"
              opacity={i === active ? 0.95 : 0.28}
            />
          ))}
          <defs>
            <linearGradient id="arcGrad" x1="0" y1="0" x2="0" y2={BOX_H}>
              <stop stopColor="#FF8A00" stopOpacity="0" />
              <stop offset="0.16" stopColor="#FF8A00" stopOpacity="0.8" />
              <stop offset="0.86" stopColor="#E53935" stopOpacity="0.45" />
              <stop offset="1" stopColor="#E53935" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {SEGMENTS.map((seg, i) => {
          const p = pontos[i];
          const ativo = i === active;

          return (
            <button
              key={seg.id}
              type="button"
              onClick={() => onSelect(i)}
              className="absolute flex items-center outline-none"
              style={{ left: p.x, top: p.y, zIndex: ativo ? N : N - i }}
            >
              {/* disco — lugar fixo no arco, só a escala responde à troca */}
              <motion.span
                className="relative block shrink-0 rounded-full"
                style={{
                  width: DISCO,
                  height: DISCO,
                  marginLeft: -DISCO / 2,
                  marginTop: -DISCO / 2,
                }}
                initial={false}
                animate={{ scale: ativo ? ESCALA_ATIVA : 1 }}
                whileHover={{ scale: ativo ? ESCALA_ATIVA : 1.08 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* halo do ativo */}
                <span
                  className="absolute -inset-4 rounded-full transition-opacity duration-700"
                  style={{
                    opacity: ativo ? 1 : 0,
                    background:
                      "radial-gradient(circle, rgba(255,138,0,.42) 0%, rgba(255,138,0,0) 66%)",
                  }}
                />
                {/* aro */}
                <span
                  className="absolute rounded-full transition-all duration-700"
                  style={{
                    inset: ativo ? -4 : -1,
                    background: ativo
                      ? "conic-gradient(from 210deg, #FF8A00, #FFC83D, #F0611A, #FF8A00)"
                      : "linear-gradient(160deg, rgba(234,223,215,.14), rgba(234,223,215,.03))",
                    boxShadow: ativo
                      ? "0 0 24px rgba(255,138,0,.6)"
                      : "0 10px 28px rgba(0,0,0,.5)",
                  }}
                />
                <span
                  className="absolute inset-0 overflow-hidden rounded-full"
                  style={{
                    background: seg.disc,
                    boxShadow: "inset 0 -14px 30px rgba(0,0,0,.5)",
                  }}
                >
                  <img
                    src={seg.photo}
                    alt={seg.name}
                    className="h-full w-full object-cover transition-all duration-700"
                    style={{
                      opacity: ativo ? 1 : 0.74,
                      filter: ativo ? "none" : "saturate(.84)",
                    }}
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                      const fb = el.nextElementSibling as HTMLElement | null;
                      if (fb) fb.style.opacity = "1";
                    }}
                  />
                  <span
                    className="pointer-events-none absolute inset-0 grid place-items-center opacity-0"
                    style={{ fontSize: DISCO * 0.42, lineHeight: 1 }}
                  >
                    {seg.emoji}
                  </span>
                </span>
              </motion.span>

              {/* rótulo — afasta um pouco quando o card cresce */}
              <motion.span
                className="pointer-events-none absolute top-1/2 flex -translate-y-1/2 flex-col items-start text-left"
                initial={false}
                animate={{ left: (DISCO / 2) * (ativo ? ESCALA_ATIVA : 1) + 22 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="whitespace-nowrap text-[20px] font-semibold leading-tight transition-colors duration-500"
                  style={{ color: ativo ? "#FFF8F0" : "rgba(255,248,240,.72)" }}
                >
                  {seg.name}
                </span>
                <span
                  className="mt-0.5 whitespace-nowrap text-[13px] leading-snug transition-colors duration-500"
                  style={{
                    color: ativo ? "rgba(255,248,240,.7)" : "rgba(255,248,240,.38)",
                  }}
                >
                  {seg.tagline}
                </span>
                <span
                  className="mt-2 h-[2px] rounded-full bg-gradient-to-r from-brand-orange to-transparent transition-all duration-700"
                  style={{ width: ativo ? 104 : 0, opacity: ativo ? 1 : 0 }}
                />
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
