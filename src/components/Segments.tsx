import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SEGMENTS, type Segment } from "../data/segments";
import SegmentStrip from "./SegmentStrip";

const DETAIL: Record<string, string[]> = {
  cafeteria: ["Fila do balcão", "Cartão fidelidade", "Combo café + doce"],
  hamburgueria: ["Pico da noite", "Monte seu burger", "Delivery próprio"],
  restaurante: ["Mesas e comandas", "Prato feito e à la carte", "Conta dividida"],
  bar: ["Comanda individual", "Happy hour", "Fecha mesa rápido"],
  lanchonete: ["Venda rápida", "Ficha técnica", "Pedido no WhatsApp"],
  pizzaria: ["Meio a meio", "Bordas e adicionais", "Rota do entregador"],
};

const TROCA_MS = 5000;

/** O conteúdo de um segmento. Serve tanto para a grade quanto para o card do celular. */
function CardSegmento({ seg, compacto }: { seg: Segment; compacto?: boolean }) {
  return (
    <>
      <span className="absolute inset-0 bg-[#15100D]/70 transition-colors duration-500 group-hover:bg-[#15100D]/55" />
      <img
        src={seg.bgPhoto}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-md transition-transform duration-700 group-hover:scale-125"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />

      <div className="relative">
        <div className={compacto ? "flex items-center gap-3.5" : "flex items-center gap-3.5 sm:block"}>
          <span
            className={`grid shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-brand-sand/[0.18] ${
              compacto ? "h-14 w-14" : "h-12 w-12 sm:h-16 sm:w-16"
            }`}
            style={{ background: seg.disc }}
          >
            <img src={seg.photo} alt="" className="h-full w-full object-cover" />
          </span>

          <h3
            className={`flex items-center gap-2 font-semibold text-brand-cream ${
              compacto ? "text-[20px]" : "text-[19px] sm:mt-5 sm:text-[21px]"
            }`}
          >
            Sistema para {seg.name.toLowerCase()}
            <ArrowUpRight className="h-[18px] w-[18px] text-brand-orange opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </h3>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2 sm:mt-4">
          {DETAIL[seg.id]?.map((d) => (
            <span
              key={d}
              className="rounded-full border border-brand-sand/[0.16] bg-[#8B5E3C]/[0.16] px-3 py-1.5 text-[12.5px] text-brand-cream/70"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Segments() {
  const [ativo, setAtivo] = useState(0);
  const [tocouNaFaixa, setTocouNaFaixa] = useState(false);
  const seg = SEGMENTS[ativo];

  /* Anda sozinho até a pessoa escolher um segmento; a partir daí ela manda. */
  useEffect(() => {
    if (tocouNaFaixa) return;
    const t = setInterval(
      () => setAtivo((i) => (i + 1) % SEGMENTS.length),
      TROCA_MS
    );
    return () => clearInterval(t);
  }, [tocouNaFaixa]);

  const escolher = (i: number) => {
    setAtivo(i);
    setTocouNaFaixa(true);
  };

  return (
    <section id="clientes" className="relative overflow-hidden bg-[#15100D] py-20 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="section-eyebrow">Segmentos</span>
          <h2 className="mt-6 text-[38px] font-bold leading-[1.14] tracking-tight text-brand-cream sm:text-[46px]">
            Cada casa trabalha{" "}
            <span className="text-gradient-brand">de um jeito</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-brand-cream/60">
            Cafeterias vendem rápido no balcão de manhã. Pizzaria vive de
            delivery na sexta à noite. O sistema se ajusta aos dois.
          </p>
        </div>

        {/* ---------- celular: um card por vez, escolhido na faixa de baixo ----------
            Mesmo padrão da hero. Rolagem horizontal de card cheio obrigava a
            arrastar seis vezes; aqui os seis segmentos ficam visíveis o tempo
            todo e o conteúdo troca no lugar. */}
        <div className="mt-10 sm:hidden">
          <div className="relative min-h-[188px]">
            {/* sync + posição absoluta: o card novo entra enquanto o antigo sai,
                sem o intervalo vazio que o mode="wait" abre entre os dois */}
            <AnimatePresence mode="sync" initial={false}>
              <motion.a
                key={seg.id}
                href="#contato"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group absolute inset-x-0 top-0 block overflow-hidden rounded-[24px] border border-brand-orange/25 p-5"
                style={{ background: seg.bg, backgroundSize: "cover" }}
              >
                <CardSegmento seg={seg} compacto />
              </motion.a>
            </AnimatePresence>
          </div>

          <div className="mt-6">
            <SegmentStrip active={ativo} onSelect={escolher} />
          </div>
        </div>

        {/* ---------- sm+: a grade completa ---------- */}
        <div className="mt-16 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {SEGMENTS.map((s, i) => (
            <motion.a
              key={s.id}
              href="#contato"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[24px] border border-brand-sand/[0.11] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange/35 sm:p-7"
              style={{ background: s.bg, backgroundSize: "cover" }}
            >
              <CardSegmento seg={s} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
