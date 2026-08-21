import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link2, SlidersHorizontal } from "lucide-react";

const BENEFICIOS = [
  { numero: "01", titulo: "Monte do seu jeito", texto: "Produtos, categorias, adicionais e combos." },
  { numero: "02", titulo: "Atualize na hora", texto: "Preço, foto e disponibilidade sem esperar suporte." },
  { numero: "03", titulo: "Controle o que aparece", texto: "Esgotou? Oculte e publique novamente em segundos." },
  { numero: "04", titulo: "Crie suas promoções", texto: "Faça alterações quando sua operação precisar." },
];

export default function ResponsiveProof() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [carregarVideo, setCarregarVideo] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(min-width: 1024px)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCarregarVideo(true);
          videoRef.current?.play().catch(() => undefined);
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "320px 0px", threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="responsive-title"
      className="relative flex min-h-[900px] items-center overflow-hidden border-y border-white/[0.06] bg-night-900 py-32 lg:block lg:min-h-0 lg:py-0"
    >
      <img
        src="/cardapio-autonomia-desktop.png"
        alt="Autonomia total para criar, atualizar e publicar o cardápio digital FoodFy"
        className="relative z-10 hidden h-auto w-full lg:block"
      />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-[72%_center] opacity-60 brightness-75 saturate-[.72] contrast-90 lg:hidden"
        style={{ WebkitMaskImage: "linear-gradient(to left, #000 42%, rgba(0,0,0,.78) 62%, transparent 92%)", maskImage: "linear-gradient(to left, #000 42%, rgba(0,0,0,.78) 62%, transparent 92%)" }}
        src={carregarVideo ? "/videos/cardapio-responsivo.mp4" : undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-label="Demonstração da criação e gestão autônoma do cardápio digital FoodFy"
      >
        Seu navegador não suporta vídeo. Conheça a gestão autônoma do cardápio digital FoodFy.
      </video>

      <div className="pointer-events-none absolute inset-0 bg-night-800/45 lg:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,8,1)_0%,rgba(13,10,8,.99)_34%,rgba(20,16,16,.82)_57%,rgba(28,18,10,.34)_82%,rgba(13,10,8,.48)_100%)] lg:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,8,.68),transparent_24%,transparent_68%,rgba(8,6,5,.9))] lg:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_44%,rgba(255,138,0,.09),transparent_42%)] mix-blend-screen lg:hidden" />
      <div className="pointer-events-none absolute left-[8%] top-1/2 h-[460px] w-[620px] -translate-y-1/2 rounded-full bg-black/55 blur-[100px] lg:hidden" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay lg:hidden" />

      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 lg:hidden lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[760px]"
        >
          <span className="section-eyebrow">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Autonomia total no cardápio
          </span>
          <h2 id="responsive-title" className="mt-6 max-w-[720px] text-[42px] font-bold leading-[1.06] tracking-tight text-brand-cream drop-shadow-[0_3px_18px_rgba(0,0,0,.9)] sm:text-[50px] lg:text-[58px]">
            Seu cardápio.<br />Suas regras.<br /><span className="text-brand-orange">Sem depender de ninguém.</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[17px] leading-relaxed text-brand-cream/75 drop-shadow-[0_2px_8px_rgba(0,0,0,.9)]">
            Você mesmo cria e gerencia o cardápio digital dentro do FoodFy. Atualize produtos, preços e promoções na hora, com liberdade para acompanhar o ritmo da sua operação.
          </p>

          <ol className="mt-10 grid max-w-[780px] gap-3 sm:grid-cols-2">
            {BENEFICIOS.map((beneficio, index) => (
              <motion.li
                key={beneficio.numero}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 + index * 0.08 }}
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-night-900/55 p-4 text-left backdrop-blur-md transition-all duration-300 hover:translate-x-1 hover:border-brand-orange/55 hover:bg-night-900/75"
              >
                <span className="mt-0.5 text-[11px] font-bold tracking-wider text-brand-orange">
                  {beneficio.numero}
                </span>
                <span>
                  <strong className="block text-[15px] font-semibold text-brand-cream">{beneficio.titulo}</strong>
                  <span className="mt-1 block text-[13px] leading-relaxed text-brand-cream/55">{beneficio.texto}</span>
                </span>
              </motion.li>
            ))}
          </ol>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, delay: .25 }}
          className="mt-12 flex max-w-[780px] items-center gap-4 border-t border-white/10 pt-7 text-left"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-brand-orange/60 bg-brand-orange/10 text-brand-orange shadow-glow-sm">
            <Link2 className="h-6 w-6" />
          </span>
          <div>
            <p className="text-[24px] font-semibold leading-tight text-brand-cream sm:text-[29px]">Você altera aqui. <span className="text-brand-orange">Seu cliente vê lá.</span></p>
            <p className="mt-2 text-[13.5px] text-brand-cream/55">As alterações são publicadas instantaneamente no cardápio acessado por link ou QR Code.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
