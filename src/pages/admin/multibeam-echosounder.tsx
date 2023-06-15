import { Box, Button, Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import Spinner from "components/spinner";
import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
import PurchaseLisence from "views/admin/default/components/PurchaseLisence";
import GenerateSurvey from "./generate";
import { useSurveyContext } from "contexts/Survey";
import PercormanceCard from "views/admin/dataTables/components/PerformanceCard";
import Parameters from "views/admin/dataTables/components/Parameters";
import PerformanceInsCard from "views/admin/dataTables/components/PerformanceInsCard";
import PlatformPerformance from "views/admin/dataTables/components/PlatformPerformance";
import OperationalConditionsCard from "views/admin/dataTables/components/OperationalConditionsCard";
import Calibrations from "views/admin/dataTables/components/Calibrations";
import LeverarmCard from "views/admin/dataTables/components/LeverarmCard";
import CloudPoints from "views/admin/dataTables/components/CloudPoints";

const calibrations: any[] = [
  { key: 1, label: "pitch boresight", name: "pitch_boresight" },
  { key: 2, label: "roll boresight", name: "roll_boresight" },
  { key: 3, label: "yaw boresight", name: "yaw_boresight" },
  {
    key: 4,
    label: "pitch boresight uncertainty",
    name: "pitch_boresight_uncertainty",
  },
  {
    key: 5,
    label: "roll boresight uncertainty",
    name: "roll_boresight_uncertainty",
  },
  {
    key: 6,
    label: "Yaw boresight uncertainty",
    name: "yaw_boresight_uncertainty",
  },
  { key: 7, label: "latency gnss/ins", name: "latency_gnss-usbl" },
  { key: 8, label: "latency gnss/smf", name: "latency_gnss-ins-of-usbl" },
  {
    key: 9,
    label: "uncertainty of latency gnss/ins",
    name: "uncertainty_of_latency_gnss_ins",
  },
  {
    key: 10,
    label: "uncertainty of latency gnss/smf",
    name: "uncertainty_of_latency_gnss_smf",
  },
];

const performance_ins = [
  { key: 1, label: "pitch uncertainty", name: "pitch_uncertainty" },
  { key: 2, label: "roll uncertainty", name: "roll_uncertainty" },
  { key: 3, label: "yaw uncertainty", name: "yaw_uncertainty" },
  {
    key: 4,
    label: "positioning uncertainty in H",
    name: "positioning_uncertainty_in_h",
  },
  {
    key: 5,
    label: "positioning uncertainty in H",
    name: "positioning_uncertainty_in_v",
  },
  { key: 6, label: "heave uncertainty", name: "heave_uncertainty" },
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
  { key: 1, label: "mean sound speed (m/s)", name: "mean_sound_speed" },
  { key: 2, label: "max depth of SVP", name: "max_depth_of_the_svp" },
  {
    key: 3,
    label: "Measure uncertainty of SVS (m/s) ",
    name: "svs_uncertainty",
  },
  {
    key: 4,
    label: "Measure uncertainty of SVP (m/s)",
    name: "svp_uncertainty",
  },
  {
    key: 5,
    label: "uncert svp beyond its max depth (m)",
    name: "uncert_svp_beyond_its_max_depth",
  },
  {
    key: 6,
    label: "tide uncertainty",
    name: "tide_uncertainty",
  },
  {
    key: 7,
    label: "co tidal uncertainty",
    name: "co_tidal_uncertainty",
  },
  {
    key: 8,
    label: "Depth (m)",
    name: "depth",
  },
  {
    key: 9,
    label: "Incidence angle of MBES (*)",
    name: "incidence_angle_of_mbes",
  },
];

const performance_ssss = [
  {
    key: 1,
    nameprefix: "parameters.performance",
    label: "defined operating frequency (KHz)",
    name1: "defined_operating_frequency",
    name2: "defined_operating_frequency",
    name3: "defined_operating_frequency",
    name4: "defined_operating_frequency",
  },
  {
    key: 2,
    label: "Along track beamwidth (*)",
    nameprefix: "parameters.performance",
    name1: "along_track_beamwidth",
    name2: "along_track_beamwidth",
    name3: "along_track_beamwidth",
    name4: "along_track_beamwidth",
  },
  {
    key: 3,
    nameprefix: "parameters.performance",
    label: "Accross track beamwidth (*)",

    name1: "accross_track_beamwidth",
    name2: "accross_track_beamwidth",
    name3: "accross_track_beamwidth",
    name4: "accross_track_beamwidth",
  },
  {
    key: 4,
    nameprefix: "parameters.performance",
    label: "Beams Number",
    name1: "Beams_number",
    name2: "Beams_number",
    name3: "Beams_number",
    name4: "Beams_number",
  },
  {
    key: 5,
    nameprefix: "parameters.performance",
    label: "Depth resulotion (mm)",
    name1: "Depth_resulotion",
    name2: "Depth_resulotion",
    name3: "Depth_resulotion",
    name4: "Depth_resulotion",
  },
  {
    key: 6,
    nameprefix: "parameters.performance",
    label: "Ping rate (Hz)",
    name1: "Ping_rate",
    name2: "Ping_rate",
    name3: "Ping_rate",
    name4: "Ping_rate",
  },
  {
    key: 7,
    nameprefix: "parameters.performance",
    label: "User defined Swath coverage (*)",
    name1: "max_range_of_sss",
    name2: "max_range_of_sss",
    name3: "max_range_of_sss",
    name4: "max_range_of_sss",
  },
  {
    key: 8,
    nameprefix: "parameters.performance",
    label: "Shape of antenna",
    name2: "Shape_of_antenna",
    name3: "Shape_of_antenna",
    name4: "Shape_of_antenna",
    name1: "Shape_of_antenna",
  },
];

const Leverarm = [
  {
    key: 1,
    label: "GNSS and SMF (m)",
    name1: "std_gnss_and_usbl_transducer",
    name2: "ford_gnss_usbl_transducer",
    name3: "ford_gnss_usbl_transducer",
  },
  {
    key: 2,
    label: "INS and GNSS (m)",
    name1: "std_ins_of_the_usbl_the_gnss",
    name2: "ford_ins_of_the_usbl_and_gnss",
    name3: "ford_ins_of_the_usbl_and_gnss",
  },
  {
    key: 3,
    label: "Uncertainty of Leverarms (m)",
    name1: "ford_gnss_usbl_transducer",
  },
];

export default function MultibeamEchoSounder() {
  const [subscription, setSubscription] = useState<any>();
  const [surveys, setSurveys] = useState([]);
  const [surveyID, setSurveyID] = useState(1);
  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const [user, setUser] = useState(null);
  const [surveyCode] = useState("SO2");

  const [isChecked, setIsChecked] = React.useState(false);
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
    console.log("after generate survey", form);
  }, [loading, surveyResults, form]);

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
    <AdminLayout>
      <Grid
        pt={{ base: "130px", md: "80px", xl: "80px" }}
        templateColumns="repeat(5, 1fr)"
        gap={3}
      >
        <GridItem colSpan={2}>
          <PercormanceCard
            mb="2"
            mr="2"
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

MultibeamEchoSounder.requireAuth = true;
