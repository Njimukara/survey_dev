import { Box, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import AdminLayout from "layouts/admin";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import SurveyTable from "views/admin/default/components/SurveyTable";
import {
  columnsDataSurvey,
  TableData,
} from "views/admin/default/variables/columnsData";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import NoData from "layouts/admin/noData";

export default function SurveyHistory() {
  // component variables
  const [user, setUser] = useState(null);
  const [allSurveyHistory, setAllsurveyHistory] = useState([]);
  // const [companyUserLength, setCompanyUserLength] = useState(0);
  // const [companyUser] = useState(2);
  const { history, arrayHistory, getSurveyHistory } = useSurveyHistoryContext();

  // session hook
  const { data: session } = useSession();

  // toggleUser invite modal
  // const toggleModal = (state: boolean) => {
  //   setIsOpen(state);
  // };

  useEffect(() => {
    if (!arrayHistory) {
      getSurveyHistory();
    } else {
      setAllsurveyHistory(arrayHistory);
      console.log("history", arrayHistory);
    }
  }, [arrayHistory, getSurveyHistory]);

  useEffect(() => {
    if (session != null) {
      setUser(session?.user?.data);
    }
  }, [session]);

  if (!session) {
    return (
      <AdminLayout>
        <Flex h="100vh" w="100%" justifyContent="center" alignItems="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </AdminLayout>
    );
  }

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
