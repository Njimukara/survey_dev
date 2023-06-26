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
import CloudPoints from "views/admin/dataTables/components/CloudPoints";
import LeverarmCard from "views/admin/dataTables/components/LeverarmCard";
import { useSurveyContext } from "contexts/Survey";
import axios from "axios";
import { useSession } from "next-auth/react";
import Select from "react-select";

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
      "latency_gnss-usbl": 0.5,
      "latency_gnss-ins-of-usbl": 0.6,
    },
    "performance_ins-gnss-usbl": {
      yaw_uncertainty: 0.05,
      roll_uncertainty: 0.06,
      pitch_uncertainty: 0.07,
      positioning_uncertainty_in_h: 0.08,
      positioning_uncertainty_in_v: 0.09,
      heave_uncertainty: 0.1,
      slant_range_uncertainty_of_the_usbl: 0.02,
      angle_uncertainty_of_the_usbl: 0.03,
    },
    survey_platform_performance: {
      survey_speed: 2.5,
      survey_speed_uncertainty: 0.2,
      draft_uncertainty: 0.01,
      variation_in_z_due_to_loads: 0.03,
    },
    lever_arm_measures_between: {
      lever_arms_uncertainty: 0.01,
      ford_gnss_and_usbl_transducer: 0.2,
      ford_ins_of_the_usbl_and_gnss: 0.1,
      down_ins_of_the_usbl_and_gnss: 0.3,
      down_gnss_and_usbl_transducer: 0.2,
      std_gnss_and_usbl_transducer: 0.15,
      std_ins_of_the_usbl_and_gnss: 0.25,
    },
    operational_conditions: {
      mean_sound_speed: 1500,
      max_depth_of_the_svp: 200,
      svs_uncertainty: 0.1,
      svp_uncertainty: 0.2,
      uncert_svp_beyond_its_max_depth: 0.3,
      tide_uncertainty: 0.05,
      co_tidal_uncertainty: 0.06,
      altitude_of_ac: 10,
      "distance_x_between_ac-usbl": 5,
    },
    "performance_of_mbess-s1-s2-s3-s4": [
      {
        defined_operating_frequency: 100,
        horizontal_field_of_view: 60,
        vertical_field_of_view: 30,
        pulse_duration: 10,
        beamwidth: 0.2,
        depression_angle: -5,
        max_range_of_camera: 1000,
        "inclination_of_the_antenna-horizontal": 20,
      },
      {
        defined_operating_frequency: 100,
        horizontal_field_of_view: 60,
        vertical_field_of_view: 30,
        pulse_duration: 10,
        beamwidth: 0.2,
        depression_angle: -5,
        max_range_of_camera: 1000,
        "inclination_of_the_antenna-horizontal": 20,
      },
      {
        defined_operating_frequency: 100,
        horizontal_field_of_view: 60,
        vertical_field_of_view: 30,
        pulse_duration: 10,
        beamwidth: 0.2,
        depression_angle: -5,
        max_range_of_camera: 1000,
        "inclination_of_the_antenna-horizontal": 20,
      },
      {
        defined_operating_frequency: 100,
        horizontal_field_of_view: 60,
        vertical_field_of_view: 30,
        pulse_duration: 10,
        beamwidth: 0.2,
        depression_angle: -5,
        max_range_of_camera: 1000,
        "inclination_of_the_antenna-horizontal": 20,
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

export default function AcousticSonar() {
  const [subscription, setSubscription] = useState<any>();
  const [surveys, setSurveys] = useState([]);
  const [surveyID, setSurveyID] = useState(4);
  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const [user, setUser] = useState(null);
  const { data: session } = useSession();
  const [surveyCode, setSurveyCode] = useState("S04");
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
    "latency_gnss-usbl": { type: "number" },
    "latency_gnss-ins-of-usbl": { type: "number" },
  });
  const [platformPerformance, setPlatformPerformance] = useState<any>({
    survey_speed: { type: "number" },
    survey_speed_uncertainty: { type: "number" },
    draft_uncertainty: { type: "number" },
    variation_in_z_due_to_loads: { type: "number" },
  });
  const [operationalConditions, setOperationalConditions] = useState<any>({
    mean_sound_speed: { type: "number" },
    max_depth_of_the_svp: { type: "number" },
    svs_uncertainty: { type: "number" },
    svp_uncertainty: { type: "number" },
    uncert_svp_beyond_its_max_depth: { type: "number" },
    tide_uncertainty: { type: "number" },
    co_tidal_uncertainty: { type: "number" },
    altitude_of_ac: { type: "number" },
    "distance_x_between_ac-usbl": { type: "number" },
  });
  const [performance_ins, setPerformance_ins] = useState<any>({
    yaw_uncertainty: { type: "number" },
    roll_uncertainty: { type: "number" },
    pitch_uncertainty: { type: "number" },
    positioning_uncertainty_in_h: { type: "number" },
    positioning_uncertainty_in_v: { type: "number" },
    heave_uncertainty: { type: "number" },
    slant_range_uncertainty_of_the_usbl: { type: "number" },
    angle_uncertainty_of_the_usbl: { type: "number" },
  });

  const [performanceCard, setPerformanceCard] = useState<any>([
    {
      defined_operating_frequency: { type: "number" },
      horizontal_field_of_view: { type: "number" },
      vertical_field_of_view: { type: "number" },
      pulse_duration: { type: "number" },
      beamwidth: { type: "number" },
      depression_angle: { type: "number" },
      max_range_of_camera: { type: "number" },
      "inclination_of_the_antenna-horizontal": { type: "number" },
    },
    {
      defined_operating_frequency: { type: "number" },
      horizontal_field_of_view: { type: "number" },
      vertical_field_of_view: { type: "number" },
      pulse_duration: { type: "number" },
      beamwidth: { type: "number" },
      depression_angle: { type: "number" },
      max_range_of_camera: { type: "number" },
      "inclination_of_the_antenna-horizontal": { type: "number" },
    },
    {
      defined_operating_frequency: { type: "number" },
      horizontal_field_of_view: { type: "number" },
      vertical_field_of_view: { type: "number" },
      pulse_duration: { type: "number" },
      beamwidth: { type: "number" },
      depression_angle: { type: "number" },
      max_range_of_camera: { type: "number" },
      "inclination_of_the_antenna-horizontal": { type: "number" },
    },
    {
      defined_operating_frequency: { type: "number" },
      horizontal_field_of_view: { type: "number" },
      vertical_field_of_view: { type: "number" },
      pulse_duration: { type: "number" },
      beamwidth: { type: "number" },
      depression_angle: { type: "number" },
      max_range_of_camera: { type: "number" },
      "inclination_of_the_antenna-horizontal": { type: "number" },
    },
  ]);

  const [leverarm, setLeverarm] = useState<any>({
    lever_arms_uncertainty: { type: "number" },
    ford_gnss_and_usbl_transducer: { type: "number" },
    ford_ins_of_the_usbl_and_gnss: { type: "number" },
    down_ins_of_the_usbl_and_gnss: { type: "number" },
    down_gnss_and_usbl_transducer: { type: "number" },
    std_gnss_and_usbl_transducer: { type: "number" },
    std_ins_of_the_usbl_and_gnss: { type: "number" },
  });

  const [surveyParameters, setSurveyParameters] = useState<any>({
    width_of_the_image: 0,
    ratio_of_the_image: 0,
    range_uncertainty: 0,
    max_slant_range: 0,
    line_spacing_50p_overlap: 0,
    line_spacing_24p_overlap: 0,
    "thline_spacing_10p_overlapu-1-lambda": 0,
    along_track_resolution_r1: 0,
    accross_track_resolution_r1: 0,
    along_track_resolution_r2: 0,
    accross_track_resolution_r2: 0,
    uncertainty_in_xy_of_vector_usbl: 0,
    max_ping_rate: 0,
    coverage_rate_in_profile: 0,
    depression_angle: 0,
  });

  // survey parameters form
  const [calibrationForm, setCalibrationForm] = useState<any>({});
  const [platformForm, setPlatformForm] = useState<any>({});
  const [performanceForm, setPerformanceForm] = useState<any>({});
  const [leverForm, setLeverForm] = useState<any>({});
  const [operationalForm, setOperationalForm] = useState<any>({});
  const [ssPerformanceForm, setSSPerformanceForm] = useState<any>({});
  const [form, setForm] = useState<any>({});

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

  const { surveyResults, planSurvey, handleFormChange } = useSurveyContext();

  const checkSubscription = () => {
    subscription?.assigned_surveys?.forEach((survey: any) => {
      if (survey?.id == surveyID) {
        setSurveys([survey?.id]);
      }
    });
  };

  // to prefill form with survey past survey data
  const loadSurveyData = () => {
    setForm(calibrations);
    const {
      parameters: {
        calibration_parameters,
        "performance_ins-gnss-usbl": performance_gnss_usbl,
        survey_platform_performance,
        lever_arm_measures_between,
        operational_conditions,
        "performance_of_mbess-s1-s2-s3-s4": performance_ssss,
      },
    } = jsonData;

    setCalibrationForm(calibration_parameters);
    setPerformanceForm(performance_gnss_usbl);
    setPlatformForm(survey_platform_performance);
    setOperationalForm(operational_conditions);
    setSSPerformanceForm(performance_ssss);
    setLeverForm(lever_arm_measures_between);

    console.log("calibration_parameters:", calibration_parameters);
    console.log("performance_gnss_usbl:", performance_gnss_usbl);
    console.log("survey_platform_performance:", survey_platform_performance);
    console.log("operational_conditions:", operational_conditions);
    console.log("performance_ssss:", performance_ssss);
  };

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

  // dummy option for react select
  const options = [
    {
      label: "Survey one",
      value: { "1": "hello", dss: "dsdda" },
    },
  ];

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
      "performance_of_cameras-a1-a2-a3-a4": ssPerformanceForm,
    };

    let data = {
      name: surveyName,
      survey: surveyID,
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
    getSurveys();
  }, [surveys]);

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
          <Parameters results={surveyParameters} surveyID={surveyID} />
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

AcousticSonar.requireAuth = true;
