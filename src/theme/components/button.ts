// import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
// export const buttonStyles = {
//   components: {
//     Button: {
//       baseStyle: {
//         borderRadius: "6px",
//         boxShadow: "45px 76px 113px 7px rgba(112, 144, 176, 0.08)",
//         transition: ".25s all ease",
//         boxSizing: "border-box",
//         _focus: {
//           boxShadow: "none",
//         },
//         _active: {
//           boxShadow: "none",
//         },
//       },
//       sizes: {},

//       variants: {
//         outline: () => ({
//           borderRadius: "5px",
//           border: "2px",
//           borderColor: "primary.500",
//           color: "primary.500",
//           py: "9",
//           px: "14px",
//           fontSize: "16px",
//           fontWeight: "semibold",
//           _selected: {
//             bg: "primary.500",
//             color: "white",
//           },
//         }),
//         homeWhite: (props: StyleFunctionProps) => ({
//           bg: "white",
//           color: "gray.900",
//           borderRadius: "6px",
//           h: "48px",
//           pt: "0",
//           pb: "0",
//           px: "0",
//           _focus: {
//             bg: mode("blue.500", "blue.400")(props),
//           },
//           _active: {
//             bg: mode("blue.500", "blue.400")(props),
//           },
//           _hover: {
//             bg: "gray.300",
//             boxShadow: "0 1rem 2rem rgba(#333, 0.2)",
//           },
//         }),
//         homePrimary: {
//           bg: "blue.400",
//           color: "white",
//           borderRadius: "6px",
//           h: "48px",
//           pt: "0",
//           pb: "0",
//           px: "0",
//           _focus: {
//             bg: mode("primary.600", "blue.400"),
//           },
//           _active: {
//             bg: mode("primary.600", "blue.400"),
//           },
//           _hover: {
//             bg: "primary.600",
//             boxShadow: "0 1rem 2rem rgba(#333, 0.2)",
//           },
//         },
//       },
//     },
//   },
// };

import { mode } from "@chakra-ui/theme-tools";
export const buttonStyles = {
  components: {
    Button: {
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
      variants: {
        outline: () => ({
          borderRadius: "16px",
        }),
        brand: (props: any) => ({
          bg: mode("brand.500", "brand.400")(props),
          color: "white",
          _focus: {
            bg: mode("brand.500", "brand.400")(props),
          },
          _active: {
            bg: mode("brand.500", "brand.400")(props),
          },
          _hover: {
            bg: mode("brand.600", "brand.400")(props),
          },
        }),
        darkBrand: (props: any) => ({
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
        lightBrand: (props: any) => ({
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
        light: (props: any) => ({
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
        action: (props: any) => ({
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
        setup: (props: any) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("transparent", "brand.400")(props),
          border: mode("1px solid", "0px solid")(props),
          borderColor: mode("secondaryGray.400", "transparent")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("transparent", "brand.400")(props),
          },
          _active: { bg: mode("transparent", "brand.400")(props) },
          _hover: {
            bg: mode("secondaryGray.100", "brand.400")(props),
          },
        }),
      },
    },
  },
};
