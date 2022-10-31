/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-bg-color": "#1a2530",
        "green-sea": "#222831",
        "green-sea-transparent": "rgba(44,62,80,0.8)",
        "wet-asphalt": "#1E2022",
        "background-body": "#EEEEEE",
      },
      fontFamily: {
        "pt-sans": ["PT Sans", "sans-serif"],
        signika: ["Signika", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to top, rgba(44, 62, 80, 0.8), rgba(52, 73, 94, 0.8)),url('https://pbs.twimg.com/profile_images/1351938473142448133/JQT93Cjo_400x400.jpg')",
      },
    },
  },
  plugins: [],
};
