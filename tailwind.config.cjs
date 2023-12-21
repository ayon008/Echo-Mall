module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor1: "#ff6801",
        primaryColorLight: "#ffe1d2",
        primaryColor2: "#f85606",
        redColor: "##ff0000",
        grayColor1: "#e2e2e2",
        grayColor2: "#333333",
        bgColor: "#FFFFFF",
        blackColor: "#000000",
        grayColor2: "#AFB1BB",
        whiteText: "#FFF",
      },
      fontFamily: {
        playFair: ["Playfair Display", "serif"],
        SourceCodePro: ["Source Code Pro", "monospace"],
      },
      fontSize: {
        big: "var(--big-font-size)",
        h1: "var(--h1-font-size)",
        h2: "var(--h2-font-size)",
        h3: "var(--h3-font-size)",
        large: "var(--large-font-size)",
        normal: "var(--normal-font-size)",
        small: "var(--small-font-size)",
        tiny: "var(--tiny-font-size)",
      },
    },
  },
  variants: {},
  plugins: [require("daisyui")],
};
