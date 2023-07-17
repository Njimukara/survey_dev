import { Box, Card, Text } from "@chakra-ui/react";
import React from "react";
import SurveyInput from "./SurveyInput";

type Props = {
  operationConditions?: any;
  handleform?: any;
  value?: any;
  [x: string]: any;
};

export default function OperationalConditionsCard(props: Props) {
  const { operationConditions, handleform, value, ...rest } = props;

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
