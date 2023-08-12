import { extendTheme, HTMLChakraProps, ThemingProps } from "@chakra-ui/react";
import { CardComponent } from "./additions/card/card";
import { buttonStyles as Button } from "./components/button";
import { badgeStyles } from "./components/badge";
import { inputStyles } from "./components/input";
import { progressStyles } from "./components/progress";
import { sliderStyles } from "./components/slider";
import { textareaStyles } from "./components/textarea";
import { switchStyles } from "./components/switch";
import { linkStyles } from "./components/link";
import { breakpoints } from "./foundations/breakpoints";
// import { buttonStyles as Button } from './components/Button'
import { CardStyles as Card } from "./components/Card";
import { inputTheme } from "./components/Inputs";

import { globalStyles } from "./styles";
export default extendTheme(
  {
    fonts: {
      heading: `'Poppins', sans-serif'`,
      body: `'Poppins', sans-serif'`,
    },
    breakpoints,
    // colors: {
    //   primary: {
    //     100: "#ebe6ff",
    //     200: "#c3b5ff",
    //     300: "#9b84ff",
    //     400: "#7353ff",
    //     500: "#3203FC",
    //     600: "#3A2FB7",
    //     700: "#1c0580",
    //     800: "#10034c",
    //     900: "#050119",
    //   },
    //   secondary: {
    //     500: "#F4F7FE",
    //   },
    //   secondaryGray: {
    //     100: "#E0E5F2",
    //     200: "#E1E9F8",
    //     300: "#F4F7FE",
    //     400: "#E9EDF7",
    //     500: "#8F9BBA",
    //     600: "#A3AED0",
    //     700: "#707EAE",
    //     800: "#707EAE",
    //     900: "#1B2559",
    //   },
    //   // primary_dark: "#B16B0D",
    //   // red: "#D53F5B",
    //   // purple: "#8B1A9F",
    //   // pink: "#FA59BF",
    //   // yellow: "#FFD027",
    //   // yellow: "#FFBC63",
    // },
    components: {
      Button,
      Card,
      Input: inputTheme,
      Progress: {
        baseStyle: {
          filledTrack: {},
        },
      },
    },
  }, // Breakpoints
  globalStyles,
  badgeStyles, // badge styles
  // buttonStyles, // button styles
  linkStyles, // link styles
  progressStyles, // progress styles
  sliderStyles, // slider styles
  inputStyles, // input styles
  textareaStyles, // textarea styles
  switchStyles, // switch styles
  CardComponent // card component
);

export interface CustomCardProps extends HTMLChakraProps<"div">, ThemingProps {}
