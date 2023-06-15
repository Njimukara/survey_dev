import { Box, Card, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SurveyInput from "./SurveyInput";
import { useSurveyContext } from "contexts/Survey";

type Props = {
  calibrations?: Array<any>;
  surveyID: number;
  handleform?: any;
  [x: string]: any;
};
//
export default function Calibrations(props: Props) {
  const { calibrations, handleform, surveyID, ...rest } = props;
  const { loading, form, handleFormChange } = useSurveyContext();

  useEffect(() => {
    console.log(loading);
    console.log(form);
  }, [loading]);

  return (
    <Card borderRadius="10px" p="4" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Calibration Parameters
      </Text>

      <Box>
        {/* Common features */}
        {calibrations.map((calibration: any) => (
          <SurveyInput
            key={calibration.key}
            label={calibration.label}
            size="xs"
            type="number"
            placeholder="0.8"
            inputName={calibration.name}
            handleChange={handleform}
          />
        ))}
      </Box>
    </Card>
  );
}
