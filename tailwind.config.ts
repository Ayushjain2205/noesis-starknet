import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9381FF",
        secondary: "#B8B8FF",
        accent: "#F8F7FE",
        neutral: "#3d4451",
        grey: "#3d4451",
        background: "#fff",
        "base-100": "#ffffff",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#9381FF",
          secondary: "#B8B8FF",
          accent: "#F8F7FE",
          neutral: "#3d4451",
          grey: "#3d4451",
          background: "#fff",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};

export default config;
