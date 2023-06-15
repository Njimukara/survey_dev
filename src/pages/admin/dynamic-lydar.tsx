import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
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
import LeverarmCard from "views/admin/dataTables/components/LeverarmCard";
import CloudPoints from "views/admin/dataTables/components/CloudPoints";
import { useSurveyContext } from "contexts/Survey";

const calibrations: any[] = [
  { key: 1, label: "pitch boresight", name: "pitch_boresight", type: "number" },
  { key: 2, label: "Roll boresight", name: "roll_boresight", type: "number" },
  { key: 3, label: "Yaw boresight", name: "yaw_boresight", type: "number" },
  {
    key: 4,
    label: "Pitch boresight uncertainty",
    name: "pitch_boresight_uncertainty",
    type: "number",
  },
  {
    key: 5,
    label: "Roll boresight uncertainty",
    name: "roll_boresight_uncertainty",
    type: "number",
  },
  {
    key: 6,
    label: "Yaw boresight uncertainty",
    name: "yaw_boresight_uncertainty",
    type: "number",
  },
  {
    key: 7,
    label: "Latency gnss/ins",
    name: "latency_gnss-usbl",
    type: "number",
  },
  {
    key: 8,
    label: "latency GNSS/LiDAR",
    name: "latency_gnss-ins-of-lidar",
    type: "number",
  },
  {
    key: 9,
    label: "Uncertainty of latency GNSS/ins",
    name: "uncertainty_of_latency_gnss_ins",
    type: "number",
  },
  {
    key: 10,
    label: "Uncertainty of latency GNSS/LiDAR",
    name: "uncertainty_of_latency_gnss_lidar",
    type: "number",
  },
];

const performance_ins = [
  {
    key: 1,
    label: "Pitch uncertainty",
    name: "pitch_uncertainty",
    type: "number",
  },
  {
    key: 2,
    label: "Roll uncertainty",
    name: "roll_uncertainty",
    type: "number",
  },
  { key: 3, label: "Yaw uncertainty", name: "yaw_uncertainty", type: "number" },
  {
    key: 4,
    label: "Heave uncertainty",
    name: "heave_uncertainty",
    type: "number",
  },
  {
    key: 5,
    label: "Positioning uncertainty in H",
    name: "positioning_uncertainty_in_h",
    type: "number",
  },
  {
    key: 6,
    label: "Positioning uncertainty in H",
    name: "positioning_uncertainty_in_v",
    type: "number",
  },
];

const platformPerformance = [
  {
    key: 1,
    label: "Survey speed (Km/h) - [1kn ~ 1.85 km/h]",
    name: "survey_speed",
    type: "number",
  },
  {
    key: 2,
    label: "Survey speed uncertainty (m/s)",
    name: "survey_speed_uncertainty",
    type: "number",
  },
  {
    key: 3,
    label: "Draft uncertainty (m)",
    name: "draft_uncertainty",
    type: "number",
  },
  {
    key: 4,
    label: "Variation in z due to loads (m)",
    name: "Variation_in_z_due_to_loads",
    type: "number",
  },
];

const operationConditions = [
  { key: 1, label: "tide uncertainty", name: "tide_uncertainty" },
  { key: 2, label: "co tidal uncertainty", name: "co_tidal_uncertainty" },
  {
    key: 3,
    label: "Flying height or distance (m)",
    name: "flying_height_or_distance",
  },
  {
    key: 4,
    label: "Angle of incidence of a beam (*)",
    name: "angle_of_incidence_of_a_beam",
  },
  { key: 5, label: "Overlap rate (%)", name: "overlap_rate" },
  {
    key: 6,
    label: "Width of the study area (km)",
    name: "width_of_the_study_area",
  },
  ,
  {
    key: 7,
    label: "Length of the study area (km)",
    name: "length_of_the_study_area",
  },
];

const performance_ssss = [
  {
    key: 1,
    nameprefix: "parameters.performance",
    label: "Maximum Range (m)",
    name1: "defined_operating_frequency",
    name2: "defined_operating_frequency",
    name3: "defined_operating_frequency",
    name4: "defined_operating_frequency",
  },
  {
    key: 2,
    nameprefix: "parameters.performance",
    label: "Beam Divergence (mrad)",
    name1: "along_track_beamwidth",
    name2: "along_track_beamwidth",
    name3: "along_track_beamwidth",
    name4: "along_track_beamwidth",
  },
  {
    key: 3,
    nameprefix: "parameters.performance",
    label: "Signal to Noise Ratio (dB)",
    name1: "accross_track_beamwidth",
    name2: "accross_track_beamwidth",
    name3: "accross_track_beamwidth",
    name4: "accross_track_beamwidth",
  },
  {
    key: 4,
    nameprefix: "parameters.performance",
    label: "Uncertainty of divergence",
    name1: "Beams_number",
    name2: "Beams_number",
    name3: "Beams_number",
    name4: "Beams_number",
  },
  {
    key: 5,
    nameprefix: "parameters.performance",
    label: "Pulse duration (ns)",
    name1: "Depth_resulotion",
    name2: "Depth_resulotion",
    name3: "Depth_resulotion",
    name4: "Depth_resulotion",
  },
  {
    key: 6,
    nameprefix: "parameters.performance",
    label: "Pulse repetition rate (KHz)",
    name1: "Ping_rate",
    name2: "Ping_rate",
    name3: "Ping_rate",
    name4: "Ping_rate",
  },
  {
    key: 7,
    nameprefix: "parameters.performance",
    label: "Range Uncertainty (mm)",
    name1: "max_range_of_sss",
    name2: "max_range_of_sss",
    name3: "max_range_of_sss",
    name4: "max_range_of_sss",
  },
  {
    key: 8,
    nameprefix: "parameters.performance",
    label: "LIDAR scanning angle (*)",
    name2: "Shape_of_antenna",
    name3: "Shape_of_antenna",
    name4: "Shape_of_antenna",
    name1: "Shape_of_antenna",
    type: "select",
  },
  {
    key: 9,
    nameprefix: "parameters.performance",
    label: "Texture (*)",
    name2: "Shape_of_antenna",
    name3: "Shape_of_antenna",
    name4: "Shape_of_antenna",
    name1: "Shape_of_antenna",
    type: "select",
  },
];

const Leverarm = [
  {
    label: "GNSS and LiDAR (m)",
    name1: "std_gnss_and_usbl_transducer",
    name2: "ford_gnss_usbl_transducer",
    name3: "ford_gnss_usbl_transducer",
  },
  {
    label: "INS and GNSS (m)",
    name1: "std_ins_of_the_usbl_the_gnss",
    name2: "ford_ins_of_the_usbl_and_gnss",
    name3: "ford_ins_of_the_usbl_and_gnss",
  },
  {
    label: "Lever arms Uncertainty (m)",
    name1: "ford_gnss_usbl_transducer",
  },
];

function DynamicLydar() {
  const [subscription, setSubscription] = useState<any>();
  const [surveyID, setSurveyID] = useState(2);
  const [surveys, setSurveys] = useState([]);
  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const [user, setUser] = useState(null);
  const [surveyCode] = useState("SO3");

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

    // setSurveys([2]);

    // uncomment this when done with the check
    setSubscription(subscriptions[subscriptions.length - 1]);
    // console.log(subscriptions.length);
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

export default DynamicLydar;

DynamicLydar.requireAuth = true;
