
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#C8102E",
          primaryDark: "#9E0D24",
          surface: "#FAFAFA",
          border: "#E5E7EB",
          text: "#1E1E1E",
          muted: "#6B7280"
        }
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
        "2xl": "20px"
      },
      boxShadow: {
        card: "0 6px 24px rgba(0,0,0,0.06)",
      },
    }
  },
  plugins: [],
}
