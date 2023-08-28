// Chakra imports
import { Box, Flex, Text } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  const font_family = "Poppins";

  return (
    <Flex alignItems="center" flexDirection="column">
      <Box pe={{ lg: "20px", "2xl": "20px" }}>
        <Text
          mb="30px"
          fontFamily={font_family}
          fontSize="32px"
          textAlign="center"
          fontWeight="600"
        >
          Survey Planner
        </Text>
      </Box>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
