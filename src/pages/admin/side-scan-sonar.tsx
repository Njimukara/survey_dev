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
  Text,
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
import SurveyInput from "views/admin/dataTables/components/SurveyInput";

interface Survey {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  is_delete: boolean;
}
const jsonData = {
  name: "my test survey",
  survey: 1,
  parameters: {
    calibration_parameters: {
      pitch_boresight: 0.3,
      roll_boresight: 0.5,
      yaw_boresight: 3,
      pitch_boresight_uncertainty: 5,
      roll_boresight_uncertainty: 0.9,
      yaw_boresight_uncertainty: 5,
      "latency_gnss-usbl": 0.5,
      "latency_gnss-ins-of-usbl": 4,
      ford_gnss_usbl_transducer: 0.5,
      ford_ins_of_the_usbl_and_gnss: 3,
      std_gnss_and_usbl_transducer: 0.4,
      std_ins_of_the_usbl_the_gnss: 4,
    },
    lever_arm_measures_between: {
      lever_arms_uncertainty: 0.01,
      ford_gnss_smf: 0.2,
      ford_ins_and_gnss: 0.1,
      down_ins_and_gnss: 0.3,
      down_gnss_and_smf: 0.2,
      std_ins_and_gnss: 0.25,
      std_gnss_and_smf: 0.2,
      sounding_reduction: "gnss",
    },
    "performance_ins-gnss-usbl": {
      yaw_uncertainty: 0.05,
      roll_uncertainty: 0.06,
      pitch_uncertainty: 0.07,
      positioning_uncertainty_in_h: 0.08,
      positioning_uncertainty_in_v: 0.09,
      heave_uncertainty: 0.1,
    },
    survey_platform_performance: {
      survey_speed: 2.5,
      survey_speed_uncertainty: 0.2,
      draft_uncertainty: 0.01,
      variation_in_z_due_to_loads: 0.03,
    },
    operational_conditions: {
      mean_sound_speed: 1500,
      max_depth_of_the_svp: 200,
      svs_uncertainty: 0.1,
      svp_uncertainty: 0.2,
      uncert_svp_beyond_its_max_depth: 0.3,
      tide_uncertainty: 0.05,
      co_tidal_uncertainty: 0.06,
      depth: 50,
      incidence_angle_of_mbes: 30,
    },
    "performance_of_ssss-s1-s2-s3-s4": [
      {
        defined_operating_frequency: 2.1,
        horizontal_field_of_view: 2.1,
        vertical_field_of_view: 2.1,
        pulse_duration: 2.1,
        beamwidth: 2.1,
        depression_angle: 2.1,
        max_range_of_sss: 5,
      },
      {
        defined_operating_frequency: 2.1,
        horizontal_field_of_view: 2.1,
        vertical_field_of_view: 2.1,
        pulse_duration: 2.1,
        beamwidth: 2.1,
        depression_angle: 2.1,
        max_range_of_sss: 5,
      },
      {
        defined_operating_frequency: 2.1,
        horizontal_field_of_view: 2.1,
        vertical_field_of_view: 2.1,
        pulse_duration: 2.1,
        beamwidth: 2.1,
        depression_angle: 2.1,
        max_range_of_sss: 5,
      },
      {
        defined_operating_frequency: 2.1,
        horizontal_field_of_view: 2.1,
        vertical_field_of_view: 2.1,
        pulse_duration: 2.1,
        beamwidth: 2.1,
        depression_angle: 2.1,
        max_range_of_sss: 5,
      },
    ],
  },
};

