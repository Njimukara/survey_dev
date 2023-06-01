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
import React, { useEffect, useState } from "react";
import SurveyInput from "./SurveyInput";
import { useSurveyContext } from "contexts/Survey";

export default function Calibrations(props: { [x: string]: any }) {
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

        <SurveyInput
          label="Pitch boresight (*)"
          size="xs"
          type="number"
          placeholder="0.8"
          inputName="pitchboresight"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label="Roll boresight"
          size="xs"
          type="number"
          placeholder="0.08"
          inputName="rollBoresight"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label="Yaw boresight"
          size="xs"
          type="number"
          placeholder="0.08"
          inputName="yawBoresight"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label="Pitch boresight uncertainty (*)"
          size="xs"
          type="number"
          placeholder="0.08"
          inputName="pitchUncertainty"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label="Roll boresight uncertainty (*)"
          size="xs"
          type="number"
          placeholder="0.08"
          inputName="rollUncertainty"
          handleChange={handleFormChange}
        />
        <SurveyInput
          label="Yaw boresight uncertainty (*)"
          size="xs"
          type="number"
          placeholder="0.08"
          inputName="yawUncertainty"
          handleChange={handleFormChange}
        />

        {/* LiDAR */}
        {surveyID == lidar && (
          <>
            <SurveyInput
              label="Latency GNSS/INS (ms)"
              size="xs"
              type="number"
              placeholder="0.08"
              inputName="lentencyGNSSINS"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Latency GNSS/LIiDAR (ms)"
              size="xs"
              type="number"
              placeholder="0.08"
              inputName="lentencyGNSSINS"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Uncty of latency GNSS/INS (ms)"
              size="xs"
              type="number"
              placeholder="0.08"
              inputName="latencyUncertaintyGNSS/INS"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label=" Uncty of latency GNSS/LiDAR (ms)"
              size="xs"
              type="number"
              placeholder="0.08"
              inputName="latencyUncertaintyGNSSLiDAR"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Latency GNSS/LIiDAR (ms)"
              size="xs"
              type="number"
              placeholder="0.08"
              inputName="lentencyGNSSINS"
              handleChange={handleFormChange}
            />
          </>
        )}

        {(surveyID == scan || surveyID == acoustic) && (
          <>
            {/* Scan */}
            <SurveyInput
              label="Latency GNSS/INS of the USBL (s)"
              size="xs"
              type="number"
              placeholder="0.08"
              inputName="lentencyGNSSINS"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="Latency GNSS/USBL (s)"
              size="xs"
              type="number"
              placeholder="0.08"
              inputName="ltencyGNSSUSBL"
              handleChange={handleFormChange}
            />
          </>
        )}

        {surveyID == multibeam && (
          <>
            {/* multibeam */}
            <SurveyInput
              label="Latency GNSS/SMF (ms)"
              size="xs"
              type="number"
              placeholder="0.08"
              inputName="lentencyGNSSSMF"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label=" Uncty of latency GNSS/SMF (ms)"
              size="xs"
              type="number"
              placeholder="0.08"
              inputName="latencyUncertaintyGNSSSMF"
              handleChange={handleFormChange}
            />
          </>
        )}
        {surveyID == lidar ||
          (surveyID == multibeam && (
            <>
              <SurveyInput
                label="Latency GNSS/INS (ms)"
                size="xs"
                type="number"
                placeholder="0.08"
                inputName="lentencyGNSSINS"
                handleChange={handleFormChange}
              />
              <SurveyInput
                label="Uncty of latency GNSS/INS (ms)"
                size="xs"
                type="number"
                placeholder="0.08"
                inputName="latencyUncertaintyGNSS/INS"
                handleChange={handleFormChange}
              />
            </>
          ))}
        {/* 2d acoustic */}
      </Box>

      {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        
          
        </Flex>
        <Flex flexDirection="column">
          <FormControl mb="4">
            <FormLabel fontSize="sm">Yaw boresight uncertainty (*)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.2"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">
              Latency GNSS/INS of the USBL (s)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.2"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">Latency GNSS/USBL (s)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.2"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="small">
              Uncty of latency GNSS/INS (ms)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="small"
              type="number"
              placeholder="0.2"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="small">
              Uncty of latency GNSS/LiDAR (ms)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="small"
              type="number"
              placeholder="0.2"
            />
          </FormControl>
        </Flex>
      </SimpleGrid> */}
    </Card>
  );
}
