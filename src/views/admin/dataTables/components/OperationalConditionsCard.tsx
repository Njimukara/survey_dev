import { Box, Card, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SurveyInput from "./SurveyInput";
import { useSurveyContext } from "contexts/Survey";

type Props = {
  operationConditions?: any;
  handleform?: any;
  surveyID: number;
  value?: any;
  [x: string]: any;
};

export default function OperationalConditionsCard(props: Props) {
  const { operationConditions, handleform, value, surveyID, ...rest } = props;

  const { handleFormChange } = useSurveyContext();

  return (
    <Card borderRadius="10px" p="4" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Operational Conditions
      </Text>
      <Box>
        {Object.keys(operationConditions).map((conditions: any) => (
          <SurveyInput
            key={conditions}
            label={conditions}
            size="xs"
            type={conditions.type}
            placeholder="0.8"
            inputName={conditions}
            value={value && value[conditions] ? value[conditions] : ""}
            handleChange={handleform}
          />
        ))}
      </Box>
    </Card>
  );
}
