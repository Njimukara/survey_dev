import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const CustomInput = ({ field, form, label, placeholder, type }: any) => {
  return (
    <FormControl
      isInvalid={Boolean(form.touched[field.name] && form.errors[field.name])}
      mt={4}
    >
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input type={type} id={field.name} {...field} placeholder={placeholder} />
      <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
