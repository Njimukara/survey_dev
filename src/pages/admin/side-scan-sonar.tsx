import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import Spinner from "components/spinner";
import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useMemo, useEffect } from "react";
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
import { useSession } from "next-auth/react";
import axios from "axios";
import Select from "react-select";

interface Survey {
  id: number;
  name: string;
  is_active: boolean;
  is_delete: boolean;
}

const calibrations: any[] = [
  {
    key: 1,
    label: "pitch boresight",
    name: "calibration_parameters.pitch_boresight",
  },
  {
    key: 2,
    label: "roll boresight",
    name: "calibration_parameters.roll_boresight",
  },
  {
    key: 3,
    label: "yaw boresight",
    name: "calibration_parameters.yaw_boresight",
  },
  {
    key: 4,
    label: "pitch boresight uncertainty",
    name: "calibration_parameters.pitch_boresight_uncertainty",
  },
  {
    key: 5,
    label: "roll boresight uncertainty",
    name: "calibration_parameters.roll_boresight_uncertainty",
  },
  {
    key: 6,
    label: "roll boresight uncertainty",
    name: "calibration_parameters.yaw_boresight_uncertainty",
  },
  {
    key: 7,
    label: "latency gnss usbl",
    name: "calibration_parameters.latency_gnss-usbl",
  },
  {
    key: 8,
    label: "latency gnss ins of usbl",
    name: "calibration_parameters.latency_gnss-ins-of-usbl",
  },
];

const Leverarm = [
  {
    key: 1,
    label: "GNSS/USBL transducer (m)",
    name1: "calibration_parameters.std_gnss_and_usbl_transducer",
    name2: "calibration_parameters.ford_gnss_usbl_transducer",
    name3: "calibration_parameters.ford_gnss_usbl_transducer",
  },
  {
    key: 2,
    label: "INS of USBL and GNSS (m)",
    name1: "calibration_parameters.std_ins_of_the_usbl_the_gnss",
    name2: "calibration_parameters.ford_ins_of_the_usbl_and_gnss",
    name3: "calibration_parameters.ford_ins_of_the_usbl_and_gnss",
  },
  {
    key: 3,
    label: "Lever arms Uncertainty (m)",
    name1: "calibration_parameters.ford_gnss_usbl_transducer",
  },
];

const performance_ins = [
  {
    key: 1,
    label: "pitch uncertainty",
    name: "performance_ins-gnss-usbl.pitch_uncertainty",
  },
  {
    key: 2,
    label: "roll uncertainty",
    name: "performance_ins-gnss-usbl.roll_uncertainty",
  },
  {
    key: 3,
    label: "yaw uncertainty",
    name: "performance_ins-gnss-usbl.yaw_uncertainty",
  },
  {
    key: 4,
    label: "positioning uncertainty in h",
    name: "performance_ins-gnss-usbl.positioning_uncertainty_in_h",
  },
  {
    key: 5,
    label: "positioning uncertainty in v",
    name: "performance_ins-gnss-usbl.positioning_uncertainty_in_v",
  },
  {
    key: 6,
    label: "heave uncertainty",
    name: "performance_ins-gnss-usbl.heave_uncertainty",
  },
  {
    key: 7,
    label: "slant range uncertainty of usbl",
    name: "performance_ins-gnss-usbl.slant_range_uncertainty_of_the_usbl-usbl",
  },
  {
    key: 8,
    label: "angle uncertainty of usbl",
    name: "performance_ins-gnss-usbl.angle_uncertainty_of_the_usbl",
  },
];

const platformPerformance = [
  {
    key: 1,
    label: "survey speed (Km/h) - [1kn ~ 1.85 km/h]",
    name: "survey_platform_performance.survey_speed",
  },
  {
    key: 2,
    label: "survey speed uncertainty (m/s)",
    name: "survey_platform_performance.survey_speed_uncertainty",
  },
  {
    key: 3,
    label: "draft uncertainty (m)",
    name: "survey_platform_performance.draft_uncertainty",
  },
  {
    key: 4,
    label: "variation in z due to loads (m)",
    name: "survey_platform_performance.variation_in_z_due_to_loads",
  },
];

