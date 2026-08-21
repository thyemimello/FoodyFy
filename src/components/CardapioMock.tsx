import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bike,
  Check,
  Clock,
  Heart,
  Share2,
  ShoppingBag,
  Star,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";

export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  foto: string;
};

export const PRODUTOS: Produto[] = [
  {
    id: "smash",
    nome: "Smash Bacon Cheddar",
    descricao:
      "Smash burger com cheddar cremoso, bacon crocante, cebola caramelizada e molho especial.",
    preco: 28.9,
    categoria: "Lanches",
    foto: "/produtos/smash-bacon.jpg",
  },
  {
    id: "pizza",
    nome: "Pizza Calabresa",
    descricao:
      "Massa artesanal, molho de tomate caseiro, calabresa fatiada, cebola, azeitonas e orégano.",
    preco: 42.9,
    categoria: "Pizzas",
    foto: "/produtos/pizza-calabresa.jpg",
  },
  {
    id: "coca",
    nome: "Coca-Cola Lata 350ml",
    descricao: "Coca-Cola geladinha para acompanhar sua refeição.",
    preco: 6,
    categoria: "Bebidas",
    foto: "/produtos/coca-lata.jpg",
  },
  {
    id: "batata",
    nome: "Batata com Cheddar e Bacon",
    descricao:
      "Batata frita crocante com queijo cheddar cremoso e bacon crocante.",
    preco: 18.9,
    categoria: "Lanches",
    foto: "/produtos/batata-cheddar.jpg",
  },
  {
    id: "petit",
    nome: "Petit Gateau",
    descricao: "Bolo de chocolate com recheio cremoso e sorvete de creme.",
    preco: 16.9,
    categoria: "Sobremesas",
    foto: "/produtos/petit-gateau.jpg",
  },
];

const CATEGORIAS = ["Todos", "Lanches", "Pizzas", "Bebidas", "Sobremesas"];

const real = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;

/**
 * O cardápio digital do cliente, reproduzido em código.
 *
 * Não é print: as categorias filtram de verdade, o botão Adicionar alimenta a
 * sacola e a barra de baixo soma os itens. É a mesma tela que o consumidor vê
 * ao abrir o link ou ler o QR Code da mesa.
 */
