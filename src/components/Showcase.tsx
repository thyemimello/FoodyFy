import { useEffect, useRef, useState } from "react";
import { Bike, Boxes, FileText, LayoutDashboard, QrCode, Store } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const ETAPAS = [
  { titulo: "PDV e balcão", texto: "Venda rápida, múltiplas formas de pagamento, abertura e fechamento de caixa.", icon: Store },
  { titulo: "Delivery e mesas", texto: "Atendimento no salão ou delivery integrado, com controle de pedidos em tempo real.", icon: Bike },
  { titulo: "Cardápio digital", texto: "Cardápio online, categorias, adicionais e combos.", icon: QrCode },
  { titulo: "Gestão e financeiro", texto: "Relatórios completos, fluxo de caixa, contas a pagar e receber e DRE.", icon: LayoutDashboard },
  { titulo: "Estoque", texto: "Controle de estoque em tempo real, fichas técnicas e inventário.", icon: Boxes },
  { titulo: "Fiscal", texto: "Emissão de notas fiscais, SAT, NFC-e, NF-e e relatórios fiscais.", icon: FileText },
];

export default function Showcase() {
  const [ativo, setAtivo] = useState(0);
  const secaoRef = useRef<HTMLElement | null>(null);
  const itensRef = useRef<Array<HTMLLIElement | null>>([]);
  const paineisRef = useRef<Array<HTMLElement | null>>([]);
  const { scrollYProgress } = useScroll({ target: secaoRef, offset: ["start end", "end start"] });
  const deslocamento = useTransform(scrollYProgress, [0, 1], [18, -26]);
  const inclinacao = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 0.4, -0.3]);

  useEffect(() => {
    const atualizarEtapa = () => {
      const centro = window.innerHeight * 0.48;
      let maisProximo = 0;
      let distancia = Number.POSITIVE_INFINITY;
      paineisRef.current.forEach((painel, index) => {
        if (!painel) return;
        const caixa = painel.getBoundingClientRect();
        const atual = Math.abs(caixa.top + caixa.height / 2 - centro);
        if (atual < distancia) {
          distancia = atual;
          maisProximo = index;
        }
      });
      setAtivo(maisProximo);
    };

    atualizarEtapa();
    window.addEventListener("scroll", atualizarEtapa, { passive: true });
    window.addEventListener("resize", atualizarEtapa);
    return () => {
      window.removeEventListener("scroll", atualizarEtapa);
      window.removeEventListener("resize", atualizarEtapa);
    };
  }, []);

  const selecionarEtapa = (index: number) => {
    setAtivo(index);
    paineisRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section ref={secaoRef} id="recursos" className="relative overflow-hidden bg-night-900 py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-[12%] h-[70%] bg-[radial-gradient(ellipse_at_68%_40%,rgba(255,138,0,.16),transparent_62%)]" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(270px,34%)_minmax(0,1fr)] lg:gap-x-4 lg:px-10">
        <aside className="relative z-10 flex flex-col max-lg:contents lg:pt-6">
          <header className="max-lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-brand-orange">Veja o FoodFy em ação</p>
            <h2 className="mt-5 text-[38px] font-semibold leading-[1.04] tracking-[-.04em] text-white sm:text-[44px]">Tudo o que você precisa para <span className="text-brand-orange">vender mais.</span></h2>
            <p className="mt-5 max-w-[320px] text-[13.5px] leading-[1.65] text-white/55">Atendimento, pedidos, estoque e financeiro trabalhando juntos para você ganhar agilidade, reduzir erros e aumentar seus resultados.</p>
          </header>

          {/* No celular o rolo inteiro é ilegível a 375px, então ele some — mas a
              seção não pode ficar sem nenhuma tela do produto. Entra um print
              único, em moldura, logo abaixo do título. */}
          <div className="max-lg:order-2 lg:hidden">
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-night-800 shadow-[0_30px_60px_-30px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
                <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                <span className="h-2 w-2 rounded-full bg-[#28C840]" />
                <span className="ml-2 truncate rounded bg-black/30 px-2 py-0.5 text-[10px] text-white/40">
                  app.foodfy.club/pdv
                </span>
              </div>
              <img
                src="/prints/pdv.png"
                alt="Tela do PDV do FoodFy"
                loading="lazy"
                className="block w-full"
              />
            </div>
          </div>

          <ol className="relative mt-12 max-w-[310px] max-lg:order-3">
            <span aria-hidden="true" className="absolute bottom-8 left-[6px] top-8 w-px bg-white/15" />
            {ETAPAS.map((etapa, index) => {
              const Icon = etapa.icon;
              const destaque = index === ativo;
              return (
                <li key={etapa.titulo} ref={(elemento) => { itensRef.current[index] = elemento; }} className="relative flex gap-4 max-lg:min-h-0 sm:gap-5 lg:min-h-[132px]">
                  <span aria-hidden="true" className={`relative z-10 mt-[38px] h-[13px] w-[13px] shrink-0 rounded-full border-2 transition-all duration-300 ${destaque ? "border-brand-orange bg-brand-orange shadow-[0_0_14px_rgba(255,138,0,.85)]" : "border-white/25 bg-night-900"}`} />
                  <button type="button" aria-current={destaque ? "step" : undefined} aria-label={`Ver ${etapa.titulo}`} onClick={() => selecionarEtapa(index)} className={`group mb-3 flex flex-1 gap-3.5 rounded-2xl border p-3.5 text-left lg:mb-4 lg:gap-4 lg:p-4 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-orange ${destaque ? "border-brand-orange/45 bg-white/[.045] shadow-[0_12px_34px_-22px_rgba(255,138,0,.7)]" : "border-transparent hover:border-white/15 hover:bg-white/[.025]"}`}>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors ${destaque ? "border-brand-orange/40 text-brand-orange" : "border-white/15 text-white/80 group-hover:border-white/30"}`}><Icon className="h-[19px] w-[19px]" strokeWidth={1.6} /></span>
                    <span className="min-w-0">
                      <span className={`text-[10px] font-semibold tracking-wider ${destaque ? "text-brand-orange" : "text-white/40"}`}>{String(index + 1).padStart(2, "0")}</span>
                      <span className="mt-1 block text-[17px] font-medium leading-tight text-white/90">{etapa.titulo}</span>
                      <span className="mt-2 block text-[12.5px] leading-[1.5] text-white/50">{etapa.texto}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-2 max-w-[225px] rounded-2xl border border-brand-orange/40 bg-black/45 p-5 max-lg:order-4">
            <p className="text-[17px] leading-[1.45] text-white"><span className="text-brand-orange">T</span>udo conectado.<br />Tudo em um só lugar.</p>
            <p className="mt-4 text-[12px] leading-[1.5] text-white/45">Mais controle, mais agilidade e mais resultado para o seu negócio.</p>
          </div>
        </aside>

        <motion.figure style={{ y: deslocamento, rotate: inclinacao }} className="showcase-composition relative mx-auto hidden w-full max-w-[720px] lg:block max-lg:order-2 lg:-mt-8 lg:ml-[-3rem] lg:mr-[-10rem] lg:w-[135%] lg:max-w-none lg:justify-self-stretch">
          <motion.img
            src="/showcase-foodfy-premium.png"
            alt="Notebook com uma faixa curva formada pelas telas reais do sistema"
            className="showcase-masterpiece pointer-events-none block h-auto w-full select-none"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          {[8, 34, 48, 61, 74, 88].map((topo, index) => (
            <span
              key={ETAPAS[index].titulo}
              ref={(elemento) => { paineisRef.current[index] = elemento; }}
              className="pointer-events-none absolute left-1/2 h-1 w-1"
              style={{ top: `${topo}%` }}
              aria-hidden="true"
            />
          ))}
        </motion.figure>
      </div>
    </section>
  );
}
