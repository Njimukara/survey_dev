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
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ImHappy } from "react-icons/im";
import axios from "axios";
import SignIn from "pages/auth/signin";
import { useRouter } from "next/router";

export default function UserReports() {
  // Chakra Color Mode

  const brandColor = useColorModeValue("primary.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [user, setUser] = useState<any>();
  const [companyUser, setCompanyUser] = useState(2);
  const [companyMembers, setCompanyMembers] = useState([]);
  const [individualUser, setIndividualUser] = useState(1);
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    setUser(session?.user?.data);
    // console.log(session?.user?.data)
    // headers
    const config = {
      headers: {
        "Content-Type": "json",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    axios
      .get(
        "https://surveyplanner.pythonanywhere.com/api/company/companymembers/companymember/",
        config
      )
      .then((res) => {
        console.log(res);
        setCompanyUser(2);
        setCompanyMembers(res.data);
        // router.push('/auth/verifyemail')
        console.log(res);
      })
      .catch((error) => {
        setCompanyUser(1);
        // console.log(error)
      });
  }, [session]);

  const X = [{ name: "brian" }];

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");
  }

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>
          <Flex>
            <Card mb="20px" py="10">
              <Flex gap={3} alignItems="center">
                <Heading size="lg">Welcome Back {user?.name}</Heading>
                <Icon boxSize={5} color="primary.200" as={ImHappy}></Icon>
              </Flex>
              <Box pt="3">
                <Text>
                  This is your survey planner dashboard, where you can see an
                  overview of your account details
                </Text>
              </Box>
            </Card>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="20px" mb="20px">
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
            <Flex w="70%">
              <CurrentPlan />
            </Flex>
            <Flex w="30%">
              <Offers />
            </Flex>
            {/* <MiniCalendar h='100%' minW='100%' selectRange={false} /> */}
          </Flex>

          {user?.user_profile?.user_type == companyUser && (
            <SimpleGrid
              columns={{ base: 1, md: 2, xl: 2 }}
              gap="20px"
              mb="20px"
            >
              <PieCard />
              <Users />
            </SimpleGrid>
          )}

          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
            <SurveyTable
              columnsData={columnsDataSurvey}
              tableData={tableDataSurvey as unknown as TableData[]}
            />
            <DailyTraffic />
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex as unknown as TableData[]}
            />
          </SimpleGrid>
        </>
      </Box>
    </AdminLayout>
  );
}

// add the requireAuth property to the page component
UserReports.requireAuth = true;
