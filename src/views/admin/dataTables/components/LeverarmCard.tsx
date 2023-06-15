import { Box, Card, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import SurveyInput from "./SurveyInput";
import { useSurveyContext } from "contexts/Survey";

type Props = {
  Leverarm?: Array<any>;
  surveyID: number;
  handleform?: any;
  [x: string]: any;
};

export default function LeverarmCard(props: Props) {
  const { Leverarm, handleform, surveyID, ...rest } = props;
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );
  const { loading, form, handleFormChange } = useSurveyContext();

  return (
    <Card borderRadius="10px" p="4" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Lever arm measures between
      </Text>
      <Box>
        <Text
          mb="2"
          fontSize="sm"
          fontWeight="semibold"
          textTransform="capitalize"
        >
          std (m)
        </Text>
        {Leverarm.map((lever) => (
          <SurveyInput
            key={lever.key}
            label={lever.label}
            size="xs"
            type="number"
            placeholder="0.05"
            inputName={lever.name1}
            handleChange={handleform}
          />
        ))}
      </Box>
      <Box>
        <Text
          mb="2"
          fontSize="sm"
          fontWeight="semibold"
          textTransform="capitalize"
        >
          Ford (m)
        </Text>
        <SurveyInput
          label={Leverarm[0].label}
          size="xs"
          type="number"
          placeholder="0.05"
          inputName={Leverarm[0].name2}
          handleChange={handleform}
        />
        <SurveyInput
          label={Leverarm[1].label}
          size="xs"
          type="number"
          placeholder="0.05"
          inputName={Leverarm[1].name2}
          handleChange={handleform}
        />
      </Box>
      <Box>
        <Text
          mb="2"
          fontSize="sm"
          fontWeight="semibold"
          textTransform="capitalize"
        >
          Down (m)
        </Text>
        <SurveyInput
          label={Leverarm[2].label}
          size="xs"
          type="number"
          placeholder="0.05"
          inputName={Leverarm[2].name2}
          handleChange={handleform}
        />
        <SurveyInput
          label={Leverarm[2].label}
          size="xs"
          type="number"
          placeholder="0.05"
          inputName={Leverarm[2].name2}
          handleChange={handleform}
        />
      </Box>
    </Card>
  );
}
