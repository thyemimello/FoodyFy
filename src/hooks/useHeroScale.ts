import { useEffect, useState } from "react";

/** Largura e altura de referência da composição da hero (print original). */
const DESIGN_W = 1600;
const COMPOSITION_H = 680;
/** Espaço tomado por header, respiros e indicador de scroll. */
const CHROME_H = 190;

/**
 * A hero é desenhada uma vez, em 1600px, e escalada de forma contínua para
 * caber na tela — considerando largura E altura, para manter a mesma
 * proporção entre logo central, órbita e tipografia em qualquer monitor.
 * Abaixo de 1280px a órbita dá lugar à faixa horizontal de segmentos.
 */
export function useHeroScale() {
  const [state, setState] = useState({ scale: 1, orbit: true });

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 1280) return { scale: w >= 640 ? 0.86 : 0.68, orbit: false };
      const raw = Math.min(w / DESIGN_W, (h - CHROME_H) / COMPOSITION_H);
      return { scale: Math.max(0.62, Math.min(1.12, raw)), orbit: true };
    };
    const apply = () => setState(compute());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  return state;
}
