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
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/CompanyUsers";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

// types
import { AuthUser } from "types/user";

// Assets
import banner from "img/auth/banner.png";
import avatar from "img/avatars/avatar4.png";

// react imports
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CompanyDetails from "views/admin/default/components/CompanyDetails";
import RegisterCompany from "views/admin/default/components/RegisterCompany";
import axios from "axios";

export default function ProfileOverview() {
  const [user, setUser] = useState<any>();
  const [company, setCompany] = useState();
  const [hasDetails, setHasDetails] = useState(false);
  const [companyUser, setCompanyUser] = useState(2);
  // const [individualUser, setIndividualUser] = useState(1)
  const { data: session, status } = useSession();

  const toggleHasDetails = (state: boolean) => {
    setHasDetails(state);
  };

  useEffect(() => {
    setUser(session?.user?.data);
    // console.log(session?.user?.data)
    // headers
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    const res = axios
      .get(
        "https://surveyplanner.pythonanywhere.com/api/company/my-company/",
        config
      )
      .then((res) => {
        // console.log(res)
        setHasDetails(true);
        setCompany(res.data);
        // router.push('/auth/verifyemail')
      })
      .catch((error) => {
        setHasDetails(false);
        // console.log(error)
      });
  }, [hasDetails, session]);
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
            avatar={avatar}
            name={user?.name}
            email={user?.email}
            date_joined={user?.date_joined}
          />
        </Grid>
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
          <PlanDetails
            gridArea="1 / 1 / 2 / 2"
            avatar={avatar}
            name={user?.name}
            email={user?.email}
            date_joined={user?.date_joined}
          />
        </Grid>
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
          {/* <Projects
            banner={banner}
            avatar={avatar}
            name={"user.name"}
            job="Product Designer"
            posts="17"
            followers="9.7k"
            following="274"
          /> */}
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
