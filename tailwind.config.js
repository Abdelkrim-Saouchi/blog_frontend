import { addDynamicIconSelectors } from "@iconify/tailwind";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} **/
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-text": "#032009",
        "custom-bg": "#F2FEF4",
        "custom-primary": "#1CEC50",
        "custom-secondary": "#8890F5",
        "custom-accent": "#A148EF",
      },
    },
  },
  plugins: [
    //Iconify plugin
    addDynamicIconSelectors(),
    // Tailwindcss typography
    typography(),
  ],
};
