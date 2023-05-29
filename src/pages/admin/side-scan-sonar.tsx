import { Box, Button, Card, Flex, SimpleGrid } from "@chakra-ui/react";
import Spinner from "components/spinner";
import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
import PurchaseLisence from "views/admin/default/components/PurchaseLisence";
import GenerateSurvey from "./generate";

interface Survey {
  id: number;
  name: string;
  is_active: boolean;
  is_delete: boolean;
}
function EchoSounder() {
  const [subscription, setSubscription] = useState<any>();
  const [surveys, setSurveys] = useState([]);
  const [surveyID, setSurveyID] = useState(3);
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
    <GenerateSurvey surveyID={3} />
  ) : (
    // <AdminLayout>
    //   <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    //     {/* <Card
    //       p="20px"
    //       alignItems="center"
    //       flexDirection="column"
    //       w="100%"
    //       mb="4"
    //     >
    //       <FormControl display="flex" alignItems="center">
    //         <FormLabel
    //           htmlFor="remember-settings"
    //           mb="0"
    //           fontWeight="normal"
    //           color={brandColor}
    //           fontSize="md"
    //         >
    //           Import last survey settings
    //         </FormLabel>
    //         <Checkbox
    //           id="remember-settings"
    //           isChecked={isChecked}
    //           onChange={(e) => setIsChecked(!isChecked)}
    //         />
    //       </FormControl>
    //     </Card> */}

    //     <Flex mt="15px" gap="2">
    //       <ScanPerformance />
    //       <ScanCalibration />
    //     </Flex>
    //     <Flex mt="15px" mb="4" gap="2">
    //       <ScanCondition />
    //       <ScanLeverarm />
    //     </Flex>
    //     <ScanPerformanceCard />
    //     <Flex mt="4">
    //       <ScanResults />
    //     </Flex>
    //     <Flex mt="4" justifyContent="center" alignItems="center">
    //       <Button variant="homePrimary" size="lg">
    //         Plan Survey
    //       </Button>
    //     </Flex>
    //   </Box>
    // </AdminLayout>
    <PurchaseLisence />
  );
  // <PurchaseLisence />;
}

export default EchoSounder;

EchoSounder.requireAuth = true;
