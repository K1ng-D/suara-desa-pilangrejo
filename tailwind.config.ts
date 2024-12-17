import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        suaradesabg: "url('/assets/image/SuaraDesaBG.jpeg')",
        bglogin: "url('/assets/image/BgLogin.jpeg')",
        bgregister: "url('/assets/image/BgRegister.jpeg')",
        bgkritik: "url('/assets/image/BgKritik.jpg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
