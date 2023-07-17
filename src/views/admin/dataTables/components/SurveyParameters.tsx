import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";

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
