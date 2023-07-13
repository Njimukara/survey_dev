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
import { Box, Flex, Grid } from "@chakra-ui/react";
import AdminLayout from "layouts/admin";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import PlanDetails from "views/admin/profile/components/PlanDetails";

// react imports
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import CompanyDetails from "views/admin/default/components/CompanyDetails";
import axios from "axios";
import { useCurrentUser } from "contexts/UserContext";
import CompanyUsers from "views/admin/profile/components/CompanyUsers";
import axiosConfig from "axiosConfig";

export default function ProfileOverview() {
  const { loading, currentUser, fetchCurrentUser } = useCurrentUser();
  const [user, setUser] = useState<any>();
  const [company, setCompany] = useState();
  const [hasDetails, setHasDetails] = useState(false);
  const [companyUser, setCompanyUser] = useState(2);
  const [companyMembers, setCompanyMembers] = useState();
  const [individualUser, setIndividualUser] = useState(1);

  const { data: session } = useSession();

  const toggleHasDetails = (state: boolean) => {
    setHasDetails(state);
  };

  // get company
  const getCompany = useCallback(async () => {
    await axiosConfig
      .get("/api/company/my-company/")
      .then((res) => {
        setHasDetails(true);
        setCompany(res.data);
        setCompanyMembers(res?.data?.members);
      })
      .catch((error) => {
        return;
      });
  }, []);

  // state for user invite
  const [modalState, setModalState] = useState(false);

  // toggle company user invite modal
  const toggleCompanyUserModal = (state: boolean) => {
    setModalState(state);
  };

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
    setUser(currentUser);
    if (session?.user?.data?.user_profile?.user_type == companyUser) {
      getCompany();
    }
  }, [
    hasDetails,
    session,
    getCompany,
    fetchCurrentUser,
    currentUser,
    companyUser,
    loading,
  ]);

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
            borderRadius="10"
            gridArea="1 / 1 / 2 / 2"
            avatar={user?.user_profile?.avatar}
            name={user?.name || "loading"}
            email={user?.email || "loading"}
            date_joined={user?.date_joined || "loading"}
            phoneNumber={user?.user_profile?.phone_number || "loading"}
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
            <PlanDetails borderRadius="10" />
          </Grid>
        )}
        <Grid>
          {user?.user_profile?.user_type == companyUser && (
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                lg: "repeat(2, 1fr)",
              }}
              gap={{ base: "20px", xl: "20px" }}
            >
              <CompanyDetails
                borderRadius="10"
                hasDetails={hasDetails}
                toggleHasDetails={toggleHasDetails}
                company={company}
              />
              {hasDetails && (
                <CompanyUsers
                  borderRadius="10"
                  toggleModal={toggleCompanyUserModal}
                  isOpen={modalState}
                  company={companyMembers}
                />
              )}
            </Grid>
          )}
        </Grid>
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
