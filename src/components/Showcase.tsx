import { useEffect, useRef, useState } from "react";
import { Bike, Boxes, FileText, LayoutDashboard, QrCode, Store } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

/* Estes são os mesmos seis módulos da seção "Soluções", mas enquadrados como
   momentos da operação, não como catálogo de recursos. A seção 2 responde
   "o que o sistema tem"; esta responde "como o dia funciona com ele". */
const ETAPAS = [
  {
    titulo: "O pedido entra",
    texto:
      "Balcão, mesa, delivery próprio ou iFood: todo pedido cai na mesma fila, sem ninguém redigitar nada.",
    icon: Store,
  },
  {
    titulo: "A cozinha produz",
    texto:
      "A comanda imprime na produção com adicionais e observações, e o salão acompanha o tempo de cada mesa.",
    icon: Bike,
  },
  {
    titulo: "O cliente faz o próprio pedido",
    texto:
      "O cardápio digital abre pelo QR Code da mesa ou pelo link, com foto, preço e disponibilidade atualizados.",
    icon: QrCode,
  },
  {
    titulo: "O caixa fecha certo",
    texto:
      "Sangria, suprimento, formas de pagamento e conferência no fim do turno, sem planilha paralela.",
    icon: LayoutDashboard,
  },
  {
    titulo: "O estoque baixa junto",
    texto:
      "A ficha técnica desconta o insumo a cada venda, então o saldo do fim do dia é o saldo real.",
    icon: Boxes,
  },
  {
    titulo: "A nota sai na hora",
    texto:
      "NFC-e no cupom do balcão e NF-e nos pedidos maiores, com o arquivo do contador pronto no fim do mês.",
    icon: FileText,
  },
];

export default function Showcase() {
  const [ativo, setAtivo] = useState(0);
  const secaoRef = useRef<HTMLElement | null>(null);
  const itensRef = useRef<Array<HTMLLIElement | null>>([]);
  const paineisRef = useRef<Array<HTMLElement | null>>([]);
  const { scrollYProgress } = useScroll({ target: secaoRef, offset: ["start end", "end start"] });
  const deslocamento = useTransform(scrollYProgress, [0, 1], [18, -26]);
  const inclinacao = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 0.4, -0.3]);

  /**
   * De onde sai a etapa ativa.
   *
   * No desktop são os marcadores invisíveis distribuídos ao longo do rolo. No
   * celular o rolo tem `display:none`, e elemento oculto devolve retângulo
   * zerado — todos os marcadores empatavam em zero e o índice 0 vencia sempre,
   * travando o destaque na etapa 01. Quando os marcadores não são mensuráveis,
   * a referência passa a ser a própria lista, que está visível.
   */
  const referencias = () => {
    const paineis = paineisRef.current;
    const mensuravel =
      paineis[0] && paineis[0].getBoundingClientRect().height > 0;
    return mensuravel ? paineis : itensRef.current;
  };

  useEffect(() => {
    const atualizarEtapa = () => {
      const centro = window.innerHeight * 0.48;
      let maisProximo = 0;
      let distancia = Number.POSITIVE_INFINITY;
      referencias().forEach((alvo, index) => {
        if (!alvo) return;
        const caixa = alvo.getBoundingClientRect();
        if (caixa.height === 0) return;
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
    /* só faz sentido rolar até o painel quando o rolo está na tela; no
       celular o clique apenas destaca a etapa */
    const painel = paineisRef.current[index];
    if (painel && painel.getBoundingClientRect().height > 0) {
      painel.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section ref={secaoRef} id="recursos" className="relative overflow-hidden bg-[#15100D] pb-10 pt-16 sm:pt-20 lg:pb-12 lg:pt-32">
      {/* No celular o rolo não cabe como peça: a 375px de largura ele fica
          ilegível. Em vez de sumir de vez, volta como textura bem apagada
          atrás da trilha — 67 KB no lugar dos 1,6 MB do PNG original. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
        <div className="absolute inset-0 bg-[#15100D]" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(270px,34%)_minmax(0,1fr)] lg:gap-x-4 lg:px-10">
        <aside className="relative z-10 flex flex-col max-lg:contents lg:pt-6">
          <header className="max-lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-brand-orange">Um dia de operação</p>
            <h2 className="mt-5 text-[38px] font-semibold leading-[1.04] tracking-[-.04em] text-brand-cream sm:text-[44px]">Do primeiro pedido<br />até a <span className="text-brand-orange">nota fiscal.</span></h2>
            <p className="mt-5 max-w-[320px] text-[13.5px] leading-[1.65] text-brand-cream/55">Veja o que acontece depois que o pedido entra. Cada etapa atualiza a próxima, da cozinha à nota fiscal.</p>
          </header>

          <ol className="relative mt-12 max-w-[310px] max-lg:order-3">
            <span aria-hidden="true" className="absolute bottom-8 left-[6px] top-8 w-px bg-[#8B5E3C]/30" />
            {ETAPAS.map((etapa, index) => {
              const Icon = etapa.icon;
              const destaque = index === ativo;
              return (
                <li key={etapa.titulo} ref={(elemento) => { itensRef.current[index] = elemento; }} className="relative flex gap-4 max-lg:min-h-0 sm:gap-5 lg:min-h-[132px]">
                  <span aria-hidden="true" className={`relative z-10 mt-[38px] h-[13px] w-[13px] shrink-0 rounded-full border-2 transition-all duration-300 ${destaque ? "border-brand-orange bg-brand-orange shadow-[0_0_14px_rgba(255,138,0,.85)]" : "border-brand-sand/[0.28] bg-[#15100D]"}`} />
                  <button type="button" aria-current={destaque ? "step" : undefined} aria-label={`Ver ${etapa.titulo}`} onClick={() => selecionarEtapa(index)} className={`group mb-3 flex flex-1 gap-3.5 rounded-2xl border p-3.5 text-left lg:mb-4 lg:gap-4 lg:p-4 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-orange ${destaque ? "border-brand-orange/45 bg-[#8B5E3C]/[0.12] shadow-[0_12px_34px_-22px_rgba(255,138,0,.7)]" : "border-transparent hover:border-brand-sand/[0.18] hover:bg-[#8B5E3C]/[0.07]"}`}>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors ${destaque ? "border-brand-orange/40 text-brand-orange" : "border-brand-sand/[0.18] text-brand-cream/80 group-hover:border-white/30"}`}><Icon className="h-[19px] w-[19px]" strokeWidth={1.6} /></span>
                    <span className="min-w-0">
                      <span className={`text-[10px] font-semibold tracking-wider ${destaque ? "text-brand-orange" : "text-brand-cream/40"}`}>{String(index + 1).padStart(2, "0")}</span>
                      <span className="mt-1 block text-[17px] font-medium leading-tight text-brand-cream/90">{etapa.titulo}</span>
                      <span className="mt-2 block text-[12.5px] leading-[1.5] text-brand-cream/50">{etapa.texto}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-2 max-w-[225px] rounded-2xl border border-brand-orange/40 bg-black/45 p-5 max-lg:order-4">
            <p className="text-[17px] leading-[1.45] text-brand-cream"><span className="text-brand-orange">O</span> pedido entra uma vez.<br />O sistema faz o resto.</p>
            <p className="mt-4 text-[12px] leading-[1.5] text-brand-cream/45">Cozinha, caixa, estoque e fiscal recebem os mesmos dados.</p>
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
