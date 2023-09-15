import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Input,
  useToast,
} from "@chakra-ui/react";
import Spinner from "components/spinner";
// import { useSubscription } from "contexts/SubscriptionContext";
import AdminLayout from "layouts/admin";
import React, { useState, useEffect } from "react";
import PurchaseLisence from "views/admin/default/components/PurchaseLisence";
import OperationalConditionsCard from "views/admin/dataTables/components/OperationalConditionsCard";
// import { useAllSurveysContext } from "contexts/SurveyContext";
import { FormikHelpers, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";

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
  const operationalConditionsSchema = Yup.object().shape({
    mean_sound_speed: Yup.number().label("Mean Sound Speeeeeed"),
    max_depth_of_the_svp: Yup.number(),
    test: Yup.string().required(),
  });

  const testSchema = Yup.object().shape({
    name: Yup.string().required(""),
  });
  // const anotherSchema = Yup.object().shape({
  //   test: Yup.string(),
  // });

  const handleSubmit = async (values: any) => {
    try {
      console.log("form submitted");
      console.log(values);

      // Reset the form
    } catch (error) {
      console.error("formik error", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      operationalConditions: {
        mean_sound_speed: 0,
        max_depth_of_the_svp: 0,
        test: "",
        // Initialize other fields here
      },
    },
    validationSchema: operationalConditionsSchema,
    onSubmit: handleSubmit,
    // validator: {() => ({})}
  });

  const handleFieldChange =
    (fieldName: string) => (event: { target: { value: any } }) => {
      console.log("form change", event.target);
      const { value } = event.target;

      // Use the field name to set the corresponding value in Formik
      formik.setFieldValue(fieldName, value);
    };

  const [survey, setSurvey] = useState([]);
  const [surveyID, setSurveyID] = useState<number>(1);

  // const { loading, subscriptions, fetchSubscriptions } = useSubscription();
  const [surveyCode, setSurveyCode] = useState("S01");
  // const { surveys, multibeam, getAllSurveys } = useAllSurveysContext();

  // chakra toast
  const toast = useToast();

  const checkSubscription = () => {
    subscription?.assigned_surveys?.forEach((survey: any) => {
      if (survey?.id == surveyID) {
        setSurvey([survey?.id]);
      }
    });
  };

  if (true) {
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
        // templateColumns="repeat(5, 1fr)"
        gap={3}
      >
        <form onSubmit={formik.handleSubmit}>
          <GridItem colSpan={12}>
            <FormControl>
              <Input
                // id="test"
                name="test"
                type="text"
                bg="white"
                value={formik.values.operationalConditions?.test}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>
                {formik.touched.operationalConditions?.test &&
                  formik.errors.operationalConditions?.test}
              </FormErrorMessage>
            </FormControl>
            <Flex gap={3}>
              <Box>
                {/* <OperationalConditionsCard
                  operationConditions={formik.values.operationalConditions}
                  handleform={formik.handleChange}
                  survey_Id={surveyID}
                  errors={formik.errors.operationalConditions}
                  touched={formik.touched.operationalConditions}
                /> */}
              </Box>
            </Flex>
            <Button mt="6" type="submit" variant="homePrimary" py="6">
              Plan Survey
            </Button>
          </GridItem>
        </form>
      </Grid>
    </AdminLayout>
  ) : (
    <PurchaseLisence />
  );
}

MultibeamEchoSounder.requireAuth = true;
