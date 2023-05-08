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

export default function ScanCondition(props: { [x: string]: any }) {
  const { ...rest } = props;
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );

  return (
    <Card borderRadius="10px" p="4" boxShadow="lg" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Operational Conditions
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <Flex flexDirection="column">
          <FormControl mb="4">
            <FormLabel fontSize="sm">Mean Sound Speed (m/s)</FormLabel>
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
            <FormLabel fontSize="sm">Max depth of the SVP (m)</FormLabel>
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
            <FormLabel fontSize="sm">SVS uncertainty (m/s)</FormLabel>
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
            <FormLabel fontSize="sm">SVP uncertainty (m/s)</FormLabel>
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
            <FormLabel fontSize="sm">
              Uncert SVP beyond its max depth (m)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.05"
            />
          </FormControl>
        </Flex>
        <Flex flexDirection="column">
          <FormControl mb="4">
            <FormLabel fontSize="sm">Tide uncertainty (m)</FormLabel>
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
            <FormLabel fontSize="sm">Co-tidal uncertainty (m)</FormLabel>
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
            <FormLabel fontSize="sm">Altitude of the SSS (m)</FormLabel>
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
            <FormLabel fontSize="sm">
              Distance X between SSS and USBL (m)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.05"
            />
          </FormControl>
        </Flex>
      </SimpleGrid>
    </Card>
  );
}
