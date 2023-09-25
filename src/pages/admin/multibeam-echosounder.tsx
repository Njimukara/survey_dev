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
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
import PurchaseLisence from "views/admin/default/components/PurchaseLisence";
import Parameters from "views/admin/dataTables/components/Parameters";
import Select from "react-select";
import axiosConfig from "axiosConfig";
import {
  calibrationsFields,
  lever_arm_measuresFields,
  operationalConditionsFields,
  performaceCardFields,
  performaceINSFields,
  platformPerformanceFields,
} from "utils/multibeamFields";
import TestPerformanceCard from "views/admin/dataTables/components/ChatCard";
import SurveySectionCard from "views/admin/dataTables/components/SurveySectionCard";
import { checkSubscription } from "utils/checksubscription";
import useSurveyOptions from "hooks/SurveyOptions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchSurveys } from "redux/surveySlice";
import useUpdateSurveyHistory from "hooks/useUpdateSurveyHistory";

type Survey = {
  id: number;
  name: string;
  code: string;
  code_value: string;
  is_active: boolean;
  is_delete: boolean;
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

var initialValues = {
  surveyName: "",
  operational_conditions: {},
  survey_platform_performance: {},
  calibration_parameters: {},
  lever_arm_measures_between: {},
  performance_ins: {},
  performance_card: [
    {
      defined_operating_frequency: "",
      horizontal_field_of_view: "",
      vertical_field_of_view: "",
      pulse_duration: "",
      beamwidth: "",
      depression_angle: "",
      max_range_of_sss: "",
      along_track_beanwidth: "",
      accross_track_beanwidth: "",
      beams_number: "",
      depth_resolution: "",
      ping_rate: "",
      user_defined_swath_coverage: "",
      shape_of_atennna: "",
    },
    {
      defined_operating_frequency: "",
      horizontal_field_of_view: "",
      vertical_field_of_view: "",
      pulse_duration: "",
      beamwidth: "",
      depression_angle: "",
      max_range_of_sss: "",
      along_track_beanwidth: "",
      accross_track_beanwidth: "",
      beams_number: "",
      depth_resolution: "",
      ping_rate: "",
      user_defined_swath_coverage: "",
      shape_of_atennna: "",
    },
    {
      defined_operating_frequency: "",
      horizontal_field_of_view: "",
      vertical_field_of_view: "",
      pulse_duration: "",
      beamwidth: "",
      depression_angle: "",
      max_range_of_sss: "",
      along_track_beanwidth: "",
      accross_track_beanwidth: "",
      beams_number: "",
      depth_resolution: "",
      ping_rate: "",
      user_defined_swath_coverage: "",
      shape_of_atennna: "",
    },
    {
      defined_operating_frequency: "",
      horizontal_field_of_view: "",
      vertical_field_of_view: "",
      pulse_duration: "",
      beamwidth: "",
      depression_angle: "",
      max_range_of_sss: "",
      along_track_beanwidth: "",
      accross_track_beanwidth: "",
      beams_number: "",
      depth_resolution: "",
      ping_rate: "",
      user_defined_swath_coverage: "",
      shape_of_atennna: "",
    },
  ],
};

const validationSchema = Yup.object().shape({});

export default function MultibeamEchoSounder() {
  const handleSubmit = async (values: any) => {
    setPlanning(true);
    var {
      performance_ins,
      calibration_parameters,
      survey_platform_performance,
      operational_conditions,
      lever_arm_measures_between,
      performance_card,
    } = values;

    const formData = {
      "performance_ins-gnss-usbl": performance_ins,
      calibration_parameters: calibration_parameters,
      survey_platform_performance: survey_platform_performance,
      operational_conditions: operational_conditions,
      lever_arm_measures_between: lever_arm_measures_between,
      "performance_of_mbess-s1-s2-s3-s4": performance_card,
    };

    let data = {
      name: values.surveyName,
      survey: multibeamSurvey?.id,
      parameters: formData,
    };

    console.log(data);
    await axiosConfig
      .post(`/api/surveys/${surveyCode}/generate-survey/`, data)
      .then((res) => {
        // setResults(res.data);
        setSurveyParameters(res.data.results);
        console.log(res);
        updateSurveyHistory();
        toast({
          position: "bottom-right",
          description: "Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setPlanning(false);
      })
      .catch((error) => {
        console.log(error);

        const errMessage = error?.response?.data?.detail;
        toast({
          position: "bottom-right",
          description: errMessage || "Error planning survey at this time",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setPlanning(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const { userType, updateSurveyHistory } = useUpdateSurveyHistory();
  const [survey, setSurvey] = useState([]);
  const [updated, setUpdated] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const [surveyCode, setSurveyCode] = useState("S03");
  const [planning, setPlanning] = useState(false);

  const allSurveys = useSelector(
    (state: RootState) => state.reduxStore.surveys
  );

  const { surveys, multibeamSurvey } = allSurveys;

  const subscriptionsData = useSelector(
    (state: RootState) => state.reduxStore.subscrptions
  );
  const { data, isLoading, currentSubscription } = subscriptionsData;
  // const currentSubscription = data?.currentSubscription;
  const { surveyOptions } = useSurveyOptions(multibeamSurvey?.id);

  const [surveyParameters, setSurveyParameters] = useState<any>({
    number_of_profiles_in_length: 0.0,
    survey_time: 0.0,
    along_track_resolution: 0.0,
    accross_track_resolution: 0.0,
    along_track_beams_repartition: 0.0,
    accross_track_beams_repartition: 0.0,
    "thu-1-lambda": 0.0,
  });
  const [performanceForm, setPerformanceForm] = useState<any>({});

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

  // chakra toast
  const toast = useToast();

  useEffect(() => {
    if (!surveys) {
      dispatch(fetchSurveys());
    } else if (currentSubscription && multibeamSurvey) {
      setSurvey(checkSubscription(currentSubscription, multibeamSurvey));
      setSurveyCode(multibeamSurvey.code);
    }
  }, []);

  useEffect(() => {
    formik.setValues(initialValues);
  }, [updated]);

  const loadSurveyData = (e: any) => {
    console.log(e.value);
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
    } = e.value;
    // initialValues.surveyName = name;
    // initialValues.survey_platform_performance = survey_platform_performance;
    // initialValues.calibration_parameters = calibration_parameters;
    // initialValues.operational_conditions = operational_conditions;
    // initialValues.lever_arm_measures_between = lever_arm_measures_between;
    // initialValues.performance_card = performance_ssss;
    // initialValues.performance_ins = performance_gnss_usbl;

    initialValues = {
      ...initialValues,
      surveyName: name,
      calibration_parameters,
      operational_conditions,
      lever_arm_measures_between,
      performance_card: performance_ssss,
      performance_ins: performance_gnss_usbl,
      survey_platform_performance,
    };
    setUpdated(!updated);
  };

  if (isLoading) {
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
      <form onSubmit={formik.handleSubmit}>
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
                  required
                  id="name"
                  name="surveyName"
                  variant="rounded"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="Survey Name"
                  mr="2px"
                  fontWeight="500"
                  size="sm"
                  value={formik.values.surveyName}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">
                  Import Survey Parameters from Past Surveys
                </FormLabel>
                <Select
                  styles={reactSelectStyles}
                  options={surveyOptions}
                  onChange={(e) => loadSurveyData(e)}
                  placeholder="Load previous survey data"
                />
              </FormControl>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <TestPerformanceCard
              CardName="Performance of LiDARS"
              IndexLabel="lidar"
              fields={performaceCardFields}
              form={formik}
            />
            <Parameters results={surveyParameters} value={performanceForm} />
          </GridItem>
          <GridItem colSpan={3}>
            <Flex gap={3}>
              <Box>
                <SurveySectionCard
                  mb="2"
                  fields={performaceINSFields}
                  formik={formik}
                  cardName="Performance INS/GNSS/USBL"
                />
                <SurveySectionCard
                  mb="2"
                  fields={platformPerformanceFields}
                  formik={formik}
                  cardName=" Survey Platform Performance"
                />
                <SurveySectionCard
                  mb="2"
                  fields={operationalConditionsFields}
                  formik={formik}
                  cardName="Operational Conditions"
                />
              </Box>
              <Box>
                <SurveySectionCard
                  mb="2"
                  fields={calibrationsFields}
                  formik={formik}
                  cardName="Calbration Parameters"
                />
                <SurveySectionCard
                  mb="2"
                  fields={lever_arm_measuresFields}
                  formik={formik}
                  cardName="Lever arm Measures Between"
                />
              </Box>
            </Flex>
            <Button
              mt="6"
              type="submit"
              isLoading={planning}
              variant="homePrimary"
              py="6"
            >
              Plan Survey
            </Button>
          </GridItem>
        </Grid>
      </form>
    </AdminLayout>
  ) : (
    <PurchaseLisence />
  );
}

MultibeamEchoSounder.requireAuth = true;
