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

// Chakra imports
import { Box, Flex, Grid, Spinner, useToast } from "@chakra-ui/react";
import AdminLayout from "layouts/admin";
import { authOptions } from "pages/api/auth/[...nextauth]";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import PlanDetails from "views/admin/profile/components/PlanDetails";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";

// types
import { AuthUser } from "types/user";

// Assets
import avatar from "img/avatars/avatar4.png";

// react imports
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSession, getSession } from "next-auth/react";
import CompanyDetails from "views/admin/default/components/CompanyDetails";
// import RegisterCompany from "views/admin/default/components/RegisterCompany";
import axios from "axios";
import { useCurrentUser } from "contexts/UserContext";

export default function ProfileOverview() {
  const { loading, currentUser, fetchCurrentUser } = useCurrentUser();
  const [user, setUser] = useState<any>();
  const [company, setCompany] = useState();
  const [hasDetails, setHasDetails] = useState(false);
  const [companyUser, setCompanyUser] = useState(2);
  // const [updatedSession, setUpdatedSession] = useState<any>();
  const [individualUser, setIndividualUser] = useState(1);

  // const cachedValue = useMemo(secondSession(), session)
  var { data: session } = useSession();

  // const secondSession = useCallback(async () => {
  //   await getSession()
  //     .then((res) => {
  //       // console.log(res);
  //       session = res;
  //       setUser(res?.user?.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [session]);

  const toggleHasDetails = (state: boolean) => {
    setHasDetails(state);
  };

  // chakra toast
  const toast = useToast();

  // get company
  const getCompany = useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .get(
        "https://surveyplanner.pythonanywhere.com/api/company/my-company/",
        config
      )
      .then((res) => {
        setHasDetails(true);
        setCompany(res.data);
      })
      .catch((error) => {
        // console.log(error);
        // toast({
        //   position: "bottom-right",
        //   description: "Error getting company details",
        //   status: "error",
        //   duration: 5000,
        //   isClosable: true,
        // });
      });
  }, [hasDetails]);

  useEffect(() => {
    // secondSession();
    fetchCurrentUser();
    setUser(currentUser);
    if (session?.user?.data?.user_profile?.user_type == companyUser) {
      getCompany();
    }
  }, [hasDetails, loading]);

  // Loader if the user session has not been loaded
  // if (session == null || undefined) {
  //   return (
  //     <AdminLayout>
  //       <Flex h="100vh" w="100%" justifyContent="center" alignItems="center">
  //         <Spinner
  //           thickness="4px"
  //           speed="0.65s"
  //           emptyColor="gray.200"
  //           color="blue.500"
  //           size="xl"
  //         />
  //       </Flex>
  //     </AdminLayout>
  //   );
  // }

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "1fr",
          }}
          templateRows={{
            base: "repeat(3, 1fr)",
            lg: "1fr",
          }}
          gap={{ base: "20px", xl: "20px" }}
        >
          <Banner
            gridArea="1 / 1 / 2 / 2"
            avatar={user?.user_profile?.avatar}
            name={user?.name || "loading"}
            email={user?.email || "loading"}
            date_joined={user?.date_joined || "loading"}
          />
        </Grid>
        {(user?.user_profile?.user_type == companyUser ||
          user?.user_profile?.user_type == individualUser) && (
          <Grid
            templateColumns={{
              base: "1fr",
              lg: "1fr",
            }}
            templateRows={{
              base: "repeat(3, 1fr)",
              lg: "1fr",
            }}
            gap={{ base: "20px", xl: "20px" }}
          >
            <PlanDetails />
          </Grid>
        )}
        <Grid>
          {user?.user_profile?.user_type == companyUser && (
            <CompanyDetails
              // avatar={avatar}
              hasDetails={hasDetails}
              toggleHasDetails={toggleHasDetails}
              company={company}
            />
          )}
        </Grid>
        <Flex gap="4">
          <General
            gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
            minH="365px"
            pe="20px"
          />
          <Notifications
            used={25.6}
            total={50}
            gridArea={{
              base: "3 / 1 / 4 / 2",
              lg: "2 / 1 / 3 / 3",
              "2xl": "1 / 3 / 2 / 4",
            }}
          />
        </Flex>
      </Box>
    </AdminLayout>
  );
}

// export async function getServerSideProps(context: any) {
//   const session = await getSession();

//   if (!session) {
//     return {
//       props: {
//         session: "No session",
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// }
ProfileOverview.requireAuth = true;
