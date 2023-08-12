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
import axiosConfig from "axiosConfig";

interface Subscription {
  plan: any;
  subscription_data: any;
  start_date: string;
  end_date: string;
}

interface Props {
  subscription: Subscription;
  textColorSecondary: string;
  upgrade: any;
}

function SubscriptionDetails({
  subscription,
  textColorSecondary,
  upgrade,
}: Props) {
  const font_family = "Poppins";

  const formatDate = (date: any) => {
    let newDate = new Date(date).toDateString();
    return newDate;
  };
  const handleUpgrade = () => {
    upgrade(true);
  };
  // format price
  const formatPrice = (price: number) => {
    return price / 100;
  };
  return (
    <Card fontFamily={font_family}>
      <Text mb={2} color={textColorSecondary}>
        Subscription Details
      </Text>
      <Flex py="5" px="2">
        <Box w="100%" pr="10" display="flex" flexDirection="column">
          <Text color={textColorSecondary} fontSize="sm">
            Plan
          </Text>
          <Text fontWeight="600" fontSize="lg">
            {subscription?.plan?.name}
          </Text>
        </Box>
        <Box w="100%" pr="10" display="flex" flexDirection="column">
          <Text color={textColorSecondary} fontSize="sm">
            Cost
          </Text>
          <Text fontWeight="600" fontSize="lg">
            ${formatPrice(subscription?.subscription_data?.plan?.amount)} /{" "}
            {subscription?.subscription_data?.plan?.interval}
          </Text>
        </Box>
        <Box w="100%" pr="10" display="flex" flexDirection="column">
          <Text color={textColorSecondary} fontSize="sm">
            Purchased on
          </Text>
          <Text fontWeight="600" fontSize="lg">
            {formatDate(subscription?.start_date)}
          </Text>
        </Box>
        <Box w="100%" pr="10" display="flex" flexDirection="column">
          <Text color={textColorSecondary} fontSize="sm">
            Renewal Date
          </Text>
          <Text fontWeight="600" fontSize="lg">
            {formatDate(subscription?.end_date)}
          </Text>
        </Box>
      </Flex>

      <Box py="3">
        <Text py="3" color={textColorSecondary}>
          Plan Benefits
        </Text>
        <Flex flexDirection="column" justifyContent="center">
          {subscription?.plan?.features.map((benefit: any) => (
            <Text pl="5" pb="2" key="">
              <Icon
                as={MdCheckCircle}
                color="primary.600"
                fontSize="18px"
                mx="1"
              />
              {benefit?.description}
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
  );
}

export default function SubscirptionDetails(props: { [x: string]: any }) {
  const { upgrade, ...rest } = props;

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const [subscription, setSubscription] = useState<any>();

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

  useEffect(() => {
    if (!subscriptions) {
      fetchSubscriptions().catch((error: any) => {
        console.error("Failed to fetch subsciprions:", error);
      });
    }
    setSubscription(subscriptions[subscriptions.length - 1]);
  }, [loading, subscriptions, fetchSubscriptions]);

  return (
    <Card mb={{ base: "0px", lg: "20px" }} borderRadius="10">
      <Flex justifyContent="space-between" alignItems="center" p={2}>
        <Flex flexDirection="column" w="100%">
          <SubscriptionDetails
            subscription={subscription}
            textColorSecondary={textColorSecondary}
            upgrade={upgrade}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
