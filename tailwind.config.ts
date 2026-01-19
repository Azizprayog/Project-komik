import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    lineClamp, // ← INI WAJIB
  ],
};

export default config;
