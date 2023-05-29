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

export default function LeverarmCard(props: { [x: string]: any }) {
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
        <SurveyInput
          label="Lever arms Uncertainty (m)"
          size="xs"
          type="number"
          placeholder="0.05"
          inputName="stdUncertaincyAngleUSBL"
          handleChange={handleFormChange}
        />
        {surveyID == lidar && (
          <>
            <SurveyInput
              label="GNSS and LiDAR (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="stdGNSLiDAR"
              handleChange={handleFormChange}
            />
          </>
        )}

        {/* SCAN */}
        {(surveyID == scan || surveyID == acoustic) && (
          <>
            <SurveyInput
              label=" GNSS and USBL Transducer (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="stdGNSSUSBLtransducer"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="INS of the USBL and the GNSS (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="stINSGNSSUSBL"
              handleChange={handleFormChange}
            />
          </>
        )}
        {/* Multibeam*/}
        {(surveyID == multibeam || surveyID == lidar) && (
          <>
            <SurveyInput
              label=" GNSS and SMF (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="stdGNSSSMF"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="INS and GNSS (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="stdINSGNSS"
              handleChange={handleFormChange}
            />
          </>
        )}
      </Box>
      <Box>
        <Text
          mb="2"
          fontSize="sm"
          fontWeight="semibold"
          textTransform="capitalize"
        >
          Ford (m)
        </Text>
        {surveyID == lidar && (
          <>
            <SurveyInput
              label="GNSS and LiDAR (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="fordGNSSLiDAR"
              handleChange={handleFormChange}
            />
          </>
        )}

        {/* SCAN */}
        {(surveyID == scan || surveyID == acoustic) && (
          <>
            <SurveyInput
              label=" GNSS and USBL Transducer (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="fordGNSSUSBLtransducer"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="INS of the USBL and the GNSS (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="fordINSGNSSUSBL"
              handleChange={handleFormChange}
            />
          </>
        )}
        {/* Multibeam*/}
        {(surveyID == multibeam || surveyID == lidar) && (
          <>
            <SurveyInput
              label="INS and GNSS (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="fordINSGNSS"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label=" GNSS and SMF (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="fordGNSSSMF"
              handleChange={handleFormChange}
            />
          </>
        )}
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
        {surveyID == lidar && (
          <>
            <SurveyInput
              label="GNSS and LiDAR (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="downGNSSLiDAR"
              handleChange={handleFormChange}
            />
          </>
        )}

        {/* SCAN */}
        {(surveyID == scan || surveyID == acoustic) && (
          <>
            <SurveyInput
              label=" GNSS and USBL Transducer (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="downGNSSUSBLtransducer"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label="INS of the USBL and the GNSS (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="downINSGNSSUSBL"
              handleChange={handleFormChange}
            />
          </>
        )}
        {/* Multibeam*/}
        {(surveyID == multibeam || surveyID == lidar) && (
          <>
            <SurveyInput
              label="INS and GNSS (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="downINSGNSS"
              handleChange={handleFormChange}
            />
            <SurveyInput
              label=" GNSS and SMF (m)"
              size="xs"
              type="number"
              placeholder="0.05"
              inputName="downGNSSSMF"
              handleChange={handleFormChange}
            />
          </>
        )}
      </Box>
      {/* <Card p="4" mb="6" boxShadow="lg">
        <Text mb="3" fontWeight="bold" fontSize="large">
          Std (m)
        </Text>
        <Flex gap="2">
          <FormControl mb="4">
            <FormLabel fontSize="sm">GNSS and LiDAR (m)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.01"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">INS and LiDAR (m)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.01"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">Lever arms uncertainty (m)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.01"
            />
          </FormControl>
        </Flex>
      </Card> */}
      {/* <Flex gap="2">
        <Card p="4" w="100%" boxShadow="lg">
          <Text mb="3" fontWeight="bold" fontSize="large">
            Ford (m)
          </Text>
          <FormControl mb="4">
            <FormLabel fontSize="sm">GNSS and LiDAR (m)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.01"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">INS and GNSS (m)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.01"
            />
          </FormControl>
        </Card>
        <Card p="4" w="100%" boxShadow="lg">
          <Text mb="3" fontWeight="bold" fontSize="large">
            Down (m)
          </Text>
          <FormControl mb="4">
            <FormLabel fontSize="sm">GNSS and LiDAR (m)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.01"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">INS and GNSS (m)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.01"
            />
          </FormControl>
        </Card>
      </Flex> */}
    </Card>
  );
}