const operationConditions = [
  {
    key: 1,
    label: "mean sound speed",
    name: "operational_conditions.mean_sound_speed",
  },
  {
    key: 2,
    label: "max depth of the svp",
    name: "operational_conditions.max_depth_of_the_svp",
  },
  {
    key: 3,
    label: "svs uncertainty",
    name: "operational_conditions.svs_uncertainty",
  },
  {
    key: 4,
    label: "svp uncertainty",
    name: "operational_conditions.svp_uncertainty",
  },
  {
    key: 5,
    label: "uncert svp beyond its max depth",
    name: "operational_conditions.uncert_svp_beyond_its_max_depth",
  },
  {
    key: 6,
    label: "tide uncertainty",
    name: "operational_conditions.tide_uncertainty",
  },
  {
    key: 7,
    label: "co tidal uncertainty",
    name: "operational_conditions.co_tidal_uncertainty",
  },
  {
    key: 8,
    label: "altitude of sss",
    name: "operational_conditions.altitude_of_sss",
  },
  {
    key: 9,
    label: "distance x between sss and usbl",
    name: "operational_conditions.distance_x_between_sss_and_usbl",
  },
];

const performance_ssss = [
  {
    key: 1,
    label: "defined operating frequency",
    nameprefix: "performance_of_ssss-s1-s2-s3-s4",
    name1: "defined_operating_frequency",
    name2: "defined_operating_frequency",
    name3: "defined_operating_frequency",
    name4: "defined_operating_frequency",
  },
  {
    key: 2,
    label: "horizontal field of view",
    nameprefix: "performance_of_ssss-s1-s2-s3-s4",
    name1: "horizontal_field_of_view",
    name2: "horizontal_field_of_view",
    name3: "horizontal_field_of_view",
    name4: "horizontal_field_of_view",
  },
  {
    key: 3,
    label: "vertical field of view",
    nameprefix: "performance_of_ssss-s1-s2-s3-s4",
    name1: "vertical_field_of_view",
    name2: "vertical_field_of_view",
    name3: "vertical_field_of_view",
    name4: "vertical_field_of_view",
  },
  {
    key: 4,
    label: "pulse duration",
    nameprefix: "performance_of_ssss-s1-s2-s3-s4",
    name1: "pulse_duration",
    name2: "pulse_duration",
    name3: "pulse_duration",
    nam4: "pulse_duration",
  },
  {
    key: 5,
    label: "beamwidth",
    nameprefix: "performance_of_ssss-s1-s2-s3-s4",
    name1: "beamwidth",
    name2: "beamwidth",
    name3: "beamwidth",
    name4: "beamwidth",
  },
  {
    key: 6,
    label: "depression angle",
    nameprefix: "performance_of_ssss-s1-s2-s3-s4",
    name1: "depression_angle",
    name2: "depression_angle",
    name3: "depression_angle",
    name4: "depression_angle",
  },
  {
    key: 7,
    label: "max range of sss",
    nameprefix: "performance_of_ssss-s1-s2-s3-s4",
    name1: "max_range_of_sss",
    name2: "max_range_of_sss",
    name3: "max_range_of_sss",
    name4: "max_range_of_sss",
  },
];

