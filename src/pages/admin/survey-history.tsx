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
import { useSession } from "next-auth/react";

export default function SurveyHistory() {
  // component variables
  const { data: session } = useSession();

  const [allSurveyHistory, setAllsurveyHistory] = useState([]);
  const [companyUser, setCompanyUser] = useState(2);

  const { mergedCompanyHistory, pending, surveyHistory, companySurveyHistory } =
    useSurveyHistoryContext();

  useEffect(() => {
    if (session?.user?.data?.user_profile?.user_type === companyUser) {
      setAllsurveyHistory(companySurveyHistory);
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
