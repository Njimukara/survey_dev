import { Box, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import AdminLayout from "layouts/admin";
import { useEffect, useState } from "react";
import SurveyTable from "views/admin/default/components/SurveyTable";
import {
  columnsDataSurvey,
  TableData,
} from "views/admin/default/variables/columnsData";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import NoData from "layouts/admin/noData";

export default function SurveyHistory() {
  // component variables
  const [allSurveyHistory, setAllsurveyHistory] = useState([]);
  const { arrayHistory, getSurveyHistory } = useSurveyHistoryContext();

  useEffect(() => {
    if (!arrayHistory) {
      getSurveyHistory();
    } else {
      setAllsurveyHistory(arrayHistory);
    }
  }, [arrayHistory, getSurveyHistory]);

  return (
    <AdminLayout>
      {allSurveyHistory.length > 0 ? (
        allSurveyHistory.map((surveyHistory, index) => (
          <Flex key={index} pt={{ md: "100px" }} px="50px" w="100%" gap={10}>
            <Flex w="100%">
              {surveyHistory.length > 0 ? (
                <SurveyTable
                  columnsData={columnsDataSurvey}
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
