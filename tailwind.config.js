/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          base: "#FFFFFF",
          ligth: "#FAFBFF",
          lighter: "#F8F9FF",
        },
        purple: {
          base: "#5932EA",
          ligth: "#EAABF0",
        },
        blue: {
          base: "#4623E9",
        },
        gray: {
          base: "#1A1A1A",
          ligth: "#9197B3",
          dark: "#344054",
          soft: "#F0F0F0",
          medium: "#757575",
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
        10.75: "43px",
        15: "60px",
        18.75: "75px",
      },
      minWidth: {
        62.5: "250px",
      },
      borderRadius: {
        20: "20px",
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
