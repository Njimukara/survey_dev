// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { useEffect, useState } from "react";

export default function CurrentPlan(props: { [x: string]: any }) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("navy.500", "white");
  const whiteText = useColorModeValue("white", "white");
  const textColordark = useColorModeValue("black", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgButton = useColorModeValue("primary.500", "blue.300");
  const bgHover = useColorModeValue(
    { bg: "primary.600" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "primary.600" },
    { bg: "whiteAlpha.100" }
  );

  const [isActive, setIsActive] = useState(true);

  return (
    <Card
      justifyContent="center"
      flexDirection="column"
      w="100%"
      mb="0px"
      bgGradient="linear(to-b, primary.500, brand.700)"
      {...rest}
    >
      <Flex
        justify="space-between"
        ps="0px"
        pe="20px"
        pb="15px"
        pt="5px"
        w="100%"
      >
        <Flex align="center" w="100%">
          <Text color={whiteText}>Current Plan</Text>
        </Flex>
      </Flex>
      {isActive ? (
        <Box>
          <Flex
            w="100%"
            justify="space-between"
            flexDirection={{ base: "column", lg: "row" }}
          >
            <Flex align="left" fontWeight="bold" flexDirection="column">
              <Text fontSize="larger" color={whiteText}>
                Single Product Monthly
              </Text>
              <Text
                bg={boxBg}
                px="2"
                my="2"
                py="1"
                w="max-content"
                borderRadius="10px"
              >
                $40/Month
              </Text>
            </Flex>
            <Flex align="center" flexDirection="column">
              <Button
                w="150px"
                mb="15px"
                fontSize="small"
                variant="homePrimary"
                py="6"
                color={whiteText}
                bg={bgButton}
                _hover={bgHover}
                _focus={bgFocus}
                _active={bgFocus}
              >
                Upgrade Plan
              </Button>
              <Button
                variant="outline"
                py="5"
                w="150px"
                fontSize="small"
                color={textColor}
                bg={boxBg}
              >
                Cancel
              </Button>
            </Flex>
          </Flex>

          <Flex align="left" flexDirection="column" color={whiteText}>
            <Text>
              Status{" "}
              <span style={{ color: whiteText, fontWeight: "bold" }}>
                Active
              </span>
            </Text>
            <Text>
              Payment Method{" "}
              <span style={{ color: whiteText, fontWeight: "bold" }}>
                Stripe
              </span>
            </Text>
            <Text>
              Licence bought on{" "}
              <span style={{ color: whiteText, fontWeight: "bold" }}>
                September 9, 2022
              </span>
            </Text>
            <Text>
              Renew licence by{" "}
              <span style={{ color: whiteText, fontWeight: "bold" }}>
                September 9, 2023
              </span>
            </Text>
          </Flex>
        </Box>
      ) : (
        <Box>
          <Text my="4" fontWeight="bold" fontSize="lg" color={textColordark}>
            No subscription plan
          </Text>
          <Text my="4">
            We are glad to have you here with us! Please complete your
            subscription in order to use all products
          </Text>
          <Button variant="homePrimary">Subscribe</Button>
        </Box>
      )}
    </Card>
  );
}
