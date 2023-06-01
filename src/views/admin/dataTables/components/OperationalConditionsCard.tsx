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

export default function OperationalConditionsCard(props: { [x: string]: any }) {
  const { surveyID, ...rest } = props;
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );

  // variables
  const [lidar, setLidar] = useState(2);
  const [multibeam, setMultibeam] = useState(1);
  const [scan, setScan] = useState(3);
  const [acoustic, setAcoustic] = useState(4);

  const { loading, form, handleFormChange } = useSurveyContext();

  return (
    <Card borderRadius="10px" p="4" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Operational Conditions
      </Text>
      {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px"> */}
      <Box>
        {/* {surveyID == lidar || (surveyID == multibeam && <></>)} */}
        {surveyID == lidar && (
          <>
            <SurveyInput
              label="Tide uncertainty (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="tideUncertainty"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Co-tidal uncertainty (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="cotidalUncertainty"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Flying height or distance (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="flyingHeight"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label=" Angle of incidence of a beam (*)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="beamAngleIncidence"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label=" Overlap rate (%)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="overlapRate"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Width of the study area (km)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="studyAreaWidth"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Length of the study area (km)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="studyAreaLength"
              handleChange={handleFormChange}
            />
          </>
        )}

        {(surveyID == scan ||
          surveyID == multibeam ||
          surveyID == acoustic) && (
          <>
            <SurveyInput
              label="Mean Sound Speed (m/s)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="meanSoundSpeed"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Max depth of the SVP (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="maxSVPdepth"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="SVS uncertainty (m/s)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="SVSuncertainty"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="SVP uncertainty (m/s)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="SVPuncertainty"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Uncert SVP beyond its max depth (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="SVPuncertaintyMaxDepth"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Tide uncertainty (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="tideUncertainty"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Co-tidal uncertainty (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="cotidalUncertainty"
              handleChange={handleFormChange}
            />
          </>
        )}

        {surveyID == scan && (
          <>
            {/* SCAN */}

            {/* <SurveyInput
              label="Flying height or distance (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="flyingHeight"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label=" Angle of incidence of a beam (*)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="beamAngleIncidence"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label=" Overlap rate (%)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="overlapRate"
              handleChange={handleFormChange}
            /> */}

            <SurveyInput
              label=" Altitude of the SSS (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="SSSAltitude"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label=" Distance X between SSS and USBL (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="XDistanceSSSUSBL"
              handleChange={handleFormChange}
            />
            {/* <SurveyInput
              label="Width of the study area (km)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="studyAreaWidth"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Length of the study area (km)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="studyAreaLength"
              handleChange={handleFormChange}
            /> */}
          </>
        )}
        {surveyID == multibeam && (
          <>
            {/* Multibeam */}
            <SurveyInput
              label="Depth (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="depth"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Incidence Angle of MBES (*)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="incidenceAngleMBES"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Incidence Angle of MBES (*)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="incidenceAngleMBES"
              handleChange={handleFormChange}
            />
          </>
        )}
        {surveyID == acoustic && (
          <>
            {/* Acoustic */}
            <SurveyInput
              label="Altitude of AC (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="ACAltiude"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Distance x between AC/USBL (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="ACAltiude"
              handleChange={handleFormChange}
            />
          </>
        )}
      </Box>
    </Card>
  );
}
