import { Box, Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import Spinner from "components/spinner";
import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
import PurchaseLisence from "views/admin/default/components/PurchaseLisence";
import GenerateSurvey from "./generate";

export default function AcousticSonar() {
  const [subscription, setSubscription] = useState<any>();
  const [surveys, setSurveys] = useState([]);
  const [surveyID, setSurveyID] = useState(4);
  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
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
      await fetchSubscriptions();
    };
    // setSurveys([4]);
    setSubscription(subscriptions[subscriptions.length - 1]);
    checkSubscription();

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
    <GenerateSurvey surveyID={4} />
  ) : (
    // <AdminLayout>
    //   {/* <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    //     <Flex mt="15px">
    //     </Flex>
    //     <Flex mt="15px" mb="4">
    //     </Flex>
    //     <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
    //     </SimpleGrid>
    //     <Flex mt="4" justifyContent="center" alignItems="center">
    //     <Button variant="homePrimary" size="lg">
    //     Generate Survey
    //     </Button>
    //     </Flex>
    // </Box> */}
    //   <Grid
    //     pt={{ base: "130px", md: "80px", xl: "80px" }}
    //     templateColumns="repeat(5, 1fr)"
    //     gap={3}
    //   >
    //     <GridItem colSpan={2}>
    //       <PercormanceCard />
    //       <Parameters />
    //     </GridItem>
    //     <GridItem colSpan={3}>
    //       <Flex gap={3}>
    //         <Box>
    //           <PerformanceInsCard />
    //           <PlatformPerformance />
    //           <OperationalConditionsCard />
    //         </Box>
    //         <Box>
    //           <Calibrations />
    //           <LeverarmCard />
    //           <CloudPoints />
    //         </Box>
    //       </Flex>
    //     </GridItem>
    //   </Grid>
    // </AdminLayout>
    <PurchaseLisence />
  );
}

AcousticSonar.requireAuth = true;
