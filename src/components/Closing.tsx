import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Minus, Phone, Plus } from "lucide-react";
import Logo from "./Logo";

/* ------------------------------------------------------------------ */
/*  Como funciona                                                      */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    n: "01",
    title: "Cadastramos sua loja",
    text: "Nosso time ajuda a trazer cardápio, produtos e preços para você não começar do zero.",
  },
  {
    n: "02",
    title: "Treinamos sua equipe",
    text: "Caixa, cozinha e atendimento aprendem apenas o que usam na rotina.",
  },
  {
    n: "03",
    title: "Você vende no mesmo dia",
    text: "Depois da configuração, acompanhamos os primeiros dias de uso e ajustamos o que for necessário.",
  },
];

const WHATSAPP_URL = "https://wa.me/554788140013";
const CONTACT_EMAIL = "contato@zurve.io";

export function HowItWorks() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-[#15100D] py-16 sm:py-20 lg:py-32">
      <div className="relative mx-auto max-w-[1120px] px-6">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="section-eyebrow">Implantação</span>
          <h2 className="mt-6 text-[38px] font-bold leading-[1.14] tracking-tight text-brand-cream sm:text-[46px]">
            Sua loja no ar em{" "}
            <span className="text-brand-orange">até 48 horas</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-brand-cream/55">
            A troca é planejada com o seu time para não atrapalhar a rotina da
            loja. A gente configura, orienta a equipe e acompanha o início.
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-[46px] hidden h-px bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent md:block" />
          <div className="implementation-route pointer-events-none absolute top-[40px] hidden md:block" aria-hidden="true">
            <span className="implementation-runner" />
          </div>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-center"
            >
              <span className="relative z-10 mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-2 border-brand-orange/55 bg-[#15100D] text-[26px] font-bold text-brand-orange shadow-[0_0_30px_-10px_rgba(255,138,0,.55)]">
                {s.n}
              </span>
              <h3 className="mt-6 text-[19px] font-semibold text-brand-cream">
                {s.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[300px] text-[14.5px] leading-relaxed text-brand-cream/50">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const FAQ = [
  {
    q: "O FoodFy serve para qualquer tipo de restaurante?",
    a: "Serve para restaurante, lanchonete, pizzaria, hamburgueria, cafeteria e bar. A configuração acompanha a rotina de cada negócio: balcão, salão ou delivery.",
  },
  {
    q: "Preciso trocar meu equipamento?",
    a: "Não precisa. O FoodFy abre no navegador, em qualquer computador, tablet ou celular. Impressora térmica e leitor de código de barras que você já tem continuam sendo usados.",
  },
  {
    q: "Funciona se a internet cair?",
    a: "O sistema conta com contingência para os documentos fiscais. Quando a conexão volta, o envio pendente é retomado.",
  },
  {
    q: "Consigo integrar com o iFood?",
    a: "Sim. O pedido do iFood entra no FoodFy, imprime na cozinha, baixa do estoque e conta no faturamento junto com os outros canais.",
  },
  {
    q: "Vocês emitem NFC-e e NF-e?",
    a: "As duas. A emissão sai do cupom da própria venda, com o seu certificado digital A1 configurado no sistema.",
  },
  {
    q: "Tenho mais de uma loja. Dá para gerenciar junto?",
    a: "Dá. O plano Multi-loja atende até 3 unidades, com visão separada e consolidada. Para redes maiores, montamos uma proposta de implantação.",
  },
  {
    q: "Como funcionam os períodos de pagamento?",
    a: "Você pode contratar mensal, trimestral ou anual. Antes de fechar, mostramos o valor, o período de cobrança e as condições de cancelamento.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[#15100D] py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-[860px] px-6">
        <div className="text-center">
          <span className="section-eyebrow">Dúvidas</span>
          <h2 className="mt-6 text-[38px] font-bold leading-[1.14] tracking-tight text-brand-cream sm:text-[46px]">
            O que mais{" "}
            <span className="text-brand-orange">perguntam</span>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {FAQ.map((item, i) => {
            const on = open === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  on
                    ? "border-brand-orange/45 bg-[#8B5E3C]/[0.16]"
                    : "border-brand-sand/[0.12] bg-[#8B5E3C]/[0.07]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="text-[16.5px] font-medium text-brand-cream/90">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
                      on ? "bg-brand-orange text-brand-cream" : "bg-[#8B5E3C]/[0.18] text-brand-cream/55"
                    }`}
                  >
                    {on ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-400 ease-out"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-brand-cream/50">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA final                                                          */
/* ------------------------------------------------------------------ */

export function Cta() {
  return (
    <section id="contato" className="relative overflow-hidden bg-[#15100D] py-16 sm:py-20 lg:py-32">
      <div className="relative mx-auto max-w-[980px] px-6">
          <div className="overflow-hidden rounded-[32px] border border-brand-sand/[0.14] bg-[#211710] px-8 py-14 text-center sm:px-14">
          <h2 className="mx-auto max-w-[620px] text-[34px] font-bold leading-[1.15] tracking-tight text-brand-cream sm:text-[44px]">
            Quer ver funcionando{" "}
            <span className="text-gradient-brand">com o seu cardápio?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[16.5px] leading-relaxed text-brand-cream/60">
            Deixa o seu WhatsApp que a gente monta uma demonstração do sistema
            com o seu cardápio, os seus produtos e os seus preços. Depois você
            testa 14 dias.
          </p>

          <form
            className="mx-auto mt-9 flex max-w-[540px] flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const telefone = String(form.get("whatsapp") || "").trim();
              const mensagem = encodeURIComponent(
                `Olá! Quero conhecer o FoodFy e solicitar uma demonstração. Meu WhatsApp é ${telefone}.`
              );
              window.open(`${WHATSAPP_URL}?text=${mensagem}`, "_blank", "noopener,noreferrer");
            }}
            aria-label="Solicitar demonstração do FoodFy"
          >
            <input
              type="tel"
              name="whatsapp"
              required
              inputMode="tel"
              autoComplete="tel"
              pattern="[0-9 ()+\-]{10,20}"
              placeholder="Seu WhatsApp com DDD"
              aria-label="WhatsApp com DDD"
              className="w-full rounded-full border border-brand-sand/[0.16] bg-black/30 px-6 py-3.5 text-[15px] text-brand-cream placeholder:text-brand-cream/35 focus:border-brand-orange/70 focus:outline-none"
            />
            <button type="submit" className="btn-primary shrink-0 justify-center">
              Quero uma demonstração
              <ArrowRight className="h-[18px] w-[18px]" />
            </button>
          </form>

          <p className="mt-5 flex items-center justify-center gap-2 text-[13.5px] text-brand-cream/45">
            <Phone className="h-3.5 w-3.5" />
            A conversa é direto com o nosso time, pelo WhatsApp.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="-my-1 inline-block py-2 mt-3 inline-block text-[13px] text-brand-cream/40 transition-colors hover:text-brand-orange">
            Prefere e-mail? {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Rodapé                                                             */
/* ------------------------------------------------------------------ */

const FOOTER = [
  {
    title: "Produto",
    links: [
      ["Cardápio digital", "#recursos"],
      ["PDV e balcão", "#recursos"],
      ["Delivery e mesas", "#recursos"],
      ["Estoque", "#recursos"],
      ["Fiscal NFC-e / NF-e", "#recursos"],
    ],
  },
  {
    title: "Segmentos",
    links: [
      ["Cafeterias", "#clientes"],
      ["Hamburguerias", "#clientes"],
      ["Restaurantes", "#clientes"],
      ["Bares", "#clientes"],
      ["Pizzarias", "#clientes"],
    ],
  },
  {
    title: "Empresa",
    links: [
      ["Sobre o FoodFy", "#sobre"],
      ["Planos", "#precos"],
      ["Fale conosco", "#contato"],
      ["Central de ajuda", "#contato"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#15100D] pb-12 pt-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-[300px] text-[14.5px] leading-relaxed text-brand-cream/50">
              Sistema para restaurante, lanchonete, pizzaria, cafeteria, bar e
              hamburgueria. Do pedido no cardápio digital até a nota fiscal,
              sem trocar de programa.
            </p>
            <div className="mt-5 flex flex-col items-start gap-2 text-[13.5px] text-brand-cream/50">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="-my-1 inline-block py-2 transition-colors hover:text-brand-orange">
                WhatsApp: +55 47 8814-0013
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="-my-1 inline-block py-2 transition-colors hover:text-brand-orange">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {FOOTER.map((col) => (
            <div key={col.title}>
              <h4 className="text-[14px] font-semibold uppercase tracking-wider text-brand-cream/85">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-0.5 sm:mt-5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="-my-1 inline-block py-2 text-[14.5px] text-brand-cream/50 transition-colors hover:text-brand-orange"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-brand-sand/[0.11] pt-7 sm:flex-row">
          <p className="text-[13.5px] text-brand-cream/40">
            © {new Date().getFullYear()} FoodFy.club. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-[13.5px] text-brand-cream/40">
            <a href="#" className="-my-1 inline-block py-2 transition-colors hover:text-brand-cream/70">
              Termos de uso
            </a>
            <a href="#" className="-my-1 inline-block py-2 transition-colors hover:text-brand-cream/70">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
