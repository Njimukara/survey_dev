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
import React, { useState } from "react";

export default function CloudPoints(props: { [x: string]: any }) {
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

  if (surveyID == lidar) {
    return (
      <Card borderRadius="10px" p="2" w="100%" {...rest}>
        <Text mb="4" fontWeight="bold" textTransform="uppercase">
          Reduction of cloud points
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="10px" mb="5px">
          <Flex flexDirection="column">
            <FormControl mb="4">
              <FormLabel fontSize="xs">'Reduction of cloud points</FormLabel>
              <Select borderRadius="10px" fontSize="xs">
                <option value="GNSS">GNSS</option>
                <option value="Tide">Tide</option>
              </Select>
            </FormControl>
          </Flex>
        </SimpleGrid>
      </Card>
    );
  } else if (surveyID == multibeam) {
    return (
      <Card borderRadius="10px" p="2" boxShadow="lg" w="100%" {...rest}>
        <Text mb="4" fontWeight="bold" textTransform="uppercase">
          Sounding reduction
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="10px" mb="5px">
          <Flex flexDirection="column">
            <FormControl mb="4">
              <FormLabel fontSize="xs">Sounding reduction</FormLabel>
              <Select borderRadius="10px" fontSize="xs">
                <option value="GNSS">GNSS</option>
                <option value="Tide">Tide</option>
              </Select>
            </FormControl>
          </Flex>
        </SimpleGrid>
      </Card>
    );
  } else return;
}
