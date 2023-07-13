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
import axios from "axios";
import { useSession } from "next-auth/react";
import Select from "react-select";
import { useAllSurveysContext } from "contexts/SurveyContext";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";

const jsonData = {
  name: "my test survey",
  survey: 1,
  parameters: {
    calibration_parameters: {
      pitch_boresight: 0.1,
      roll_boresight: -0.2,
      yaw_boresight: 0.3,
      pitch_boresight_uncertainty: 0.02,
      roll_boresight_uncertainty: 0.03,
      yaw_boresight_uncertainty: 0.04,
      "latency_gnss-ins": 0.5,
      "latency_gnss-lidar": 0.6,
      "uncty_of_latency_gnss-ins": 0.02,
      "uncty_of_latency_gnss-lidar": 0.03,
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
    lever_arm_measures_between: {
      lever_arms_uncertainty: 0.01,
      ford_gnss_smf: 0.2,
      ford_ins_and_gnss: 0.1,
      down_ins_and_gnss: 0.3,
      down_gnss_and_smf: 0.2,
      std_ins_and_gnss: 0.15,
      std_gnss_and_lidar: 0.25,
    },
    operational_conditions: {
      flying_height_or_distance: 1000,
      max_depth_of_the_svp: 200,
      angle_of_incidence_of_a_beam: 30,
      overlap_rate: 0.8,
      width_of_the_study_area: 1000,
      length_of_the_study_area: 2000,
      tide_uncertainty: 0.05,
      co_tidal_uncertainty: 0.06,
    },
    "performance_of_mbess-s1-s2-s3-s4": [
      {
        maximum_range: 200,
        beam_divergence: 0.1,
        signal_to_noise_ratio: 30,
        uncertainty_of_divergence: 0.02,
        pulse_duration: 10,
        pulse_repetition_rate: 100,
        range_uncertainty: 0.05,
        lidar_scanning_angle: 30,
        texture: "integrated",
      },
      {
        maximum_range: 200,
        beam_divergence: 0.1,
        signal_to_noise_ratio: 30,
        uncertainty_of_divergence: 0.02,
        pulse_duration: 10,
        pulse_repetition_rate: 100,
        range_uncertainty: 0.05,
        lidar_scanning_angle: 30,
        texture: "integrated",
      },
      {
        maximum_range: 200,
        beam_divergence: 0.1,
        signal_to_noise_ratio: 30,
        uncertainty_of_divergence: 0.02,
        pulse_duration: 10,
        pulse_repetition_rate: 100,
        range_uncertainty: 0.05,
        lidar_scanning_angle: 30,
        texture: "integrated",
      },
      {
        maximum_range: 200,
        beam_divergence: 0.1,
        signal_to_noise_ratio: 30,
        uncertainty_of_divergence: 0.02,
        pulse_duration: 10,
        pulse_repetition_rate: 100,
        range_uncertainty: 0.05,
        lidar_scanning_angle: 30,
        texture: "integrated",
      },
    ],
  },
};

type Survey = {
  id: number;
  name: string;
  code: string;
  code_value: string;
  is_active: boolean;
  is_delete: boolean;
};

function DynamicLydar() {
  const [subscription, setSubscription] = useState<any>();
  const [surveyID, setSurveyID] = useState(2);
  const [survey, setSurvey] = useState([]);
  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const { surveys, lidar, getAllSurveys } = useAllSurveysContext();
  const { history, surveyOptions } = useSurveyHistoryContext();

  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  const [surveyCode, setSurveyCode] = useState("S03");
  const [planning, setPlanning] = useState(false);
  const [surveyName, setSurveyName] = useState("");

  // chakra toast
  const toast = useToast();

  // Survey parameters
  const [calibrations, setCalibrations] = useState<any>({
    pitch_boresight: { type: "number" },
    roll_boresight: { type: "number" },
    yaw_boresight: { type: "number" },
    pitch_boresight_uncertainty: { type: "number" },
    roll_boresight_uncertainty: { type: "number" },
    yaw_boresight_uncertainty: { type: "number" },
    "latency_gnss-ins": { type: "number" },
    "latency_gnss-lidar": { type: "number" },
    "uncty_of_latency_gnss-ins": { type: "number" },
    "uncty_of_latency_gnss-lidar": { type: "number" },
  });
  const [platformPerformance, setPlatformPerformance] = useState<any>({
    survey_speed: { type: "number" },
    survey_speed_uncertainty: { type: "number" },
    draft_uncertainty: { type: "number" },
    variation_in_z_due_to_loads: { type: "number" },
  });
  const [operationalConditions, setOperationalConditions] = useState<any>({
    flying_height_or_distance: { type: "number" },
    max_depth_of_the_svp: { type: "number" },
    angle_of_incidence_of_a_beam: { type: "number" },
    overlap_rate: { type: "number" },
    width_of_the_study_area: { type: "number" },
    length_of_the_study_area: { type: "number" },
    tide_uncertainty: { type: "number" },
    co_tidal_uncertainty: { type: "number" },
  });
  const [performance_ins, setPerformance_ins] = useState<any>({
    yaw_uncertainty: { type: "number" },
    roll_uncertainty: { type: "number" },
    pitch_uncertainty: { type: "number" },
    positioning_uncertainty_in_h: { type: "number" },
    positioning_uncertainty_in_v: { type: "number" },
    heave_uncertainty: { type: "number" },
  });

  const [performanceCard, setPerformanceCard] = useState<any>([
    {
      maximum_range: { type: "number" },
      beam_divergence: { type: "number" },
      signal_to_noise_ratio: { type: "number" },
      uncertainty_of_divergence: { type: "number" },
      pulse_duration: { type: "number" },
      pulse_repetition_rate: { type: "number" },
      range_uncertainty: { type: "number" },
      lidar_scanning_angle: {
        type: "select",
        option: [
          15, 30, 45, 60, 75, 90, 110, 210, 130, 140, 145, 150, 165, 170, 175,
        ],
      },
      texture: {
        type: "select",
        option: ["integrated", "external", "no-texture"],
      },
    },
    {
      maximum_range: { type: "number" },
      beam_divergence: { type: "number" },
      signal_to_noise_ratio: { type: "number" },
      uncertainty_of_divergence: { type: "number" },
      pulse_duration: { type: "number" },
      pulse_repetition_rate: { type: "number" },
      range_uncertainty: { type: "number" },
      lidar_scanning_angle: {
        type: "select",
        option: [
          15, 30, 45, 60, 75, 90, 110, 210, 130, 140, 145, 150, 165, 170, 175,
        ],
      },
      texture: {
        type: "select",
        option: ["integrated", "external", "no-texture"],
      },
    },
    {
      maximum_range: { type: "number" },
      beam_divergence: { type: "number" },
      signal_to_noise_ratio: { type: "number" },
      uncertainty_of_divergence: { type: "number" },
      pulse_duration: { type: "number" },
      pulse_repetition_rate: { type: "number" },
      range_uncertainty: { type: "number" },
      lidar_scanning_angle: {
        type: "select",
        option: [
          15, 30, 45, 60, 75, 90, 110, 210, 130, 140, 145, 150, 165, 170, 175,
        ],
      },
      texture: {
        type: "select",
        option: ["integrated", "external", "no-texture"],
      },
    },
    {
      maximum_range: { type: "number" },
      beam_divergence: { type: "number" },
      signal_to_noise_ratio: { type: "number" },
      uncertainty_of_divergence: { type: "number" },
      pulse_duration: { type: "number" },
      pulse_repetition_rate: { type: "number" },
      range_uncertainty: { type: "number" },
      lidar_scanning_angle: {
        type: "select",
        option: [
          15, 30, 45, 60, 75, 90, 110, 210, 130, 140, 145, 150, 165, 170, 175,
        ],
      },
      texture: {
        type: "select",
        option: ["integrated", "external", "no-texture"],
      },
    },
  ]);

  const [leverarm, setLeverarm] = useState<any>({
    lever_arms_uncertainty: { type: "number" },
    ford_gnss_smf: { type: "number" },
    ford_ins_and_gnss: { type: "number" },
    down_ins_and_gnss: { type: "number" },
    down_gnss_and_smf: { type: "number" },
    std_ins_and_gnss: { type: "number" },
    std_gnss_and_lidar: { type: "number" },
  });

  const [surveyParameters, setSurveyParameters] = useState<any>({
    "swath-width": 0,
    survey_time: 0,
    "ratio_swath-height-distance": 0,
    max_slant_range: 0,
    interprofil_spacing: 0,
    diameter_of_a_footprint: 0,
    range_resolution: 0,
    range_uncertainty: 0,
    horizontal_uncertainty: 0,
    vertical_uncertainty: 0,
    lidar_points_density: 0,
    number_of_profiles_in_length: 0,
    reduction_of_cloud_points: 0,
  });

  // survey parameters form
  const [calibrationForm, setCalibrationForm] = useState<any>({});
  const [platformForm, setPlatformForm] = useState<any>({});
  const [performanceForm, setPerformanceForm] = useState<any>({});
  const [leverForm, setLeverForm] = useState<any>({});
  const [operationalForm, setOperationalForm] = useState<any>({});
  const [form, setForm] = useState<any>({});
  const [ssPerformanceForm, setSSPerformanceForm] = useState<any>({});

  const [results, setResults] = useState({
    "swath-width": { type: "number" },
    survey_time: { type: "number" },
    "ratio_swath-height-distance": { type: "number" },
    max_slant_range: { type: "number" },
    interprofil_spacing: { type: "number" },
    diameter_of_a_footprint: { type: "number" },
    range_resolution: { type: "number" },
    range_uncertainty: { type: "number" },
    horizontal_uncertainty: { type: "number" },
    vertical_uncertainty: { type: "number" },
    lidar_points_density: { type: "number" },
    number_of_profiles_in_length: { type: "number" },
    reduction_of_cloud_points: {
      type: "string",
      enum: ["gnss", "tide"],
    },
  });

  const { surveyResults, planSurvey, handleFormChange } = useSurveyContext();

  // manage all the surveyparameters on input change
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
      nestedObj[Number(lastKey)] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
    } else {
      nestedObj[lastKey] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
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
      nestedObj[Number(lastKey)] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
    } else {
      nestedObj[lastKey] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
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
      nestedObj[Number(lastKey)] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
    } else {
      nestedObj[lastKey] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
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
      nestedObj[Number(lastKey)] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
    } else {
      nestedObj[lastKey] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
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
      nestedObj[Number(lastKey)] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
    } else {
      nestedObj[lastKey] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
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
      nestedObj[Number(lastKey)] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
    } else {
      nestedObj[lastKey] = shouldConvertToFloat(lastKey)
        ? parseFloat(value)
        : value;
    }
    console.log("Form changed: ", updatedForm);
    // Update state
    setSSPerformanceForm(updatedForm);
  };

  // Helper function to determine if a value should be converted to a float
  const shouldConvertToFloat = (inputField: string): boolean => {
    // Add conditions for the input fields where conversion is not required
    const fieldsRequiringFloatConversion = [
      "sounding_reduction",
      "shape_of_atennna",
    ];
    return !fieldsRequiringFloatConversion.includes(inputField);
  };

  const checkSubscription = () => {
    subscription?.assigned_surveys?.forEach((survey: any) => {
      if (survey?.id == lidar.id) {
        setSurvey([survey?.id]);
      }
    });
  };

  useEffect(() => {
    if (!surveys) {
      getAllSurveys();
    }

    if (subscription && lidar) {
      checkSubscription();
    }

    if (lidar) {
      setSurveyCode(lidar.code);
      setSurveyID(lidar.id);
    }
  }, [surveys, subscription]);

  // to prefill form with survey past survey data
  const loadSurveyData = (event: any) => {
    const {
      name,
      parameters: {
        calibration_parameters,
        "performance_ins-gnss-usbl": performance_gnss_usbl,
        survey_platform_performance,
        lever_arm_measures_between,
        operational_conditions,
        "performance_of_lidars-l1-l2-l3-l4": performance_ssss,
      },
    } = event.value;

    setCalibrationForm(calibration_parameters);
    setPerformanceForm(performance_gnss_usbl);
    setPlatformForm(survey_platform_performance);
    setOperationalForm(operational_conditions);
    setSSPerformanceForm(performance_ssss);
    setLeverForm(lever_arm_measures_between);
    setSurveyName(name);
  };

  // submit form for survey generation
  const handleSubmit = async (surveyCode: string) => {
    setPlanning(true);
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
      "performance_of_lidars-l1-l2-l3-l4": ssPerformanceForm,
    };

    let data = {
      name: surveyName,
      survey: lidar.id,
      parameters: formData,
    };

    console.log(data);

    await axios
      .post(
        `https://surveyplanner.pythonanywhere.com/api/surveys/${surveyCode}/generate-survey/`,
        data,
        config
      )
      .then((res) => {
        setResults(res.data);
        setSurveyParameters(res.data.results);
        // console.log(res);
        toast({
          position: "bottom-right",
          description: "Successful",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        setPlanning(false);
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
        setPlanning(false);
      });
  };

  // css styles for react-select
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

  useEffect(() => {
    const sub = async () => {
      await fetchSubscriptions();
    };
    setSubscription(subscriptions[subscriptions.length - 1]);
    // console.log(subscriptions.length);
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
  return survey.length > 0 ? (
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
              <FormLabel fontSize="sm">Surveys</FormLabel>
              <Select
                styles={reactSelectStyles}
                options={surveyOptions}
                onChange={(e) => loadSurveyData(e)}
                placeholder="Load past survey data"
              />
            </FormControl>
          </Card>
        </GridItem>
        <GridItem colSpan={2}>
          <PercormanceCard
            mb="2"
            mr="2"
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
                value={platformForm}
                surveyID={surveyID}
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
            isLoading={planning}
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
