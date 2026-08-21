import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Link2, SlidersHorizontal } from "lucide-react";

const BENEFICIOS = [
  "Cadastre produtos, categorias, adicionais e combos",
  "Altere preços, fotos e disponibilidade quando quiser",
  "Oculte itens esgotados e publique novamente em segundos",
  "Crie promoções sem depender de suporte técnico",
];

/**
 * O vídeo é o fundo da seção inteira.
 *
 * Medições que sustentam essa escolha:
 *   - o terço esquerdo do quadro (x < 0,34) é preto em todo o vídeo, então ele
 *     mesmo já reserva o vazio onde entra o texto;
 *   - os cantos vão de 16 a 99 de luminância, ou seja, o fundo é iluminado:
 *     blend screen levantaria um retângulo, então aqui é composição normal;
 *   - o assunto vive em x 0,57–0,93; com 73% de object-position a janela
 *     visível fica em 0,165–0,939, então ele aparece inteiro.
 *
 * Como painel recortado, as bordas do quadro apareciam como faixas. Ocupando a
 * seção toda, o que arremata são véus na cor do fundo — sem linha nenhuma.
 *
 * A versão navegável desta tela continua em CardapioMock.tsx.
 */
/**
 * O vídeo só é montado a partir de 1024px.
 *
 * No celular ele entrava a 22% de opacidade, ou seja: 9,3 MB de download em
 * 4G para produzir um brilho quente de fundo. O mesmo efeito sai de um
 * gradiente, que custa zero byte. Esconder por CSS não resolveria — o
 * navegador baixa o arquivo do mesmo jeito —, por isso a decisão é de
 * montagem, não de estilo.
 */
function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const aplicar = () => setDesktop(mq.matches);
    aplicar();
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, []);
  return desktop;
}

function Palco() {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* a folga de 10% na altura é o que permite o parallax sem abrir buraco */
  const deriva = useTransform(scrollYProgress, [0, 1], ["2.5%", "-2.5%"]);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* luz do produto — no celular é ela que faz todo o trabalho */}
      <div className="absolute inset-y-0 -left-1/4 right-0 bg-[radial-gradient(ellipse_at_62%_50%,rgba(255,120,20,.22),transparent_68%)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_72%_100%,rgba(255,138,0,.16),transparent_62%)] lg:hidden" />

      {desktop && (
        <motion.video
          style={{ y: deriva, objectPosition: "73% 50%" }}
          src="/videos/cardapio-cinematografico.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute -top-[6%] left-0 h-[112%] w-full object-cover"
        />
      )}

      {/* véu do texto: no celular cobre tudo; no desktop libera a cena à direita */}
      <div className="absolute inset-0 bg-night-900/40 lg:bg-[linear-gradient(to_right,#0A0806_0%,rgba(10,8,6,.96)_28%,rgba(10,8,6,.7)_44%,rgba(10,8,6,.2)_60%,transparent_74%)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-night-900 via-night-900/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night-900 via-night-900/60 to-transparent" />
    </div>
  );
}

export default function ResponsiveProof() {
  return (
    <section
      id="cardapio-autonomo"
      aria-label="Autonomia total para gerenciar o cardápio digital"
      className="relative w-full overflow-hidden border-y border-white/[0.06] bg-night-900 py-16 lg:py-20"
    >
      <Palco />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="lg:max-w-[54%]">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group inline-flex cursor-default items-center gap-2.5 rounded-full border border-brand-orange/45 px-4 py-2 transition-all duration-500 hover:border-brand-orange hover:bg-brand-orange/10 hover:shadow-[0_0_28px_-6px_rgba(255,138,0,.7)]"
          >
            <SlidersHorizontal
              className="h-[15px] w-[15px] text-brand-orange transition-transform duration-500 group-hover:rotate-90"
              strokeWidth={2}
            />
            <span className="text-[12px] font-bold uppercase tracking-[.12em] text-brand-orange">
              Autonomia total no cardápio
            </span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-[36px] font-bold leading-[1.06] tracking-[-.035em] text-white sm:text-[44px] xl:text-[50px]"
          >
            Seu cardápio.
            <br />
            Suas regras.
            <br />
            <span className="text-brand-orange">Sem depender de ninguém.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-6 max-w-[500px] text-[15px] leading-[1.7] text-white/60"
          >
            Você mesmo cria e gerencia o cardápio digital dentro do FoodFy.
            Atualize produtos, preços e promoções na hora, com liberdade para
            acompanhar o ritmo da sua operação.
          </motion.p>

          <div className="mt-9 grid max-w-[620px] gap-3 sm:grid-cols-2">
            {BENEFICIOS.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.06 * i }}
                className="group flex items-start gap-3 rounded-2xl border border-white/[0.09] bg-night-900/70 p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-orange/45 hover:bg-white/[0.06] hover:shadow-[0_16px_40px_-24px_rgba(255,138,0,.8)]"
              >
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-orange transition-transform duration-500 group-hover:scale-110">
                  <Check className="h-4 w-4 text-night-900" strokeWidth={3.2} />
                </span>
                <span className="text-[13.5px] leading-[1.45] text-white/80 transition-colors duration-500 group-hover:text-white">
                  {b}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group mt-9 flex items-start gap-4"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-orange/50 transition-all duration-500 group-hover:border-brand-orange group-hover:bg-brand-orange/10 group-hover:shadow-[0_0_26px_-6px_rgba(255,138,0,.8)]">
              <Link2
                className="h-[18px] w-[18px] text-brand-orange transition-transform duration-500 group-hover:-rotate-45"
                strokeWidth={2}
              />
            </span>
            <div>
              <p className="text-[17px] font-bold text-white">
                Você altera aqui. Seu cliente vê lá.
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-white/50">
                As alterações aparecem no cardápio responsivo acessado por link
                ou QR Code.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
