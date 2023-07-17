import { Box, Card, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import SurveyInput from "./SurveyInput";

type Props = {
  Leverarm?: any;
  handleform?: any;
  value?: any;
  [x: string]: any;
};

export default function LeverarmCard(props: Props) {
  const { Leverarm, handleform, value, ...rest } = props;

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

        {Object.keys(Leverarm).map((lever: any) => (
          <SurveyInput
            key={lever}
            label={lever}
            size="xs"
            type={lever.type}
            placeholder="0.8"
            inputName={lever}
            value={value && value[lever] ? value[lever] : ""}
            handleChange={handleform}
          />
        ))}
        {/* {Leverarm.map((lever) => (
          <SurveyInput
            key={lever.key}
            label={lever.label}
            size="xs"
            type="number"
            placeholder="0.05"
            inputName={lever.name1}
            value={value && value[lever.name1] ? value[lever.name1] : ""}
            handleChange={handleform}
          />
        ))} */}
      </Box>
      {/* <Box>
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
      </Box> */}
    </Card>
  );
}
