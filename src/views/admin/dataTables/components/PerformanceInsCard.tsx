import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SurveyInput from "./SurveyInput";
import { useSurveyContext } from "contexts/Survey";

type Props = {
  performance_ins?: Array<any>;
  handleform?: any;
  surveyID: number;
  [x: string]: any;
};

export default function PerformanceInsCard(props: Props) {
  const { performance_ins, handleform, surveyID, ...rest } = props;
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );

  const { loading, form, handleFormChange } = useSurveyContext();

  // variables
  const [pitchboresight, setPitchboresight] = useState(null);
  const [rollBoresight, setRollBoresight] = useState(null);
  const [yawBoresight, setYawBoresight] = useState(null);
  const [yawUncertainty, setYawUncertainty] = useState(null);
  const [pitchUncertainty, setPitchUncertainty] = useState(null);
  const [rollUncertainty, setRollUncertainty] = useState(null);
  const [latencyGNSSINS, setLatencyGNSSINS] = useState(null);
  const [latencyGNSSUSBL, setLatencyGNSSUSBL] = useState(null);
  const [latencyUnctyGNSSINS, setLatencyUnctyGNSSINS] = useState(null);
  const [latencyUnctyGNSSLiDAR, setlatencyUnctyGNSSLiDAR] = useState(null);

  const [lidar, setLidar] = useState(2);
  const [multibeam, setMultibeam] = useState(1);
  const [scan, setScan] = useState(3);
  const [acoustic, setAcoustic] = useState(4);

  return (
    <Card borderRadius="10px" p="4" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Performance INS/GNSS/USBL
      </Text>
      <Box>
        {performance_ins.map((performance) => (
          <SurveyInput
            key={performance.key}
            label={performance.label}
            size="xs"
            type="number"
            placeholder="0.05"
            // value={pitchUncertainty}
            inputName={performance.name}
            handleChange={handleform}
          />
        ))}
      </Box>
    </Card>
  );
}
