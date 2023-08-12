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
  const font_family = "Poppins";

  return (
    <Card
      bg={bg}
      {...rest}
      borderRadius="10px"
      px="14px"
      py="2"
      fontFamily={font_family}
      h="78px"
      border="1px solid"
      borderColor="rgba(0, 0, 0, 0.11)"
    >
      <Flex align="center" px="5" direction={{ base: "column", md: "row" }}>
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            color={textColorPrimary}
            fontWeight="600"
            fontSize="16px"
            mb="2px"
          >
            {name}
          </Text>
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="16px"
            // mb="4px"
          >
            {email}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
