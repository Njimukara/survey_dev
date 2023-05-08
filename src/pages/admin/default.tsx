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
  Image,
  useToast,
} from "@chakra-ui/react";
// Assets
// Custom components
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";

import { FaUsers } from "react-icons/fa";
import SurveyTable from "views/admin/default/components/SurveyTable";
import {
  columnsDataSurvey,
  TableData,
} from "views/admin/default/variables/columnsData";
import tableDataSurvey from "views/admin/default/variables/tableDataSurvey.json";
import AdminLayout from "layouts/admin";
import Card from "components/card/Card";
import PieCard from "views/admin/default/components/PieCard";
import CurrentPlan from "views/admin/default/components/CurrentPlan";
import Offers from "views/admin/default/components/Offers";
import ComplexTable from "views/admin/default/components/ComplexTable";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { columnsDataComplex } from "views/admin/default/variables/columnsData";
import Users from "views/admin/default/components/Users";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
// import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { useCallback, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { ImHappy } from "react-icons/im";
import axios from "axios";
import { useRouter } from "next/router";
import { SubscriptionProvider } from "contexts/SubscriptionContext";
import PlanDetails from "views/admin/profile/components/PlanDetails";
import { useCurrentUser } from "contexts/UserContext";
import Spinner from "components/spinner";

// const stripe = require("stripe")();

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

  const { loading, currentUser, fetchCurrentUser } = useCurrentUser();
  // const { subscription, fetchSubscription } = useCurrentUser();
  // console.log(subscription);

  // Chakra Color Mode
  const brandColor = useColorModeValue("primary.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const [user, setUser] = useState<User>(currentUser);
  const [companyUser, setCompanyUser] = useState(2);
  const [individualUser, setIndividualUser] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [companyMembers, setCompanyMembers] = useState([]);
  const { data: session, status } = useSession();

  // const router = useRouter();

  // chakra toast
  const toast = useToast();

  // console.log(session);
  const getCompanyMembers = async () => {
    const config = {
      headers: {
        "Content-Type": "json",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .get(
        "https://surveyplanner.pythonanywhere.com/api/company/companymembers/companymember/",
        config
      )
      .then((response) => {
        setCompanyMembers(response.data);
      })
      .catch((err) => {
        toast({
          position: "bottom-right",
          description: "Error getting company users",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    const usr = async () => {
      setFetching(true);
      await fetchCurrentUser();
      await setUser(currentUser);

      setFetching(false);
    };
    if (session?.user?.data?.user_profile?.user_type != companyUser) {
      return;
    } else {
      getCompanyMembers();
    }

    usr();
  }, [loading]);

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>
          {/* <Flex> */}
          <Card
            mb="3%"
            py="10"
            borderRadius="10"
            bgGradient="linear(to-r, #3A2FB7, primary.100)"
          >
            <Flex
              gap={3}
              alignItems="center"
              justifyContent="space-between"
              // position="relative"
            >
              {/* <Icon boxSize={5} color="primary.200" as={ImHappy}></Icon> */}

              <Box pt="3" color="white" pl="10">
                <Heading size="lg" mb="8">
                  Hello {user?.name}!
                </Heading>
                <Text w="50%">
                  This is your survey planner dashboard, where you can see an
                  overview of your account details
                </Text>
              </Box>
              <Box mb="-9">
                <Image src="/hello.png" alt="hello" />
              </Box>
            </Flex>
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
                      color={brandColor}
                    />
                  }
                />
              }
              name="Surveys"
              value="23"
            />
            {user?.user_profile?.user_type == companyUser ? (
              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={
                      <Icon w="32px" h="32px" as={FaUsers} color={brandColor} />
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
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Spent"
              value="$430"
            />
          </SimpleGrid>

          <Flex gap="20px" mb="20px">
            {user == null ? (
              <Card py="10" px="4">
                <Flex
                  w="100%"
                  h="50"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Spinner />
                </Flex>
              </Card>
            ) : user?.user_profile?.user_type == companyUser ||
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
            {/* <MiniCalendar h='100%' minW='100%' selectRange={false} /> */}
          </Flex>

          {user?.user_profile?.user_type == companyUser && (
            <SimpleGrid
              columns={{ base: 1, md: 2, xl: 2 }}
              gap="20px"
              mb="20px"
            >
              <PieCard members={companyMembers} />
              <Users members={companyMembers} />
            </SimpleGrid>
          )}

          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
            <SurveyTable
              columnsData={columnsDataSurvey}
              tableData={tableDataSurvey as unknown as TableData[]}
            />
            <DailyTraffic />
          </SimpleGrid>

          {user?.user_profile?.user_type == companyUser ||
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
            ))}
        </>
      </Box>
    </AdminLayout>
  );
}

// add the requireAuth property to the page component
UserReports.requireAuth = true;
