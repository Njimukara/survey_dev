import { Box, Card, Text } from "@chakra-ui/react";
import React from "react";
import SurveyInput from "./SurveyInput";

type Props = {
  calibrations?: any;
  handleform?: any;
  value?: any;
  [x: string]: any;
};
//
export default function Calibrations(props: Props) {
  const { calibrations, handleform, value, ...rest } = props;

  return (
    <Card borderRadius="10px" p="4" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Calibration Parameters
      </Text>

      <Box>
        {/* Common features */}
        {Object.keys(calibrations).map((calibration: any) => (
          <SurveyInput
            key={calibration}
            label={calibration}
            size="xs"
            type={calibration.type}
            placeholder="0.8"
            inputName={calibration}
            value={value && value[calibration] ? value[calibration] : null}
            handleChange={handleform}
          />
        ))}
      </Box>
    </Card>
  );
}
