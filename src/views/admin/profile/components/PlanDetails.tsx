// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { NextAvatar } from "components/image/Avatar";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PlanDetails(props: {
  avatar: string;
  name: string;
  email: string;
  date_joined: number | string;
  [x: string]: any;
}) {
  const { avatar, name, email, date_joined, ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("navy.500", "white");
  const whiteText = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const textColordark = useColorModeValue("black", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("primary.500", "blue.300");
  const bgHover = useColorModeValue(
    { bg: "primary.600" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "primary.600" },
    { bg: "whiteAlpha.100" }
  );

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const date = new Date(date_joined).toLocaleDateString();
  const router = useRouter();

  // delete user acount
  const deleteAccount = async () => {
    await axios
      .delete(`https://surveyplanner.pythonanywhere.com/auth/users/me/`)
      .then(() => {
        signOut({ callbackUrl: "http://localhost:3000" });
      })
      .catch(() => {
        console.log("error loggin out");
      });
  };

  return (
    <Card mb={{ base: "0px", lg: "20px" }} {...rest}>
      <Flex justifyContent="space-between" alignItems="center" p={2}>
        <Flex flexDirection="column" w="100%">
          <Card bgGradient="linear(to-b, primary.500, brand.700)">
            <Text mb={2} color={whiteText}>
              Subscirption Details
            </Text>
            <Box>
              <Flex
                w="100%"
                justify="space-between"
                flexDirection={{ base: "column", lg: "row" }}
              >
                <Flex align="left" fontWeight="bold" flexDirection="column">
                  <Text fontSize="larger" fontWeight="bold" color={whiteText}>
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
                    mb="15px"
                    w="150px"
                    fontSize="small"
                    variant="homePrimary"
                    py="5"
                    color={whiteText}
                    _hover={bgHover}
                    _focus={bgFocus}
                    _active={bgFocus}
                  >
                    Upgrade Plan
                  </Button>
                  <Button
                    w="150px"
                    fontSize="small"
                    py="4"
                    variant="homePrimary"
                    color={textColor}
                    bg={boxBg}
                    _hover={{ bg: bgHover, color: textColor }}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Flex>

              <Flex align="left" flexDirection="column" color={whiteText}>
                <Text>Status</Text>
                <Text color={whiteText} fontSize="large" fontWeight="bold">
                  Active
                </Text>
                <Text>
                  Payment Method : <span color={whiteText}>Stripe</span>
                </Text>
                {/* <Text fontSize='larger' fontWeight='extrabold'>
                  Stripe
                </Text> */}
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
          </Card>
        </Flex>
        {/* <Flex>Payment Details</Flex> */}
      </Flex>
    </Card>
  );
}
