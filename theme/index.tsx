import { extendTheme, theme as base } from "@chakra-ui/react";
import { buttonStyles as Button } from "./components/Button";
import { globalStyles } from './styles';

export const theme = extendTheme({
  fonts: {
    body: `DM Sans ${base.fonts?.heading}`,
  },
  globalStyles,
  // colors: {
  //   primary: "#ED8803",
  //   primary_dark: "#B16B0D",
  //   red: "#D53F5B",
  //   purple: "#8B1A9F",
  //   pink: "#FA59BF",
  //   yellow: "#FFD027",
  //   // yellow: "#FFBC63",
  // },
  components: {
    Button,
    Progress: {
      baseStyle: {
        filledTrack: {},
      },
    },
  },
  colorScheme: {
    yellow: "#F0D281",
  },
});