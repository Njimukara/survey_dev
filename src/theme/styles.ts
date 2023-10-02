import { StyleFunctionProps, mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    brand: {
      100: "#e6f1fe",
      200: "#b3d5fc",
      300: "#80b9fa",
      400: "#4d9cf8",
      500: "#0072F5",
      600: "#0050ac",
      700: "#00397b",
      800: "#002249",
      900: "#000b18",
    },
    primary: {
      100: "#ebe6ff",
      200: "#c3b5ff",
      300: "#9b84ff",
      400: "#7353ff",
      500: "#3203fc",
      600: "#3A2FB7",
      700: "#1c0580",
      800: "#10034c",
      900: "#1E1A4D",
    },
    brandScheme: {
      100: "#E9E3FF",
      200: "#7551FF",
      300: "#7551FF",
      400: "#7551FF",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A",
    },
    brandTabs: {
      100: "#E9E3FF",
      200: "#422AFB",
      300: "#422AFB",
      400: "#422AFB",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A",
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    blue: {
      50: "#EFF4FB",
      100: "#ebe6ff",
      200: "#c3b5ff",
      300: "#9b84ff",
      400: "#7353ff",
      500: "#004cfc",
      600: "#2706b3",
      700: "#1c0580",
      800: "#10034c",
      900: "#050119",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      400: "#00C914",
      500: "#01B574",
    },
    navy: {
      50: "#d0dcfb",
      100: "#aac0fe",
      200: "#a3b9f8",
      300: "#728fea",
      400: "#3652ba",
      500: "#1b3bbb",
      600: "#24388a",
      700: "#1B254B",
      800: "#111c44",
      900: "#0b1437",
    },
    gray: {
      100: "#FAFCFE",
      500: "#3C3C3C",
      600: "#323232",
      900: "#1A202C",
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        overflowX: "hidden",
        bg: mode("#F7F7FC", "navy.900")(props),
        letterSpacing: "-0.5px",
        lineHeight: "27px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        lineHeight: "27px",
      },
    }),
  },
};
