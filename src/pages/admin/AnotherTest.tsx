import React from "react";
import { Formik, useFormik, Form, Field, getIn, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import CustomInput from "components/fields/CustomInput";
import CustomSurveyInput from "components/fields/CustomSurveyInput";
import OperationalConditionsCard from "views/admin/dataTables/components/OperationalConditionsCard";
import SurveyPerformanceCard from "views/admin/dataTables/components/SurveyPerformacenCard";
import TestPerformanceCard from "views/admin/dataTables/components/ChatCard";

// performance_card: Yup.array()
//   .of(objectShape)
//   .min(1, "At least 4 objects are required"),

const validationSchema = Yup.object().shape({});

const performaceCardFields = [
  {
    name: "performance_card.maximum_range",
    label: "maximum_range",
    type: "number",
  },
  {
    name: "performance_card.beam_divergence",
    label: "beam_divergence",
    type: "number",
  },
  {
    name: "performance_card.signal_to_noise_ratio",
    label: "signal_to_noise_ratio",
    type: "number",
  },
  {
    name: "performance_card.uncertainty_of_divergence",
    label: "uncertainty_of_divergence",
    type: "number",
  },
  {
    name: "performance_card.pulse_duration",
    label: "pulse_duration",
    type: "number",
  },
  {
    name: "performance_card.pulse_repetition_rate",
    label: "pulse_repetition_rate",
    type: "number",
  },
  {
    name: "performance_card.range_uncertainty",
    label: "range_uncertainty",
    type: "number",
  },
  {
    name: "performance_card.lidar_scanning_angle",
    label: "lidar_scanning_angle",
    type: "select",
    options: [
      15, 30, 45, 60, 75, 90, 110, 210, 130, 140, 145, 150, 165, 170, 175,
    ],
  },
  {
    name: "performance_card.texture",
    label: "texture",
    type: "select",
    options: ["integrated", "external", "no-texture"],
  },
];

const initialValues = {
  performance_card: [
    {
      maximum_range: 100,
      beam_divergence: 5,
      signal_to_noise_ratio: 50,
      uncertainty_of_divergence: 2,
      pulse_duration: 10,
      pulse_repetition_rate: 1000,
      range_uncertainty: 5,
      lidar_scanning_angle: 30,
      texture: "integrated",
    },
    {
      maximum_range: 200,
      beam_divergence: 4,
      signal_to_noise_ratio: 60,
      uncertainty_of_divergence: 2.5,
      pulse_duration: 15,
      pulse_repetition_rate: 1200,
      range_uncertainty: 6,
      lidar_scanning_angle: 45,
      texture: "external",
    },
    {
      maximum_range: 100,
      beam_divergence: 5,
      signal_to_noise_ratio: 50,
      uncertainty_of_divergence: 2,
      pulse_duration: 10,
      pulse_repetition_rate: 1000,
      range_uncertainty: 5,
      lidar_scanning_angle: 30,
      texture: "integrated",
    },
    {
      maximum_range: 200,
      beam_divergence: 4,
      signal_to_noise_ratio: 60,
      uncertainty_of_divergence: 2.5,
      pulse_duration: 15,
      pulse_repetition_rate: 1200,
      range_uncertainty: 6,
      lidar_scanning_angle: 45,
      texture: "external",
    },
  ],
};

const AnotherTest = ({ serverData }: any) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // You can handle form submission logic here
      console.log(values);
    },
  });
  return (
    <div>
      <div>Test data</div>
      <form onSubmit={formik.handleSubmit}>
        <TestPerformanceCard
          fields={performaceCardFields}
          form={formik}
          survey_Id={1}
        />
        <Button
          mt={4}
          disabled={formik.isValid}
          colorScheme="teal"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AnotherTest;

AnotherTest.requireAuth = true;
