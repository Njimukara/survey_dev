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

export default function LidarParameterCard(props: { [x: string]: any }) {
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
        <FormLabel fontSize="small">Maximum Range (m)*</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="text"
          placeholder="Min 8 characers"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Beam Divergence (mrad)*</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="text"
          placeholder="Min 8 characers"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Signal to Noise Ratio (dB)*</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="text"
          placeholder="Min 8 characers"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Uncertainty of divergence*</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="number"
          placeholder="0001"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Pulse duration (ns)*</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="number"
          placeholder="2"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Pulse repetition rate (KHz)*</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="number"
          placeholder="150"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Range Uncertainty (mm)*</FormLabel>
        <Input
          color={textColorSecondary}
          borderRadius="10px"
          fontSize="small"
          type="number"
          placeholder="2"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">LIDAR scanning angle (*)</FormLabel>
        <Select borderRadius="10px" fontSize="small">
          <option value="option1">75</option>
          <option value="option2">85</option>
          <option value="option3">95</option>
          <option value="option4">100</option>
        </Select>
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="small">Texture (*)</FormLabel>
        <Select borderRadius="10px" fontSize="small">
          <option value="option1">External</option>
          <option value="option2">Internal</option>
        </Select>
      </FormControl>
    </Card>
  );
}
