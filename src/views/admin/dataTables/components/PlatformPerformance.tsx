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
  platformPerformance?: Array<any>;
  handleform?: any;
  surveyID: number;
  [x: string]: any;
};

export default function PlatformPerformance(props: Props) {
  const { platformPerformance, handleform, ...rest } = props;
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
        {platformPerformance.map((performance) => (
          <SurveyInput
            key={performance.key}
            label={performance.label}
            size="xs"
            type="number"
            placeholder="0.05"
            inputName={performance.name}
            handleChange={handleform}
          />
        ))}
      </Box>
    </Card>
  );
}
