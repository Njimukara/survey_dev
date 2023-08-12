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
    options,
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

  const formattedString = (inputString: string) => {
    return inputString
      .replace(/^.*?\./, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  };

  if (type != "select") {
    return (
      <FormControl display="flex" mb="1">
        <FormLabel flex={1} fontSize="sm" fontWeight="400">
          {formattedString(label)}
        </FormLabel>
        <Input
          color={textColorSecondary}
          w="20%"
          value={value || ""}
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

  if (type == "select") {
    return (
      <Select
        onChange={(e) => handleChange(e)}
        name={inputName}
        size="xs"
        fontSize="xs"
        variant="flushed"
        value={value || ""}
      >
        {options?.map((opt: string, index: number) => (
          <option value={opt} key={index}>
            {opt}
          </option>
        ))}
      </Select>
    );
  }
}
