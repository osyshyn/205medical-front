/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          base: "#FFFFFF",
          ligth: "#FAFBFF",
        },
        purple: {
          base: "#5932EA",
          ligth: "#EAABF0",
        },
        gray: {
          base: "#1A1A1A",
          ligth: "#9197B3",
          dark: "#344054",
          border: "#F0F0F0",
        },
        black: {
          base: "#000000",
          ligth: "#292D32",
        },
        green: {
          base: "#008767",
          ligth: "#16C098",
        },
        yellow: {
          base: "#FFB700",
        },
        red: {
          base: "#DF0404",
          ligth: "#FFC5C5",
        },
      },
      fontSize: {},
      lineHeight: {},
      spacing: {
        15: "60px",
      },
      screens: {
        default: "0px",
        xs: "450px",
        sm: "720px",
        md: "900px",
        lg: "1076px",
        gl: "1300px",
        xl: "1614px",
      },
    },
  },
  plugins: [],
};
