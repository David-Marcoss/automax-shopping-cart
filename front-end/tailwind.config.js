/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "600px",
        md: "960px",
        lg: "1280px",
        xl: "1920px",
        print: { raw: "print" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "#000000", // fundo preto
        foreground: "#FFFFFF", // texto branco

        card: {
          DEFAULT: "#1F1F1F", // cinza escuro
          foreground: "#FFFFFF", // texto branco dentro do card
        },

        primary: {
          DEFAULT: "#2B3990",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#00AEEF",
          foreground: "#FFFFFF",
        },

        border: "#2D2D2D", // borda cinza
        input: "#333333", // input cinza
      },
    },
  },
};
