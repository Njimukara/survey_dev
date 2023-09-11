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
import { Box, Grid } from "@chakra-ui/react";
import AdminLayout from "layouts/admin";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import PlanDetails from "views/admin/profile/components/PlanDetails";

// react imports
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import CompanyDetails from "views/admin/default/components/CompanyDetails";
import { useCurrentUser } from "contexts/UserContext";
import CompanyUsers from "views/admin/profile/components/CompanyUsers";
import axiosConfig from "axiosConfig";
import getClient from "axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import useUpdateSurveyHistory from "hooks/useUpdateSurveyHistory";
import { UserTypes } from "utils/userTypes";
import { fetchCompanyData } from "redux/companySlice";
import EditCompanyModal from "components/modals/EditCompany";

export default function ProfileOverview() {
  const { loading, currentUser, fetchCurrentUser } = useCurrentUser();
  const [user, setUser] = useState<any>();
  const dispatch = useDispatch<AppDispatch>();

  // const [company, setCompany] = useState();
  const [hasDetails, setHasDetails] = useState(false);
  // const [companyMembers, setCompanyMembers] = useState([]);
  const companyData = useSelector(
    (state: RootState) => state.reduxStore.company
  );
  const { company, companyMembers, membersLoading } = companyData;

  const { data: session } = useSession();

  const toggleHasDetails = (state: boolean) => {
    setHasDetails(state);
  };
  const { userType } = useUpdateSurveyHistory();

  // state for user invite
  const [modalState, setModalState] = useState(false);
  const [editCompanyModalState, setEditCompanyModal] = useState(false);

  // toggle company user invite modal
  const toggleCompanyUserModal = (state: boolean) => {
    setModalState(state);
  };

  useEffect(() => {
    if (company != null) {
      // setCompanyMembers(company?.members);
      setHasDetails(true);
    }
  }, [company]);

  useEffect(() => {
    if (!company || Object.keys(company).length === 0) {
      dispatch(
        fetchCompanyData({
          apiEndpoint: "/api/company/my-company/",
          force: true,
        })
      );
    }
  }, [company, dispatch]);

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
    setUser(currentUser);
  }, [hasDetails, session, company, fetchCurrentUser, currentUser, loading]);

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }} fontFamily="inter">
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
        {(userType == UserTypes.COMPANY_USER ||
          userType == UserTypes.REGULAR_USER) && (
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
          {userType == UserTypes.COMPANY_USER && (
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
                company={company}
                toggleHasDetails={toggleHasDetails}
              />
              {hasDetails && (
                <CompanyUsers
                  borderRadius="10"
                  toggleModal={toggleCompanyUserModal}
                  isOpen={modalState}
                  companyMembers={companyMembers}
                />
              )}
            </Grid>
          )}
        </Grid>
      </Box>
    </AdminLayout>
  );
}

ProfileOverview.requireAuth = true;