export default function CardapioMock({ inerte = false }: { inerte?: boolean }) {
  const [categoria, setCategoria] = useState("Todos");
  const [sacola, setSacola] = useState<string[]>(
    inerte ? ["smash", "coca", "batata"] : []
  );

  const lista =
    categoria === "Todos"
      ? PRODUTOS
      : PRODUTOS.filter((p) => p.categoria === categoria);

  const total = sacola.reduce(
    (soma, id) => soma + (PRODUTOS.find((p) => p.id === id)?.preco ?? 0),
    0
  );

  const alternar = (id: string) =>
    setSacola((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="flex h-full flex-col bg-[#0B0908] text-white">
      {/* barra de status */}
      <div className="flex shrink-0 items-center justify-between px-6 pb-1 pt-3">
        <span className="text-[11px] font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="flex items-end gap-[1.5px]">
            {[3, 5, 7, 9].map((h) => (
              <span key={h} className="w-[2px] rounded-sm bg-white" style={{ height: h }} />
            ))}
          </span>
          <Wifi className="h-[11px] w-[11px]" strokeWidth={2.4} />
          <span className="flex h-[10px] w-[19px] items-center rounded-[3px] border border-white/70 p-[1.5px]">
            <span className="h-full w-full rounded-[1px] bg-white" />
          </span>
        </div>
      </div>

      <div className="scrollbar-oculta flex-1 overflow-y-auto">
        {/* capa da loja */}
        <div className="relative">
          <img
            src="/produtos/capa-loja.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B0908_28%,rgba(11,9,8,.75)_52%,transparent_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0B0908] to-transparent" />

          {/* ações do topo */}
          <div className="relative flex items-center justify-between px-4 pt-3">
            <button
              type="button"
              disabled={inerte}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="h-[17px] w-[17px]" strokeWidth={2.2} />
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={inerte}
                className="group/fav grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand-orange/25"
              >
                <Heart className="h-[16px] w-[16px] transition-colors group-hover/fav:fill-brand-orange group-hover/fav:text-brand-orange" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                disabled={inerte}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <Share2 className="h-[15px] w-[15px]" strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* identidade da loja */}
          <div className="relative px-4 pb-4 pt-3">
            <span className="grid h-[62px] w-[62px] place-items-center rounded-full border-2 border-brand-orange bg-[#120D0A] text-center">
              <UtensilsCrossed className="h-3.5 w-3.5 text-brand-orange" strokeWidth={2} />
              <span className="mt-[1px] text-[7px] font-bold leading-[1.1] tracking-wide text-brand-orange">
                SABOR
                <br />
                CASEIRO
              </span>
            </span>
            <h3 className="mt-3 text-[22px] font-bold leading-none tracking-tight">
              Sabor Caseiro
            </h3>
            <p className="mt-1.5 text-[12.5px] text-white/75">
              Comida que abraça <span className="text-brand-red">❤</span>
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium">
              <Star className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
              4,8 <span className="text-white/55">(532 avaliações)</span>
            </p>
            <div className="mt-1.5 flex items-center gap-4 text-[11.5px] text-white/65">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" strokeWidth={2} /> 30–45 min
              </span>
              <span className="flex items-center gap-1.5">
                <Bike className="h-3.5 w-3.5" strokeWidth={2} /> R$ 5,99
              </span>
            </div>
          </div>
        </div>

        {/* categorias */}
        <div className="scrollbar-oculta flex gap-2 overflow-x-auto px-4 pb-3">
          {CATEGORIAS.map((c) => {
            const on = c === categoria;
            return (
              <button
                key={c}
                type="button"
                disabled={inerte}
                onClick={() => setCategoria(c)}
                className={`shrink-0 rounded-full px-3.5 py-[7px] text-[11.5px] font-semibold transition-all duration-300 ${
                  on
                    ? "bg-brand-orange text-white shadow-[0_6px_18px_-8px_rgba(255,138,0,1)]"
                    : "bg-white/[0.08] text-white/75 hover:bg-white/[0.16] hover:text-white"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* produtos */}
        <div className="space-y-2.5 px-4 pb-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {lista.map((p) => {
              const dentro = sacola.includes(p.id);
              return (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="group/item flex gap-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 hover:border-brand-orange/45 hover:bg-white/[0.06]"
                >
                  <img
                    src={p.foto}
                    alt={p.nome}
                    loading="lazy"
                    className="h-auto w-[86px] shrink-0 self-stretch object-cover transition-transform duration-500 group-hover/item:scale-[1.07]"
                  />
                  <div className="min-w-0 flex-1 py-2.5 pr-2.5">
                    <p className="text-[13px] font-semibold leading-tight">{p.nome}</p>
                    <p className="mt-1 text-[10px] leading-[1.4] text-white/50">
                      {p.descricao}
                    </p>
                    <div className="mt-2 flex items-end justify-between gap-2">
                      <span className="text-[14px] font-bold text-brand-orange">
                        {real(p.preco)}
                      </span>
                      <button
                        type="button"
                        disabled={inerte}
                        onClick={() => alternar(p.id)}
                        className={`rounded-lg px-3 py-[6px] text-[11px] font-semibold transition-all duration-300 ${
                          dentro
                            ? "bg-white/15 text-white"
                            : "bg-brand-orange text-white hover:brightness-110 hover:shadow-[0_6px_16px_-6px_rgba(255,138,0,1)]"
                        }`}
                      >
                        {dentro ? (
                          <span className="flex items-center gap-1">
                            <Check className="h-3 w-3" strokeWidth={3} /> Na sacola
                          </span>
                        ) : (
                          "Adicionar"
                        )}
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* barra da sacola */}
      <AnimatePresence>
        {sacola.length > 0 && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 px-3 pb-3"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#141010] p-2.5">
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.07]">
                <ShoppingBag className="h-4 w-4 text-brand-orange" strokeWidth={2} />
                <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-brand-orange text-[9px] font-bold text-white">
                  {sacola.length}
                </span>
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-[12px] font-semibold">
                  {sacola.length} {sacola.length === 1 ? "item" : "itens"}
                </p>
                <p className="text-[13px] font-bold text-brand-orange">
                  {real(total)}
                </p>
              </div>
              <button
                type="button"
                disabled={inerte}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-brand-orange px-3.5 py-2.5 text-[12px] font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_24px_-10px_rgba(255,138,0,1)]"
              >
                Finalizar pedido
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.6} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* indicador de home */}
      <span className="mx-auto mb-2 h-[3px] w-[100px] shrink-0 rounded-full bg-white/35" />
    </div>
  );
}
