import { FoodfyMark } from "./Logo";

/**
 * Marca em vetor no miolo do disco.
 *
 * Fica atrás do vídeo da logo e só aparece enquanto ele carrega — ou de vez,
 * se o vídeo for bloqueado pelo navegador. Assim a bola nunca fica vazia.
 */
export default function FoodfyCore() {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center rounded-full">
      <div className="flex flex-col items-center">
        <FoodfyMark className="h-[108px] w-[108px] drop-shadow-[0_0_30px_rgba(255,138,0,.45)]" />
        <span className="mt-4 whitespace-nowrap text-[50px] font-bold leading-none tracking-tight">
          <span className="text-brand-cream">FoodFy</span>
          <span className="text-brand-orange">.club</span>
        </span>
      </div>
    </div>
  );
}
