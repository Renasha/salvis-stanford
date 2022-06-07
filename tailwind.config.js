module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        '800': '800ms',
      },
      fontSize: {
        '20xl': '12rem',
      },
      colors: {
        seagreen: {
          50: '#A1DFB5',
          100: '#92DAA9',
          200: '#73CF91',
          300: '#55C579',
          400: '#3DB364',
          500: '#339553',
          600: '#256B3C',
          700: '#164124',
          800: '#08180D',
        },
      }
    },
  },
  plugins: [],
}
