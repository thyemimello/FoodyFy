import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Modules from "./components/Modules";
import ResponsiveProof from "./components/ResponsiveProof";
import Showcase from "./components/Showcase";
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
        <Modules />
        <ResponsiveProof />
        <Showcase />
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
