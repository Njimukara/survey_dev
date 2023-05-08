import { Box, Button, Card, Flex, SimpleGrid } from "@chakra-ui/react";
import Spinner from "components/spinner";
import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
import Calibrations from "views/admin/dataTables/components/Calibrations";
import CloudPoints from "views/admin/dataTables/components/CloudPoints";
import LeverarmCard from "views/admin/dataTables/components/LeverarmCard";
import OperationalConditionsCard from "views/admin/dataTables/components/OperationalConditionsCard";
import PercormanceCard from "views/admin/dataTables/components/PerformanceCard";
import PerformanceInsCard from "views/admin/dataTables/components/PerformanceInsCard";
import LidarCalibration from "views/admin/dataTables/components/survey_parameters/lidar/LidarCalibration";
import LIdarCondition from "views/admin/dataTables/components/survey_parameters/lidar/LidarCondition";
import LidarLeverarm from "views/admin/dataTables/components/survey_parameters/lidar/LidarLeverarm";
import LidarPerformance from "views/admin/dataTables/components/survey_parameters/lidar/LidarPerformance";
import LidarPerformanceCard from "views/admin/dataTables/components/survey_parameters/lidar/LidarPerformanceCard";
import LidarResults from "views/admin/dataTables/components/survey_parameters/lidar/LidarResults";
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
          <LidarPerformance />
          <LidarCalibration />
        </Flex>
        <Flex mt="15px" mb="4" gap="2">
          <LIdarCondition />
          <LidarLeverarm />
        </Flex>
        <LidarPerformanceCard />
        <Flex mt="4">
          <LidarResults />
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
}

export default DynamicLydar;

DynamicLydar.requireAuth = true;
