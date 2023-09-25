/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Box,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

// Assets
import {
  MdAttachMoney,
  MdCancel,
  MdCheckCircle,
  MdFileCopy,
  MdOutlineError,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";

// Custom components
import { TableData } from "views/admin/default/variables/columnsData";
import AdminLayout from "layouts/admin";
import Card from "components/card/Card";
import PieCard from "views/admin/default/components/PieCard";
import Offers from "views/admin/default/components/Offers";
import { TableColumn } from "views/admin/default/variables/columnsData";
import Users from "views/admin/default/components/Users";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { useEffect, useState, useCallback, useMemo } from "react";
import { getSession, useSession } from "next-auth/react";
import PlanDetails from "views/admin/profile/components/PlanDetails";
import { useCurrentUser } from "contexts/UserContext";
// import { useAllSurveysContext } from "contexts/SurveyContext";
// import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
// import { useSubscription } from "contexts/SubscriptionContext";
import axiosConfig from "axiosConfig";
import NoData from "layouts/admin/noData";
import Table from "components/table/Table";
import NewTransactionTable from "views/admin/dataTables/components/TransationTable";
import TransactionTable from "views/admin/dataTables/components/TransationTable";
import SurveyTable from "views/admin/dataTables/components/SurveyTable";
import getClient from "axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { UserTypes } from "utils/userTypes";
import { fetchCompanyMembers } from "redux/companySlice";
import {
  fetchCompanySurveys,
  fetchSurveyHistory,
} from "redux/surveyHistorySlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useSurveys from "hooks/useSurveys";
import { updateSurveys } from "redux/surveySlice";

const columnsData: TableColumn[] = [
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      let icon;
      let color;
      switch (value) {
        case "active":
          icon = <MdCheckCircle />;
          color = "green.500";
          break;
        case "past_due":
          icon = <MdOutlineError />;
          color = "orange.500";
          break;
        case "canceled":
        case "trialing":
          icon = <MdCancel />;
          color = "red.500";
          break;
        default:
          icon = null;
          color = "gray.500";
          break;
      }

      return (
        <Flex align="center">
          {icon}
          <Text color={color} fontSize="sm" fontWeight="400">
            {value.toUpperCase()}
          </Text>
        </Flex>
      );
    },
  },
  {
    Header: "AMOUNT",
    accessor: "plan",
  },
  {
    Header: "DATE",
    accessor: "start_date",
  },
  {
    Header: "PAYMENT",
    accessor: "payment",
  },
];

export const employeeData = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    department: "Engineering",
    age: 30,
    salary: "$85,000",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Marketing Specialist",
    department: "Marketing",
    age: 28,
    salary: "$60,000",
  },
  {
    id: 3,
    name: "Robert Johnson",
    position: "Sales Manager",
    department: "Sales",
    age: 35,
    salary: "$75,000",
  },
  {
    id: 4,
    name: "Emily Brown",
    position: "HR Manager",
    department: "Human Resources",
    age: 32,
    salary: "$70,000",
  },
  {
    id: 5,
    name: "Michael Williams",
    position: "Product Manager",
    department: "Product",
    age: 33,
    salary: "$90,000",
  },
  {
    id: 6,
    name: "Jessica Davis",
    position: "Graphic Designer",
    department: "Design",
    age: 26,
    salary: "$55,000",
  },
  {
    id: 7,
    name: "William Taylor",
    position: "Accountant",
    department: "Finance",
    age: 29,
    salary: "$65,000",
  },
  {
    id: 8,
    name: "Olivia Johnson",
    position: "Customer Support",
    department: "Support",
    age: 27,
    salary: "$50,000",
  },
  {
    id: 9,
    name: "Ethan Miller",
    position: "Data Analyst",
    department: "Data",
    age: 31,
    salary: "$80,000",
  },
  {
    id: 10,
    name: "Sophia Anderson",
    position: "Quality Assurance",
    department: "Quality Assurance",
    age: 30,
    salary: "$70,000",
  },
];

