import { addDynamicIconSelectors } from "@iconify/tailwind";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} **/
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-text": "#05140c",
        "custom-bg": "#effbf6",
        "custom-primary": "#3bce7d",
        "custom-primary-light": "hsl(187.06deg 65.38% 89.8%)",
        "custom-secondary": "#b698e6",
        "custom-secondary-light": "#eaeff2",
        "custom-accent": "#cc5fd8",
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
