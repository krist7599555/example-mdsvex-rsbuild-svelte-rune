/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{svelte,ts,html}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fffaeb",
          100: "#fef1c7",
          200: "#fde28a",
          300: "#fccd4d",
          400: "#fbb724",
          500: "#f5960b",
          600: "#d46d06",
          700: "#b44d09",
          800: "#923b0e",
          900: "#78310f",
          950: "#451803",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            "h1, h2, h3, p": {
              "text-wrap": "balance",
              "white-space": "pre-line",
            },
            h1: {
              "font-size": "1.75rem",
            },
            h2: {
              "font-size": "1.5rem",
            },
            blockquote: {
              "font-style": "normal",
            },
            mark: {
              "background-color": "#fff7e4",
              color: "#d46d06",
            },
            "ol, ul": {
              "list-style-position": "inside",
            },
            a: {
              "text-decoration-color": "#f8b572",
              "text-underline-offset": "2.5px",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")({})],
};