export default function UserReports() {
  const [user, setUser] = useState<any>();

  const font_family: string = "Poppins";
  const brandColor: string = useColorModeValue("primary.600", "#271E67");
  const boxBg: string = useColorModeValue("#F7F7FC", "whiteAlpha.100");

  const { data: session } = useSession();
  const sessionUser = session?.user;
  const userProfile = sessionUser?.data?.user_profile;
  const userType = userProfile?.user_type;

  const currentUserData = useCurrentUser();
  const { currentUser } = currentUserData;

  const subscriptionsData = useSelector(
    (state: RootState) => state.reduxStore.subscrptions
  );
  // const { data, currentSubscription } = subscriptionsData;
  // const currentSubscription = data?.currentSubscription;

  const companyMembersData = useSelector(
    (state: RootState) => state.reduxStore.company
  );
  const {
    companyMembers,
    membersLoading,
    membersError,
  }: {
    companyMembers: any[];
    membersLoading: boolean;
    membersError: any;
  } = companyMembersData;

  const surveyHistoryData = useSelector(
    (state: RootState) => state.reduxStore.surveyHistory
  );
  const {
    surveyHistory,
    companySurveysLoading,
    companySurveys,
    mergedCompanySurveys,
    mergedSurveyHistory,
    companySurveysError,
    surveyHistoryError,
  }: {
    surveyHistory: any[];
    companySurveysLoading: boolean;
    companySurveys: any[];
    mergedCompanySurveys: any[];
    mergedSurveyHistory: any[];
    companySurveysError: any;
    surveyHistoryError: any;
  } = surveyHistoryData;

  const dispatch = useDispatch<AppDispatch>();
  const surveyData = useSurveys();
  const {
    surveys,
    surveysLoading,
  }: {
    surveys: any[];
    surveysLoading: boolean;
  } = surveyData;

  const [subscriptions, setSubscriptions] = useState([]);
  const [presentSubscription, setPresentSubscription] = useState();
  const [flatCompanySurveyHistory, setFlatCompanySurveyHistory] = useState([]);
  const [flatUserSurveyHistory, setFlatUserSurveyHistory] = useState([]);
  const [arraysSurveyHistory, setArraysSurveyHistory] = useState([]);
  const [arraysCompanySurveyHistory, setArraysCompanySurveyHistory] = useState(
    []
  );

  const invertedArray = useMemo(() => {
    if (Array.isArray(subscriptions)) {
      return [...subscriptions].reverse();
    } else {
      // Handle the case where subscriptions is not an array
      return [];
    }
  }, [subscriptions]);

  const surveyError = useMemo(() => {
    if (companySurveysError) {
      // console.log("company", companySurveysError);
      return companySurveysError;
    } else {
      // console.log("survey", surveyHistoryError);
      return surveyHistoryError;
    }
  }, [companySurveysError, surveyHistoryError]);

  useEffect(() => {
    dispatch(updateSurveys(surveys));
  }, [surveys, surveysLoading, dispatch]);

  useEffect(() => {
    if (subscriptionsData) {
      const { data, currentSubscription } = subscriptionsData;
      setSubscriptions(data);
      setPresentSubscription(currentSubscription);
    }
  }, [subscriptionsData]);

  useEffect(() => {
    setFlatCompanySurveyHistory(mergedCompanySurveys);
    setArraysCompanySurveyHistory(companySurveys);
  }, [mergedCompanySurveys, companySurveys]);

  useEffect(() => {
    setFlatUserSurveyHistory(mergedSurveyHistory);
    setArraysSurveyHistory(surveyHistory);
  }, [mergedSurveyHistory, surveyHistory]);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (userType === UserTypes.COMPANY_USER) {
      dispatch(
        fetchCompanyMembers({
          apiEndpoint: "/api/company/companymembers/companymember/",
          force: true,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (
      presentSubscription != null &&
      userType === UserTypes.COMPANY_USER &&
      companyMembers.length > 0
    ) {
      // console.log("company usr");
      dispatch(
        fetchCompanySurveys({
          force: true,
        })
      );
      // console.log("companysurveys", mergedCompanySurveys);
    } else {
      // console.log("regular usr");
      dispatch(
        fetchSurveyHistory({
          force: true,
        })
      );
      // console.log("surveyHistory", mergedSurveyHistory);
    }
  }, []);

  return (
    <AdminLayout>
      <Box
        pt={{ base: "130px", md: "80px", xl: "80px" }}
        fontFamily={font_family}
      >
        <>
          <Card mb="3%" h="144px" borderRadius="10" bg={brandColor}>
            <Box py="3" color="white" pl="10">
              <Heading
                data-cy="dashboard-heading"
                fontWeight="600"
                fontSize="24px"
                mb="4"
              >
                Hello {user?.name}!
              </Heading>
              <Text fontSize="18px" fontWeight="500" fontFamily={font_family}>
                Welcome to your Survey Planner Dashboard, where you can access a
                comprehensive overview of your account details
              </Text>
            </Box>
          </Card>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="3%">
            <MiniStatistics name="Surveys" value={getSurveysCount()} />
            {getUserTypeSpecificStatistics()}
          </SimpleGrid>

          <Flex gap="20px" mb="20px">
            {getUserTypeSpecificContent()}
          </Flex>

          {userType === UserTypes.COMPANY_USER && !membersLoading && (
            <SimpleGrid
              columns={{ base: 1, md: 2, xl: 2 }}
              gap="20px"
              mb="20px"
            >
              {renderCompanySurveys()}
              {!membersLoading && (
                <Users loading={membersLoading} members={companyMembers} />
              )}
            </SimpleGrid>
          )}

          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="30px">
            {renderSurveyTable()}
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="30px">
            <WeeklyRevenue companySurvey={getCompanySurveyData()} />
          </SimpleGrid>

          {(userType === UserTypes.COMPANY_USER ||
            userType === UserTypes.REGULAR_USER) && (
            <SimpleGrid
              columns={{ base: 1, md: 1, xl: 1 }}
              gap="20px"
              mb="30px"
            >
              {renderTransactionTable()}
            </SimpleGrid>
          )}
        </>
      </Box>
    </AdminLayout>
  );

  // Helper functions
  function getSurveysCount(): number {
    return userType !== UserTypes.COMPANY_USER
      ? flatUserSurveyHistory?.length ?? 0
      : flatCompanySurveyHistory?.length ?? 0;
  }

  function getUserTypeSpecificStatistics(): JSX.Element {
    if (userType === UserTypes.COMPANY_USER) {
      return (
        <MiniStatistics name="Company users" value={companyMembers?.length} />
      );
    }
    return null;
  }

  function getUserTypeSpecificContent(): JSX.Element {
    if (
      userType === UserTypes.COMPANY_USER ||
      userType === UserTypes.REGULAR_USER
    ) {
      return (
        <>
          <Flex w="70%">
            <PlanDetails />
          </Flex>
          <Flex w="30%">
            <Offers />
          </Flex>
        </>
      );
    }
    return (
      <Flex w="100%">
        <Offers />
      </Flex>
    );
  }

  function renderCompanySurveys(): JSX.Element {
    if (flatCompanySurveyHistory && flatCompanySurveyHistory.length <= 0) {
      return <NoData title="No company survey data" />;
    }
    return (
      <PieCard
        loading={companySurveysLoading}
        companySurvey={flatCompanySurveyHistory}
      />
    );
  }

  function renderSurveyTable(): JSX.Element {
    if (
      userType === UserTypes.REGULAR_USER &&
      flatUserSurveyHistory &&
      flatUserSurveyHistory.length > 0
    ) {
      return (
        <SurveyTable
          tableData={flatUserSurveyHistory as unknown as TableData[]}
        />
      );
    } else if (
      userType === UserTypes.COMPANY_USER &&
      flatCompanySurveyHistory &&
      flatCompanySurveyHistory.length > 0
    ) {
      return (
        <SurveyTable
          tableData={flatCompanySurveyHistory as unknown as TableData[]}
        />
      );
    } else {
      return <NoData title="No survey data" />;
    }
  }

  function getCompanySurveyData() {
    if (userType === UserTypes.COMPANY_USER && companyMembers.length > 0) {
      return arraysCompanySurveyHistory;
    } else {
      return arraysSurveyHistory;
      // return companySurveys || surveyHistory;
    }
  }

  function renderTransactionTable(): JSX.Element {
    if (invertedArray.length > 0) {
      return (
        <TransactionTable tableData={invertedArray as unknown as TableData[]} />
      );
    } else {
      return <NoData title="No subscription history" />;
    }
  }
}

UserReports.requireAuth = true;
