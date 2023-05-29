import { Box, Card, Flex } from "@chakra-ui/react";
import Spinner from "components/spinner";
import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
import PurchaseLisence from "views/admin/default/components/PurchaseLisence";
import GenerateSurvey from "./generate";

export default function MultibeamEchoSounder() {
  const [subscription, setSubscription] = useState<any>();
  const [surveys, setSurveys] = useState([]);
  const [surveyID, setSurveyID] = useState(1);
  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const [user, setUser] = useState(null);

  const checkSubscription = () => {
    subscription?.assigned_surveys?.forEach((survey: any) => {
      if (survey?.id == surveyID) {
        setSurveys([survey?.id]);
      }
    });
  };

  useEffect(() => {
    const sub = async () => {
      await fetchSubscriptions();
    };

    checkSubscription();
    setSubscription(subscriptions[subscriptions.length - 1]);

    sub();
  }, [loading, subscription]);

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
    <GenerateSurvey surveyID={1} />
  ) : (
    // <AdminLayout>
    //   <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    //     <Card py="10" px="4">
    //       Hello, and welcome to the Multibeam EchoSounder
    //     </Card>
    //   </Box>
    // </AdminLayout>
    <PurchaseLisence />
  );
}

MultibeamEchoSounder.requireAuth = true;
