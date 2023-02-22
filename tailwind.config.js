/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#233041",
          secondary: "#4c628a",
        },
      },
      keyframes: {
        "hover-1": {
          "0%, 100%": {
            transform: "translateY(0%)",
          },
          "50%": {
            transform: "translateY(-10%)",
          },
        },
        "hover-2": {
          "0%, 100%": {
            transform: "translateY(0%)",
          },
          "50%": {
            transform: "translateY(-5%)",
          },
        },
        "hover-3": {
          "0%, 100%": {
            transform: "translateY(0%)",
          },
          "50%": {
            transform: "translateY(-2%)",
          },
        },
      },
      animation: {
        "hover-1": "hover-1 1s ease-in-out infinite",
        "hover-2": "hover-2 1s ease-in-out infinite",
        "hover-3": "hover-3 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
