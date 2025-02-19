/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        swipeIn: {
          '0%': {
            transform: 'scaleX(0)',
            transformOrigin: 'bottom right',
          },
          '100%': {
            transform: 'scaleX(1)',
            transformOrigin: 'bottom left',
          },
        },
      },
      animation: {
        swipeIn: 'swipeIn 1s ease forwards',
      },
    },
  },
  plugins: [
    require("@catppuccin/tailwindcss")({
      prefix: "ctp"
    }),
  ],
}

