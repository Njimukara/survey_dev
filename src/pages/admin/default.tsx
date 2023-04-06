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
  Spinner,
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

// export async function getServerSideProps(context: any) {
//   interface companyMembers {
//     user_id: number;
//     name: string;
//     email: string;
//     date_joined: string;
//     is_active: boolean;
//   }
//   let allCompanyMembers: companyMembers = null;
//   await fetch("/api/auth/getcompany",  )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("from getserversideprops", data);
//       allCompanyMembers = data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   return {
//     props: { allCompanyMembers }, // will be passed to the page component as props
//   };
// }

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

  // Chakra Color Mode
  const brandColor = useColorModeValue("primary.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [user, setUser] = useState<User>();
  const [companyUser, setCompanyUser] = useState(2);
  const [companyMembers, setCompanyMembers] = useState([]);
  // const [individualUser, setIndividualUser] = useState(1);
  var { data: session, status } = useSession();

  const router = useRouter();

  // console.log(session);

  const sessionUpdate = useCallback(async () => {
    await getSession()
      .then((res) => {
        session = res;
        setUser(res?.user?.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [session]);

  useEffect(() => {
    sessionUpdate();
    setUser(session?.user?.data);
    if (session?.user?.data?.user_profile?.user_type == companyUser) {
      fetch("/api/auth/getcompany", {
        headers: {
          Accept: "application/json",
          Authorization: `Token $${session?.user?.auth_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCompanyUser(2);
          console.log(data);
          setCompanyMembers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCompanyUser(1);
    }
  }, [session, companyUser]);

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