function EchoSounder() {
  const [subscription, setSubscription] = useState<any>();
  const [form, setForm] = useState<any>();
  const [surveys, setSurveys] = useState([]);
  const [results, setResults] = useState([]);
  const [surveyID, setSurveyID] = useState<number>(3);
  const [surveyName, setSurveyName] = useState("");
  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [surveyCode] = useState("SO3");
  // chakra toast
  const toast = useToast();

  const [isChecked, setIsChecked] = React.useState(false);
  const { surveyResults, planSurvey, handleFormChange } = useSurveyContext();

  // get previous surveys from database
  let data = "fine";
  const options: any = useMemo(() => calc(), []);

  function calc() {
    return "data";
  }

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

  const handleForm = (event: any) => {
    // Clone form because we need to modify it
    let updatedForm = { ...form };

    const { name, value } = event.target;

    // Split the name into an array of keys
    const keys = name.split(".");

    // Build the nested object dynamically

    let nestedObj = updatedForm;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];

      if (!nestedObj[key]) {
        // Check if the next key is a number (indicating an array)
        if (isNaN(keys[i + 1])) {
          nestedObj[key] = {};
        } else {
          nestedObj[key] = [];
        }
      }

      nestedObj = nestedObj[key];
    }

    const lastKey = keys[keys.length - 1];
    if (Array.isArray(nestedObj) && !isNaN(lastKey)) {
      // Convert the value to a number if it represents an array index
      nestedObj[Number(lastKey)] = value;
    } else {
      nestedObj[lastKey] = value;
    }

    // let nestedObj = updatedForm;

    // for (let i = 0; i < keys.length - 1; i++) {
    //   const key = keys[i];

    //   if (!nestedObj[key]) {
    //     nestedObj[key] = {};
    //   }

    //   nestedObj = nestedObj[key];
    // }

    // nestedObj[keys[keys.length - 1]] = value;

    // updatedForm[event.target.name] = event.target.value;
    console.log("Form changed: ", updatedForm);
    // Update state
    setForm(updatedForm);
  };

  const handleSubmit = async (surveyCode: string) => {
    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    let data = {
      name: "",
      survey: surveyID,
      parameters: form,
    };

    console.log(data);

    await axios
      .post(
        `https://surveyplanner.pythonanywhere.com/api/surveys/generate-survey/${surveyCode}`,
        data,
        config
      )
      .then((res) => {
        setResults(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        toast({
          position: "bottom-right",
          description: "Error planning survey at this time",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  // css styling for react select
  const reactSelectStyles = {
    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "transparent",
      borderColor: "grey.200",
      color: "black",
      padding: "6px",
      borderRadius: "15px",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "black" }),
  };

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
        <GridItem colSpan={5}>
          <Card py="5" px="10">
            <FormControl mb="2">
              <FormLabel fontSize="sm">Survey Name</FormLabel>
              <Input
                data-cy="register-name"
                id="name"
                name="name"
                variant="rounded"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Survey Name"
                mr="2px"
                fontWeight="500"
                size="sm"
                value={surveyName}
                onChange={(e) => setSurveyName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Country</FormLabel>
              <Select
                styles={reactSelectStyles}
                options={options}
                placeholder="Load past survey data"
              />
            </FormControl>
          </Card>
        </GridItem>
        <GridItem colSpan={2}>
          <PercormanceCard
            mb="2"
            performance_ssss={performance_ssss}
            handleform={handleForm}
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
                handleform={handleForm}
                surveyID={surveyID}
              />
              <PlatformPerformance
                mb="2"
                platformPerformance={platformPerformance}
                handleform={handleForm}
                surveyID={surveyID}
              />
              <OperationalConditionsCard
                operationConditions={operationConditions}
                handleform={handleForm}
                surveyID={surveyID}
              />
            </Box>
            <Box>
              <Calibrations
                mb="2"
                calibrations={calibrations}
                handleform={handleForm}
                surveyID={surveyID}
              />
              <LeverarmCard
                mb="2"
                Leverarm={Leverarm}
                handleform={handleForm}
                surveyID={surveyID}
              />
              <CloudPoints surveyID={surveyID} />
            </Box>
          </Flex>
          <Button
            mt="6"
            onClick={() => {
              handleSubmit(surveyCode);
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
    // <GenerateSurvey surveyID={3} />
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
