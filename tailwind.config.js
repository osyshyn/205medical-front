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
          lighter: "#E7E2FC",
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
          regular: "#ACACAC",
        },
        black: {
          base: "#000000",
          ligth: "#292D32",
          soft: "#5F5F67",
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
      fontSize: {
        22: "22px",
        32: "32px",
      },
      lineHeight: {},
      spacing: {
        4.5: "18px",
        7.5: "30px",
        10.5: "42px",
        10.75: "43px",
        15: "60px",
        18.75: "75px",
        127.5: "510px",
      },
      maxWidth: {
        62.5: "250px",
        28.75: "115px",
      },
      minWidth: {
        62.5: "250px",
      },
      maxHeight: {
        127.5: "510px",
        150: "600px",
        162.5: "650px",
      },
      borderRadius: {
        4: "4px",
        10: "10px",
        20: "20px",
        30: "30px",
      },
      boxShadow: {
        "modal-window": "0px 10px 60px 0px rgba(226, 236, 249, 0.5)",
      },
      backgroundImage: {
        "login-banner": "url('/src/assets/images/login/bg.png')",
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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".bg-gradient-text": {
          background: "linear-gradient(to right, #9b74e7, #1e40af)",
          "-webkit-background-clip": "text",
          color: "transparent",
        },
      });
    },
  ],
};
