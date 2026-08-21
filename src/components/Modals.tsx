import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import { FoodfyMark } from "./Logo";

/** URL do ERP — trocar quando a integração de login for ligada. */
export const ERP_LOGIN_URL = "https://app.foodfy.club/login";

function Shell({
  open,
  onClose,
  children,
  maxWidth = "max-w-[440px]",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            className={`relative w-full ${maxWidth}`}
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-brand-cream/80 backdrop-blur-md transition-colors hover:text-brand-cream"
            >
              <X className="h-5 w-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [show, setShow] = useState(false);

  return (
    <Shell open={open} onClose={onClose}>
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-night-800/95 p-9 shadow-card backdrop-blur-2xl">
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand-orange/25 blur-[70px]" />

        <div className="relative">
          <FoodfyMark className="h-11 w-11" />
          <h3 className="mt-5 text-[26px] font-bold leading-tight text-brand-cream">
            Acessar o FoodFy
          </h3>
          <p className="mt-2 text-[14.5px] text-brand-cream/55">
            Entre com os dados da sua loja para abrir o painel de gestão.
          </p>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = ERP_LOGIN_URL;
            }}
          >
            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-brand-cream/70">
                E-mail
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-black/30 px-4 transition-colors focus-within:border-brand-orange/70">
                <Mail className="h-[18px] w-[18px] text-brand-cream/40" />
                <input
                  type="email"
                  required
                  placeholder="voce@sualoja.com.br"
                  className="w-full bg-transparent py-3.5 text-[15px] text-brand-cream placeholder:text-brand-cream/30 focus:outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-brand-cream/70">
                Senha
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-black/30 px-4 transition-colors focus-within:border-brand-orange/70">
                <Lock className="h-[18px] w-[18px] text-brand-cream/40" />
                <input
                  type={show ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent py-3.5 text-[15px] text-brand-cream placeholder:text-brand-cream/30 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                  className="text-brand-cream/40 transition-colors hover:text-brand-cream/80"
                >
                  {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between pt-1 text-[13.5px]">
              <label className="flex cursor-pointer items-center gap-2 text-brand-cream/60">
                <input type="checkbox" className="accent-brand-orange" />
                Manter conectado
              </label>
              <a href="#" className="text-brand-orange hover:underline">
                Esqueci minha senha
              </a>
            </div>

            <button type="submit" className="btn-primary mt-2 w-full justify-center">
              Entrar no sistema
              <ArrowRight className="h-[18px] w-[18px]" />
            </button>
          </form>

          <p className="mt-6 text-center text-[13.5px] text-brand-cream/50">
            Ainda não tem conta?{" "}
            <a href="#precos" onClick={onClose} className="font-medium text-brand-orange hover:underline">
              Testar 14 dias grátis
            </a>
          </p>
        </div>
      </div>
    </Shell>
  );
}

export function VideoModal({
  open,
  onClose,
  src = "/videos/abertura.mp4",
}: {
  open: boolean;
  onClose: () => void;
  src?: string;
}) {
  return (
    <Shell open={open} onClose={onClose} maxWidth="max-w-[1000px]">
      <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-card">
        {open && (
          <video
            className="h-auto w-full"
            src={src}
            autoPlay
            controls
            playsInline
          />
        )}
      </div>
    </Shell>
  );
}
