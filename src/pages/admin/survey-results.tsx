import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import PercormanceCard from "views/admin/dataTables/components/PerformanceCard";
import Parameters from "views/admin/dataTables/components/Parameters";
import PerformanceInsCard from "views/admin/dataTables/components/PerformanceInsCard";
import PlatformPerformance from "views/admin/dataTables/components/PlatformPerformance";
import OperationalConditionsCard from "views/admin/dataTables/components/OperationalConditionsCard";
import Calibrations from "views/admin/dataTables/components/Calibrations";
import LeverarmCard from "views/admin/dataTables/components/LeverarmCard";
import CloudPoints from "views/admin/dataTables/components/CloudPoints";
import { useAllSurveysContext } from "contexts/SurveyContext";

type Survey = {
  id: number;
  name: string;
  code: string;
  code_value: string;
  is_active: boolean;
  is_delete: boolean;
};

function SurveyResults(
  { surveyResult }: { surveyResult: any },
  ref: React.LegacyRef<HTMLDivElement>
) {
  const [surveyid, setSurveyId] = useState<number>(1);
  const [surveyName, setSurveyName] = useState("");
  const { surveys, getAllSurveys } = useAllSurveysContext();

  const [calibrations, setCalibrations] = useState<any>({
    roll_boresight: { type: "number" },
    yaw_boresight: { type: "number" },
    pitch_boresight_uncertainty: { type: "number" },
    roll_boresight_uncertainty: { type: "number" },
    yaw_boresight_uncertainty: { type: "number" },
    "latency_gnss-smf": { type: "number" },
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
    incidence_angle_of_mbes: { type: "number" },
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
      defined_operating_frequency: { type: "number" },
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
    sounding_reduction: { type: "text", option: ["gnss"] },
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

  const getSurveyResults = useCallback(() => {
    let currentSurvey: Survey;

    if (surveyResult) {
      surveys.map((survey: Survey) => {
        if (survey.id == surveyResult.survey) {
          currentSurvey = survey;
          setSurveyId(survey.id);
        }
      });
      // destructure the results
      const { name, results, parameters } = surveyResult;
      console.log(currentSurvey, "currentSurvey");

      // Destructure the item based on survey type
      if (
        currentSurvey &&
        currentSurvey.name.toLowerCase().includes("multibeam")
      ) {
        const {
          calibration_parameters,
          "performance_ins-gnss-usbl": performance_gnss_usbl,
          survey_platform_performance,
          lever_arm_measures_between,
          operational_conditions,
          "performance_of_mbess-s1-s2-s3-s4": performance_ssss,
        } = parameters;

        setCalibrationForm(calibration_parameters);
        setPerformanceForm(performance_gnss_usbl);
        setPlatformForm(survey_platform_performance);
        setOperationalForm(operational_conditions);
        setSSPerformanceForm(performance_ssss);
        setLeverForm(lever_arm_measures_between);
      } else if (
        currentSurvey &&
        currentSurvey.name.toLowerCase().includes("dynamic")
      ) {
        //lydar
        const {
          calibration_parameters,
          "performance_ins-gnss-usbl": performance_gnss_usbl,
          survey_platform_performance,
          lever_arm_measures_between,
          operational_conditions,
          "performance_of_lidars-l1-l2-l3-l4": performance_ssss,
        } = parameters;

        setCalibrationForm(calibration_parameters);
        setPerformanceForm(performance_gnss_usbl);
        setPlatformForm(survey_platform_performance);
        setOperationalForm(operational_conditions);
        setSSPerformanceForm(performance_ssss);
        setLeverForm(lever_arm_measures_between);
      } else if (
        currentSurvey &&
        currentSurvey.name.toLowerCase().includes("scan")
      ) {
        //side scan
        const {
          calibration_parameters,
          "performance_ins-gnss-usbl": performance_gnss_usbl,
          survey_platform_performance,
          lever_arm_measures_between,
          operational_conditions,
          "performance_of_ssss-s1-s2-s3-s4": performance_ssss,
        } = parameters;

        setCalibrationForm(calibration_parameters);
        setPerformanceForm(performance_gnss_usbl);
        setPlatformForm(survey_platform_performance);
        setOperationalForm(operational_conditions);
        setSSPerformanceForm(performance_ssss);
        setLeverForm(lever_arm_measures_between);
      } else if (
        currentSurvey &&
        currentSurvey.name.toLowerCase().includes("acoustic")
      ) {
        //acoustc
        const {
          calibration_parameters,
          "performance_ins-gnss-usbl": performance_gnss_usbl,
          survey_platform_performance,
          lever_arm_measures_between,
          operational_conditions,
          "performance_of_cameras-a1-a2-a3-a4": performance_ssss,
        } = parameters;
        setCalibrationForm(calibration_parameters);
        setPerformanceForm(performance_gnss_usbl);
        setPlatformForm(survey_platform_performance);
        setOperationalForm(operational_conditions);
        setSSPerformanceForm(performance_ssss);
        setLeverForm(lever_arm_measures_between);
      }

      setSurveyName(name);
      setSurveyParameters(results);
    }
  }, [surveyResult, surveys]);

  useEffect(() => {
    if (!surveys) {
      getAllSurveys();
    } else {
      getSurveyResults();
    }
  }, [surveys, getSurveyResults, getAllSurveys]);

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

  // Helper function to determine if a value should be converted to a float
  const shouldConvertToFloat = (inputField: string): boolean => {
    // Add conditions for the input fields where conversion is not required
    const fieldsRequiringFloatConversion = [
      "sounding_reduction",
      "shape_of_atennna",
    ];
    return !fieldsRequiringFloatConversion.includes(inputField);
  };

  return (
    <Grid
      ref={ref}
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
              isDisabled
              value={surveyName}
              onChange={(e) => setSurveyName(e.target.value)}
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
          survey_Id={surveyid}
        />
        <Parameters results={surveyParameters} />
      </GridItem>
      <GridItem colSpan={3}>
        <Flex gap={3}>
          <Box>
            <PerformanceInsCard
              mb="2"
              performance_ins={performance_ins}
              handleform={handlePerformanceForm}
              value={performanceForm}
            />
            <PlatformPerformance
              mb="2"
              platformPerformance={platformPerformance}
              handleform={handlePlatformForm}
              value={platformForm}
            />
            <OperationalConditionsCard
              operationConditions={operationalConditions}
              handleform={handleOperationalForm}
              value={operationalForm}
            />
          </Box>
          <Box>
            <Calibrations
              mb="2"
              calibrations={calibrations}
              handleform={handleCalibrationsForm}
              value={calibrationForm}
            />
            <LeverarmCard
              mb="2"
              Leverarm={leverarm}
              handleform={handleleverForm}
              value={leverForm}
            />
            <CloudPoints surveyid={surveyid} />
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default React.forwardRef(SurveyResults);
