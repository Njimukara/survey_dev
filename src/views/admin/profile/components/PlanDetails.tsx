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
  const { loading, subscriptions, currentSubscription, fetchSubscriptions } =
    useSubscription();

  const [subscription, setSubscription] = useState<any>();
  const [presentSubscription, setPresentSubscription] = useState<any>();

  const subscription_status = [
    "incomplete ",
    "incomplete_expired ",
    "trialing ",
    "active ",
    "past_due ",
    "canceled ",
    "unpaid ",
  ];

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

  // format price
  const formatPrice = (price: number) => {
    return price / 100;
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

  const makePayment = () => {
    let url =
      currentSubscription?.invoices[0]?.invoice_data?.hosted_invoice_url;
    // console.log(url);
    router.push(url);
  };

  useEffect(() => {
    // const sub = async () => {
    fetchSubscriptions();
    // };
    setSubscription(subscriptions[subscriptions.length - 1]);
    setPresentSubscription(currentSubscription);

    // sub();
    // console.log(subscriptions);
  }, [loading, currentSubscription]);
  return (
    <Card
      mb={{ base: "0px", lg: "20px" }}
      borderRadius="10"
      bgGradient={
        !presentSubscription ? "white" : "linear(to-r, #3A2FB7, #3A2FB7)"
      }
      {...rest}
    >
      <Flex justifyContent="space-between" alignItems="center" p={2}>
        <Flex flexDirection="column" w="100%">
          <Card
            bg="transparent"
            boxShadow="lg"
            // background: linear-gradient(90.22deg, #3A2FB7 7.43%, rgba(118, 113, 183, 0) 81.71%)
          >
            <Text
              data-cy="subscription-card"
              mb={2}
              color={presentSubscription ? textColorSecondary : whiteText}
            >
              Subscirption Details
            </Text>

            {!loading && !presentSubscription ? (
              <Box py="5">
                <Text mb="4">You do not have any subscription yet</Text>
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
            ) : !loading && presentSubscription ? (
              <Box>
                <Flex
                  w="100%"
                  justify="space-between"
                  flexDirection={{ base: "column", lg: "row" }}
                >
                  <Flex align="left" fontWeight="bold" flexDirection="column">
                    <Text fontSize="larger" fontWeight="bold" color={whiteText}>
                      {presentSubscription?.plan?.name}
                    </Text>
                    <Text
                      bg={boxBg}
                      px="2"
                      my="2"
                      py="1"
                      w="max-content"
                      borderRadius="10px"
                    >
                      ${" "}
                      {formatPrice(
                        presentSubscription?.subscription_data?.plan?.amount
                      )}
                      {/* spaces and forward slash */}
                      &nbsp;/&nbsp;
                      {presentSubscription?.subscription_data?.plan?.interval}
                    </Text>
                  </Flex>
                  <Flex align="center" flexDirection="column">
                    {presentSubscription?.subscription_data?.status ==
                    "incomplete" ? (
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
                        onClick={makePayment}
                      >
                        Make Payment
                      </Button>
                    ) : (
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
                    )}
                    <Button
                      w="150px"
                      fontSize="small"
                      py="4"
                      variant="outline"
                      color={textColor}
                      bg={"white"}
                      border="none"
                      _hover={{ bg: boxBg, color: textColor }}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Flex>

                <Flex align="left" flexDirection="column" color={whiteText}>
                  <Text>Status</Text>
                  <Text color={whiteText} fontSize="large" fontWeight="bold">
                    {presentSubscription?.subscription_data?.status ==
                    "trialing"
                      ? "TRIAL PLAN"
                      : presentSubscription?.subscription_data?.status.toUpperCase()}
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
                      <>{formatDate(presentSubscription?.start_date)}</>
                    </span>
                  </Text>
                  <Text>
                    {presentSubscription?.subscription_data[0]?.status ==
                    "trialing"
                      ? "Confirm License by"
                      : "Renew License by"}{" "}
                    <span style={{ color: whiteText, fontWeight: "bold" }}>
                      <>{formatDate(presentSubscription?.end_date)}</>
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
