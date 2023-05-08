import {
  Card,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

export default function ScanPerformanceSSS(props: { [x: string]: any }) {
  const { index } = props;
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );

  return (
    <Card borderRadius="10px" p="4" boxShadow="lg">
      <Text mb="4" fontWeight="bold">
        SL {index}
      </Text>
      <FormControl mb="4">
        <FormLabel fontSize="sm">
          User defined operating frequency (m)*
        </FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="sm"
          size="sm"
          type="text"
          placeholder="Min 8 characers"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="sm">Horizontal field of view (*)</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="sm"
          size="sm"
          type="text"
          placeholder="Min 8 characers"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="sm">Vertical field of view (*)</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="sm"
          type="text"
          size="sm"
          placeholder="Min 8 characers"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="sm">Pulse duration (us)</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="sm"
          size="sm"
          type="number"
          placeholder="0001"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Beamwidth (*)</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          size="sm"
          type="number"
          placeholder="2"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Depression Angle (*)</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          size="sm"
          type="number"
          placeholder="150"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Max range of SSS (m)*</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="number"
          size="sm"
          placeholder="2"
        />
      </FormControl>
    </Card>
  );
}
