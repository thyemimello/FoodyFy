import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Bike,
  ChevronDown,
  CircleDollarSign,
  FileText,
  Monitor,
  Store,
} from "lucide-react";
import { SEGMENTS } from "../data/segments";
import SegmentOrbit from "./SegmentOrbit";
import SegmentStrip from "./SegmentStrip";
import FoodfyCore from "./FoodfyCore";
import LogoLoopVideo from "./LogoLoopVideo";
import { useHeroScale } from "../hooks/useHeroScale";

const AUTOPLAY_MS = 4200;

/* Composição do núcleo, desenhada em escala 1:1 e reduzida via transform. */
const CORE_W = 500;
const CORE_H = 660;
const DISC = 440;

const PILLARS = [
  { icon: Monitor, label: "PDV" },
  { icon: Bike, label: "Delivery" },
  { icon: Boxes, label: "Estoque" },
  { icon: CircleDollarSign, label: "Financeiro" },
  { icon: FileText, label: "Fiscal" },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const seg = SEGMENTS[active];
  const heroRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [hiRes, setHiRes] = useState(false);
  const [videoPronto, setVideoPronto] = useState(false);
  const { scale, orbit } = useHeroScale();

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActive((i) => (i + 1) % SEGMENTS.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setParallax({
        x: (e.clientX - r.width / 2) / r.width,
        y: (e.clientY - r.height / 2) / r.height,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative w-full overflow-hidden bg-[#15100D] xl:h-screen xl:min-h-[760px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ---------- fundo contextual ---------- */}
      <AnimatePresence mode="sync">
        <motion.div
          key={seg.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0" style={{ background: seg.bg }} />
          <img
            src={seg.bgPhoto}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: hiRes ? 0.78 : 0.4,
              transform: hiRes ? "scale(1.04)" : "scale(1.15)",
              filter: hiRes
                ? "saturate(1.04) contrast(1.03)"
                : "blur(26px) saturate(1.1)",
              objectPosition: "center",
            }}
            onLoad={(e) => {
              // fotos de verdade (>=1200px) entram nítidas;
              // os recortes de baixa resolução seguem desfocados
              setHiRes((e.currentTarget as HTMLImageElement).naturalWidth >= 1200);
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* véus, vinheta e ruído.
          A comida fica no canto inferior esquerdo da foto, então os
          escurecimentos são localizados: atrás do texto e atrás da órbita,
          preservando o prato em evidência. */}
      <div className="absolute inset-0 bg-[radial-gradient(118%_98%_at_50%_48%,rgba(6,4,3,.12)_0%,rgba(6,4,3,.62)_56%,rgba(6,4,3,.94)_100%)]" />
      {/* scrim do texto (topo-esquerda) */}
      <div className="absolute inset-0 bg-[radial-gradient(46%_46%_at_20%_34%,rgba(7,5,4,.9)_0%,rgba(7,5,4,.5)_52%,transparent_78%)]" />
      {/* scrim do carrossel (direita) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(7,5,4,.72)_0%,rgba(7,5,4,.3)_26%,transparent_46%)]" />
      {/* barra do header */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#15100D]/95 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#15100D] via-[#15100D]/55 to-transparent" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />

      {/* ---------- conteúdo ---------- */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1680px] flex-col items-center gap-12 px-6 pb-24 pt-28 xl:grid xl:grid-cols-[minmax(300px,1fr)_auto_auto] xl:items-center xl:gap-6 xl:px-[3vw] xl:pb-16 xl:pt-20 2xl:gap-10">
        {/* ----- copy ----- */}
        <motion.div
          className="max-w-[560px] text-center xl:text-left"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            transform: `translate3d(${parallax.x * -10}px, ${parallax.y * -6}px, 0)`,
          }}
        >
          <h1 className="text-[34px] font-bold leading-[1.12] tracking-tight text-brand-cream sm:text-[42px] xl:text-[clamp(30px,2.8vw,48px)]">
            Seu restaurante inteiro
            <br className="hidden xl:block" />{" "}
            <span className="text-gradient-brand">trabalhando no mesmo sistema.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[430px] text-[16px] leading-relaxed text-brand-cream/65 xl:mx-0 xl:text-[clamp(14px,1.05vw,17px)]">
            O pedido entra uma vez e segue para a cozinha, o caixa, o estoque e
            o financeiro. Você acompanha tudo sem trocar de programa.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 xl:justify-start">
            <a href="#recursos" className="btn-primary">
              Veja como funciona
              <ArrowRight className="h-[18px] w-[18px]" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-start justify-center gap-x-7 gap-y-5 xl:justify-start 2xl:gap-x-9">
            {PILLARS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="h-[26px] w-[26px] text-brand-orange" strokeWidth={1.5} />
                <span className="text-[13px] font-medium text-brand-cream/70">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ----- núcleo: vídeo da logo + nome do segmento ----- */}
        <motion.div
          className="relative"
          style={{ width: CORE_W * scale, height: CORE_H * scale }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="flex flex-col items-center"
            style={{
              width: CORE_W,
              height: CORE_H,
              transform: `scale(${scale}) translate3d(${parallax.x * 8}px, ${
                parallax.y * 8
              }px, 0)`,
              transformOrigin: "top left",
            }}
          >
            {/* disco */}
            <div
              className="relative grid shrink-0 place-items-center"
              style={{ width: DISC, height: DISC }}
            >
              {/* anéis orbitais */}
              <svg
                className="pointer-events-none absolute h-[500px] w-[500px] animate-spin-slow"
                viewBox="0 0 500 500"
                fill="none"
              >
                <circle cx="250" cy="250" r="242" stroke="url(#ring1)" strokeWidth="1.5" />
                <circle
                  cx="250"
                  cy="250"
                  r="242"
                  stroke="#FF8A00"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="150 1370"
                />
                <defs>
                  <linearGradient id="ring1" x1="0" y1="0" x2="500" y2="500">
                    <stop stopColor="#FF8A00" stopOpacity=".6" />
                    <stop offset=".5" stopColor="#FF8A00" stopOpacity=".08" />
                    <stop offset="1" stopColor="#E53935" stopOpacity=".5" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                className="pointer-events-none absolute h-[466px] w-[466px] animate-spin-slower"
                viewBox="0 0 466 466"
                fill="none"
              >
                <circle
                  cx="233"
                  cy="233"
                  r="225"
                  stroke="#FFC83D"
                  strokeOpacity=".28"
                  strokeWidth="1"
                  strokeDasharray="3 12"
                />
                <circle
                  cx="233"
                  cy="233"
                  r="225"
                  stroke="#FF8A00"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="80 1334"
                />
              </svg>

              {/* disco da marca */}
              <div className="relative grid h-[440px] w-[440px] place-items-center overflow-hidden rounded-full border border-brand-sand/[0.13] bg-[radial-gradient(circle_at_50%_38%,#1A1411_0%,#0A0706_72%)] shadow-[0_0_90px_-40px_rgba(255,138,0,.3),inset_0_0_80px_rgba(0,0,0,.95)]">
                {/* marca em vetor: aparece enquanto o vídeo carrega */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: videoPronto ? 0 : 1 }}
                >
                  <FoodfyCore />
                </div>

                {/* vídeo da logo, recolorido para a paleta da marca:
                    sem o fundo creme não é preciso máscara nem sobra de brilho,
                    a marca fica sozinha e centrada no disco */}
                <LogoLoopVideo
                  src="/videos/foodfy-logo.mp4"
                  className="w-[580px]"
                  style={{ filter: "url(#foodfy-key)" }}
                  onReady={() => setVideoPronto(true)}
                />
              </div>
            </div>

            {/* nome do segmento */}
            <div className="relative z-10 mt-3 flex flex-col items-center text-center">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-brand-sand/[0.16] bg-[#15100D]/85 shadow-glow-sm">
                <Store className="h-5 w-5 text-brand-orange" strokeWidth={1.6} />
              </div>
              <div className="relative mt-5 h-[108px]" style={{ width: CORE_W }}>
                {/* crossfade: o novo nome entra enquanto o anterior sai,
                    para o bloco nunca ficar vazio entre os segmentos */}
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={seg.id}
                    className="absolute inset-x-0 top-0"
                    initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h2 className="whitespace-nowrap text-[50px] font-bold leading-none tracking-tight text-brand-cream drop-shadow-[0_4px_30px_rgba(0,0,0,.7)]">
                      {seg.name}
                    </h2>
                    <p className="mt-4 whitespace-nowrap text-[17px] text-brand-cream/65">
                      {seg.tagline}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ----- carrossel de segmentos ----- */}
        {orbit ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              transform: `translate3d(${parallax.x * 14}px, ${parallax.y * 10}px, 0)`,
            }}
          >
            <SegmentOrbit active={active} onSelect={setActive} scale={scale} />
          </motion.div>
        ) : (
          <div className="w-full max-w-[640px]">
            <SegmentStrip active={active} onSelect={setActive} />
          </div>
        )}
      </div>

      {/* scroll cue */}
      <a
        href="#recursos"
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[12.5px] text-brand-cream/45 transition-colors hover:text-brand-cream/80 xl:flex"
      >
        Role para explorar
        <span className="grid h-9 w-9 animate-floaty place-items-center rounded-full border border-brand-sand/[0.18] bg-[#8B5E3C]/[0.10]">
          <ChevronDown className="h-4 w-4" />
        </span>
      </a>
    </section>
  );
}