function EchoSounder() {
  const [subscription, setSubscription] = useState<any>();
  const [calibrations, setCalibrations] = useState<any>({
    pitch_boresight: { type: "text" },
    roll_boresight: { type: "number" },
    yaw_boresight: { type: "number" },
    pitch_boresight_uncertainty: { type: "number" },
    roll_boresight_uncertainty: { type: "number" },
    yaw_boresight_uncertainty: { type: "number" },
    "latency_gnss-usbl": { type: "number" },
    "latency_gnss-ins-of-usbl": { type: "number" },
    ford_gnss_usbl_transducer: { type: "number" },
    ford_ins_of_the_usbl_and_gnss: { type: "number" },
    std_gnss_and_usbl_transducer: { type: "number" },
    std_ins_of_the_usbl_the_gnss: { type: "number" },
  });
  const [platformPerformance, setPlatformPerformance] = useState<any>({
    survey_speed: "32",
    survey_speed_uncertainty: 4,
    draft_uncertainty: "",
    variation_in_z_due_to_loads: "54",
  });
  const [operationalConditions, setOperationalConditions] = useState<any>({
    mean_sound_speed: "32",
    max_depth_of_the_svp: 4,
    svs_uncertainty: "",
    svp_uncertainty: 54,
    uncert_svp_beyond_its_max_depth: 54,
    tide_uncertainty: 54,
    co_tidal_uncertainty: 54,
    altitude_of_sss: 54,
    distance_x_between_sss_and_usbl: 54,
  });
  const [performance_ins, setPerformance_ins] = useState<any>({
    pitch_uncertainty: "32",
    roll_uncertainty: 4,
    yaw_uncertainty: "",
    positioning_uncertainty_in_h: 54,
    positioning_uncertainty_in_v: 54,
    heave_uncertainty: 54,
    "slant_range_uncertainty_of_the_usbl-usbl": 54,
    angle_uncertainty_of_the_usbl: 54,
  });

  const [performanceCard, setPerformanceCard] = useState<any>([
    {
      defined_operating_frequency: { type: "number" },
      horizontal_field_of_view: { type: "number" },
      vertical_field_of_view: { type: "number" },
      pulse_duration: { type: "number" },
      beamwidth: { type: "number" },
      depression_angle: { type: "number" },
      max_range_of_sss: { type: "number" },
    },
    {
      defined_operating_frequency: { type: "number" },
      horizontal_field_of_view: { type: "number" },
      vertical_field_of_view: { type: "number" },
      pulse_duration: { type: "number" },
      beamwidth: { type: "number" },
      depression_angle: { type: "number" },
      max_range_of_sss: { type: "number" },
    },
    {
      defined_operating_frequency: { type: "number" },
      horizontal_field_of_view: { type: "number" },
      vertical_field_of_view: { type: "number" },
      pulse_duration: { type: "number" },
      beamwidth: { type: "number" },
      depression_angle: { type: "number" },
      max_range_of_sss: { type: "number" },
    },
    {
      defined_operating_frequency: { type: "number" },
      horizontal_field_of_view: { type: "number" },
      vertical_field_of_view: { type: "number" },
      pulse_duration: { type: "number" },
      beamwidth: { type: "number" },
      depression_angle: { type: "number" },
      max_range_of_sss: { type: "number" },
    },
  ]);

  const [leverarm, setLeverarm] = useState<any>({
    ford_gnss_usbl_transducer: "",
    ford_ins_of_the_usbl_and_gnss: "",
    std_gnss_and_usbl_transducer: "",
    std_ins_of_the_usbl_the_gnss: "",
  });

  const [surveyParameters, setSurveyParameters] = useState<any>({
    width_of_the_image: 0,
    "ratio_of_the_image_width-alternative": 0,
    range_uncertainty: 0,
    max_slant_range: 0,
    line_spacing_50p_overlap: 0,
    line_spacing_24p_overlap: 0,
    along_track_resolution_r1: 0,
    accross_track_resolution_r1: 0,
    along_track_resolution_r2: 0,
    accross_track_resolution_r2: 0,
    uncertainty_in_xy_of_vector_usbl: 0,
    max_ping_rate: 0,
  });

  const [results, setResults] = useState({
    width_of_the_image: { type: "number" },
    "ratio_of_the_image_width-alternative": { type: "number" },
    range_uncertainty: { type: "number" },
    max_slant_range: { type: "number" },
    line_spacing_50p_overlap: { type: "number" },
    line_spacing_24p_overlap: { type: "number" },
    along_track_resolution_r1: { type: "number" },
    accross_track_resolution_r1: { type: "number" },
    along_track_resolution_r2: { type: "number" },
    accross_track_resolution_r2: { type: "number" },
    uncertainty_in_xy_of_vector_usbl: { type: "number" },
    max_ping_rate: { type: "number" },
  });

  const [calibrationForm, setCalibrationForm] = useState<any>({});
  const [platformForm, setPlatformForm] = useState<any>({});
  const [performanceForm, setPerformanceForm] = useState<any>({});
  const [leverForm, setLeverForm] = useState<any>({});
  const [operationalForm, setOperationalForm] = useState<any>({});
  const [form, setForm] = useState<any>({});

  const [ssPerformanceForm, setSSPerformanceForm] = useState<any>({});

  const [surveys, setSurveys] = useState([]);
  const [surveyID, setSurveyID] = useState<number>(3);
  const [surveyName, setSurveyName] = useState("");
  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [surveyCode, setSurveyCode] = useState("S02");
  // chakra toast
  const toast = useToast();

  const [isChecked, setIsChecked] = React.useState(false);
  const { surveyResults, planSurvey, handleFormChange } = useSurveyContext();

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
    console.log("formside scan", form);
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
    console.log("Form changed: ", updatedForm);
    // Update state
    setForm(updatedForm);
  };
  const handleCalibrationsForm = (event: any) => {
    // Clone form because we need to modify it
    let updatedForm = { ...calibrationForm };

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
    console.log("Form changed: ", updatedForm);
    // Update state
    setCalibrationForm(updatedForm);
  };
  const handleleverForm = (event: any) => {
    // Clone form because we need to modify it
    let updatedForm = { ...leverForm };

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
    console.log("Form changed: ", updatedForm);
    // Update state
    setLeverForm(updatedForm);
  };
  const handleOperationalForm = (event: any) => {
    // Clone form because we need to modify it
    let updatedForm = { ...operationalForm };

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
    console.log("Form changed: ", updatedForm);
    // Update state
    setOperationalForm(updatedForm);
  };
  const handlePerformanceForm = (event: any) => {
    // Clone form because we need to modify it
    let updatedForm = { ...performanceForm };

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
    console.log("Form changed: ", updatedForm);
    // Update state
    setPerformanceForm(updatedForm);
  };
  const handlePlatformForm = (event: any) => {
    // Clone form because we need to modify it
    let updatedForm = { ...platformForm };

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
    console.log("Form changed: ", updatedForm);
    // Update state
    setPlatformForm(updatedForm);
  };
  const handlessPerformanceForm = (event: any) => {
    // Clone form because we need to modify it
    let updatedForm = { ...ssPerformanceForm };

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
    console.log("Form changed: ", updatedForm);
    // Update state
    setSSPerformanceForm(updatedForm);
  };

  // const changeHandler = (value: any) => {
  //   // setCompanyCountry(value);
  //   // setIso(value.value?.isoCode);
  //   // place code to load data unto survey form
  //   form;
  // };

  // get all surveys
  const getSurveys = async () => {
    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };
    await axios
      .get(`https://surveyplanner.pythonanywhere.com/api/surveys/`, config)
      .then((res) => {
        res.data.map((survey: Survey) => {
          if (survey.id == surveyID) {
            setSurveyCode(survey.code);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSurveys();
  }, [surveys]);

  const loadSurveyData = () => {
    setForm(calibrations);
    const {
      parameters: {
        calibration_parameters,
        "performance_ins-gnss-usbl": performance_gnss_usbl,
        survey_platform_performance,
        operational_conditions,
        "performance_of_ssss-s1-s2-s3-s4": performance_ssss,
      },
    } = jsonData;

    setCalibrationForm(calibration_parameters);
    setPerformanceForm(performance_gnss_usbl);
    setPlatformForm(survey_platform_performance);
    setOperationalForm(operational_conditions);
    setSSPerformanceForm(performance_ssss);

    console.log("calibration_parameters:", calibration_parameters);
    console.log("performance_gnss_usbl:", performance_gnss_usbl);
    console.log("survey_platform_performance:", survey_platform_performance);
    console.log("operational_conditions:", operational_conditions);
    console.log("performance_ssss:", performance_ssss);
  };

  const options = [
    {
      label: "load data",
      value: "1",
    },
  ];

  const handleSubmit = async (surveyCode: string) => {
    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    let formData = {
      "performance_ins-gnss-usbl": performanceForm,
      calibration_parameters: calibrationForm,
      survey_platform_performance: platformForm,
      operational_conditions: operationalForm,
      lever_arm_measures_between: leverForm,
      "performance_of_ssss-s1-s2-s3-s4": ssPerformanceForm,
    };

    let data = {
      name: surveyName,
      // this should equally be replaced with the correct survey id
      survey: 1,
      parameters: formData,
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
                onChange={loadSurveyData}
                placeholder="Load past survey data"
              />
            </FormControl>
          </Card>
        </GridItem>
        <GridItem colSpan={2}>
          <PercormanceCard
            mb="2"
            performance_ssss={performanceCard}
            value={ssPerformanceForm}
            handleform={handlessPerformanceForm}
            surveyID={surveyID}
          />
          <Parameters
            results={surveyParameters}
            value={performanceForm}
            surveyID={surveyID}
          />
        </GridItem>
        <GridItem colSpan={3}>
          <Flex gap={3}>
            <Box>
              <PerformanceInsCard
                mb="2"
                performance_ins={performance_ins}
                handleform={handlePerformanceForm}
                surveyID={surveyID}
                value={performanceForm}
              />
              <PlatformPerformance
                mb="2"
                platformPerformance={platformPerformance}
                handleform={handlePlatformForm}
                surveyID={surveyID}
                value={platformForm}
              />
              <OperationalConditionsCard
                operationConditions={operationalConditions}
                handleform={handleOperationalForm}
                surveyID={surveyID}
                value={operationalForm}
              />
            </Box>

            <Box>
              <Calibrations
                mb="2"
                calibrations={calibrations}
                handleform={handleCalibrationsForm}
                surveyID={surveyID}
                value={calibrationForm}
              />

              <LeverarmCard
                mb="2"
                Leverarm={leverarm}
                handleform={handleleverForm}
                surveyID={surveyID}
                value={leverForm}
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
    <PurchaseLisence />
  );
  // <PurchaseLisence />;
}

export default EchoSounder;

EchoSounder.requireAuth = true;
