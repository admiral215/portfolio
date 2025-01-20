/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#0788FF", // Biru
        secondary: "#172554",
        grey: "rgba(255, 255, 255, .15)",
      },
    },
  },
  plugins: [],
};

