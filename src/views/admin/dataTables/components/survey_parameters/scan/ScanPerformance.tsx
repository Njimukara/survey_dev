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

export default function ScanPerformance(props: { [x: string]: any }) {
  const { ...rest } = props;
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );

  return (
    <Card borderRadius="10px" p="4" boxShadow="lg" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Performance INS/GNSS/USBL
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <Flex flexDirection="column">
          <FormControl mb="4">
            <FormLabel fontSize="sm">Yaw uncertainty (*)</FormLabel>
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
            <FormLabel fontSize="sm">Roll uncertainty (*)</FormLabel>
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
            <FormLabel fontSize="sm">Pitch uncertainty (*)</FormLabel>
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
            <FormLabel fontSize="sm">
              Positioning uncertainty in H (m)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.02"
            />
          </FormControl>
        </Flex>

        <Flex flexDirection="column">
          <FormControl mb="4">
            <FormLabel fontSize="sm">
              Positioning uncertainty in V (m)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="0.04"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">Heave uncertainty (*)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="6"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">
              Slant range Uncertainty of the USBL (m)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="6"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontSize="sm">
              Angle Uncertainty of the USBL (*)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius="10px"
              fontSize="sm"
              size="sm"
              type="number"
              placeholder="6"
            />
          </FormControl>
        </Flex>
      </SimpleGrid>
    </Card>
  );
}
