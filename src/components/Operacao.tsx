import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  FileCheck2,
  FileText,
  Inbox,
  Landmark,
  Printer,
  QrCode,
  UserCog,
  Receipt,
  ScrollText,
  ShieldCheck,
  Send,
  ShoppingCart,
  Smartphone,
  Split,
  Tablet,
  Users,
  WifiOff,
  Truck,
  Zap,
} from "lucide-react";

/* Movimento e espaçamento seguem o mesmo padrão do resto da página:
   entrada de 12px, 0,55s, sem cascata. */
const ENTRADA = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

type Item = { icon: typeof QrCode; titulo: string; texto: string };

function Cartao({ item }: { item: Item }) {
  return (
    <motion.div
      {...ENTRADA}
      className="group relative overflow-hidden rounded-[22px] border border-brand-sand/[0.11] bg-[#8B5E3C]/[0.08] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange/35 hover:bg-[#8B5E3C]/[0.14] sm:p-6"
    >
      <div className="flex items-center gap-3 sm:block">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-brand-sand/[0.14] bg-gradient-to-br from-[#8B5E3C]/30 to-[#8B5E3C]/10 sm:h-12 sm:w-12">
          <item.icon className="h-5 w-5 text-brand-sand" strokeWidth={1.6} />
        </span>
        <h3 className="text-[17px] font-semibold text-brand-cream sm:mt-5 sm:text-[19px]">
          {item.titulo}
        </h3>
      </div>
      <p className="mt-2 text-[13.5px] leading-relaxed text-brand-cream/55 sm:mt-2.5 sm:text-[14.5px]">
        {item.texto}
      </p>
    </motion.div>
  );
}

function Cabecalho({
  selo,
  titulo,
  destaque,
  texto,
}: {
  selo: string;
  titulo: string;
  destaque: string;
  texto: string;
}) {
  return (
    <div className="mx-auto max-w-[760px] text-center">
      <motion.span {...ENTRADA} className="section-eyebrow">
        {selo}
      </motion.span>
      <motion.h2
        {...ENTRADA}
        className="mt-6 text-[34px] font-bold leading-[1.14] tracking-tight text-brand-cream sm:text-[44px]"
      >
        {titulo} <span className="text-gradient-brand">{destaque}</span>
      </motion.h2>
      <motion.p
        {...ENTRADA}
        className="mt-5 text-[16.5px] leading-relaxed text-brand-cream/60"
      >
        {texto}
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Atendimento no salão                                               */
/* ------------------------------------------------------------------ */

const SALAO: Item[] = [
  {
    icon: Smartphone,
    titulo: "Garçom lança pelo celular",
    texto:
      "O pedido é anotado na mesa, no próprio aparelho do garçom, e cai na cozinha na hora.",
  },
  {
    icon: Users,
    titulo: "Mapa de mesas inteligente",
    texto:
      "Veja de relance quem já pediu, quem está esperando e quanto cada mesa consumiu.",
  },
  {
    icon: Tablet,
    titulo: "Cardápio no tablet da mesa",
    texto:
      "O cardápio digital é responsivo: o mesmo link abre em tablet fixo na mesa ou no celular do cliente.",
  },
  {
    icon: Split,
    titulo: "Divisão da conta sem cálculo manual",
    texto:
      "Conta dividida por pessoa ou por item, com taxa de serviço calculada sozinha. O caixa fecha sem fila e sem papel.",
  },
];

/* No desktop, o vídeo ocupa a coluna visual à direita. No mobile, uma segunda
   instância cobre a seção ao fundo com opacidade e um degradê para preservar
   o contraste do conteúdo. */
function TabletMesas() {
  return (
    <div className="group/video relative overflow-hidden rounded-[32px] border border-brand-sand/[0.10] bg-[#0E0A08] shadow-[0_50px_120px_-45px_rgba(0,0,0,1)]">
      {/* luz quente atrás, na altura da tela */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -inset-y-12 opacity-80 transition-opacity duration-700 group-hover/tablet:opacity-100"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_46%_42%,rgba(255,132,30,.30),transparent_70%)] blur-2xl transition-transform duration-700 group-hover/tablet:scale-105" />
      </div>

      {/* sombra de apoio no chão */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[12%] bottom-[6%] h-10 rounded-[50%] bg-black/70 blur-2xl transition-all duration-700 group-hover/tablet:bottom-[3%] group-hover/tablet:opacity-80"
      />

      <motion.video
        {...ENTRADA}
        src="/videos/atendimento-salao.mp4"
        aria-label="FoodFy em uso no atendimento do salão"
        className="relative z-10 block aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover/video:scale-[1.025]"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    </div>
  );
}

export function Salao() {
  return (
    <section
      id="salao"
      className="relative overflow-hidden bg-[#15100D] pb-16 pt-10 sm:pb-20 lg:pb-32 lg:pt-12"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <video
          src="/videos/atendimento-salao.mp4"
          className="hidden h-full w-full object-cover lg:block lg:opacity-75"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
        <img
          src="/tablet-mesas-foodfy.png"
          alt=""
          className="absolute right-[-42%] top-[13%] w-[138%] max-w-none opacity-[.20] mix-blend-screen lg:hidden"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,16,13,.88),rgba(21,16,13,.76)_30%,rgba(21,16,13,.88)_72%,rgba(21,16,13,.98))] lg:bg-[linear-gradient(90deg,rgba(21,16,13,.98)_0%,rgba(21,16,13,.92)_38%,rgba(21,16,13,.48)_72%,rgba(21,16,13,.30)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-[#15100D] via-[#15100D]/95 to-transparent lg:h-[25%]" />
        <div className="absolute right-0 top-0 hidden h-[30%] w-[62%] bg-[radial-gradient(ellipse_at_72%_28%,rgba(21,16,13,.98)_0%,rgba(21,16,13,.94)_32%,rgba(21,16,13,.55)_58%,transparent_78%)] lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#15100D] to-transparent" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* ---------- tablet à esquerda (espelhado da referência) ---------- */}
        <div className="hidden">
          <TabletMesas />
        </div>

        {/* ---------- texto à direita ---------- */}
        <div className="max-w-[620px]">
          <motion.h2
            {...ENTRADA}
            className="text-[36px] font-bold leading-[1.08] tracking-[-.035em] text-brand-cream sm:text-[44px]"
          >
            Do garçom ao caixa,
            <br />
            <span className="text-gradient-brand">sem papel, sem erro.</span>
          </motion.h2>

          <motion.p
            {...ENTRADA}
            className="mt-5 max-w-[480px] text-[15.5px] leading-[1.7] text-brand-cream/60"
          >
            O garçom lança o pedido uma vez. A cozinha recebe na hora e o caixa
            já sabe o que cobrar quando a mesa pedir a conta.
          </motion.p>

          <div className="mt-9 space-y-3">
            {SALAO.map((i) => (
              <motion.div
                key={i.titulo}
                {...ENTRADA}
                className="group relative flex items-start gap-3.5 overflow-hidden rounded-2xl border border-brand-sand/[0.08] bg-[#15100D]/45 p-3.5 backdrop-blur-[2px] transition-all duration-500 hover:border-brand-sand/[0.12] hover:bg-[#8B5E3C]/[0.10] lg:gap-4 lg:border-transparent lg:bg-transparent lg:backdrop-blur-none"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-2 left-0 w-[3px] origin-top scale-y-0 rounded-full bg-gradient-to-b from-brand-orange to-brand-red transition-transform duration-500 group-hover:scale-y-100"
                />
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-sand/[0.14] bg-[#8B5E3C]/[0.14] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-brand-orange/45 group-hover:bg-[#8B5E3C]/[0.24]">
                  <i.icon
                    className="h-5 w-5 text-brand-sand transition-colors duration-500 group-hover:text-brand-orange"
                    strokeWidth={1.7}
                  />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[16.5px] font-semibold leading-tight text-brand-cream">
                    {i.titulo}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-brand-cream/55">
                    {i.texto}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pagamentos                                                         */
/* ------------------------------------------------------------------ */

const PAGAMENTOS: Item[] = [
  {
    icon: QrCode,
    titulo: "Pix na hora",
    texto:
      "Cobrança por Pix direto na venda, com a baixa acontecendo no caixa assim que o pagamento cai.",
  },
  {
    icon: CreditCard,
    titulo: "Crédito, débito e voucher",
    texto:
      "Cartão integrado à venda, incluindo parcelamento e vale-refeição, sem digitar o valor duas vezes na maquininha.",
  },
  {
    icon: Banknote,
    titulo: "Dinheiro, sangria e troco",
    texto:
      "Abertura de caixa, suprimento, sangria e fechamento de turno com a diferença apontada na hora, não no dia seguinte.",
  },
  {
    icon: Split,
    titulo: "Pagamento dividido",
    texto:
      "Uma conta paga em várias formas ao mesmo tempo: parte no Pix, parte no cartão, parte em dinheiro.",
  },
  {
    icon: ScrollText,
    titulo: "Fiado e conta de cliente",
    texto:
      "Controle de fiado por cliente, com histórico e limite, para o freguês de todo dia que fecha no fim do mês.",
  },
  {
    icon: Landmark,
    titulo: "Conciliação bancária",
    texto:
      "O que entrou no caixa é confrontado com o extrato do banco, então o fluxo de caixa reflete dinheiro de verdade.",
  },
];

export function Pagamentos() {
  return (
    <section
      id="pagamentos"
      className="relative overflow-hidden bg-[#15100D] py-16 sm:py-20 lg:py-32"
    >
      <div className="relative mx-auto max-w-[1240px] px-6">
        <Cabecalho
          selo="Pagamentos"
          titulo="Receba de todo jeito."
          destaque="Confira tudo no mesmo caixa."
          texto="Pix, cartão, dinheiro, voucher e fiado ficam registrados na própria venda. No fechamento, você vê quanto deveria ter entrado em cada forma de pagamento."
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {PAGAMENTOS.map((i) => (
            <Cartao key={i.titulo} item={i} />
          ))}
        </div>

        <motion.p
          {...ENTRADA}
          className="mx-auto mt-10 max-w-[620px] text-center text-[14px] leading-relaxed text-brand-cream/45"
        >
          A forma de pagamento fica gravada na venda, então o relatório mostra
          quanto entrou por Pix, por cartão e por dinheiro em cada turno.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Nota fiscal                                                        */
/* ------------------------------------------------------------------ */

/* Dono de restaurante costuma não saber qual documento emitir em cada venda,
   e essa dúvida trava a compra. Por isso os dois aparecem lado a lado, com o
   critério de uso na primeira linha, e não como dois itens de uma lista. */
const DOCUMENTOS = [
  {
    sigla: "NFC-e",
    nome: "Consumidor final",
    icon: Receipt,
    pontos: [
      "Venda no balcão, na mesa e no delivery",
      "Emissão automática vinculada à venda",
      "DANFE NFC-e impresso ou enviado ao cliente",
    ],
  },
  {
    sigla: "NF-e",
    nome: "Destinatário identificado",
    icon: FileText,
    pontos: [
      "Operações com empresas e outras finalidades fiscais",
      "CFOP e tributação conforme a operação",
      "DANFE e XML da NF-e gerados no sistema",
    ],
  },
];

const FLUXO = [
  { icon: ShoppingCart, linha1: "Venda", linha2: "concluída" },
  { icon: ScrollText, linha1: "Documento", linha2: "fiscal gerado" },
  { icon: Send, linha1: "Enviado", linha2: "ao cliente" },
];

/* Avisos que ficam por cima do canto inferior da tela. Nenhum inventa
   número: os três são comportamentos que o emissor tem. */
const AVISOS = [
  { icon: ShieldCheck, titulo: "Autorizada pela SEFAZ", apoio: "Emissão junto com a venda" },
  { icon: Printer, titulo: "DANFE impresso ou enviado", apoio: "Térmica ou link para o cliente" },
  { icon: WifiOff, titulo: "Contingência automática", apoio: "Venda segue mesmo sem internet" },
];

/**
 * Monitor desenhado em código, com o print dentro.
 *
 * A moldura, o pescoço e a base são CSS: continuam nítidos em qualquer
 * densidade, não pesam nada em disco e deixam trocar o print sem refazer
 * arte. O giro fica num nó separado do que o framer anima, senão a entrada
 * apagaria a perspectiva.
 *
 * O print tem 1720px e entra numa tela de ~670px. Mostrado inteiro, a
 * interface viraria borrão, então a tela enquadra a região do modal de
 * emissão: 1150px do original em vez dos 1720, o que quase dobra a escala
 * do que aparece. As medidas do recorte vêm de leitura do arquivo, não de
 * palpite — o modal ocupa x 349..1372 e y 352..957.
 */
function TelaFiscal() {
  return (
    <div className="group/tela relative mx-auto w-full max-w-[760px] xl:mx-0 xl:w-[116%] xl:max-w-none xl:origin-left">
      <motion.div {...ENTRADA} className="relative">
        <div className="origin-center [transform:perspective(1800px)_rotateY(-3deg)_rotateX(1deg)] transition-transform duration-700 ease-out xl:[transform:perspective(2400px)_rotateY(-7deg)_rotateX(1.5deg)] xl:group-hover/tela:[transform:perspective(2400px)_rotateY(-4deg)_rotateX(.5deg)]">
          {/* ---------- corpo ---------- */}
          <div className="relative rounded-[18px] border border-white/[0.10] bg-[linear-gradient(145deg,#5A5551_0%,#292522_18%,#161310_72%,#34302C_100%)] p-[7px] pb-[16px] shadow-[0_55px_110px_-32px_rgba(0,0,0,1),inset_0_1px_1px_rgba(255,255,255,.16),inset_0_-2px_5px_rgba(0,0,0,.8)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[1px] rounded-[17px] bg-[linear-gradient(118deg,rgba(255,255,255,.18),transparent_18%,transparent_78%,rgba(255,255,255,.05))]"
            />

            <figure className="relative aspect-[1.48/1] overflow-hidden rounded-[10px] border border-black/80 bg-black shadow-[inset_0_0_22px_rgba(0,0,0,.95)]">
              <img
                src="/prints/nfce.png"
                alt="Tela de emissão de NFC-e no FoodFy: o sistema puxa a venda já fechada e gera o cupom fiscal a partir dela"
                className="absolute left-[-24.8%] top-[-31.4%] w-[149.6%] max-w-none brightness-[.52] contrast-[1.12] saturate-[.78]"
                loading="lazy"
              />
              {/* reflexo do vidro */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(108deg,rgba(255,255,255,.12),transparent_26%,transparent_72%,rgba(255,255,255,.025))]"
              />
            </figure>

            {/* marca no queixo */}
            <span
              aria-hidden="true"
              className="absolute bottom-[5px] left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-white/[0.10] shadow-[0_1px_0_rgba(0,0,0,.8)]"
            />
          </div>

          {/* ---------- pescoço e base ---------- */}
          <div
            aria-hidden="true"
            className="relative mx-auto h-[82px] w-[10%] bg-[linear-gradient(100deg,#171411_0%,#4C4742_42%,#26221F_70%,#100E0C_100%)] shadow-[8px_18px_28px_-12px_rgba(0,0,0,.9)]"
            style={{ clipPath: "polygon(30% 0, 76% 0, 92% 100%, 5% 100%)" }}
          />
          <div
            aria-hidden="true"
            className="relative mx-auto h-[17px] w-[36%] -translate-y-0.5 rounded-[50%] border-t border-white/[0.10] bg-[linear-gradient(180deg,#49443F_0%,#211E1B_42%,#0D0B0A_100%)] shadow-[0_28px_42px_-12px_rgba(0,0,0,1),0_7px_20px_-8px_rgba(255,125,20,.25)]"
          />
        </div>
      </motion.div>

      {/* ---------- avisos, retos, sobre o canto inferior ---------- */}
      <div className="mt-5 space-y-3 xl:absolute xl:bottom-[5%] xl:right-[-2%] xl:z-10 xl:mt-0 xl:w-[55%]">
        {AVISOS.map((a, i) => (
          <motion.div
            key={a.titulo}
            {...ENTRADA}
            transition={{ ...ENTRADA.transition, delay: 0.08 * i }}
            className={`flex items-center gap-3.5 rounded-2xl border border-brand-orange/25 bg-[#1B1511]/95 px-4 py-3 shadow-[0_30px_60px_-24px_rgba(0,0,0,1)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange/50 ${
              ["", "xl:-ml-2.5 xl:mr-2.5", "xl:-ml-5 xl:mr-5"][i]
            }`}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-orange to-brand-red shadow-[0_10px_22px_-10px_rgba(255,120,20,.9)]">
              <a.icon className="h-[18px] w-[18px] text-white" strokeWidth={1.9} />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[14px] font-semibold text-brand-cream">
                {a.titulo}
              </span>
              <span className="mt-0.5 block truncate text-[12px] text-brand-cream/50">
                {a.apoio}
              </span>
            </span>
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function NotasFiscais() {
  return (
    <section
      id="notas-fiscais"
      className="relative overflow-hidden bg-[#0D0A08] py-16 sm:py-20 lg:min-h-[900px] lg:py-24"
    >
      {/* a luz vem do lado dos telas, como se as telas iluminassem a seção */}
      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="grid items-center gap-14 xl:grid-cols-[minmax(500px,.82fr)_minmax(0,1.18fr)] xl:gap-5">
          {/* ---------------- coluna de texto ---------------- */}
          <div>
            <motion.span
              {...ENTRADA}
              className="inline-flex rounded-full border border-brand-orange/45 px-4 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.18em] text-brand-orange"
            >
              Nota fiscal
            </motion.span>

            <motion.h2
              {...ENTRADA}
              className="mt-6 text-[36px] font-bold leading-[1.04] tracking-[-.04em] text-brand-cream sm:text-[52px] xl:text-[56px]"
            >
              A nota que sai
              <br />
              <span className="text-gradient-brand">acompanha a venda.</span>
            </motion.h2>

            <motion.p
              {...ENTRADA}
              className="mt-7 max-w-[520px] text-[16px] leading-[1.7] text-brand-cream/60 sm:text-[17px]"
            >
              Emissão de NFC-e e NF-e dentro do próprio sistema, com o seu
              certificado digital A1. Sem emissor separado, sem digitar a mesma
              venda duas vezes.
            </motion.p>

            {/* ---------------- os dois documentos ---------------- */}
            <div className="mt-9 grid max-w-[590px] gap-4 sm:grid-cols-2">
              {DOCUMENTOS.map((d) => (
                <motion.article
                  key={d.sigla}
                  {...ENTRADA}
                  className="group rounded-[22px] border border-brand-sand/[0.12] bg-[#8B5E3C]/[0.08] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange/35 hover:bg-[#8B5E3C]/[0.14]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-gradient-to-br from-brand-orange to-brand-red shadow-[0_10px_26px_-10px_rgba(255,120,20,.9)] transition-transform duration-500 group-hover:scale-105">
                    <d.icon
                      className="h-[22px] w-[22px] text-white"
                      strokeWidth={1.9}
                    />
                  </span>

                  <h3 className="mt-4 text-[24px] font-bold leading-none tracking-tight text-brand-cream">
                    {d.sigla}
                  </h3>
                  <p className="mt-1.5 text-[13px] text-brand-cream/45">
                    {d.nome}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {d.pontos.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <span className="mt-[2px] grid h-[17px] w-[17px] shrink-0 place-items-center rounded-full border border-brand-orange/50 bg-brand-orange/15">
                          <Check
                            className="h-2.5 w-2.5 text-brand-orange"
                            strokeWidth={3.5}
                          />
                        </span>
                        <span className="text-[13px] leading-snug text-brand-cream/65">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>

            {/* ---------------- o caminho da nota ---------------- */}
            <motion.ol
              {...ENTRADA}
              className="mt-6 flex max-w-[590px] flex-col gap-3.5 rounded-[22px] border border-brand-orange/25 bg-[linear-gradient(100deg,rgba(255,120,20,.10),rgba(139,94,60,.08))] px-4 py-4 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between sm:gap-x-2 sm:gap-y-4"
            >
              {FLUXO.map((f, i) => (
                <li key={f.linha1} className="flex items-center gap-3">
                  {i > 0 && (
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 rotate-90 text-brand-orange/55 sm:rotate-0"
                      strokeWidth={2}
                    />
                  )}
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-orange/35 bg-brand-orange/[0.14]">
                    <f.icon
                      className="h-[18px] w-[18px] text-brand-orange"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="text-[13.5px] font-semibold leading-[1.25] text-brand-cream">
                    {f.linha1}
                    <br />
                    <span className="font-normal text-brand-cream/55">
                      {f.linha2}
                    </span>
                  </span>
                </li>
              ))}
            </motion.ol>

          </div>

          {/* ---------------- os dois telas ---------------- */}
          {/* No desktop eles sangram para fora da coluna e o overflow da seção
              corta — é o que dá a sensação de tela grande. No mobile viram
              duas imagens empilhadas, sem perspectiva e sem sobreposição. */}
          <TelaFiscal />
        </div>

        {/* ---------------- o que sustenta a emissão ---------------- */}
        <div className="hidden">
          {[
            {
              icon: WifiOff,
              titulo: "Contingência offline",
              texto:
                "Se a internet ou a SEFAZ cair, a venda continua e a nota entra em contingência. Quando volta, o sistema transmite o que ficou parado.",
            },
            {
              icon: Zap,
              titulo: "Certificado A1 no sistema",
              texto:
                "Você configura o certificado digital uma vez e a emissão passa a acontecer sozinha, sem token e sem máquina dedicada.",
            },
          ].map((i) => (
            <Cartao key={i.titulo} item={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Nota que entra — MD-e                                              */
/* ------------------------------------------------------------------ */

/* Os quatro eventos são os da SEFAZ, com os códigos que o ERP usa em
   _MANIFESTO_TIPO_PARA_OPERACAO (nfe_manager.py:714). Manter o código junto do
   rótulo evita que a página descreva um fluxo que o sistema não faz. */
const MANIFESTOS = [
  {
    codigo: "210210",
    rotulo: "Ciência da operação",
    texto: "Você viu a nota, mas ainda não conferiu a mercadoria.",
  },
  {
    codigo: "210200",
    rotulo: "Confirmação da operação",
    texto: "A mercadoria chegou e confere com a nota.",
  },
  {
    codigo: "210220",
    rotulo: "Desconhecimento",
    texto: "Essa nota não é sua. Alguém emitiu contra o seu CNPJ.",
  },
  {
    codigo: "210240",
    rotulo: "Operação não realizada",
    texto: "A nota é sua, mas a compra não aconteceu.",
  },
];

const APOIO_ENTRADA: Item[] = [
  {
    icon: FileCheck2,
    titulo: "Carta de Correção",
    texto:
      "Escapou um dado na nota já autorizada? A CC-e é emitida aqui mesmo, sem cancelar e refazer a operação.",
  },
  {
    icon: ScrollText,
    titulo: "XML arquivado por período",
    texto:
      "Todo XML emitido e recebido fica guardado, com os eventos de cancelamento e correção junto. Nada de caçar arquivo solto.",
  },
  {
    icon: UserCog,
    titulo: "Acesso para o seu contador",
    texto:
      "Crie um usuário para a contabilidade liberando só os menus fiscais. Ela entra sozinha e puxa os XMLs do período.",
  },
];

export function Fiscal() {
  return (
    <section
      id="fiscal"
      className="relative overflow-hidden bg-[#0D0A08] py-16 sm:py-20 lg:py-28"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mx-auto max-w-[900px] text-center">
          <motion.span {...ENTRADA} className="section-eyebrow">
            MD-e · Manifesto do destinatário
          </motion.span>
          <motion.h2
            {...ENTRADA}
            className="mt-6 text-[36px] font-bold leading-[1.05] tracking-[-.04em] text-brand-cream sm:text-[52px]"
          >
              A nota do fornecedor <span className="text-gradient-brand">já traz os dados da compra.</span>
          </motion.h2>
          <motion.p
            {...ENTRADA}
            className="mx-auto mt-6 max-w-[760px] text-[15.5px] leading-[1.75] text-brand-cream/60 sm:text-[16.5px]"
          >
            O FoodFy consulta as notas emitidas contra o seu CNPJ. Você confere a operação, importa o XML e usa os dados da nota para dar entrada no estoque.
          </motion.p>
        </div>

        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-8">
          {/* os quatro eventos previstos na legislação */}
          <div>
            <motion.p
              {...ENTRADA}
              className="text-[13px] font-semibold uppercase tracking-[.14em] text-brand-orange"
            >
              Os quatro eventos da SEFAZ
            </motion.p>
            <ol className="relative mt-5 space-y-3 before:absolute before:bottom-8 before:left-[25px] before:top-8 before:w-px before:bg-gradient-to-b before:from-brand-orange/55 before:to-brand-orange/5">
              {MANIFESTOS.map((m) => (
                <motion.li
                  key={m.codigo}
                  {...ENTRADA}
                  className="group relative flex min-h-[84px] items-center gap-4 rounded-[20px] border border-brand-sand/[0.11] bg-[#8B5E3C]/[0.08] p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-orange/40 hover:bg-[#8B5E3C]/[0.15]"
                >
                  <span className="relative z-10 rounded-xl border border-brand-orange/25 bg-[#15100D] px-2.5 py-1.5 font-mono text-[11px] text-brand-cream/45 transition-colors duration-500 group-hover:border-brand-orange/55 group-hover:text-brand-orange">
                    {m.codigo}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15.5px] font-semibold text-brand-cream">
                      {m.rotulo}
                    </span>
                    <span className="mt-0.5 block text-[13.5px] leading-snug text-brand-cream/55">
                      {m.texto}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* do XML ao estoque */}
          <div>
            <motion.p
              {...ENTRADA}
              className="text-[13px] font-semibold uppercase tracking-[.14em] text-brand-orange"
            >
              E o XML vira entrada de mercadoria
            </motion.p>
            <motion.p
              {...ENTRADA}
              className="mt-5 text-[15.5px] leading-relaxed text-brand-cream/65"
            >
              Do mesmo XML que a SEFAZ entregou, o sistema puxa os produtos, as
              quantidades e o custo. O estoque sobe e o custo do insumo é
              atualizado. Ninguém precisa redigitar a nota do fornecedor.
            </motion.p>

            <motion.div
              {...ENTRADA}
              className="mt-6 flex items-center gap-3 rounded-2xl border border-brand-orange/30 bg-[linear-gradient(100deg,rgba(255,120,20,.12),rgba(139,94,60,.08))] p-4"
            >
              <Truck
                className="h-[18px] w-[18px] shrink-0 text-brand-orange"
                strokeWidth={1.8}
              />
              <p className="text-[13.5px] leading-snug text-brand-cream/75">
                XML do fornecedor → produtos e custos → saldo de estoque
                atualizado
              </p>
            </motion.div>

            <motion.figure
              {...ENTRADA}
              className="mt-6 overflow-hidden rounded-[24px] border border-brand-sand/[0.14] bg-[#1B1511] shadow-[0_45px_100px_-42px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center gap-2 border-b border-brand-sand/[0.10] bg-[#8B5E3C]/[0.08] px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                <span className="h-2 w-2 rounded-full bg-[#28C840]" />
                <span className="ml-2 truncate rounded bg-black/30 px-2 py-0.5 text-[10.5px] text-brand-cream/35">
                  app.foodfy.club/entrada-mercadorias
                </span>
              </div>
              <div className="relative aspect-[16/8.5] overflow-hidden bg-[#EEF3FA]">
                <img
                  src="/prints/entrada-mercadorias.png"
                  alt="Entrada de mercadorias por XML da nota do fornecedor no FoodFy"
                  className="absolute inset-x-0 top-0 block w-full"
                  loading="lazy"
                />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.10),transparent_34%)]" />
              </div>
            </motion.figure>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-5 lg:mt-12">
          {APOIO_ENTRADA.map((i) => (
            <Cartao key={i.titulo} item={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
