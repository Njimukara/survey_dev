import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const buttonStyles = {
    //    Style onject for base styling
    baseStyle: {
      borderRadius: "16px",
      boxShadow: "45px 76px 113px 7px rgba(112, 144, 176, 0.08)",
      transition: ".25s all ease",
      boxSizing: "border-box",
      _focus: {
        boxShadow: "none",
      },
      _active: {
        boxShadow: "none",
      },
    },
    // Style object for different sizes eg lg md, sm
    sizes: {},
    // Style object for different variants eg Primary secondary
    variants: {
      primary: {
        bg: "rgba(237, 136, 3, 0.5)",
        backdropFilter: "blur(4px)",
  
        borderRadius: "0px",
        clipPath:
          "polygon(5% 0, 80% 0%, 100% 0, 100% 84%, 95% 100%, 20% 100%, 0 100%, 0 15%)",
        fontSize: "0.9rem",
        fontFamily: "Skia",
        letterSpacing: "1px",
        w: "12.2rem",
        h: "50px",
        _hover: {
          bg: "rgba(237, 136, 3, 0.2)",
        },
        _after: {
          border: "1px",
        },
        _before: {
          border: "1px",
        },
      },
      primaryhero: {
        bg: "rgba(237, 136, 3, 0.25)",
        backdropFilter: "blur(4px)",
        borderRadius: "7px",
        w: "12.2rem",
        h: "3.7rem",
        border: "2px",
        overflow: "hidden",
        borderColor: "rgba(237, 136, 3, 0.25)",
        pl: "0.7rem",
        py: "0.8rem",
      },
      subscribe: {
        bg: "linear-gradient(90deg, #ED8803 0%, #A5620A 100%)",
        borderRadius: "0px",
        w: "12.5rem",
        h: "3.8rem",
      },
      white: {
        color: "primary",
        border: "1px solid",
        borderColor: "primary",
        borderRadius: "0px",
        bg: "rgba(255, 255, 255, 0.2)",
        px: "15px",
        py: "25px",
        fontWeight: "400",
        _hover: {
          bg: "primary",
          color: "white",
        },
      },
      outline: () => ({
        borderRadius: "5px",
        border: "2px",
        borderColor: "primary.500",
        color: "primary.500",
        py:"9",
        px:"14",
        fontSize:"16px",
        fontWeight:"semibold",
        _selected:{
          bg: "primary.500",
          color: "white",
        }
      }),
      brand: (props: StyleFunctionProps) => ({
        bg: mode("blue.500", "blue.400")(props),
        color: "white",
        _focus: {
          bg: mode("blue.500", "blue.400")(props),
        },
        _active: {
          bg: mode("blue.500", "blue.400")(props),
        },
        _hover: {
          bg: mode("blue.600", "blue.400")(props),
        },
      }),
      darkBrand: (props: StyleFunctionProps) => ({
        bg: mode("brand.900", "brand.400")(props),
        color: "white",
        _focus: {
          bg: mode("brand.900", "brand.400")(props),
        },
        _active: {
          bg: mode("brand.900", "brand.400")(props),
        },
        _hover: {
          bg: mode("brand.800", "brand.400")(props),
        },
      }),
      lightBrand: (props: StyleFunctionProps) => ({
        bg: mode("#F2EFFF", "whiteAlpha.100")(props),
        color: mode("brand.500", "white")(props),
        _focus: {
          bg: mode("#F2EFFF", "whiteAlpha.100")(props),
        },
        _active: {
          bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
        },
        _hover: {
          bg: mode("secondaryGray.400", "whiteAlpha.200")(props),
        },
      }),
      light: (props: StyleFunctionProps) => ({
        bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
        color: mode("secondaryGray.900", "white")(props),
        _focus: {
          bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
        },
        _active: {
          bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
        },
        _hover: {
          bg: mode("secondaryGray.400", "whiteAlpha.200")(props),
        },
      }),
      action: (props: StyleFunctionProps) => ({
        fontWeight: "500",
        borderRadius: "50px",
        bg: mode("secondaryGray.300", "brand.400")(props),
        color: mode("brand.500", "white")(props),
        _focus: {
          bg: mode("secondaryGray.300", "brand.400")(props),
        },
        _active: { bg: mode("secondaryGray.300", "brand.400")(props) },
        _hover: {
          bg: mode("secondaryGray.200", "brand.400")(props),
        },
      }),
      

      // Home Page Buttons 
      homeWhite: (props: StyleFunctionProps) => ({
        bg: "white",
        color: "gray.900",
        borderRadius: "5px",
        pt: "9",
        pb: "8",
        px: "8",
        _focus: {
          bg: mode("blue.500", "blue.400")(props),
        },
        _active: {
          bg: mode("blue.500", "blue.400")(props),
        },
        _hover: {
          bg: "gray.100",
          boxShadow: "0 1rem 2rem rgba(#333, 0.2)",
        },
      }),
      homePrimary: (props: StyleFunctionProps) => ({
        bg: "primary.500",
        color: "white",
        borderRadius: "5px",
        pt: "9",
        pb: "8",
        px: "8",
        _focus: {
          bg: mode("blue.500", "blue.400")(props),
        },
        _active: {
          bg: mode("blue.500", "blue.400")(props),
        },
        _hover: {
          bg: "primary.600",
          boxShadow: "0 1rem 2rem rgba(#333, 0.2)",
        },
      }),
    },
    // default values for props eg size and variant
    defaultProps: {},
  };