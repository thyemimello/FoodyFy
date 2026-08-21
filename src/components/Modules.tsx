import { motion } from "framer-motion";
import {
  Bike,
  Boxes,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  QrCode,
  ShoppingBag,
  Store,
  UtensilsCrossed,
} from "lucide-react";

const MODULES = [
  {
    icon: QrCode,
    title: "Cardápio digital",
    text: "O cliente lê o QR Code da mesa e pede pelo próprio celular. Com foto, adicional, observação e promoção. Ninguém precisa baixar app.",
  },
  {
    icon: Store,
    title: "PDV rápido",
    text: "Venda no balcão em poucos toques. Aceita dinheiro, Pix, débito, crédito e conta dividida. Faz sangria, suprimento e fecha o caixa no fim do turno.",
  },
  {
    icon: UtensilsCrossed,
    title: "Mesas e comandas",
    text: "Abre comanda, passa item de uma mesa para outra, divide a conta e lança a taxa de serviço. O mapa do salão mostra quem já pediu e quem ainda está esperando.",
  },
  {
    icon: Bike,
    title: "Delivery próprio",
    text: "A taxa por bairro é calculada sozinha, o pedido vai direto para a cozinha e o cliente acompanha por um link. Você escolhe o entregador e vê a rota.",
  },
  {
    icon: ShoppingBag,
    title: "Integração iFood",
    text: "O pedido do iFood cai na mesma tela dos outros, imprime na cozinha e baixa do estoque. Ninguém digita nada duas vezes.",
  },
  {
    icon: Boxes,
    title: "Estoque e fichas",
    text: "Você cadastra a receita do produto e o sistema desconta o insumo a cada venda. A entrada de mercadoria sai do XML da nota do fornecedor.",
  },
  {
    icon: CircleDollarSign,
    title: "Financeiro",
    text: "Contas a pagar e a receber, fluxo de caixa, conciliação do banco e o fiado dos clientes. No fim do mês o DRE já está montado.",
  },
  {
    icon: FileText,
    title: "Fiscal NFC-e / NF-e",
    text: "A nota sai junto com a venda, usando o seu certificado digital. Se a internet cair, o sistema guarda e transmite quando voltar.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard em tempo real",
    text: "Quanto vendeu hoje, qual foi o ticket médio, o que mais saiu e a que horas. Dá para ver loja por loja e comparar com ontem.",
  },
];

export default function Modules() {
  return (
    <section id="solucoes" className="relative overflow-hidden bg-night-800 py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-orange/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="section-eyebrow">Sistema completo para food service</span>
          <h2 className="mt-6 text-[38px] font-bold leading-[1.14] tracking-tight text-brand-cream sm:text-[46px]">
            Tudo que a sua loja usa{" "}
            <span className="text-gradient-brand">no mesmo lugar</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-brand-cream/60">
            Do pedido à nota fiscal, o FoodFy conecta frente de caixa e gestão
            para restaurantes, lanchonetes, cafeterias, pizzarias e bares.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {MODULES.map((m, i) => (
            <motion.article
              key={m.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange/30 hover:bg-white/[0.055] sm:p-7"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-orange/0 blur-[50px] transition-all duration-700 group-hover:bg-brand-orange/25" />
              <div className="relative">
                <div className="flex items-center gap-3 sm:block">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-brand-orange/20 to-brand-red/10 sm:h-12 sm:w-12">
                    <m.icon className="h-5 w-5 text-brand-orange sm:h-[22px] sm:w-[22px]" strokeWidth={1.6} />
                  </span>
                  <h3 className="text-[17px] font-semibold text-brand-cream sm:mt-5 sm:text-[19px]">
                    {m.title}
                  </h3>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-brand-cream/55 sm:mt-2.5 sm:text-[14.5px]">
                  {m.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
