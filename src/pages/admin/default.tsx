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
import { MdAttachMoney, MdFileCopy } from "react-icons/md";
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
import { columnsDataComplex } from "views/admin/default/variables/columnsData";
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

  const { currentUser, fetchCurrentUser } = useCurrentUser();
  const { surveys, getAllSurveys } = useAllSurveysContext();
  const { subscriptions, fetchSubscriptions } = useSubscription();
  const { history, companySurveyHistory, getSurveyHistory, getCompanySurvey } =
    useSurveyHistoryContext();

  // Chakra Color Mode
  const brandColor = useColorModeValue("primary.600", "#271E67");
  const boxBg = useColorModeValue("#F7F7FC", "whiteAlpha.100");

  const [user, setUser] = useState<User>(currentUser);
  const [companyUser, setCompanyUser] = useState(2);
  const [individualUser, setIndividualUser] = useState(1);
  const [companyMembers, setCompanyMembers] = useState([]);
  const [surveyHistory, setSurveyHistory] = useState([]);
  const { data: session } = useSession();

  // chakra toast
  const toast = useToast();

  const formatPrice = (price: number) => {
    return price / 100;
  };

  const invertedArray = useMemo(() => {
    return [...subscriptions].reverse();
  }, [subscriptions]);

  const totalExpenditure = useMemo(() => {
    let expenditure = 0;
    subscriptions.forEach((sub: any) => {
      if (
        !sub?.subscription_data?.status
          .toLowerCase()
          .includes("trialing" || "incomplete")
      ) {
        expenditure = expenditure + sub?.subscription_data?.plan?.amount;
      }
    });
    expenditure = formatPrice(expenditure);
    return expenditure;
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

  useEffect(() => {
    if (!history) {
      getSurveyHistory().catch((error: any) => {
        // Handle error
        console.error("Failed to fetch survey history:", error);
      });
    }

    if (history) {
      setSurveyHistory(history);
    }
  }, [history]);

  useEffect(() => {
    if (!surveys) {
      getAllSurveys().catch((error: any) => {
        // Handle error
        console.error("Failed to fetch all surveys:", error);
      });
    }
    if (!subscriptions) {
      fetchSubscriptions();
    }
  }, [surveys, subscriptions]);

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (session?.user?.data?.user_profile?.user_type === companyUser) {
          await getCompanyMembers();
          // if (!companySurveyHistory) {
          //   getCompanySurvey();
          // }
          if (companySurveyHistory === null) {
            getCompanySurvey();
          }
        }
      } catch (error) {
        // Handle error
        console.error("Failed to fetch user or company data:", error);
      }
    };

    fetchUser();
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
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="20px" mb="3%">
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
              value={history ? history.length : 0}
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
                      as={MdAttachMoney}
                      color="primary.600"
                    />
                  }
                />
              }
              name="Total Spent"
              value={totalExpenditure ? `$${totalExpenditure}` : 0}
            />
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
              {companySurveyHistory ? (
                <PieCard companySurvey={companySurveyHistory} />
              ) : (
                <NoData title="No sompany survey data yet" />
              )}
              <Users members={companyMembers} />
            </SimpleGrid>
          )}

          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="30px">
            {surveyHistory.length > 0 ? (
              <SurveyTable
                columnsData={columnsDataSurvey}
                tableData={surveyHistory as unknown as TableData[]}
              />
            ) : (
              <NoData title="No survey history" />
            )}
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="30px">
            <WeeklyRevenue />
          </SimpleGrid>

          {/* {user?.user_profile?.user_type == companyUser ||
            (user?.user_profile?.user_type == individualUser && (
              <SimpleGrid
                columns={{ base: 1, md: 1, xl: 1 }}
                gap="20px"
                mb="20px"
              >
                <ComplexTable
                  columnsData={columnsDataComplex}
                  tableData={tableDataComplex as unknown as TableData[]}
                />
              </SimpleGrid>
            ))} */}

          {(user?.user_profile?.user_type == companyUser ||
            user?.user_profile?.user_type == individualUser) && (
            <SimpleGrid
              columns={{ base: 1, md: 1, xl: 1 }}
              gap="20px"
              mb="30px"
            >
              {invertedArray.length > 0 ? (
                <TransactionTable
                  columnsData={columnsDataComplex}
                  tableData={invertedArray}
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
