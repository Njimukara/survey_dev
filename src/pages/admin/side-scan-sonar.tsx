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
import React, { useState, useMemo, useEffect } from "react";
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

interface Survey {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  is_delete: boolean;
}

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

  const [ssPerformanceForm, setSSPerformanceForm] = useState<any>({});

  const [survey, setSurvey] = useState([]);
  const [surveyID, setSurveyID] = useState<number>(3);
  const [surveyName, setSurveyName] = useState("");
  const [planning, setPlanning] = useState(false);
  const [surveyCode, setSurveyCode] = useState("S02");
  const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const { surveys, sideScan, getAllSurveys } = useAllSurveysContext();
  const { surveyOptions } = useSurveyHistoryContext();

  // chakra toast
  const toast = useToast();

  const checkSubscription = () => {
    subscription?.assigned_surveys?.forEach((survey: any) => {
      if (survey?.id == sideScan.id) {
        setSurvey([survey?.id]);
      }
    });
  };

  useEffect(() => {
    if (!surveys) {
      getAllSurveys();
    }
    if (subscription && sideScan) {
      checkSubscription();
    }

    if (sideScan) {
      setSurveyCode(sideScan.id);
      setSurveyCode(sideScan.code);
    }
  }, [surveys, subscription, getAllSurveys]);

  useEffect(() => {
    const sub = async () => {
      await fetchSubscriptions();
    };
    setSubscription(subscriptions[subscriptions.length - 1]);

    sub();
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

  // // get all surveys
  // const getSurveys = async () => {
  //   const config = {
  //     headers: {
  //       Accept: "application/json;charset=UTF-8",
  //       Authorization: `Token ${session?.user?.auth_token}`,
  //     },
  //   };
  //   await axios
  //     .get(`https://surveyplanner.pythonanywhere.com/api/surveys/`, config)
  //     .then((res) => {
  //       res.data.map((survey: Survey) => {
  //         if (survey.id == surveyID) {
  //           setSurveyCode(survey.code);
  //         }
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getSurveys();
  // }, [surveys]);

  const loadSurveyData = (event: any) => {
    const {
      name,
      parameters: {
        calibration_parameters,
        "performance_ins-gnss-usbl": performance_gnss_usbl,
        survey_platform_performance,
        lever_arm_measures_between,
        operational_conditions,
        "performance_of_ssss-s1-s2-s3-s4": performance_ssss,
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
      survey: sideScan.id,
      parameters: formData,
    };

    await axiosConfig
      .post(`/api/surveys/${surveyCode}/generate-survey/`, data)
      .then((res) => {
        setResults(res.data);
        setPlanning(false);
      })
      .catch((error) => {
        setPlanning(false);
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
                survey_Id={surveyID}
                value={platformForm}
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
            isLoading={planning}
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
