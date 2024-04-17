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
        "custom-primary-lighten": "#77f496",
        "custom-secondary": "#8890F5",
        "custom-accent": "#A148EF",
        "custom-accent-darken": "#813abf",
      },
      dropShadow: {
        "3xl": "5px 8px 0px rgba(3,32,9,0.7)",
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
