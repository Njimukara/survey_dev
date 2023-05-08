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

export default function LeverarmCard(props: { [x: string]: any }) {
  const { ...rest } = props;
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );

  return (
    <Card borderRadius="10px" p="4" boxShadow="lg" w="100%" {...rest}>
      <Text mb="4" fontWeight="bold" textTransform="uppercase">
        Lever arm measures between
      </Text>
      <Card p="4" mb="6" boxShadow="lg">
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
      </Card>
      <Flex gap="2">
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
        {/*  */}
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
      </Flex>
    </Card>
  );
}
