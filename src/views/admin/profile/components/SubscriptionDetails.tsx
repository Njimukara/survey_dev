// Chakra imports
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { NextAvatar } from "components/image/Avatar";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSubscription } from "contexts/SubscriptionContext";
import { MdCheckCircle } from "react-icons/md";

export default function SubscirptionDetails(props: { [x: string]: any }) {
  const { upgrade, ...rest } = props;

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

  const { loading, subscription, fetchSubscription } = useSubscription();

  const [subscriptions, setSubscriptions] = useState<any>();
  const router = useRouter();

  const formatDate = (date: any) => {
    let newDate = new Date(date).toDateString();
    return newDate;
  };

  const handleUpgrade = () => {
    upgrade(true);
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
    setSubscriptions(subscription[subscription.length - 1]);
  }, [loading]);
  return (
    <Card mb={{ base: "0px", lg: "20px" }} borderRadius="10" {...rest}>
      <Flex justifyContent="space-between" alignItems="center" p={2}>
        <Flex flexDirection="column" w="100%">
          <Card>
            <Text mb={2} color={textColorSecondary}>
              Subscirption Details
            </Text>
            <Flex py="5" px="2">
              <Box w="100%" pr="10" display="flex" flexDirection="column">
                <Text color={textColorSecondary} fontSize="sm">
                  Plan
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  {subscriptions?.plan?.name}
                </Text>
              </Box>
              <Box w="100%" pr="10" display="flex" flexDirection="column">
                <Text color={textColorSecondary} fontSize="sm">
                  Cost
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  ${subscriptions?.subscription_data?.plan?.amount} /&nbsp;
                  {subscriptions?.subscription_data?.plan?.interval}
                </Text>
              </Box>
              <Box w="100%" pr="10" display="flex" flexDirection="column">
                <Text color={textColorSecondary} fontSize="sm">
                  Purchased on
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  {formatDate(subscriptions?.start_date)}
                </Text>
              </Box>
              <Box w="100%" pr="10" display="flex" flexDirection="column">
                <Text color={textColorSecondary} fontSize="sm">
                  Renewal Date
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  {formatDate(subscriptions?.end_date)}
                </Text>
              </Box>
            </Flex>

            <Box py="3">
              <Text py="3" color={textColorSecondary}>
                Plan Benefits
              </Text>
              <Flex flexDirection="column" justifyContent="center">
                {subscriptions?.plan?.features.map((benefit: any) => (
                  <Text pl="5" pb="2" key="">
                    <Icon
                      as={MdCheckCircle}
                      color="primary.500"
                      fontSize="18px"
                      mx="1"
                    />
                    {benefit.description}
                  </Text>
                ))}
              </Flex>
              <Flex my="5">
                <Button
                  onClick={handleUpgrade}
                  _hover={{ bg: "none" }}
                  bg="none"
                  color="primary.400"
                >
                  Upgrade Subscription
                </Button>
                <Button _hover={{ bg: "none" }} bg="none" color="red.600">
                  Cancel Subscription
                </Button>
              </Flex>
            </Box>
          </Card>
        </Flex>
        {/* <Flex>Payment Details</Flex> */}
      </Flex>
    </Card>
  );
}
