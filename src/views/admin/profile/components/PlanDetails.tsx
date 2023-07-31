// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { NextAvatar } from "components/image/Avatar";
import { signOut } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useSubscription } from "contexts/SubscriptionContext";

export default function PlanDetails(props: { [x: string]: any }) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("navy.500", "white");
  const whiteText = useColorModeValue("white", "white");
  const lighttext = useColorModeValue("#757575", "gray.200");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "primary.600" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "primary.600" },
    { bg: "whiteAlpha.100" }
  );
  const mainBg = useColorModeValue({ bg: "white" }, { bg: "whiteAlpha.100" });

  const { loading, subscriptions, currentSubscription, fetchSubscriptions } =
    useSubscription();

  const [, setSubscription] = useState<any>();
  const [presentSubscription, setPresentSubscription] = useState<any>();
  const [totalSpent, setTotalSpent] = useState(0);

  const router = useRouter();

  const formatDate = (date: any) => {
    let newDate = new Date(date)?.toDateString() ?? "Not Set";
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
    if (url) {
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    if (subscriptions.length <= 0) {
      fetchSubscriptions();
    }
    setSubscription(subscriptions[subscriptions.length - 1]);
    setPresentSubscription(currentSubscription);
  }, [loading, subscriptions, fetchSubscriptions, currentSubscription]);

  return (
    <Card
      mb={{ base: "0px", lg: "20px" }}
      borderRadius="10"
      bgGradient={mainBg}
      {...rest}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={2}
        fontFamily="inter"
      >
        <Flex flexDirection="column" w="100%">
          <Card bg="transparent">
            <Text
              data-cy="subscription-card"
              fontFamily="inter"
              fontSize="16px"
              fontWeight="500"
              mb={2}
              color={textColorSecondary}
            >
              Subscirption Details
            </Text>

            {loading ? (
              <Box alignItems="center">
                <Text>Loading</Text>
              </Box>
            ) : (
              <>
                {!presentSubscription ? (
                  <Box py="5">
                    <Text mb="4">You do not have any subscription yet</Text>
                    <Button
                      variant="homePrimary"
                      bg="primary.600"
                      py="5"
                      onClick={() => {
                        router.push("/admin/transactions");
                      }}
                    >
                      Subscribe
                    </Button>
                  </Box>
                ) : (
                  <Box fontFamily="inter">
                    <Flex
                      w="100%"
                      justify="space-between"
                      flexDirection={{ base: "column", lg: "row" }}
                    >
                      <Flex
                        align="left"
                        fontWeight="bold"
                        flexDirection="column"
                      >
                        <Text fontSize="24px" fontWeight="600">
                          {presentSubscription?.plan?.name}
                        </Text>
                        <Text
                          bg={boxBg}
                          px="2"
                          my="2"
                          py="1"
                          w="max-content"
                          borderRadius="10px"
                          color="primary.600"
                        >
                          ${" "}
                          {formatPrice(
                            presentSubscription?.subscription_data?.plan?.amount
                          )}
                          {/* spaces and forward slash */}
                          &nbsp;/&nbsp;
                          {
                            presentSubscription?.subscription_data?.plan
                              ?.interval
                          }
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
                            bg="primary.600"
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
                            bg="primary.600"
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
                          border="1px"
                          borderColor="primary.500"
                          _hover={{ bg: boxBg, color: textColor }}
                        >
                          Cancel
                        </Button>
                      </Flex>
                    </Flex>

                    <Flex align="left" flexDirection="column">
                      <HStack spacing="5px">
                        <Text fontSize="16px" color={lighttext}>
                          Status :{" "}
                        </Text>
                        <Text
                          fontSize="24px"
                          fontWeight="600"
                          color={
                            presentSubscription?.subscription_data?.status ===
                            "active"
                              ? "green.500"
                              : presentSubscription?.subscription_data
                                  ?.status === "past_due"
                              ? "red.500"
                              : presentSubscription?.subscription_data
                                  ?.status === "canceled" || "trialing"
                              ? "red.500"
                              : null
                          }
                        >
                          {presentSubscription?.subscription_data?.status ==
                          "trialing"
                            ? "TRIAL PLAN"
                            : presentSubscription?.subscription_data?.status.toUpperCase()}
                        </Text>
                      </HStack>
                      <Text fontSize="16px" color={lighttext}>
                        Payment Method :{" "}
                        <span
                          style={{
                            fontWeight: "600",
                            fontSize: "24px",
                            color: "black",
                          }}
                        >
                          Stripe Invoice
                        </span>
                      </Text>
                      <Text fontSize="16px" color={lighttext}>
                        Licence bought on:{" "}
                        <span
                          style={{
                            fontWeight: "600",
                            color: "black",
                            fontSize: "24px",
                          }}
                        >
                          <>{formatDate(presentSubscription?.start_date)}</>
                        </span>
                      </Text>
                      <Text color={lighttext}>
                        {presentSubscription?.subscription_data[0]?.status ==
                        "trialing"
                          ? "Confirm License by:"
                          : "Renew License by:"}{" "}
                        <span
                          style={{
                            fontWeight: "600",
                            fontSize: "24px",
                            color: "black",
                          }}
                        >
                          <>{formatDate(presentSubscription?.end_date)}</>
                        </span>
                      </Text>
                    </Flex>
                  </Box>
                )}
              </>
            )}
          </Card>
        </Flex>
      </Flex>
    </Card>
  );
}
