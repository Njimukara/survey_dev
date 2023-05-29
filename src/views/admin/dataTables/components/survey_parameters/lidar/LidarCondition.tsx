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

export default function LIdarCondition(props: { [x: string]: any }) {
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
            <FormLabel fontSize="sm">Flying height or distance (m)</FormLabel>
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
            <FormLabel fontSize="sm">Angle of incidence of a beam ()</FormLabel>
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
            <FormLabel fontSize="sm">Overlap rate (%)</FormLabel>
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
        </Flex>
        <Flex flexDirection="column">
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
            <FormLabel fontSize="sm">Width of study area (Km)</FormLabel>
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
            <FormLabel fontSize="sm">Length of study area (Km)</FormLabel>
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
