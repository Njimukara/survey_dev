import { Box, Card, Flex } from "@chakra-ui/react";
import Spinner from "components/spinner";
import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
import PurchaseLisence from "views/admin/default/components/PurchaseLisence";

function DynamicLydar() {
  const [subscriptions, setSubscriptions] = useState<any>();
  const [surveyID, setSurveyID] = useState(2);
  const [surveys, setSurveys] = useState([]);
  const { loading, subscription, fetchSubscription } = useSubscription();
  const [user, setUser] = useState(null);

  const checkSubscription = () => {
    subscriptions?.assigned_surveys?.forEach((survey: any) => {
      if (survey?.id == surveyID) {
        setSurveys([survey?.id]);
      }
    });
  };

  useEffect(() => {
    const sub = async () => {
      await fetchSubscription();
    };
    setSubscriptions(subscription[subscription.length - 1]);
    checkSubscription();

    sub();
  }, [loading, subscriptions]);

  if (loading) {
    return (
      <AdminLayout>
        <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      </AdminLayout>
    );
  }

  return surveys.length > 0 ? (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card py="10" px="4">
          Hello, and welcome to the Dynamic Lydar
        </Card>
      </Box>
    </AdminLayout>
  ) : (
    <PurchaseLisence />
  );
}

export default DynamicLydar;

DynamicLydar.requireAuth = true;
