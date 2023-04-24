import { Box, Flex } from "@chakra-ui/react";
import Spinner from "components/spinner";
import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
import PurchaseLisence from "views/admin/default/components/PurchaseLisence";

function DynamicLydar() {
  const [subscriptions, setSubscriptions] = useState<any>();
  const [surveyID, setSurveyID] = useState(2);
  const { loading, subscription, fetchSubscription } = useSubscription();
  const [user, setUser] = useState(null);

  const checkSubscription = () => {};

  useEffect(() => {
    fetchSubscription();
    setSubscriptions(subscription[subscription.length - 1]);
  }, [loading]);

  if (loading) {
    return (
      <AdminLayout>
        <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
          <Spinner />;
        </Flex>
      </AdminLayout>
    );
  }

  if (subscriptions?.assigned_surveys?.includes(surveyID)) {
    return (
      <AdminLayout>
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          Hello, and welcome to the Acoustic Sonar Survey
        </Box>
      </AdminLayout>
    );
  }

  return <PurchaseLisence />;
}

export default DynamicLydar;

DynamicLydar.requireAuth = true;
