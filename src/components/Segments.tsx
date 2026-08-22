import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SEGMENTS, type Segment } from "../data/segments";
import SegmentStrip from "./SegmentStrip";

/**
 * Cada segmento é um agrupamento de busca próprio ("sistema para pizzaria",
 * "sistema para cafeteria"). Por isso cada um tem texto específico, com a dor
 * real daquele tipo de casa — repetir os mesmos chips genéricos não rankeia
 * nem convence.
 */
const DETAIL: Record<string, { texto: string; chips: string[] }> = {
  cafeteria: {
    texto:
      "Fila no balcão pela manhã e ticket baixo: o PDV precisa fechar a venda em segundos e o cartão fidelidade tem que caber no mesmo fluxo.",
    chips: ["Venda rápida no balcão", "Cartão fidelidade", "Combo café + doce"],
  },
  hamburgueria: {
    texto:
      "O movimento explode das 19h às 23h. Monte-seu-burger com adicionais, comanda na chapa e delivery próprio rodando ao mesmo tempo.",
    chips: ["Pico da noite", "Adicionais no cardápio", "Delivery próprio"],
  },
  restaurante: {
    texto:
      "Salão cheio no almoço exige mapa de mesas, comanda por assento e divisão de conta sem travar a fila do caixa.",
    chips: ["Mesas e comandas", "Prato feito e à la carte", "Conta dividida"],
  },
  bar: {
    texto:
      "Comanda individual, rodada puxada no grito e fechamento rápido no fim da noite, com taxa de serviço calculada sozinha.",
    chips: ["Comanda individual", "Happy hour", "Taxa de serviço"],
  },
  lanchonete: {
    texto:
      "Margem apertada pede ficha técnica de verdade: saber o custo do lanche e ver o insumo baixar a cada venda.",
    chips: ["Ficha técnica", "Pedido no WhatsApp", "Custo por produto"],
  },
  pizzaria: {
    texto:
      "Meio a meio, borda recheada e rota de entrega. O cardápio digital precisa dar conta da combinação sem erro na cozinha.",
    chips: ["Meio a meio", "Bordas e adicionais", "Rota do entregador"],
  },
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

          {/* o card do celular repete o mesmo conteúdo da grade; se os dois
              emitirem H3, cada segmento aparece duplicado para o buscador */}
          {compacto ? (
            <p className="flex items-center gap-2 text-[20px] font-semibold text-brand-cream">
              Sistema para {seg.name.toLowerCase()}
            </p>
          ) : (
            <h3 className="flex items-center gap-2 text-[19px] font-semibold text-brand-cream sm:mt-5 sm:text-[21px]">
              Sistema para {seg.name.toLowerCase()}
              <ArrowUpRight className="h-[18px] w-[18px] text-brand-orange opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </h3>
          )}
        </div>

        <p className="mt-3 text-[13.5px] leading-relaxed text-brand-cream/55">
          {DETAIL[seg.id]?.texto}
        </p>

        <div className="mt-3.5 flex flex-wrap gap-2 sm:mt-4">
          {DETAIL[seg.id]?.chips.map((d) => (
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
    <section id="clientes" className="relative overflow-hidden bg-[#15100D] py-16 sm:py-20 lg:py-32">
      <div className="relative mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="section-eyebrow">Segmentos</span>
          <h2 className="mt-6 text-[38px] font-bold leading-[1.14] tracking-tight text-brand-cream sm:text-[46px]">
            A mesma base, configurada para{" "}
            <span className="text-gradient-brand">a rotina da sua loja</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-brand-cream/60">
            Uma cafeteria precisa ganhar tempo no balcão. Uma pizzaria precisa
            organizar adicionais e entregas. O FoodFy é configurado para o jeito
            que cada equipe trabalha.
          </p>
        </div>

        {/* ---------- celular: um card por vez, escolhido na faixa de baixo ----------
            Mesmo padrão da hero. Rolagem horizontal de card cheio obrigava a
            arrastar seis vezes; aqui os seis segmentos ficam visíveis o tempo
            todo e o conteúdo troca no lugar. */}
        <div className="mt-10 sm:hidden">
          <div className="relative">
            {/* sync + posição absoluta: o card novo entra enquanto o antigo sai,
                sem o intervalo vazio que o mode="wait" abre entre os dois */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.a
                key={seg.id}
                href="#contato"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative block overflow-hidden rounded-[24px] border border-brand-orange/25 p-5"
                style={{ background: seg.bg, backgroundSize: "cover" }}
              >
                <CardSegmento seg={seg} compacto />
              </motion.a>
            </AnimatePresence>
          </div>

          <div className="mt-5 overflow-hidden px-0.5 py-2">
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
