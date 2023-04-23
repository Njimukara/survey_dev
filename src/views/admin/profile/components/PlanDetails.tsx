// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { NextAvatar } from "components/image/Avatar";
import { signOut } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useSubscription } from "contexts/SubscriptionContext";

export default function PlanDetails(props: { [x: string]: any }) {
  const { ...rest } = props;

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

  // const { store } = useSubscriptionContext();
  const { loading, subscription, fetchSubscription } = useSubscription();

  const [subscriptions, setSubscriptions] = useState([]);
  // const calculation = useMemo(() => getSubscriptions(count), [subscription]);

  // const [mounted, setMounted] = useState(false);
  // const [active, setActive] = useState(true);
  // const [isActive, setIsActive] = useState(true);
  // console.log(loading);

  // const date = new Date(date_joined).toLocaleDateString();
  const router = useRouter();

  const formatDate = (date: any) => {
    let newDate = new Date(date).toDateString();
    // console.log(newDate);
    return newDate;
  };

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

  useEffect(() => {
    fetchSubscription();
    setSubscriptions(subscription);
  }, [loading]);
  return (
    <Card mb={{ base: "0px", lg: "20px" }} {...rest}>
      <Flex justifyContent="space-between" alignItems="center" p={2}>
        <Flex flexDirection="column" w="100%">
          <Card
            bgGradient={
              subscriptions.length == 0
                ? "white"
                : "linear(to-b, primary.500, brand.700)"
            }
          >
            <Text
              mb={2}
              color={subscriptions.length == 0 ? textColorSecondary : whiteText}
            >
              Subscirption Details
            </Text>

            {!loading && subscriptions.length == 0 ? (
              <Box py="5">
                <Text mb="4">You do not have any subscription</Text>
                <Button
                  variant="homePrimary"
                  py="5"
                  onClick={() => {
                    router.push("/admin/transactions");
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            ) : !loading && subscriptions.length != 0 ? (
              <Box>
                <Flex
                  w="100%"
                  justify="space-between"
                  flexDirection={{ base: "column", lg: "row" }}
                >
                  <Flex align="left" fontWeight="bold" flexDirection="column">
                    <Text fontSize="larger" fontWeight="bold" color={whiteText}>
                      {subscriptions[0]?.plan?.name}
                    </Text>
                    <Text
                      bg={boxBg}
                      px="2"
                      my="2"
                      py="1"
                      w="max-content"
                      borderRadius="10px"
                    >
                      $ {subscriptions[0]?.subscription_data?.plan?.amount}
                      {/* spaces and forward slash */}
                      &nbsp;/&nbsp;
                      {subscriptions[0]?.subscription_data?.plan?.interval}
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
                      variant="outline"
                      color={textColor}
                      bg={"white"}
                      _hover={{ bg: boxBg, color: textColor }}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Flex>

                <Flex align="left" flexDirection="column" color={whiteText}>
                  <Text>Status</Text>
                  <Text color={whiteText} fontSize="large" fontWeight="bold">
                    {subscriptions[0]?.subscription_data?.status == "trialing"
                      ? "Trial Plan"
                      : subscriptions[0]?.subscription_data?.status}
                  </Text>
                  <Text>
                    Payment Method :{" "}
                    <span color={whiteText}>Stripe Invoice</span>
                  </Text>
                  {/* <Text fontSize='larger' fontWeight='extrabold'>
                  Stripe
                </Text> */}
                  <Text>
                    Licence bought on{" "}
                    <span style={{ color: whiteText, fontWeight: "bold" }}>
                      <>{formatDate(subscriptions[0]?.start_date)}</>
                    </span>
                  </Text>
                  <Text>
                    {subscriptions[0]?.subscription_data[0]?.status ==
                    "trialing"
                      ? "Confirm License by"
                      : "Renew License by"}{" "}
                    <span style={{ color: whiteText, fontWeight: "bold" }}>
                      <>{formatDate(subscriptions[0]?.end_date)}</>
                    </span>
                  </Text>
                </Flex>
              </Box>
            ) : (
              <Box alignItems="center">
                <Text>Loading</Text>
              </Box>
            )}
          </Card>
        </Flex>
        {/* <Flex>Payment Details</Flex> */}
      </Flex>
    </Card>
  );
}
