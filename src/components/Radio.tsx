import { Box, useRadio } from "@chakra-ui/react";

function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "primary.500",
          color: "white",
          borderColor: "primary.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={3}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard;
