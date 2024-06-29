/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-orange': '#ff7d00',
        'custom-yellowbg': '#fdf4b4',
        'custom-errortxt': '#2d3d37',
        'custom-focyell': '#2d3d37'
      },
    },
  },
  plugins: [
    // require("@tailwindcss/aspect-ratio")
  ],
};
