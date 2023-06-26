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

type Props = {
  platformPerformance?: any;
  handleform?: any;
  surveyID: number;
  value?: any;
  [x: string]: any;
};

export default function PlatformPerformance(props: Props) {
  const { platformPerformance, handleform, value, ...rest } = props;
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
        {Object.keys(platformPerformance).map((performance: any) => (
          <SurveyInput
            key={performance}
            label={performance}
            size="xs"
            type={performance.type}
            placeholder="0.8"
            inputName={performance}
            value={value && value[performance] ? value[performance] : ""}
            handleChange={handleform}
          />
        ))}
      </Box>
    </Card>
  );
}
