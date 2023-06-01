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

export default function LidarResultCard(props: { [x: string]: any }) {
  const { index } = props;
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );

  return (
    <Card borderRadius="10px" p="4" boxShadow="lg">
      <Text mb="4" fontWeight="bold">
        LiDAR {index}
      </Text>
      <FormControl mb="4">
        <FormLabel fontSize="sm">Swath Width (m)</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="sm"
          size="sm"
          type="text"
          placeholder="0.0"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="sm">Ratio swath/Height-distance</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="sm"
          size="sm"
          type="text"
          placeholder="0.0"
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
          placeholder="0.0"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="sm">Interprofit spacing (m)</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="sm"
          size="sm"
          type="number"
          placeholder="0.0"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Diameter of a footprint</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          size="sm"
          type="number"
          placeholder="0.0"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Range resolution</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          size="sm"
          type="number"
          placeholder="0.0"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">
          Horizontal uncertainty (cm) - 1lampda
        </FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          size="sm"
          type="number"
          placeholder="0.0"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">
          Vertical uncertainty (cm) - 1lampda
        </FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          size="sm"
          type="number"
          placeholder="0.0"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">LiDAR points density (pts/m2)</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="number"
          size="sm"
          placeholder="0.0"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Number of profiles in length</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          size="sm"
          type="number"
          placeholder="0.0"
        />
      </FormControl>
    </Card>
  );
}
