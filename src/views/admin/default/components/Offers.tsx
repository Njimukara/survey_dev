// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
// Custom components
import BarChart from "components/charts/BarChart";
import React, { useState } from "react";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "variables/charts";
import { MdBarChart } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";

export default function Offers(props: { [x: string]: any }) {
  const { ...rest } = props;

  const font_family = "Poppins";

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const [offers, setOffers] = useState(false);

  return offers ? (
    <Card
      mb={{ base: "0px", lg: "20px" }}
      fontFamily={font_family}
      borderRadius="10"
      {...rest}
    >
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Weekly Revenue
        </Text>
        <Button
          alignItems="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w="37px"
          h="37px"
          lineHeight="100%"
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
        </Button>
      </Flex>

      <Box h="240px" mt="auto">
        <BarChart
          chartData={barChartDataConsumption}
          chartOptions={barChartOptionsConsumption}
        />
      </Box>
    </Card>
  ) : (
    <Card
      w="100%"
      mb={{ base: "0px", lg: "20px" }}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      borderRadius="10"
      fontFamily={font_family}
    >
      <Icon as={BiErrorCircle} boxSize={24} color="#3A2FB71F" />
      <Text fontSize="16px" fontWeight="400">
        No discounts or promotions or now
      </Text>
    </Card>
  );
}
