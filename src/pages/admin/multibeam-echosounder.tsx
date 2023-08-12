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
import PercormanceCard from "views/admin/dataTables/components/PerformanceCard";
import Parameters from "views/admin/dataTables/components/Parameters";
import PerformanceInsCard from "views/admin/dataTables/components/PerformanceInsCard";
import PlatformPerformance from "views/admin/dataTables/components/PlatformPerformance";
import OperationalConditionsCard from "views/admin/dataTables/components/OperationalConditionsCard";
import Calibrations from "views/admin/dataTables/components/Calibrations";
import LeverarmCard from "views/admin/dataTables/components/LeverarmCard";
import CloudPoints from "views/admin/dataTables/components/CloudPoints";
import Select from "react-select";
import { useAllSurveysContext } from "contexts/SurveyContext";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import axiosConfig from "axiosConfig";

type Survey = {
  id: number;
  name: string;
  code: string;
  code_value: string;
  is_active: boolean;
  is_delete: boolean;
};

export default function MultibeamEchoSounder() {
  const [subscription, setSubscription] = useState<any>();
  const [calibrations, setCalibrations] = useState<any>({
    roll_boresight: { type: "number" },
    pitch_boresight: { type: "number" },
    yaw_boresight: { type: "number" },
    pitch_boresight_uncertainty: { type: "number" },
    roll_boresight_uncertainty: { type: "number" },
    yaw_boresight_uncertainty: { type: "number" },
    ford_gnss_usbl_transducer: { type: "number" },
    ford_ins_of_the_usbl_and_gnss: { type: "number" },
    std_gnss_and_usbl_transducer: { type: "number" },
    std_ins_of_the_usbl_the_gnss: { type: "number" },
    "latency_gnss-smf": { type: "number" },
    "latency_gnss-usbl": { type: "number" },
    "latency_gnss-ins-of-usbl": { type: "number" },
    "uncty_of_latency_gnss-smf": { type: "number" },
    "latency_gnss-ins": { type: "number" },
    "uncty_of_latency_gnss-ins": { type: "number" },
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
    depth: { type: "number" },
    altitude_of_sss: { type: "number" },
    incidence_angle_of_mbes: { type: "number" },
    distance_x_between_sss_and_usbl: { type: "number" },
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
      max_range_of_sss: { type: "number" },
      along_track_beanwidth: { type: "number" },
      accross_track_beanwidth: { type: "number" },
      beams_number: { type: "number" },
      depth_resolution: { type: "number" },
      ping_rate: { type: "number" },
      user_defined_swath_coverage: {
        type: "select",
        option: [
          20, 30, 45, 60, 75, 90, 100, 110, 120, 130, 140, 145, 150, 165, 170,
          175,
        ],
      },
      shape_of_atennna: {
        type: "select",
        option: ["rectangular", "circular"],
      },
    },
    {
      defined_operating_frequency: { type: "number" },
      horizontal_field_of_view: { type: "number" },
      vertical_field_of_view: { type: "number" },
      pulse_duration: { type: "number" },
      beamwidth: { type: "number" },
      depression_angle: { type: "number" },
      max_range_of_sss: { type: "number" },
      along_track_beanwidth: { type: "number" },
      accross_track_beanwidth: { type: "number" },
      beams_number: { type: "number" },
      depth_resolution: { type: "number" },
      ping_rate: { type: "number" },
      user_defined_swath_coverage: {
        type: "select",
        option: [
          20, 30, 45, 60, 75, 90, 100, 110, 120, 130, 140, 145, 150, 165, 170,
          175,
        ],
      },
      shape_of_atennna: {
        type: "select",
        option: ["rectangular", "circular"],
      },
    },
    {
      defined_operating_frequency: { type: "number" },
      horizontal_field_of_view: { type: "number" },
      vertical_field_of_view: { type: "number" },
      pulse_duration: { type: "number" },
      beamwidth: { type: "number" },
      depression_angle: { type: "number" },
      max_range_of_sss: { type: "number" },
      along_track_beanwidth: { type: "number" },
      accross_track_beanwidth: { type: "number" },
      beams_number: { type: "number" },
      depth_resolution: { type: "number" },
      ping_rate: { type: "number" },
      user_defined_swath_coverage: {
        type: "select",
        option: [
          20, 30, 45, 60, 75, 90, 100, 110, 120, 130, 140, 145, 150, 165, 170,
          175,
        ],
      },
      shape_of_atennna: {
        type: "select",
        option: ["rectangular", "circular"],
      },
    },
    {
      defined_operating_frequency: { type: "number" },
      horizontal_field_of_view: { type: "number" },
      vertical_field_of_view: { type: "number" },
      pulse_duration: { type: "number" },
      beamwidth: { type: "number" },
      depression_angle: { type: "number" },
      max_range_of_sss: { type: "number" },
      along_track_beanwidth: { type: "number" },
      accross_track_beanwidth: { type: "number" },
      beams_number: { type: "number" },
      depth_resolution: { type: "number" },
      ping_rate: { type: "number" },
      user_defined_swath_coverage: {
        type: "select",
        option: [
          20, 30, 45, 60, 75, 90, 100, 110, 120, 130, 140, 145, 150, 165, 170,
          175,
        ],
      },
      shape_of_atennna: {
        type: "select",
        option: ["rectangular", "circular"],
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
    std_gnss_and_smf: { type: "number" },
    sounding_reduction: { type: "select", option: ["gnss"] },
  });

  const [surveyParameters, setSurveyParameters] = useState<any>({
    number_of_profiles_in_length: 0.0,
    survey_time: 0.0,
    along_track_resolution: 0.0,
    accross_track_resolution: 0.0,
    along_track_beams_repartition: 0.0,
    accross_track_beams_repartition: 0.0,
    "thu-1-lambda": 0.0,
  });

  const [calibrationForm, setCalibrationForm] = useState<any>({});
  const [platformForm, setPlatformForm] = useState<any>({});
  const [performanceForm, setPerformanceForm] = useState<any>({});
  const [leverForm, setLeverForm] = useState<any>({});
  const [operationalForm, setOperationalForm] = useState<any>({});

  const [ssPerformanceForm, setSSPerformanceForm] = useState<any>({});

  const [survey, setSurvey] = useState([]);
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
  const [surveyID, setSurveyID] = useState<number>(1);
  const [surveyName, setSurveyName] = useState("");
  const [planning, setPlanning] = useState(false);
  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const [surveyCode, setSurveyCode] = useState("S01");
  const { surveys, multibeam, getAllSurveys } = useAllSurveysContext();
  const { surveyOptions } = useSurveyHistoryContext();

  // chakra toast
  const toast = useToast();

  const checkSubscription = () => {
    subscription?.assigned_surveys?.forEach((survey: any) => {
      if (survey?.id == surveyID) {
        setSurvey([survey?.id]);
      }
    });
  };

  useEffect(() => {
    if (!surveys) {
      getAllSurveys();
    }

    if (subscription && multibeam) {
      checkSubscription();
    }

    if (multibeam) {
      setSurveyCode(multibeam.code);
      setSurveyID(multibeam.id);
    }
  }, [surveys, subscription]);

  useEffect(() => {
    const sub = async () => {
      await fetchSubscriptions();
    };
    setSubscription(subscriptions[subscriptions.length - 1]);

    sub();
    // console.log("formside scan", form);
  }, [loading, subscription]);

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
    // Update state
    setSSPerformanceForm(updatedForm);
  };

  // const handleFormChange = (event: any, form: any, setFormState: any) => {
  //   // Clone form because we need to modify it
  //   let updatedForm = { ...form };

  //   const { name, value } = event.target;

  //   // Split the name into an array of keys
  //   const keys = name.split(".");

  //   // Build the nested object dynamically
  //   let nestedObj = updatedForm;

  //   for (let i = 0; i < keys.length - 1; i++) {
  //     const key = keys[i];

  //     if (!nestedObj[key]) {
  //       // Check if the next key is a number (indicating an array)
  //       if (isNaN(keys[i + 1])) {
  //         nestedObj[key] = {};
  //       } else {
  //         nestedObj[key] = [];
  //       }
  //     }

  //     nestedObj = nestedObj[key];
  //   }

  //   const lastKey = keys[keys.length - 1];
  //   if (Array.isArray(nestedObj) && !isNaN(lastKey)) {
  //     // Convert the value to a number if it represents an array index
  //     nestedObj[Number(lastKey)] = shouldConvertToFloat(lastKey)
  //       ? parseFloat(value)
  //       : value;
  //   } else {
  //     nestedObj[lastKey] = shouldConvertToFloat(lastKey)
  //       ? parseFloat(value)
  //       : value;
  //   }
  //   // Update state
  //   setFormState(updatedForm);
  // };

  // Helper function to determine if a value should be converted to a float

  const shouldConvertToFloat = (inputField: string): boolean => {
    // Add conditions for the input fields where conversion is not required
    const fieldsRequiringFloatConversion = [
      "sounding_reduction",
      "shape_of_atennna",
    ];
    return !fieldsRequiringFloatConversion.includes(inputField);
  };

  const loadSurveyData = (event: any) => {
    const {
      name,
      parameters: {
        calibration_parameters,
        "performance_ins-gnss-usbl": performance_gnss_usbl,
        survey_platform_performance,
        lever_arm_measures_between,
        operational_conditions,
        "performance_of_mbess-s1-s2-s3-s4": performance_ssss,
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

  const handleSubmit = async (surveyCode: string) => {
    setPlanning(true);
    let datum = [];

    for (let key in ssPerformanceForm) {
      if (
        typeof ssPerformanceForm[key] === "object" &&
        !Array.isArray(ssPerformanceForm[key])
      ) {
        datum.push(ssPerformanceForm[key]);
      }
    }

    let formData = {
      "performance_ins-gnss-usbl": performanceForm,
      calibration_parameters: calibrationForm,
      survey_platform_performance: platformForm,
      operational_conditions: operationalForm,
      lever_arm_measures_between: leverForm,
      "performance_of_mbess-s1-s2-s3-s4": datum,
    };

    let data = {
      name: surveyName,
      survey: multibeam.id,
      parameters: formData,
    };

    await axiosConfig
      .post(`/api/surveys/${surveyCode}/generate-survey/`, data)
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

  // useEffect(() => {
  //   console.log("after generate survey", form);
  //   getSurveys();
  // }, [surveys]);

  // useEffect(() => {
  //   const sub = async () => {
  //     await fetchSubscriptions();
  //   };

  //   checkSubscription();
  //   setSubscription(subscriptions[subscriptions.length - 1]);

  //   sub();
  // }, [loading, subscription]);

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
            survey_Id={surveyID}
          />
          <Parameters
            results={surveyParameters}
            value={performanceForm}
            survey_Id={surveyID}
          />
        </GridItem>
        <GridItem colSpan={3}>
          <Flex gap={3}>
            <Box>
              <PerformanceInsCard
                mb="2"
                performance_ins={performance_ins}
                handleform={handlePerformanceForm}
                survey_Id={surveyID}
                value={performanceForm}
              />
              <PlatformPerformance
                mb="2"
                platformPerformance={platformPerformance}
                handleform={handlePlatformForm}
                value={platformForm}
                survey_Id={surveyID}
              />
              <OperationalConditionsCard
                operationConditions={operationalConditions}
                handleform={handleOperationalForm}
                survey_Id={surveyID}
                value={operationalForm}
              />
            </Box>
            <Box>
              <Calibrations
                mb="2"
                calibrations={calibrations}
                handleform={handleCalibrationsForm}
                survey_Id={surveyID}
                value={calibrationForm}
              />
              <LeverarmCard
                mb="2"
                Leverarm={leverarm}
                handleform={handleleverForm}
                survey_Id={surveyID}
                value={leverForm}
              />
              <CloudPoints survey_Id={surveyID} />
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

MultibeamEchoSounder.requireAuth = true;
