import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SEGMENTS } from "../data/segments";

const DETAIL: Record<string, string[]> = {
  cafeteria: ["Fila do balcão", "Cartão fidelidade", "Combo café + doce"],
  hamburgueria: ["Pico da noite", "Monte seu burger", "Delivery próprio"],
  restaurante: ["Mesas e comandas", "Prato feito e à la carte", "Conta dividida"],
  bar: ["Comanda individual", "Happy hour", "Fecha mesa rápido"],
  lanchonete: ["Venda rápida", "Ficha técnica", "Pedido no WhatsApp"],
  pizzaria: ["Meio a meio", "Bordas e adicionais", "Rota do entregador"],
};

export default function Segments() {
  return (
    <section id="clientes" className="relative overflow-hidden bg-night-600 py-28">
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

        {/* mesmo padrão dos planos: carrossel no celular, grade a partir do sm */}
        <div className="mt-12 scrollbar-oculta -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SEGMENTS.map((seg, i) => (
            <motion.a
              key={seg.id}
              href="#contato"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-[280px] shrink-0 snap-center overflow-hidden sm:w-auto sm:shrink-0 rounded-[24px] border border-white/[0.07] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange/35 sm:p-7"
              style={{ background: seg.bg, backgroundSize: "cover" }}
            >
              <span className="absolute inset-0 bg-night-900/70 transition-colors duration-500 group-hover:bg-night-900/55" />
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
                <div className="flex items-center gap-3.5 sm:block">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-white/15 sm:h-16 sm:w-16"
                  style={{ background: seg.disc }}
                >
                  <img src={seg.photo} alt="" className="h-full w-full object-cover" />
                </span>

                <h3 className="flex items-center gap-2 text-[19px] font-semibold text-brand-cream sm:mt-5 sm:text-[21px]">
                  Sistema para {seg.name.toLowerCase()}
                  <ArrowUpRight className="h-[18px] w-[18px] text-brand-orange opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h3>
                </div>

                <div className="mt-3.5 flex flex-wrap gap-2 sm:mt-4">
                  {DETAIL[seg.id]?.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[12.5px] text-brand-cream/70 backdrop-blur-sm"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
