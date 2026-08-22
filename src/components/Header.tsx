import { useEffect, useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV = [
  { label: "Como funciona", href: "#recursos" },
  { label: "Recursos", href: "#recursos" },
  { label: "Preços", href: "#precos" },
  { label: "Clientes", href: "#clientes" },
  { label: "Sobre", href: "#sobre" },
];

export default function Header({ onLogin }: { onLogin: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-brand-sand/[0.11] bg-[#15100D]/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-6 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-[15px] font-medium text-brand-cream/75 transition-colors hover:text-brand-cream"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-brand-orange to-brand-red transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLogin}
            className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-medium text-brand-cream/80 transition-colors hover:text-brand-orange sm:inline-flex"
          >
            <LogIn className="h-[17px] w-[17px]" />
            Entrar
          </button>
          <a
            href="#contato"
            className="hidden rounded-full border border-brand-orange/45 bg-brand-orange/[0.07] px-6 py-3 text-[14.5px] font-medium text-brand-cream backdrop-blur-md transition-all duration-300 hover:border-brand-orange hover:bg-brand-orange/15 hover:shadow-glow-sm md:block"
          >
            Fale com um especialista
          </a>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-sand/[0.16] bg-[#8B5E3C]/[0.10] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* menu mobile */}
      <div
        className={`overflow-hidden bg-[#15100D]/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-5">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-[16px] text-brand-cream/80 transition-colors hover:bg-[#8B5E3C]/[0.13] hover:text-brand-cream"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onLogin();
            }}
            className="mt-2 flex items-center justify-center gap-2 rounded-full border border-brand-orange/45 px-5 py-3 text-[15px] font-medium text-brand-cream"
          >
            <LogIn className="h-4 w-4" /> Entrar no sistema
          </button>
        </nav>
      </div>
    </header>
  );
}
