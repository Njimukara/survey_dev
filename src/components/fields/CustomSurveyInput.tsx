import {
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

interface SurveyInputProps {
  field: any;
  form: any;
  label: string;
  type: string;
  options?: any[];
}

export default function CustomSurveyInput({
  field,
  form,
  label,
  type,
  options,
  ...rest
}: SurveyInputProps) {
  const textColorSecondary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.300"
  );

  const formattedString = (inputString: string) => {
    return inputString
      .replace(/^.*?\./, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  };

  return (
    <FormControl
      //   w="50%"
      isInvalid={Boolean(form.touched[field.name] && form.errors[field.name])}
      display="flex"
      alignItems="center"
      justifyContent="center"
      mb="1"
    >
      <FormLabel flex={1} fontSize="sm" fontWeight="semibold">
        {formattedString(label)}
      </FormLabel>
      {/* <Box display="flex" flexDir="column"> */}
      {type !== "select" ? (
        <Input
          {...field}
          {...rest}
          required
          //   color={textColorSecondary}
          borderBottom="1px solid gray"
          w="20%"
          type={type}
          fontSize="xs"
          variant="flushed"
          size="sm"
          onChange={field.onChange}
        />
      ) : (
        <Select
          {...field}
          {...rest}
          required
          size="sm"
          fontSize="xs"
          variant="flushed"
        >
          {options?.map((opt: any, index: React.Key) => (
            <option value={opt} key={index}>
              {opt}
            </option>
          ))}
        </Select>
      )}
      <FormErrorMessage pl="1">{form.errors[field.name]}</FormErrorMessage>
      {/* </Box> */}
    </FormControl>
  );
}
