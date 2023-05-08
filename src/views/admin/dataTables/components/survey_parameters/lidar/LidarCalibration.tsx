import {
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
import React from "react";

export default function LidarCalibration(props: { [x: string]: any }) {
  const { ...rest } = props;
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );

  return (
    <Card borderRadius="10px" p="4" boxShadow="lg" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Calibration Parameters
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <Flex flexDirection="column">
          <FormControl mb="4">
            <FormLabel fontSize="sm">Pitch boresight (*)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.8"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">Roll boresight</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.05"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">Yaw boresight</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="480"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel fontSize="sm">Roll boresight uncertainty (*)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.02"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">Pitch boresight uncertainty (*)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.002"
            />
          </FormControl>
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
            <FormLabel fontSize="sm">Latency GNSS/INS (ms)</FormLabel>
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
            <FormLabel fontSize="sm">Latency GNSS/LiDAR (ms)</FormLabel>
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
            <FormLabel fontSize="sm">Uncty of latency GNSS/INS (ms)</FormLabel>
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
              Uncty of latency GNSS/LiDAR (ms)
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
        </Flex>
      </SimpleGrid>
    </Card>
  );
}
