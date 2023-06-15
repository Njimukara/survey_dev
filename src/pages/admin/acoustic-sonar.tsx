import { Box, Button, Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import Spinner from "components/spinner";
import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
import PurchaseLisence from "views/admin/default/components/PurchaseLisence";
import GenerateSurvey from "./generate";
import PercormanceCard from "views/admin/dataTables/components/PerformanceCard";
import Parameters from "views/admin/dataTables/components/Parameters";
import PerformanceInsCard from "views/admin/dataTables/components/PerformanceInsCard";
import PlatformPerformance from "views/admin/dataTables/components/PlatformPerformance";
import OperationalConditionsCard from "views/admin/dataTables/components/OperationalConditionsCard";
import Calibrations from "views/admin/dataTables/components/Calibrations";
import CloudPoints from "views/admin/dataTables/components/CloudPoints";
import LeverarmCard from "views/admin/dataTables/components/LeverarmCard";
import { useSurveyContext } from "contexts/Survey";

const calibrations = [
  { key: 1, label: "Pitch boresight", name: "pitch_boresight" },
  { key: 2, label: "Roll boresight", name: "roll_boresight" },
  { key: 3, label: "Yaw boresight", name: "yaw_boresight" },
  {
    key: 4,
    label: "Pitch boresight uncertainty",
    name: "pitch_boresight_uncertainty",
  },
  {
    key: 5,
    label: "Roll boresight uncertainty",
    name: "roll_boresight_uncertainty",
  },
  {
    key: 6,
    label: "Yaw boresight uncertainty",
    name: "yaw_boresight_uncertainty",
  },
  { key: 7, label: "Latency GNSS/INS of USBL (s)", name: "latency_gnss-usbl" },
  { key: 8, label: "Latency GNSS/USBL", name: "latency_gnss-ins-of-usbl" },
];

const performance_ins = [
  { key: 1, label: "Pitch uncertainty", name: "pitch_uncertainty" },
  { key: 2, label: "Roll uncertainty", name: "roll_uncertainty" },
  { key: 3, label: "Yaw uncertainty", name: "yaw_uncertainty" },
  {
    key: 4,
    label: "Positioning uncertainty in H (m)",
    name: "positioning_uncertainty_in_h",
  },
  {
    key: 5,
    label: "Positioning uncertainty in V (m)",
    name: "positioning_uncertainty_in_v",
  },
  {
    key: 6,
    label: "Slant range uncertainty of USBL (m)",
    name: "slant_range_uncertainty_of_the_usbl-usbl",
  },
  {
    key: 7,
    label: "Angle uncertainty of the USBL",
    name: "angle_uncertainty_of_the_usbl",
  },
];

const platformPerformance = [
  {
    key: 1,
    label: "survey speed (Km/h) - [1kn ~ 1.85 km/h]",
    name: "survey_speed",
  },
  {
    key: 2,
    label: "survey speed uncertainty (m/s)",
    name: "survey_speed_uncertainty",
  },
  { key: 3, label: "draft uncertainty (m)", name: "draft_uncertainty" },
  {
    key: 4,
    label: "variation in z due to loads (m)",
    name: "variation_in_z_due_to_loads",
  },
];

const operationConditions = [
  { key: 1, label: "Mean sound speed (m/s)", name: "mean_sound_speed" },
  { key: 2, label: "Max depth of SVP", name: "max_depth_of_the_svp" },
  { key: 3, label: "Uncertainty SVS (m/s) ", name: "svs_uncertainty" },
  { key: 4, label: "Uncertainty SVP (m/s)", name: "svp_uncertainty" },
  {
    key: 5,
    label: "Uncty of SVP beyond its max depth (m)",
    name: "uncert_svp_beyond_its_max_depth",
  },
  { key: 6, label: "Tide uncertainty", name: "tide_uncertainty" },
  { key: 7, label: "Co tidal uncertainty", name: "co_tidal_uncertainty" },
  { key: 8, label: "Altitude of the AC(m)", name: "depth" },
  {
    key: 9,
    label: "Altitude X between AC/USBL ()",
    name: "altitude_x_between_ac-usbl",
  },
];

const performance_ssss = [
  {
    key: 1,
    nameprefix: "parameters.performance",
    label: "Defined operating frequency",
    name1: "defined_operating_frequency",
    name2: "defined_operating_frequency",
    name3: "defined_operating_frequency",
    name4: "defined_operating_frequency",
  },
  {
    key: 2,
    nameprefix: "parameters.performance",
    label: "Horizontal field of view",
    name1: "horizontal_field_of_view",
    name2: "horizontal_field_of_view",
    name3: "horizontal_field_of_view",
    name4: "horizontal_field_of_view",
  },
  {
    key: 3,
    nameprefix: "parameters.performance",
    label: "Vertical field of view",
    name1: "vertical_field_of_view",
    name2: "vertical_field_of_view",
    name3: "vertical_field_of_view",
    name4: "vertical_field_of_view",
  },
  {
    key: 4,
    nameprefix: "parameters.performance",
    label: "Pulse duration (us)",
    name1: "pulse_duration",
    name2: "pulse_duration",
    name3: "pulse_duration",
    name4: "pulse_duration",
  },
  {
    key: 5,
    nameprefix: "parameters.performance",
    label: "Beamwidth",
    name1: "beamwidth",
    name2: "beamwidth",
    name3: "beamwidth",
    name4: "beamwidth",
  },
  {
    key: 6,
    nameprefix: "parameters.performance",
    label: "Incl of antenna/horizontal (*)",
    name1: "depression_angle",
    name2: "depression_angle",
    name3: "depression_angle",
    name4: "depression_angle",
  },
  {
    key: 7,
    nameprefix: "parameters.performance",
    label: "Max range of Camera",
    name1: "max_range_of_camera",
    name2: "max_range_of_camera",
    name3: "max_range_of_camera",
    name4: "max_range_of_camera",
  },
];

const Leverarm = [
  {
    key: 1,
    label: "GNSS/USBL transducer (m)",
    name1: "std_gnss_and_usbl_transducer",
    name2: "ford_gnss_usbl_transducer",
    name3: "ford_gnss_usbl_transducer",
  },
  {
    key: 2,
    label: "INS of USBL and GNSS (m)",
    name1: "std_ins_of_the_usbl_the_gnss",
    name2: "ford_ins_of_the_usbl_and_gnss",
    name3: "ford_ins_of_the_usbl_and_gnss",
  },
  {
    key: 3,
    label: "Lever arms Uncertainty (m)",
    name1: "ford_gnss_usbl_transducer",
  },
];

export default function AcousticSonar() {
  const [subscription, setSubscription] = useState<any>();
  const [surveys, setSurveys] = useState([]);
  const [surveyID, setSurveyID] = useState(4);
  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const [user, setUser] = useState(null);
  const [surveyCode] = useState("SO4");

  const { surveyResults, planSurvey, form, handleFormChange } =
    useSurveyContext();

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
    <AdminLayout>
      <Grid
        pt={{ base: "130px", md: "80px", xl: "80px" }}
        templateColumns="repeat(5, 1fr)"
        gap={3}
      >
        <GridItem colSpan={2}>
          <PercormanceCard
            mb="2"
            performance_ssss={performance_ssss}
            surveyID={surveyID}
          />
          <Parameters results={surveyResults} surveyID={surveyID} />
        </GridItem>
        <GridItem colSpan={3}>
          <Flex gap={3}>
            <Box>
              <PerformanceInsCard
                mb="2"
                performance_ins={performance_ins}
                surveyID={surveyID}
              />
              <PlatformPerformance
                mb="2"
                platformPerformance={platformPerformance}
                surveyID={surveyID}
              />
              <OperationalConditionsCard
                operationConditions={operationConditions}
                surveyID={surveyID}
              />
            </Box>
            <Box>
              <Calibrations
                mb="2"
                calibrations={calibrations}
                surveyID={surveyID}
              />
              <LeverarmCard mb="2" Leverarm={Leverarm} surveyID={surveyID} />
              <CloudPoints surveyID={surveyID} />
            </Box>
          </Flex>
          <Button
            mt="6"
            onClick={() => {
              planSurvey(surveyCode);
            }}
            variant="homePrimary"
            py="6"
          >
            Plan Survey
          </Button>
        </GridItem>
      </Grid>
    </AdminLayout>
  ) : (
    <PurchaseLisence />
  );
}

AcousticSonar.requireAuth = true;
