import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#05020d",
        neonPurple: "#a855f7",
        neonBlue: "#22d3ee",
        neonPink: "#ec4899"
      },
      boxShadow: {
        glow: "0 0 32px rgba(168,85,247,.45)",
        blueGlow: "0 0 32px rgba(34,211,238,.35)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
export default config;
