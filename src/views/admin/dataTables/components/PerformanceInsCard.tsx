import { Box, Card, Text } from "@chakra-ui/react";
import React from "react";
import SurveyInput from "./SurveyInput";

type Props = {
  performance_ins?: any;
  handleform?: any;
  value?: any;
  [x: string]: any;
};

export default function PerformanceInsCard(props: Props) {
  const { performance_ins, handleform, value, ...rest } = props;

  return (
    <Card borderRadius="10px" p="4" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Performance INS/GNSS/USBL
      </Text>
      <Box>
        {Object.keys(performance_ins).map((performance: any) => (
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
