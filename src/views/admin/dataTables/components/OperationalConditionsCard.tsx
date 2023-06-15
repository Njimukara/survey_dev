import { Box, Card, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SurveyInput from "./SurveyInput";
import { useSurveyContext } from "contexts/Survey";

type Props = {
  operationConditions?: Array<any>;
  handleform?: any;
  surveyID: number;
  [x: string]: any;
};

export default function OperationalConditionsCard(props: Props) {
  const { operationConditions, handleform, surveyID, ...rest } = props;

  const { handleFormChange } = useSurveyContext();

  return (
    <Card borderRadius="10px" p="4" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Operational Conditions
      </Text>
      <Box>
        {operationConditions.map((calibration) => (
          <SurveyInput
            key={calibration.key}
            label={calibration.label}
            size="xs"
            type="number"
            placeholder="0.05"
            inputName={calibration.name}
            handleChange={handleform}
          />
        ))}
      </Box>
    </Card>
  );
}
