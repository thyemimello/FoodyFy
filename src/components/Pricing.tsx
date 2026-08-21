import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const PLANS = [
  {
    id: "start",
    name: "Start",
    pitch: "Para quem está abrindo agora ou só vende no balcão.",
    monthly: 129,
    yearly: 103,
    features: [
      "1 ponto de venda (PDV)",
      "Cardápio digital com QR Code",
      "Controle de caixa e vendas",
      "Relatórios essenciais",
      "Suporte por WhatsApp",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    pitch: "O mais escolhido. Salão, delivery e iFood juntos.",
    monthly: 249,
    yearly: 199,
    highlight: true,
    features: [
      "Até 3 PDVs e usuários ilimitados",
      "Delivery próprio + integração iFood",
      "Mesas, comandas e divisão de conta",
      "Estoque com ficha técnica",
      "Financeiro completo e fluxo de caixa",
      "NFC-e e NF-e ilimitadas",
    ],
  },
  {
    id: "multi",
    name: "Multi-loja",
    pitch: "Para quem tem mais de uma loja e precisa ver o total.",
    monthly: 449,
    yearly: 359,
    features: [
      "PDVs e lojas ilimitados",
      "Dashboard consolidado por unidade",
      "Cardápio e preços por loja",
      "DRE e centro de custo",
      "Gerente de conta dedicado",
      "Onboarding e migração assistida",
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="precos" className="relative overflow-hidden border-t border-white/[0.06] bg-night-800 py-28">
      <div className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-brand-orange/[0.08] blur-[140px]" />

      <div className="relative mx-auto max-w-[1180px] px-6">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="section-eyebrow">Planos</span>
          <h2 className="mt-6 text-[38px] font-bold leading-[1.14] tracking-tight text-brand-cream sm:text-[46px]">
            Quanto{" "}
            <span className="text-brand-orange">custa</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-brand-cream/55">
            São 14 dias de graça e não pedimos cartão para começar. Não tem
            fidelidade nem taxa de instalação.
          </p>

          <div className="mt-9 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/25 p-1.5">
            {[
              { id: "m", label: "Mensal", on: !yearly },
              { id: "y", label: "Anual · 20% off", on: yearly },
            ].map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setYearly(o.id === "y")}
                className={`rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-300 ${
                  o.on
                    ? "bg-gradient-to-r from-brand-orange to-[#FFA02E] text-white shadow-[0_6px_18px_-8px_rgba(255,138,0,.9)]"
                    : "text-brand-cream/50 hover:text-brand-cream"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* No celular os planos viram carrossel: o card seguinte fica espiando na
            borda, o que sinaliza o arraste sem precisar de instrução. */}
        <div className="mt-10 scrollbar-oculta -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:mt-14 sm:gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex w-[84%] shrink-0 snap-center sm:w-auto sm:shrink flex-col overflow-hidden rounded-[26px] border p-6 sm:p-8 ${
                p.highlight
                  ? "border-brand-orange/70 bg-gradient-to-b from-night-500 to-night-700 shadow-[0_32px_80px_-34px_rgba(255,138,0,.5)] lg:-mt-4 lg:pb-11 lg:pt-11"
                  : "border-white/[0.09] bg-white/[0.035]"
              }`}
            >
              {p.highlight && (
                <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  <Sparkles className="h-3 w-3" /> Mais usado
                </span>
              )}

              <h3 className="text-[21px] font-semibold text-brand-cream">{p.name}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-brand-cream/50 sm:min-h-[44px]">
                {p.pitch}
              </p>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="text-[15px] text-brand-cream/50">R$</span>
                <span className="text-[40px] font-bold leading-none tracking-tight text-brand-cream sm:text-[46px]">
                  {yearly ? p.yearly : p.monthly}
                </span>
                <span className="mb-1.5 text-[14px] text-brand-cream/50">/mês</span>
              </div>
              <p className="mt-1.5 text-[13px] text-brand-cream/40">
                {yearly ? "cobrado anualmente" : "cobrado mensalmente"}
              </p>

              <a
                href="#contato"
                className={`mt-5 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-300 sm:mt-7 ${
                  p.highlight
                    ? "bg-gradient-to-r from-brand-orange to-[#F5741B] text-white shadow-[0_10px_40px_-12px_rgba(255,138,0,.9)] hover:-translate-y-0.5"
                    : "border border-white/15 bg-white/[0.04] text-brand-cream hover:border-brand-orange hover:bg-white/[0.08]"
                }`}
              >
                Começar teste grátis
                <ArrowRight className="h-[17px] w-[17px]" />
              </a>

              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 sm:mt-8 sm:space-y-3.5 sm:pt-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-orange">
                      <Check className="h-3 w-3 text-white" strokeWidth={3.2} />
                    </span>
                    <span className="text-[14.5px] leading-snug text-brand-cream/75">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-[14px] text-brand-cream/45">
          Atualização, backup diário e suporte em português entram em qualquer
          plano.
        </p>
      </div>
    </section>
  );
}
