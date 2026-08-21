import { useCallback, useEffect, useRef, useState } from "react";

/** Duração do dissolve entre o fim de um ciclo e o começo do próximo. */
const FADE_S = 0.8;

type Props = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  onReady?: () => void;
};

/**
 * Reprodução em loop sem corte no recomeço.
 *
 * O arquivo é um vídeo de encerramento: termina com a marca montada, num quadro
 * bem diferente do primeiro. Com `loop` nativo isso vira um salto seco a cada
 * volta. Aqui rodam dois elementos sobrepostos: quando o da frente chega aos
 * últimos FADE_S segundos, o de trás recomeça do zero e os dois trocam de
 * opacidade — o fim dissolve no começo em vez de cortar.
 */
export default function LogoLoopVideo({ src, className, style, onReady }: Props) {
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);
  const [front, setFront] = useState(0);
  const trocando = useRef(false);

  const doFront = useCallback(() => (front === 0 ? a : b).current, [front]);
  const doFundo = useCallback(() => (front === 0 ? b : a).current, [front]);

  useEffect(() => {
    trocando.current = false;
    const atual = doFront();
    const outro = doFundo();
    if (!atual || !outro) return;

    const trocar = () => {
      if (trocando.current) return;
      trocando.current = true;
      outro.currentTime = 0;
      outro.play().catch(() => {});
      setFront((f) => 1 - f);
    };

    const aoAvancar = () => {
      if (trocando.current || !Number.isFinite(atual.duration)) return;
      if (atual.duration - atual.currentTime <= FADE_S) trocar();
    };

    atual.play().catch(() => {});
    atual.addEventListener("timeupdate", aoAvancar);
    // rede de segurança: se o timeupdate não chegar a tempo (aba oculta,
    // throttling), a troca acontece no fim em vez de congelar no último quadro
    atual.addEventListener("ended", trocar);

    return () => {
      atual.removeEventListener("timeupdate", aoAvancar);
      atual.removeEventListener("ended", trocar);
    };
  }, [front, doFront, doFundo]);

  // ao voltar para a aba, o navegador deixa o vídeo pausado
  useEffect(() => {
    const aoVoltar = () => {
      if (!document.hidden) doFront()?.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", aoVoltar);
    return () => document.removeEventListener("visibilitychange", aoVoltar);
  }, [doFront]);

  const comum =
    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none transition-opacity ease-linear";

  return (
    <>
      {/*
        O MP4 tem fundo creme opaco, sem canal alfa. Este filtro reescreve as
        cores do vídeo para a paleta da marca e apaga o fundo:

        1. inverte  — o creme vira escuro, o texto marrom vira claro
        2. troca R↔B — o azulado da inversão cai exatamente no laranja/creme
                       do Foodfy (medido: laranja #FF8B00, texto #FFF6DB)
        3. alfa pela luminância — o que ficou escuro (o fundo) some; o que
                       ficou claro (a marca) permanece

        color-interpolation-filters precisa ser sRGB: no padrão (linearRGB)
        as contas acima não batem.
      */}
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
        <defs>
          <filter id="foodfy-key" colorInterpolationFilters="sRGB">
            <feComponentTransfer result="invertido">
              <feFuncR type="table" tableValues="1 0" />
              <feFuncG type="table" tableValues="1 0" />
              <feFuncB type="table" tableValues="1 0" />
            </feComponentTransfer>
            <feColorMatrix
              in="invertido"
              type="matrix"
              values="0 0 1 0 0
                      0 1 0 0 0
                      1 0 0 0 0
                      0 0 0 1 0"
              result="marca"
            />
            <feColorMatrix in="marca" type="luminanceToAlpha" result="luz" />
            <feComponentTransfer in="luz" result="recorte">
              <feFuncA type="table" tableValues="0 0 0 0 0.02 0.35 0.85 1 1 1 1" />
            </feComponentTransfer>
            <feComposite in="marca" in2="recorte" operator="in" />
          </filter>
        </defs>
      </svg>

      {[a, b].map((ref, i) => (
        <video
          key={i}
          ref={ref}
          src={src}
          muted
          playsInline
          preload="auto"
          autoPlay={i === 0}
          onLoadedData={i === 0 ? onReady : undefined}
          className={`${comum} ${className ?? ""}`}
          style={{
            ...style,
            opacity: front === i ? 1 : 0,
            transitionDuration: `${FADE_S}s`,
          }}
        />
      ))}
    </>
  );
}
