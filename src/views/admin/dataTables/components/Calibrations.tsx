import { Box, Card, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SurveyInput from "./SurveyInput";
import { useSurveyContext } from "contexts/Survey";

type Props = {
  calibrations?: any;
  surveyID: number;
  handleform?: any;
  value?: any;
  [x: string]: any;
};
//
export default function Calibrations(props: Props) {
  const { calibrations, handleform, value, surveyID, ...rest } = props;
  const { loading, handleFormChange } = useSurveyContext();

  useEffect(() => {
    console.log(calibrations);
    console.log("form", value);
  }, [loading]);

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
