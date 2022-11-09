import { extendTheme, theme as base, HTMLChakraProps, ThemingProps } from "@chakra-ui/react";
import { buttonStyles as Button } from "./components/Button";
import { CardStyles as Card } from "./components/Card";
import { globalStyles } from './styles';

export const theme = extendTheme({
  // fonts: {
  //   body: `DM Sans ${base.fonts?.heading}`,
  // },
  
  globalStyles,
  colors: {
    primary: {
      100: "#ebe6ff",
      200: "#c3b5ff",
      300: "#9b84ff",
      400: "#7353ff",
      500: "#3709ff",
      600: "#2706b3",
      700: "#1c0580",
      800: "#10034c",
      900: "#050119",
    },
    // primary_dark: "#B16B0D",
    // red: "#D53F5B",
    // purple: "#8B1A9F",
    // pink: "#FA59BF",
    // yellow: "#FFD027",
    // yellow: "#FFBC63",
  },
  components: {
    Button,
    Card,
    Progress: {
      baseStyle: {
        filledTrack: {},
      },
    },
  },
});

export interface CustomCardProps extends HTMLChakraProps<'div'>, ThemingProps {}