module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        gone: {
          "0%,90%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        gone: "gone 3s ease-in-out forwards",
      },
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      head: ["Kaushan Script", "cursive", "system-ui"],
      main: ["Noto Sans KR", "sans-serif"],
    },
  },
  plugins: [],
};
