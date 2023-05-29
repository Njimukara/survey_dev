import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import SurveyInput from "./SurveyInput";
import { useSurveyContext } from "contexts/Survey";

export default function PlatformPerformance(props: { [x: string]: any }) {
  const { ...rest } = props;
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );

  const { loading, form, handleFormChange } = useSurveyContext();

  return (
    <Card borderRadius="10px" p="4" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Survey Platform Performance
      </Text>
      <Box>
        <SurveyInput
          label=" Surevy Speed (Km/h) - [1kn ~ 1.85 km/h]"
          size="xs"
          type="number"
          placeholder="0.05"
          inputName="surveySpeed"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label="Survey Speed Uncertainty (km/h)"
          size="xs"
          type="number"
          placeholder="0.05"
          inputName="surveySpeedUncertainty"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label="Draft Uncertainty (m)"
          size="xs"
          type="number"
          placeholder="0.05"
          inputName="draftUncertainty"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label="Variation in Z due to loads (m)"
          size="xs"
          type="number"
          placeholder="0.05"
          inputName="zVariation"
          handleChange={handleFormChange}
        />
      </Box>
    </Card>
  );
}
