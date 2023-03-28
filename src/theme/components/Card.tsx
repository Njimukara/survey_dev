import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const CardStyles = {
  baseStyle: (props: StyleFunctionProps) => ({
    p: "20px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    borderRadius: "20px",
    minWidth: "0px",
    wordWrap: "break-word",
    bg: mode("#ffffff", "navy.800")(props),
    backgroundClip: "border-box",
    fontFamily: "DM Sans",
    fontSize: "16px",
  }),
  variants: {
    bordered: {
        borderWidth: "1px",
    },
  },
};
