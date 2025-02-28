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
        main02: "#57A9FB",
        main03: "#32A2DB",
        main04: "#52B6E7",
        sub01: "#0e325a",
        sub02: "#123F6D",
        pinkHachu: "#EFD5E2",
        blueDada: "#BCD9E6",
        yellowGogo: "#FAEB75",
        pinkHap: "#F7E2E9",
        purpleLala: "#D4ACCE",
        yellowChacha: "#F4F3A2",
        blue01: "#9BD5F1",
        red01: "#F24646",
        purple01: "#E1B2C6",
        gray01: "#D3D3D3",
        pink01: "#F8DEE7",
        redHover: "#B91C1C",
      },
      fontSize: {
        "B-32": ["32px", { lineHeight: "normal", fontWeight: 700 }],
        "B-28": ["28px", { lineHeight: "normal", fontWeight: 700 }],
        "B-22": ["22px", { lineHeight: "normal", fontWeight: 700 }],
        "B-20": ["20px", { lineHeight: "normal", fontWeight: 700 }],
        "B-18": ["18px", { lineHeight: "normal", fontWeight: 700 }],
        "R-28": ["28px", { lineHeight: "normal", fontWeight: 400 }],
        "R-25": ["25px", { lineHeight: "normal", fontWeight: 400 }],
        "R-20": ["20px", { lineHeight: "normal", fontWeight: 400 }],
        "R-18": ["18px", { lineHeight: "normal", fontWeight: 400 }],
        "R-17": ["17px", { lineHeight: "normal", fontWeight: 400 }],
        "R-15": ["14px", { lineHeight: "normal", fontWeight: 400 }],
        "R-14": ["14px", { lineHeight: "normal", fontWeight: 400 }],
        "R-12": ["12px", { lineHeight: "normal", fontWeight: 400 }],
        "R-10": ["10px", { lineHeight: "normal", fontWeight: 400 }],
        "L-20": ["20px", { lineHeight: "normal", fontWeight: 300 }],
        "L-12": ["12px", { lineHeight: "normal", fontWeight: 300 }],
        "L-10": ["10px", { lineHeight: "normal", fontWeight: 300 }],
      },
      fontFamily: {
        "L-12": ["12px", { lineHeight: "normal", fontWeight: 300 }],
        "L-10": ["10px", { lineHeight: "normal", fontWeight: 300 }],
      },
      PretendardB: ["Pretendard-Bold", "sans-serif"],
      PretendardR: ["Pretendard-Regular", "sans-serif"],
      PretendardL: ["Pretendard-Light", "sans-serif"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
