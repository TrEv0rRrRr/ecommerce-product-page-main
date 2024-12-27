/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html, js}"],
  theme: {
    extend: {
      colors: {
        "Orange-Color": "#ff7d1a",
        "Pale-Orange": "#ffede0",
        "Very-Dark-Blue": "#1d2025",
        "Grayish-Blue": "#b6bcc8",
        "Dark-Grayish-Blue": "#68707d",
        "Light-Grayish-Blue": "#f7f8fd",
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
      screens: {
        "Mobile-mq": "475px",
        "Desktop-mq": "1440px",
      },
      fontFamily: {
        Kumbh: ['"Kumbh Sans"'],
      },
    },
  },
  plugins: [],
};
