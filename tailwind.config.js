module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      0: "#FDFDFD",
      100: "#d7d7d9",
      200: "#afb0b2",
      300: "#86888c",
      400: "#5e6165",
      500: "#36393f",
      600: "#2b2e32",
      700: "#202226",
      800: "#161719",
      900: "#0b0b0d",
      1000: "#000000",

      transparent: "transparent",
      current: "currentColor",
      green: "#48BB78",
      yellow: "#ECC94B",
      orange: "#ED8936",
      red: "#f56565",
      teal: "#38B2AC",
      blue: "#4299e1",
      indigo: "#667EEA",
      purple: "#9F7AEA",
      pink: "#ED64A6",
      white: "#ffffff",
      black: "#000000",
      // black: colors.black,
      // white: colors.white,
      // gray: colors.coolGray,
      // red: colors.red,
      // yellow: colors.amber,
      // blue: colors.blue,
      // green: colors.green,
      // purple: colors.purple,
      // pink: colors.pink,
    },
    extend: {
      width: {
        144: "32rem",
      },
      height: {
        128: "32rem",
      },
      fontFamily: {
        'poppins': ['Poppins']
      }
    },
    container: {
      center: true,
      padding: "0 0.5rem 0 0.5rem",
    },
    screens: {
      xxs: "300px",
      xs: "800px",
      sm: "1150px",
      md: "1200px",
      lg: "1400px",
      xl: "1600px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
