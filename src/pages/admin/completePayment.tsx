import { Box } from "@chakra-ui/react";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import AdminLayout from "layouts/admin";
import React from "react";

interface Props {
  data: any;
}

export default function CompletePayment({ data }: Props) {
  const surveyHistoryContext = useSurveyHistoryContext();
  const { surveyOrder } = surveyHistoryContext;
  if (!surveyHistoryContext) {
    return <div>Loading...</div>; // You can render a loading indicator or handle the undefined context appropriately.
  }

  console.log(surveyOrder);
  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>heloo</Box>
    </AdminLayout>
  );
}

CompletePayment.requireAuth = true;
