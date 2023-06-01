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
import React, { useState } from "react";

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

  return (
    <Box>
      <Grid templateColumns="repeat(9, 1fr)" gap="1">
        <GridItem colSpan={5} h="5">
          <Text fontWeight="semibold" fontSize={"sm"}>
            {label}
          </Text>
        </GridItem>
        <>
          {/* {array.map((item, index) => (
              <GridItem colSpan={1} h="8" key={index}>
                <Input
                  color={textColorSecondary}
                  w="100%"
                  name={`${name}${item}`}
                  fontSize={size}
                  variant="flushed"
                  value={}
                  size={size}
                  type={type}
                  placeholder="0.02"
                  onChange={handleFormChange}
                />
              </GridItem>
            ))} */}
          <GridItem colSpan={1} h="8">
            {/* <Input
                color={textColorSecondary}
                w="100%"
                isDisabled
                fontSize={size}
                variant="flushed"
                value={value1}
                size={size}
                type={type}
                placeholder="0.02"
              /> */}
            <Text w="100%" fontSize={size}>
              {value1}
            </Text>
          </GridItem>
          <GridItem colSpan={1} h="8">
            {/* <Input
                color={textColorSecondary}
                w="100%"
                isDisabled
                fontSize={size}
                variant="flushed"
                value={value2}
                size={size}
                type={type}
                placeholder="0.02"
              /> */}
            <Text w="100%" fontSize={size}>
              {value2}
            </Text>
          </GridItem>
          <GridItem colSpan={1} h="8">
            {/* <Input
                color={textColorSecondary}
                w="100%"
                isDisabled
                fontSize={size}
                variant="flushed"
                value={value3}
                size={size}
                type={type}
                placeholder="0.02"
              /> */}
            <Text w="100%" fontSize={size}>
              {value3}
            </Text>
          </GridItem>
          <GridItem colSpan={1} h="8">
            {/* <Input
                isDisabled
                color={textColorSecondary}
                w="100%"
                fontSize={size}
                variant="flushed"
                value={value4}
                size={size}
                type={type}
                placeholder="0.02"
              /> */}
            <Text w="100%" fontSize={size}>
              {value4}
            </Text>
          </GridItem>
        </>
      </Grid>
    </Box>
  );
}
