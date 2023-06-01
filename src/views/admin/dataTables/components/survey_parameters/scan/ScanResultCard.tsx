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

export default function ScanResultCard(props: { [x: string]: any }) {
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
        <FormLabel fontSize="sm">Width of the Image (m)</FormLabel>
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
        <FormLabel fontSize="sm">Ratio Image Width/Altitude</FormLabel>
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
        <FormLabel fontSize="sm">Max slant range (m)</FormLabel>
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
        <FormLabel fontSize="sm">Width of the Shadow Zone</FormLabel>
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
        <FormLabel fontSize="small">Line Spacing 50% of overlap</FormLabel>
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
        <FormLabel fontSize="small">Line Spacing 25% of overlap</FormLabel>
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
        <FormLabel fontSize="small">Line Spacing 10% of overlap</FormLabel>
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
        <FormLabel fontSize="small">Along-track resolution R1(cm)</FormLabel>
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
        <FormLabel fontSize="small">Across-track resolution R1(cm)</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="number"
          size="sm"
          placeholder="2"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Along-track resolution R2(cm)</FormLabel>
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
        <FormLabel fontSize="small">Across-track resolution R2(cm)</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="number"
          size="sm"
          placeholder="2"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Uncert in XY of Vector-USBL (cm)</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="number"
          size="sm"
          placeholder="2"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Max-ping rate (Hz)</FormLabel>
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
