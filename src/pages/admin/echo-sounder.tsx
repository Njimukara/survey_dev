import { Box, Card, Flex } from "@chakra-ui/react";
import Spinner from "components/spinner";
import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
import PurchaseLisence from "views/admin/default/components/PurchaseLisence";

interface Survey {
  id: number;
  name: string;
  is_active: boolean;
  is_delete: boolean;
}
function EchoSounder() {
  const [subscriptions, setSubscriptions] = useState<any>();
  const [surveys, setSurveys] = useState([]);
  const [surveyID, setSurveyID] = useState(3);
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
          Hello, and welcome to the Acoustic Sonar Survey
        </Card>
      </Box>
    </AdminLayout>
  ) : (
    <PurchaseLisence />
  );
  // <PurchaseLisence />;
}

export default EchoSounder;

EchoSounder.requireAuth = true;
