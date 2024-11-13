/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main01: "#0167AB",
        main02: "#2483C5",
        main03: "#32A2DB",
        main04: "#52B6E7",
        sub01: "#0e325a",
        sub02: "#123F6D",
        colorBombom: "#EFB4CA",
        colorDalbo: "#E2BD48",
        colorDuji: "#A78770",
        colorKu: "#b07f9a",
        colorPudding: "#9FB3D4",
      },
      fontSize: {
        'B-32': ['32px', { lineHeight: 'normal', fontWeight: 700 }],
        'B-28': ['28px', { lineHeight: '130%', letterSpacing: '-0.3px', fontWeight: 700 }],
        'B-22': ['22px', { lineHeight: 'normal', fontWeight: 700 }],
        'B-20': ['20px', { lineHeight: 'normal', fontWeight: 700 }],
        'R-28': ['28px', { lineHeight: 'normal', fontWeight: 400 }],
        'R-20': ['20px', { lineHeight: 'normal', fontWeight: 400 }],
        'R-14': ['14px', { lineHeight: 'normal', fontWeight: 400 }],
        'R-12': ['12px', { lineHeight: 'normal', fontWeight: 400 }],
        'R-10': ['10px', { lineHeight: 'normal', fontWeight: 400 }],
        'L-20': ['20px', { lineHeight: 'normal', fontWeight: 300 }]
      },
      fontFamily: {
        'WooridaumB': ['WooridaumB', 'sans-serif'],
        'WooridaumR': ['WooridaumR', 'sans-serif'],
        'WooridaumL': ['WooridaumL', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
