import { Box, Card, Text } from "@chakra-ui/react";
import React from "react";
import SurveyInput from "./SurveyInput";

type Props = {
  conditions?: any;
  handleform?: any;
  value?: any;
  [x: string]: any;
};
//
export default function OperationalConditions(props: Props) {
  const { conditions, handleform, value, ...rest } = props;

  return (
    <Card borderRadius="10px" p="4" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Operational Conditions
      </Text>

      <Box>
        {/* Common features */}
        {Object.keys(conditions).map((condition: any) => (
          <SurveyInput
            key={condition}
            label={condition}
            size="xs"
            type={condition.type}
            placeholder="0.8"
            inputName={condition}
            value={value && value[condition] ? value[condition] : null}
            handleChange={handleform}
          />
        ))}
      </Box>
    </Card>
  );
}
