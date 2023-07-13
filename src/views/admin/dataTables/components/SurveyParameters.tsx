import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSurveyContext } from "contexts/Survey";
import React, { useState, useEffect } from "react";

interface Props {
  label?: string;
  name?: string;
  value1?: number;
  value2?: number;
  value3?: number;
  value4?: number;
  size?: string;
  placeholder?: string;
  type?: string;
  options?: any[];
}

export default function ParameterCard(props: Props) {
  const {
    label,
    name,
    value1,
    value2,
    value3,
    value4,
    size,
    type,
    placeholder,
    options,
    ...rest
  } = props;
  const textColorSecondary = useColorModeValue("black", "secondaryGray.300");

  // variables
  const [lidar, setLidar] = useState(2);
  const [multibeam, setMultibeam] = useState(1);
  const [scan, setScan] = useState(3);
  const [acoustic, setAcoustic] = useState(4);
  const array = [1, 2, 3, 4];

  const { loading, form, handleFormChange } = useSurveyContext();

  useEffect(() => {
    // console.log(value1, value2, value3, value4);
  });

  return (
    <Box>
      <Grid templateColumns="repeat(9, 1fr)" gap="1">
        <GridItem colSpan={5} h="10">
          <Text fontWeight="semibold" fontSize={"sm"}>
            {label}
          </Text>
        </GridItem>
        <>
          <GridItem colSpan={1} h="10">
            <Text w="100%" fontSize={size} fontWeight="bold">
              {value1}
            </Text>
          </GridItem>
          <GridItem colSpan={1} h="10">
            <Text w="100%" fontSize={size} fontWeight="bold">
              {value2}
            </Text>
          </GridItem>
          <GridItem colSpan={1} h="10">
            <Text w="100%" fontSize={size} fontWeight="bold">
              {value3}
            </Text>
          </GridItem>
          <GridItem colSpan={1} h="10">
            <Text w="100%" fontSize={size} fontWeight="bold">
              {value4}
            </Text>
          </GridItem>
        </>
      </Grid>
    </Box>
  );
}
