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
import SurveyTable from "views/admin/default/components/SurveyTable";
import {
  columnsDataSurvey,
  TableData,
} from "views/admin/default/variables/columnsData";
import AdminLayout from "layouts/admin";
import Card from "components/card/Card";
import PieCard from "views/admin/default/components/PieCard";
import Offers from "views/admin/default/components/Offers";
import {
  columnsDataComplex,
  RealComplexHeader,
  TableColumn,
} from "views/admin/default/variables/columnsData";
import Users from "views/admin/default/components/Users";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import PlanDetails from "views/admin/profile/components/PlanDetails";
import { useCurrentUser } from "contexts/UserContext";
import { useAllSurveysContext } from "contexts/SurveyContext";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TransactionTable from "views/admin/default/components/TransactionTable";
import { useSubscription } from "contexts/SubscriptionContext";
import axiosConfig from "axiosConfig";
import NoData from "layouts/admin/noData";
import ReusableTable from "views/admin/dataTables/components/Table";

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

export default function UserReports(props: { [x: string]: any }) {
  interface User {
    id: number;
    name: string;
    email: string;
    date_joined: string;
    user_profile: {
      user_type: number;
      avatar: string;
    };
  }

  const font_family = "Poppins";

  const { loading, currentUser, fetchCurrentUser } = useCurrentUser();
  const { subscriptions, fetchSubscriptions } = useSubscription();

  // Chakra Color Mode
  const brandColor = useColorModeValue("primary.600", "#271E67");
  const boxBg = useColorModeValue("#F7F7FC", "whiteAlpha.100");

  const [user, setUser] = useState<User>(currentUser);
  const [companyUser, setCompanyUser] = useState(2);
  const [individualUser, setIndividualUser] = useState(1);
  const [companyMembers, setCompanyMembers] = useState([]);
  const [, setSurveyHistory] = useState([]);
  const { data: session } = useSession();

  const { mergedCompanyHistory, pending, surveyHistory, companySurveyHistory } =
    useSurveyHistoryContext();

  // chakra toast
  const toast = useToast();

  const invertedArray = useMemo(() => {
    return [...subscriptions].reverse();
  }, [subscriptions]);

  const getCompanyMembers = useCallback(async () => {
    try {
      const response = await axiosConfig.get(
        "api/company/companymembers/companymember/"
      );
      setCompanyMembers(response.data);
    } catch (error) {
      toast({
        position: "bottom-right",
        description: "Error getting company users",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, []);

  // useEffect(() => {

  //   getSurveyHistory();
  //   console.log(surveyHistory);
  // }, [subscriptions]);

  useEffect(() => {
    setUser(currentUser);
    // console.log("default, companyhistory", companySurveyHistory);
  }, [currentUser]);

  useEffect(() => {
    if (session?.user?.data?.user_profile?.user_type === companyUser) {
      getCompanyMembers();
    }
  }, []);

  return (
    <AdminLayout>
      <Box
        pt={{ base: "130px", md: "80px", xl: "80px" }}
        fontFamily={font_family}
      >
        <>
          {/* <Flex> */}
          <Card
            mb="3%"
            h="144px"
            borderRadius="10"
            bg={brandColor}
            // bgGradient="linear(to-r, #3A2FB7, #3A2FB7)"
          >
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
                This is your survey planner dashboard, where you can see an
                overview of your account details
              </Text>
            </Box>
          </Card>
          {/* </Flex> */}
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="3%">
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdFileCopy}
                      color="primary.600"
                    />
                  }
                />
              }
              name="Surveys"
              value={
                !pending && user?.user_profile?.user_type != companyUser
                  ? surveyHistory.length
                  : mergedCompanyHistory.length
              }
            />
            {user?.user_profile?.user_type == companyUser ? (
              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={
                      <Icon
                        w="32px"
                        h="32px"
                        as={FaUsers}
                        color="primary.600"
                      />
                    }
                  />
                }
                name="Company users"
                value={companyMembers.length}
              />
            ) : (
              ""
            )}
          </SimpleGrid>

          <Flex gap="20px" mb="20px">
            {user?.user_profile?.user_type == companyUser ||
            user?.user_profile?.user_type == individualUser ? (
              <>
                <Flex w="70%">
                  <PlanDetails />
                </Flex>
                <Flex w="30%">
                  <Offers />
                </Flex>
              </>
            ) : (
              <Flex w="100%">
                <Offers />
              </Flex>
            )}
          </Flex>

          {user?.user_profile?.user_type == companyUser && (
            <SimpleGrid
              columns={{ base: 1, md: 2, xl: 2 }}
              gap="20px"
              mb="20px"
            >
              {mergedCompanyHistory && mergedCompanyHistory.length <= 0 ? (
                <NoData title="No company survey data" />
              ) : (
                <PieCard companySurvey={mergedCompanyHistory} />
                // <NoData title="Pie data" />
              )}
              <Users members={companyMembers} />
            </SimpleGrid>
          )}

          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="30px">
            {user?.user_profile?.user_type == companyUser &&
            mergedCompanyHistory &&
            mergedCompanyHistory.length > 0 ? (
              <SurveyTable
                columnsData={columnsDataSurvey}
                tableData={mergedCompanyHistory as unknown as TableData[]}
              />
            ) : user?.user_profile?.user_type == individualUser &&
              surveyHistory &&
              surveyHistory.length > 0 ? (
              <SurveyTable
                columnsData={columnsDataSurvey}
                tableData={surveyHistory as unknown as TableData[]}
              />
            ) : (
              <NoData title="No survey data" />
            )}
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="30px">
            <WeeklyRevenue />
          </SimpleGrid>

          {(user?.user_profile?.user_type == companyUser ||
            user?.user_profile?.user_type == individualUser) && (
            <SimpleGrid
              columns={{ base: 1, md: 1, xl: 1 }}
              gap="20px"
              mb="30px"
            >
              {invertedArray.length > 0 ? (
                // <TransactionTable
                //   columnsData={columnsDataComplex}
                //   tableData={invertedArray}
                // />
                <ReusableTable
                  columns={columnsData}
                  data={invertedArray}
                  searchPlaceholder="Input Search"
                  tableName="Transaction Data"
                />
              ) : (
                <NoData title="No subscription history" />
              )}
            </SimpleGrid>
          )}
        </>
      </Box>
    </AdminLayout>
  );
}

UserReports.requireAuth = true;
