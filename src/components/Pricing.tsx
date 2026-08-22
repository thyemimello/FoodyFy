import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const PLANS = [
  {
    id: "start",
    name: "Start",
    pitch: "Para quem está abrindo agora ou só vende no balcão.",
    monthly: 129,
    quarterly: 116,
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
    quarterly: 224,
    yearly: 199,
    highlight: true,
    features: [
      "Até 3 PDVs e usuários ilimitados",
      "Delivery próprio + integração iFood",
      "Mesas, comandas e divisão de conta",
      "Estoque com ficha técnica",
      "Financeiro completo e fluxo de caixa",
      "Emissão de NFC-e e NF-e",
    ],
  },
  {
    id: "multi",
    name: "Multi-loja",
    pitch: "Para quem tem mais de uma loja e precisa ver o total.",
    monthly: 449,
    quarterly: 404,
    yearly: 359,
    features: [
      "Até 3 lojas e PDVs ilimitados",
      "Dashboard consolidado por unidade",
      "Cardápio e preços por loja",
      "DRE e centro de custo",
      "Gerente de conta para as 3 unidades",
      "Onboarding e migração assistida",
    ],
  },
  {
    id: "enterprise",
    name: "Rede personalizada",
    pitch: "Para redes com mais de 3 lojas e necessidades específicas.",
    custom: true,
    features: [
      "A partir de 4 lojas",
      "Configuração de acordo com a sua rede",
      "Implantação e migração personalizadas",
      "Avaliação das integrações necessárias",
      "Treinamento para equipes e gestores",
      "Contato direto durante a implantação",
    ],
  },
];

type BillingPeriod = "monthly" | "quarterly" | "yearly";

export default function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>("yearly");

  return (
    <section id="precos" className="relative overflow-hidden bg-[#15100D] py-16 sm:py-20 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[800px] -translate-x-1/2 -translate-y-0 rounded-full bg-brand-orange/[0.03] blur-[90px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="section-eyebrow">Planos</span>
          <h2 className="mt-6 text-[38px] font-bold leading-[1.14] tracking-tight text-brand-cream sm:text-[46px]">
            Quanto{" "}
            <span className="text-brand-orange">custa</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-brand-cream/55">
            Teste por 14 dias sem cadastrar cartão. Escolha depois entre
            pagamento mensal, trimestral ou anual.
          </p>

          <div className="mt-9 inline-flex items-center gap-1 rounded-full border border-brand-sand/[0.14] bg-black/25 p-1.5">
            {[
              { id: "monthly", label: "Mensal" },
              { id: "quarterly", label: "Trimestral · 10% off" },
              { id: "yearly", label: "Anual · 20% off" },
            ].map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setPeriod(o.id as BillingPeriod)}
                className={`rounded-full px-3 py-2.5 text-[12px] font-medium transition-all duration-300 sm:px-5 sm:text-[14px] ${
                  period === o.id
                    ? "bg-gradient-to-r from-brand-orange to-[#FFA02E] text-brand-cream shadow-[0_4px_12px_-8px_rgba(255,138,0,.35)]"
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
        <div className="mt-10 scrollbar-oculta -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:mt-14 sm:gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex w-[84%] shrink-0 snap-center sm:w-auto sm:shrink flex-col overflow-hidden rounded-[26px] border p-6 sm:p-8 ${
                p.highlight
                  ? "border-brand-orange/45 bg-gradient-to-b from-[#372B23] to-[#221A15] shadow-[0_24px_60px_-36px_rgba(255,138,0,.22)] lg:-mt-4 lg:pb-11 lg:pt-11"
                  : "border-brand-sand/[0.13] bg-[#8B5E3C]/[0.09]"
              }`}
            >
              {p.highlight && (
                <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-cream">
                  <Sparkles className="h-3 w-3" /> Mais usado
                </span>
              )}

              <h3 className="text-[21px] font-semibold text-brand-cream">{p.name}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-brand-cream/50 sm:min-h-[44px]">
                {p.pitch}
              </p>

              {p.custom ? (
                <div className="mt-6">
                  <p className="text-[30px] font-bold leading-none tracking-tight text-brand-cream">
                    Sob consulta
                  </p>
                  <p className="mt-2 text-[13px] text-brand-cream/40">
                    proposta conforme a estrutura da rede
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-6 flex items-end gap-1.5">
                    <span className="text-[15px] text-brand-cream/50">R$</span>
                    <span className="text-[40px] font-bold leading-none tracking-tight text-brand-cream sm:text-[46px]">
                      {p[period]}
                    </span>
                    <span className="mb-1.5 text-[14px] text-brand-cream/50">/mês</span>
                  </div>
                  <p className="mt-1.5 text-[13px] text-brand-cream/40">
                    {period === "yearly"
                      ? "cobrado anualmente"
                      : period === "quarterly"
                        ? "cobrado a cada 3 meses"
                        : "cobrado mensalmente"}
                  </p>
                </>
              )}

              <a
                href="#contato"
                className={`mt-5 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-300 sm:mt-7 ${
                  p.highlight
                    ? "bg-gradient-to-r from-brand-orange to-[#F5741B] text-brand-cream shadow-[0_10px_40px_-12px_rgba(255,138,0,.9)] hover:-translate-y-0.5"
                    : "border border-brand-sand/[0.18] bg-[#8B5E3C]/[0.10] text-brand-cream hover:border-brand-orange hover:bg-[#8B5E3C]/[0.20]"
                }`}
              >
                {p.custom ? "Falar com especialista" : "Começar teste grátis"}
                <ArrowRight className="h-[17px] w-[17px]" />
              </a>

              <ul className="mt-6 space-y-2.5 border-t border-brand-sand/[0.14] pt-5 sm:mt-8 sm:space-y-3.5 sm:pt-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-orange">
                      <Check className="h-3 w-3 text-brand-cream" strokeWidth={3.2} />
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
