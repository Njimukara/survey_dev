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
import React, { useState } from "react";

interface Props {
  label?: string;
  name?: string;
  value1?: string;
  value2?: string;
  value3?: string;
  value4?: string;
  size?: string;
  nameprefix?: string;
  handleform?: any;
  placeholder?: string;
  type?: string;
  options?: any[];
}

export default function PerformanceSurvey(props: Props) {
  const {
    label,
    name,
    handleform,
    value1,
    value2,
    value3,
    value4,
    nameprefix,
    size,
    type,
    placeholder,
    options,
    ...rest
  } = props;
  const textColorSecondary = useColorModeValue("black", "secondaryGray.300");
  const array = [0, 1, 2, 3];

  return (
    <Box>
      <Grid templateColumns="repeat(9, 1fr)" gap="1">
        <GridItem colSpan={5} h="8">
          <Text size={size}>{label}</Text>
        </GridItem>
        {type != "select" && (
          <>
            {array.map((index) => (
              <GridItem key={index} colSpan={1} h="8">
                <Input
                  name={`${nameprefix}.${index}.${value1}`}
                  color={textColorSecondary}
                  w="100%"
                  fontSize={size}
                  variant="flushed"
                  size={size}
                  type={type}
                  placeholder="0.02"
                  onChange={handleform}
                />
              </GridItem>
            ))}
          </>
        )}
        {type == "select" && (
          <>
            {array.map((index) => (
              <GridItem key={index}>
                <Select
                  onChange={handleform}
                  name={`${nameprefix}.${index}.${value1}`}
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
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
}
