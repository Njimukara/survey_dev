// Chakra imports
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// import axios from "axios";
import Card from "components/card/Card";
// import { NextAvatar } from "components/image/Avatar";
import { signOut } from "next-auth/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
// import { useSubscription } from "contexts/SubscriptionContext";
import axiosConfig from "axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { fetchSubscriptions } from "redux/subscriptionsSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PlanDetails(props: { [x: string]: any }) {
  const { ...rest } = props;

  const font_family = "Poppins";
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.reduxStore.subscrptions
  );
  const { currentSubscription } = data;
  const subscriptionStatus =
    currentSubscription?.subscription_data?.status?.toLowerCase();

  const showAlert = useMemo(() => {
    const isStatusActive = subscriptionStatus === "active";
    const isStatusTrialing = subscriptionStatus === "trialing";
    const isStatusIncomplete = subscriptionStatus === "incomplete";

    // Return true or false based on your conditions
    return !isStatusActive || isStatusTrialing || isStatusIncomplete;
  }, [subscriptionStatus]);

  const updateSubscriptions = () => {
    dispatch(fetchSubscriptions("/api/plans/subscription/"));
  };

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

  const [presentSubscription, setPresentSubscription] = useState<any>();
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
    await axiosConfig
      .delete(`/auth/users/me/`)
      .then(() => {
        signOut({ callbackUrl: "http://localhost:3000" });
      })
      .catch(() => {
        console.log("error loggin out");
      });
  };

  const subscribeAgain = () => {};

  const makePayment = () => {
    let url =
      currentSubscription?.invoices[0]?.invoice_data?.hosted_invoice_url;
    if (url) {
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    updateSubscriptions();
  }, []);

  useEffect(() => {
    if (currentSubscription) {
      // console.log("current subscription", currentSubscription);
      setPresentSubscription(currentSubscription);
    }
  }, [currentSubscription]);

  return (
    <Card
      mb={{ base: "0px", lg: "20px" }}
      borderRadius="10"
      border="1px solid"
      bgGradient={mainBg}
      borderColor="rgba(0, 0, 0, 0.11)"
      {...rest}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        // p={1}
        fontFamily={font_family}
      >
        <Flex flexDirection="column" w="100%">
          <Card bg="transparent">
            <Text
              data-cy="subscription-card"
              fontFamily={font_family}
              fontSize="16px"
              fontWeight="500"
              mb={4}
              color={lighttext}
            >
              Subscirption Details
            </Text>

            {isLoading ? (
              <Box alignItems="center" fontFamily={font_family}>
                <Skeleton height={150} />
              </Box>
            ) : (
              <>
                {!presentSubscription ? (
                  <Box py="5" fontFamily={font_family}>
                    <Text mb="4">You do not have any subscription yet</Text>
                    <Button
                      variant="homePrimary"
                      bg="primary.600"
                      h="48px"
                      py="0"
                      onClick={() => {
                        router.push("/admin/transactions");
                      }}
                    >
                      Subscribe
                    </Button>
                  </Box>
                ) : (
                  <Box fontFamily={font_family}>
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
                        <Text fontSize="24px" mb={2} fontWeight="600">
                          {presentSubscription?.plan?.name}
                        </Text>
                        <Text
                          bg={boxBg}
                          px="6"
                          my="2"
                          py="1"
                          fontWeight="500"
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
                        {presentSubscription?.subscription_data?.status?.toLowerCase() ===
                          "trialing" ||
                        presentSubscription?.subscription_data?.status?.toLowerCase() ===
                          "incomplete" ? (
                          <>
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
                          </>
                        ) : presentSubscription?.subscription_data?.status.toLowerCase() ===
                          "canceled" ? (
                          <Flex direction="column">
                            <Button
                              w="150px"
                              mb="15px"
                              fontSize="small"
                              py="4"
                              variant="homePrimary"
                              bg="primary.600"
                              color={whiteText}
                              _hover={bgHover}
                              _focus={bgFocus}
                              _active={bgFocus}
                              onClick={makePayment}
                            >
                              Make Payment
                            </Button>
                            <Button
                              w="150px"
                              fontSize="small"
                              py="4"
                              variant="outline"
                              color={textColor}
                              bg={"white"}
                              border="1px"
                              borderColor="primary.500"
                              onClick={() => router.push("/admin/transactions")}
                            >
                              Subscribe
                            </Button>
                          </Flex>
                        ) : (
                          <>
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
                              onClick={() => router.push("/")}
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
                              border="1px"
                              borderColor="primary.500"
                              _hover={{ bg: boxBg, color: textColor }}
                              onClick={() => router.push("/")}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
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
                            fontSize: "16px",
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
                            fontSize: "16px",
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
                            fontSize: "16px",
                            color: "black",
                          }}
                        >
                          <>{formatDate(presentSubscription?.end_date)}</>
                        </span>
                      </Text>
                    </Flex>
                    {showAlert && (
                      <Alert
                        status="info"
                        fontSize="14px"
                        py={1}
                        mt={2}
                        borderRadius="6px"
                      >
                        <AlertIcon />
                        Just made payment? Click{" "}
                        <Button
                          onClick={() => router.reload()}
                          py={0}
                          px={1}
                          bg="none"
                          textDecoration="underline"
                        >
                          HERE
                        </Button>{" "}
                        to refresh
                      </Alert>
                    )}
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
