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

export default function PerformanceSurvey(props: Props) {
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
        <GridItem colSpan={5} h="8">
          <Text size={size}>{label}</Text>
        </GridItem>
        {type != "select" && (
          <>
            {/* {array.map((item, index) => (
              <GridItem colSpan={1} h="8" key={index}>
                <Input
                  color={textColorSecondary}
                  w="100%"
                  name={`${name}${item}`}
                  fontSize={size}
                  variant="flushed"
                  value={value1}
                  size={size}
                  type={type}
                  placeholder="0.02"
                  onChange={handleFormChange}
                />
              </GridItem>
            ))} */}
            <GridItem colSpan={1} h="8">
              <Input
                name={`${name}1`}
                color={textColorSecondary}
                w="100%"
                fontSize={size}
                variant="flushed"
                // value={value1}
                size={size}
                type={type}
                placeholder="0.02"
                onChange={handleFormChange}
              />
            </GridItem>
            <GridItem colSpan={1} h="8">
              <Input
                name={`${name}2`}
                color={textColorSecondary}
                w="100%"
                fontSize={size}
                variant="flushed"
                // value={value2}
                size={size}
                type={type}
                onChange={handleFormChange}
                placeholder="0.02"
              />
            </GridItem>
            <GridItem colSpan={1} h="8">
              <Input
                name={`${name}3`}
                color={textColorSecondary}
                w="100%"
                fontSize={size}
                variant="flushed"
                // value={value3}
                size={size}
                type={type}
                onChange={handleFormChange}
                placeholder="0.02"
              />
            </GridItem>
            <GridItem colSpan={1} h="8">
              <Input
                name={`${name}4`}
                color={textColorSecondary}
                w="100%"
                fontSize={size}
                variant="flushed"
                // value={value4}
                size={size}
                type={type}
                onChange={handleFormChange}
                placeholder="0.02"
              />
            </GridItem>
          </>
        )}
        {type == "select" && (
          <>
            {/* {array.map((item, index) => (
              <GridItem key={index}>
                <Select
                  name={`${name}${item}`}
                  size="xs"
                  fontSize="xs"
                  variant="flushed"
                  onChange={handleFormChange}
                >
                  {options.map((opt, indexx) => (
                    <option value={opt} key={indexx + 1}>
                      {opt}
                    </option>
                  ))}
                </Select>
              </GridItem>
            ))} */}
            <GridItem>
              <Select
                onChange={handleFormChange}
                name={name + "1"}
                size="xs"
                fontSize="xs"
                variant="flushed"
              >
                {options.map((opt, index) => (
                  <option value="option1" key={index + 1}>
                    {opt}
                  </option>
                ))}
              </Select>
            </GridItem>
            <GridItem>
              <Select
                onChange={handleFormChange}
                name={name + "2"}
                size="xs"
                fontSize="xs"
                variant="flushed"
              >
                {options.map((opt, index) => (
                  <option value="option1" key={index + 2}>
                    {opt}
                  </option>
                ))}
              </Select>
            </GridItem>
            <GridItem>
              <Select
                onChange={handleFormChange}
                name={name + "3"}
                size="xs"
                fontSize="xs"
                variant="flushed"
              >
                {options.map((opt, index) => (
                  <option value="option1" key={index + 3}>
                    {opt}
                  </option>
                ))}
              </Select>
            </GridItem>
            <GridItem>
              <Select
                onChange={handleFormChange}
                name={name + "4"}
                size="xs"
                fontSize="xs"
                variant="flushed"
              >
                {options.map((opt, index) => (
                  <option value="option1" key={index + 4}>
                    {opt}
                  </option>
                ))}
              </Select>
            </GridItem>
          </>
        )}
      </Grid>
    </Box>
  );
}
