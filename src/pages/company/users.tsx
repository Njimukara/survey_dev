import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Card,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import AdminLayout from "layouts/admin";
import { TableData } from "views/admin/default/variables/columnsData";
import { useEffect, useState, useCallback } from "react";
import InviteUser from "views/admin/profile/components/InviteUser";
import { useSession } from "next-auth/react";
import axiosConfig from "axiosConfig";
import NoData from "layouts/admin/noData";
import useInvitations from "utils/useInvitations";
import CompanyUsersTable from "views/admin/dataTables/components/CompanyUsersTable";
import PendingUsersTable from "views/admin/dataTables/components/PendingUsersTable";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { UserTypes } from "utils/userTypes";

const LoadingSpinner = () => (
  <Card w="100%" borderRadius={10}>
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={20}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="primary.500"
        size="xl"
      />
      <Text>Loading ...</Text>
    </Flex>
  </Card>
);

export default function Users() {
  // component variables
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [companyMembers, setCompanyMembers] = useState([]);
  const [hasDetails, setHasDetails] = useState(false);
  const [user, setUser] = useState<any>();
  const [companyUser] = useState(2);
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const userProfile = sessionUser?.data?.user_profile;
  const userType = userProfile?.user_type;

  const { companyInvites, invitesError, invitesLoading, fetchInvitations } =
    useInvitations();

  const companyMembersData = useSelector(
    (state: RootState) => state.reduxStore.company
  );
  const { companyMembers, membersLoading, membersError } = companyMembersData;

  // toggleUser invite modal
  const toggleModal = (state: boolean) => {
    setIsOpen(state);
  };

  //   get invitations
  const getCompanyMembers = useCallback(async () => {
    // setFetching(true);
    // try {
    //   const response = await axiosConfig.get(
    //     "/api/company/companymembers/companymember/"
    //   );
    //   setCompanyMembers(response.data);
    //   setFetching(false);
    // } catch (error) {
    //   setFetching(false);
    // }
  }, []);

  useEffect(() => {
    if (session != null) {
      // getInvitations();
      getCompanyMembers();
      setUser(session?.user?.data);
    }
  }, []);

  if (session == null || session === undefined) {
    return (
      <AdminLayout>
        <Flex h="100vh" w="100%" justifyContent="center" alignItems="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Flex pt={{ md: "100px" }} px="50px" w="100%" gap={10}>
        <Flex w="25%">
          <Box>
            <Heading as="h3" size="md">
              Company Users
            </Heading>
            <Text>
              All users in this company are listed in the adjacent table.
            </Text>
            {userType == UserTypes.COMPANY_USER && (
              <Button
                mt="5"
                py="5"
                variant="homePrimary"
                onClick={() => toggleModal(true)}
                isDisabled={hasDetails}
              >
                {" "}
                Invite User
              </Button>
            )}
            <InviteUser opened={isOpen} toggleModal={toggleModal} />
          </Box>
        </Flex>
        <Flex w="75%">
          {companyMembers && companyMembers.length != 0 ? (
            <CompanyUsersTable
              getCompanyMembers={getCompanyMembers}
              tableData={companyMembers as unknown as TableData[]}
            />
          ) : isFetching ? (
            <LoadingSpinner />
          ) : (
            <NoData title="There are no company users yet" />
          )}
        </Flex>
      </Flex>
      {/* pending invites */}
      <Flex pt={{ md: "80px" }} px="50px" w="100%" gap={10}>
        <Flex w="25%">
          <Box>
            <Heading as="h3" size="md">
              Pending Invites
            </Heading>
            <Text>All unattended invites are shown in the table</Text>
          </Box>
        </Flex>
        <Flex w="75%">
          {companyInvites && companyInvites.length != 0 ? (
            <PendingUsersTable
              // getInvitations={getInvitations}
              tableData={companyInvites as unknown as TableData[]}
            />
          ) : invitesLoading ? (
            <LoadingSpinner />
          ) : (
            <NoData title="No pending invies in your company" />
          )}
        </Flex>
      </Flex>
    </AdminLayout>
  );
}

Users.requireAuth = true;
