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

export default function PerformanceInsCard(props: { [x: string]: any }) {
  const { surveyID, ...rest } = props;
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
        {/* LIDAR and Multibeam */}

        <SurveyInput
          label=" Yaw uncertainty (*)"
          size="xs"
          type="number"
          placeholder="0.05"
          // value={yawUncertainty}
          inputName="yawUncertainty"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label="Roll uncertainty (*)"
          size="xs"
          type="number"
          placeholder="0.05"
          // value={rollUncertainty}
          inputName="rollUncertainty"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label="Pitch uncertainty (*)"
          size="xs"
          type="number"
          placeholder="0.05"
          // value={pitchUncertainty}
          inputName="pitchUncertainty"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label="Positioning uncertainty in H (m)"
          size="xs"
          type="number"
          placeholder="0.05"
          // value={pitchUncertainty}
          inputName="positioningUncertaintyH"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label=" Positioning uncertainty in V (m)"
          size="xs"
          type="number"
          placeholder="0.05"
          // value={pitchUncertainty}
          inputName="positioningUncertaintyV"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label=" Heave uncertainty (*)"
          size="xs"
          type="number"
          placeholder="0.05"
          // value={pitchUncertainty}
          inputName="heaveUncertaintyH"
          handleChange={handleFormChange}
        />

        {(surveyID == scan || surveyID == acoustic) && (
          <>
            {/* SCAN and ACOUSTic */}
            <SurveyInput
              label=" Slant range Uncertainty of the USBL (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              // value={pitchUncertainty}
              inputName="slantRangeUncertainty"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Angle Uncertainty of the USBL (*)"
              size="xs"
              type="number"
              placeholder="0.05"
              // value={pitchUncertainty}
              inputName="uncertaintyAngleUSBL"
              handleChange={handleFormChange}
            />
          </>
        )}
      </Box>
    </Card>
  );
}
