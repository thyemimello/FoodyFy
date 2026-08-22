import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ResponsiveProof from "./components/ResponsiveProof";
import Showcase from "./components/Showcase";
import { Fiscal, NotasFiscais, Pagamentos, Salao } from "./components/Operacao";
import Segments from "./components/Segments";
import Pricing from "./components/Pricing";
import { Cta, Faq, Footer, HowItWorks } from "./components/Closing";
import { LoginModal } from "./components/Modals";

export default function App() {
  const [login, setLogin] = useState(false);

  return (
    <div className="relative">
      <Header onLogin={() => setLogin(true)} />
      <main>
        <Hero />
        {/* Fluxo comercial: como o dia funciona, quem atende, o que o cliente
            vê, como você recebe, como você declara, para quem serve. Operação,
            depois dinheiro, depois obrigação legal, depois prova de encaixe.
            "Soluções" saiu daqui: virou redundante com a jornada do pedido. */}
        <Showcase />
        <Salao />
        <ResponsiveProof />
        <Pagamentos />
        <NotasFiscais />
        <Fiscal />
        <Segments />
        <HowItWorks />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <LoginModal open={login} onClose={() => setLogin(false)} />
    </div>
  );
}
