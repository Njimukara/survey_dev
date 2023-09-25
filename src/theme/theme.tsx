"use client";
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
import { CardStyles as Card } from "./components/Card";
import { inputTheme } from "./components/Inputs";

import { globalStyles } from "./styles";
export default extendTheme(
  {
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
      html: `'Poppins', sans-serif`,
      p: `'Poppins', sans-serif`,
      Text: `'Poppins', sans-serif`,
      input: `'Poppins', sans-serif`,
      label: `'Poppins', sans-serif`,
    },
    breakpoints,
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
  },
  globalStyles,
  badgeStyles,
  linkStyles,
  progressStyles,
  sliderStyles,
  inputStyles,
  textareaStyles,
  switchStyles,
  CardComponent
);

export interface CustomCardProps extends HTMLChakraProps<"div">, ThemingProps {}
