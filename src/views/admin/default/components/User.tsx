// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";

export default function User(props: {
  name: string;
  email?: string;
  [x: string]: any;
}) {
  const { name, email, link, image, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const bg = useColorModeValue("white", "navy.700");

  return (
    <Card bg={bg} {...rest} borderRadius="10px" p="14px">
      <Flex align="center" px="5" direction={{ base: "column", md: "row" }}>
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            color={textColorPrimary}
            fontWeight="600"
            fontSize="md"
            mb="4px"
          >
            {name}
          </Text>
          <Text
            color={textColorPrimary}
            fontWeight="400"
            fontSize="sm"
            mb="4px"
          >
            {email}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
