/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          red: "#E53935",
          orange: "#FF8A00",
          amber: "#FFC83D",
          cream: "#FFF8F0",
          cream2: "#FFF3E6",
          cream3: "#FCE8D1",
          gray1: "#F5F0EB",
          ink: "#24201E",
          mud: "#746B66",
          sand: "#EADFD7",
        },
        night: {
          900: "#080605",
          800: "#0D0A08",
          700: "#141010",
          600: "#1C1715",
          500: "#2A2320",
        },
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(255,138,0,0.55)",
        "glow-sm": "0 0 28px -6px rgba(255,138,0,0.5)",
        card: "0 20px 60px -20px rgba(0,0,0,0.8)",
      },
      keyframes: {
        spinSlow: { to: { transform: "rotate(360deg)" } },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "spin-slow": "spinSlow 26s linear infinite",
        "spin-slower": "spinSlow 46s linear infinite reverse",
        floaty: "floaty 7s ease-in-out infinite",
        "fade-up": "fadeUp .7s cubic-bezier(.16,1,.3,1) both",
      },
    },
  },
  plugins: [],
};
