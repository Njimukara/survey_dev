import { Box, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import AdminLayout from "layouts/admin";
import { useEffect, useState } from "react";
import { TableData } from "views/admin/default/variables/columnsData";
import NoData from "layouts/admin/noData";
import SurveyTable from "views/admin/dataTables/components/SurveyTable";
import { UserTypes } from "utils/userTypes";
import useUpdateSurveyHistory from "hooks/useUpdateSurveyHistory";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface survey {
  id: number;
  name: string;
  code: string;
}

const formatSurveyType = (surveytype: number, surveys: any[]) => {
  let name = "";
  if (surveys) {
    surveys.map((survey: survey) => {
      if (survey.id == surveytype) {
        name = survey.name;
      }
    });
    return name;
  }
};

export default function SurveyHistory() {
  // component variables
  const { userType } = useUpdateSurveyHistory();

  const [allSurveyHistory, setAllsurveyHistory] = useState([]);
  const surveyHistoryData = useSelector(
    (state: RootState) => state.reduxStore.surveyHistory
  );
  const { surveyHistory, companySurveys } = surveyHistoryData;

  const allSurveys = useSelector(
    (state: RootState) => state.reduxStore.surveys
  );
  const { surveys } = allSurveys;
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    if (userType === UserTypes.COMPANY_USER) {
      setAllsurveyHistory(companySurveys);
    } else {
      setAllsurveyHistory(surveyHistory);
    }
  }, []);

  return (
    <AdminLayout>
      {allSurveyHistory.length > 0 ? (
        allSurveyHistory.map((surveyHistory, index) => (
          <Flex key={index} pt={{ md: "100px" }} px="50px" w="100%" gap={10}>
            <Flex w="100%">
              {surveyHistory.length > 0 ? (
                <SurveyTable
                  tableName={formatSurveyType(surveyHistory[0].type, surveys)}
                  tableData={surveyHistory as unknown as TableData[]}
                />
              ) : (
                <NoData title="No Survey History" />
              )}
            </Flex>
          </Flex>
        ))
      ) : (
        <Box pt={{ md: "100px" }}>
          <NoData title="No Survey History" />
        </Box>
      )}
    </AdminLayout>
  );
}

SurveyHistory.requireAuth = true;
