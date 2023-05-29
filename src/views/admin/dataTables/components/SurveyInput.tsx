import {
  Box,
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

export default function SurveyInput(props: { [x: string]: any }) {
  const {
    label,
    size,
    type,
    value,
    inputName,
    placeholder,
    handleChange,
    ...rest
  } = props;
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );

  const [data, setData] = useState(value);

  return (
    <FormControl display="flex" mb="1">
      <FormLabel flex={1} fontSize="sm">
        {label}
      </FormLabel>
      <Input
        color={textColorSecondary}
        w="20%"
        value={data}
        fontSize={size}
        variant="flushed"
        size={size}
        type={type}
        placeholder={placeholder}
        name={inputName}
        onChange={(e) => handleChange(e)}
      />
    </FormControl>
  );
}
