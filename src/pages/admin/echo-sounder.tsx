import { Box, Button, Card, Flex, SimpleGrid } from "@chakra-ui/react";
import Spinner from "components/spinner";
import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
// import Calibrations from "views/admin/dataTables/components/Calibrations";
// import CloudPoints from "views/admin/dataTables/components/CloudPoints";
// import LeverarmCard from "views/admin/dataTables/components/LeverarmCard";
// import OperationalConditionsCard from "views/admin/dataTables/components/OperationalConditionsCard";
// import PercormanceCard from "views/admin/dataTables/components/PerformanceCard";
// import PerformanceInsCard from "views/admin/dataTables/components/PerformanceInsCard";
import ScanCalibration from "views/admin/dataTables/components/survey_parameters/scan/ScanCalibration";
import ScanCondition from "views/admin/dataTables/components/survey_parameters/scan/ScanCondition";
import ScanLeverarm from "views/admin/dataTables/components/survey_parameters/scan/ScanLeverarm";
import ScanPerformanceCard from "views/admin/dataTables/components/survey_parameters/scan/ScanPerformancCard";
import ScanPerformance from "views/admin/dataTables/components/survey_parameters/scan/ScanPerformance";
import ScanResults from "views/admin/dataTables/components/survey_parameters/scan/ScanResults";
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
        {/* <Card
          p="20px"
          alignItems="center"
          flexDirection="column"
          w="100%"
          mb="4"
        >
          <FormControl display="flex" alignItems="center">
            <FormLabel
              htmlFor="remember-settings"
              mb="0"
              fontWeight="normal"
              color={brandColor}
              fontSize="md"
            >
              Import last survey settings
            </FormLabel>
            <Checkbox
              id="remember-settings"
              isChecked={isChecked}
              onChange={(e) => setIsChecked(!isChecked)}
            />
          </FormControl>
        </Card> */}

        <Flex mt="15px" gap="2">
          <ScanPerformance />
          <ScanCalibration />
        </Flex>
        <Flex mt="15px" mb="4" gap="2">
          <ScanCondition />
          <ScanLeverarm />
        </Flex>
        <ScanPerformanceCard />
        <Flex mt="4">
          <ScanResults />
        </Flex>
        <Flex mt="4" justifyContent="center" alignItems="center">
          <Button variant="homePrimary" size="lg">
            Plan Survey
          </Button>
        </Flex>
      </Box>
    </AdminLayout>
  ) : (
    <PurchaseLisence />
  );
  // <PurchaseLisence />;
}

export default EchoSounder;

EchoSounder.requireAuth = true;
