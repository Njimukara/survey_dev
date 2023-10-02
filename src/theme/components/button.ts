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
          borderRadius: "6px",
        }),
        homeWhite: (props: any) => ({
          fontWeight: "500",
          borderRadius: "6px",
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
        homePrimary: (props: any) => ({
          fontWeight: "500",
          borderRadius: "6px",
          bg: mode("primary.600", "brand.400")(props),
          border: mode("1px solid", "0px solid")(props),
          borderColor: mode("secondaryGray.400", "transparent")(props),
          color: mode("white", "white")(props),
          _focus: {
            bg: mode("primary.600", "brand.400")(props),
          },
          _active: { bg: mode("primary.600", "brand.400")(props) },
          _hover: {
            bg: mode("primary.500", "brand.400")(props),
          },
        }),
      },
    },
  },
};
