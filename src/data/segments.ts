export type Segment = {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  /** Foto do card, recortada em círculo (/public/segmentos/<id>.png) */
  photo: string;
  /** Versão desfocada usada no fundo da hero (/public/segmentos/<id>-bg.jpg) */
  bgPhoto: string;
  /** Ambiente de fundo da hero (usado sempre; a foto entra por cima quando existe) */
  bg: string;
  /** Cor de luz ambiente da cena */
  light: string;
  /** Gradiente do disco do card quando não há foto */
  disc: string;
};

export const SEGMENTS: Segment[] = [
  {
    id: "cafeteria",
    name: "Cafeterias",
    tagline: "Soluções para cafeterias",
    emoji: "☕",
    photo: "/segmentos/cafeteria.png",
    bgPhoto: "/segmentos/cafeteria-bg.jpg",
    bg: "radial-gradient(120% 90% at 18% 78%, #6B3B14 0%, #35190A 38%, #0C0705 72%), radial-gradient(70% 60% at 82% 12%, #7A4517 0%, transparent 60%)",
    light: "#C9762B",
    disc: "linear-gradient(150deg, #8A4E1E, #2A1409)",
  },
  {
    id: "hamburgueria",
    name: "Hamburguerias",
    tagline: "Soluções para hamburguerias",
    emoji: "🍔",
    photo: "/segmentos/hamburgueria.png",
    bgPhoto: "/segmentos/hamburgueria-bg.jpg",
    bg: "radial-gradient(120% 90% at 22% 80%, #7A3A0E 0%, #3A1608 40%, #0B0605 74%), radial-gradient(65% 55% at 85% 18%, #93501A 0%, transparent 60%)",
    light: "#E0872F",
    disc: "linear-gradient(150deg, #9A5A22, #2E1409)",
  },
  {
    id: "restaurante",
    name: "Restaurantes",
    tagline: "Soluções para restaurantes",
    emoji: "🍽️",
    photo: "/segmentos/restaurante.png",
    bgPhoto: "/segmentos/restaurante-bg.jpg",
    bg: "radial-gradient(120% 90% at 20% 76%, #4A3A22 0%, #241a10 40%, #090706 74%), radial-gradient(70% 60% at 84% 14%, #6A4A22 0%, transparent 62%)",
    light: "#C2A05E",
    disc: "linear-gradient(150deg, #6B5330, #1C1409)",
  },
  {
    id: "bar",
    name: "Bares",
    tagline: "Soluções para bares",
    emoji: "🍹",
    photo: "/segmentos/bar.png",
    bgPhoto: "/segmentos/bar-bg.jpg",
    bg: "radial-gradient(120% 90% at 24% 80%, #7C2A18 0%, #33110C 42%, #0A0605 76%), radial-gradient(65% 55% at 82% 16%, #8E3520 0%, transparent 60%)",
    light: "#E2603C",
    disc: "linear-gradient(150deg, #93301C, #2A0F0A)",
  },
  {
    id: "lanchonete",
    name: "Lanchonetes",
    tagline: "Soluções para lanchonetes",
    emoji: "🥪",
    photo: "/segmentos/lanchonete.png",
    bgPhoto: "/segmentos/lanchonete-bg.jpg",
    bg: "radial-gradient(120% 90% at 20% 78%, #6E4A16 0%, #31200A 40%, #0B0705 74%), radial-gradient(68% 58% at 84% 16%, #8A5E1D 0%, transparent 60%)",
    light: "#D69B37",
    disc: "linear-gradient(150deg, #8A6222, #291B0A)",
  },
  {
    id: "pizzaria",
    name: "Pizzarias",
    tagline: "Soluções para pizzarias",
    emoji: "🍕",
    photo: "/segmentos/pizzaria.png",
    bgPhoto: "/segmentos/pizzaria-bg.jpg",
    bg: "radial-gradient(120% 90% at 22% 80%, #822F12 0%, #3A1409 42%, #0B0605 76%), radial-gradient(66% 56% at 84% 18%, #9B3F17 0%, transparent 60%)",
    light: "#EE7B33",
    disc: "linear-gradient(150deg, #9C4318, #2C1108)",
  },
];
