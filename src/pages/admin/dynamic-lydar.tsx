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
import React, { useState, useEffect, useCallback } from "react";
import PurchaseLisence from "views/admin/default/components/PurchaseLisence";
// import { useAllSurveysContext } from "contexts/SurveyContext";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import axiosConfig from "axiosConfig";
import { Formik, useFormik, Form, Field, getIn, ErrorMessage } from "formik";
import * as Yup from "yup";
import SurveyPerformanceCard from "views/admin/dataTables/components/SurveyPerformacenCard";
import TestPerformanceCard from "views/admin/dataTables/components/ChatCard";
import SurveySectionCard from "views/admin/dataTables/components/SurveySectionCard";
import {
  calibrationsFields,
  lever_arm_measuresFields,
  operationalConditionsFields,
  performaceCardFields,
  performaceINSFields,
  platformPerformanceFields,
} from "utils/surveyFields";
import Parameters from "views/admin/dataTables/components/Parameters";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { fetchSurveys } from "redux/surveySlice";
import { useSession } from "next-auth/react";
import { UserTypes } from "utils/userTypes";
import {
  fetchCompanySurveys,
  fetchSurveyHistory,
} from "redux/surveyHistorySlice";
import useSurveyOptions from "hooks/SurveyOptions";
import { checkSubscription } from "utils/checksubscription";
import useUpdateSurveyHistory from "hooks/useUpdateSurveyHistory";

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

type Survey = {
  id: number;
  name: string;
  code: string;
  code_value: string;
  is_active: boolean;
  is_delete: boolean;
};

var initialValues = {
  surveyName: "",
  operational_conditions: Yup.object().shape({
    flying_height_or_distance: Yup.number().required("required"),
    max_depth_of_the_svp: Yup.number().required("required"),
    angle_of_incidence_of_a_beam: Yup.number().required("required"),
    overlap_rate: Yup.number().required("required"),
    width_of_the_study_area: Yup.number().required("required"),
    length_of_the_study_area: Yup.number().required("required"),
    tide_uncertainty: Yup.number().required("required"),
    co_tidal_uncertainty: Yup.number().required("required"),
  }),
  survey_platform_performance: Yup.object().shape({}),
  calibration_parameters: Yup.object().shape({}),
  lever_arm_measures_between: Yup.object().shape({}),
  performance_ins: Yup.object().shape({}),
  performance_card: [
    {
      maximum_range: "",
      beam_divergence: "",
      signal_to_noise_ratio: "",
      uncertainty_of_divergence: "",
      pulse_duration: "",
      pulse_repetition_rate: "",
      range_uncertainty: "",
      lidar_scanning_angle: "",
      texture: "integrated",
    },
    {
      maximum_range: "",
      beam_divergence: "",
      signal_to_noise_ratio: "",
      uncertainty_of_divergence: "",
      pulse_duration: "",
      pulse_repetition_rate: "",
      range_uncertainty: "",
      lidar_scanning_angle: "",
      texture: "external",
    },
    {
      maximum_range: "",
      beam_divergence: "",
      signal_to_noise_ratio: "",
      uncertainty_of_divergence: "",
      pulse_duration: "",
      pulse_repetition_rate: "",
      range_uncertainty: "",
      lidar_scanning_angle: "",
      texture: "integrated",
    },
    {
      maximum_range: "",
      beam_divergence: "",
      signal_to_noise_ratio: "",
      uncertainty_of_divergence: "",
      pulse_duration: "",
      pulse_repetition_rate: "",
      range_uncertainty: "",
      lidar_scanning_angle: "",
      texture: "external",
    },
  ],
};

const validationSchema = Yup.object().shape({});

function DynamicLydar() {
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
      "performance_of_lidars-l1-l2-l3-l4": performance_card,
    };

    let data = {
      name: values.surveyName,
      survey: lidarSurvey?.id,
      parameters: formData,
    };

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
  const { surveys, lidarSurvey } = allSurveys;

  const subscriptionsData = useSelector(
    (state: RootState) => state.reduxStore.subscrptions
  );
  const { data, isLoading } = subscriptionsData;
  const currentSubscription = data?.currentSubscription;
  const { surveyOptions } = useSurveyOptions(lidarSurvey?.id);

  // chakra toast
  const toast = useToast();

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
  const [performanceForm] = useState<any>({});

  useEffect(() => {
    if (!surveys) {
      dispatch(fetchSurveys());
    } else if (currentSubscription && lidarSurvey) {
      setSurvey(checkSubscription(currentSubscription, lidarSurvey));
      setSurveyCode(lidarSurvey.code);
    }
  }, []);

  useEffect(() => {
    formik.setValues(initialValues);
  }, [updated]);

  const loadSurveyData = (e: any) => {
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
    } = e.value;

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
            <Card py="5" px="10" borderRadius="10px">
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

export default DynamicLydar;

DynamicLydar.requireAuth = true;
