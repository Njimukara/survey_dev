// Chakra imports
import { Box, Flex, Text } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode

  return (
    <Flex alignItems="center" flexDirection="column">
      <Box>
        <Text mb="30px" fontSize="larger" fontWeight="500">
          Survey Planner
        </Text>
      </Box>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
