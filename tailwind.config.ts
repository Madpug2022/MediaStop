import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#2e026d",
        secondary: "#15162c",
        third: "#BA3C0B",
        fourth: "rgb(234 179 8)"
      }
    },
  },
  plugins: [],
} satisfies Config;
