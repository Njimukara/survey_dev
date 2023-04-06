import {
  Box,
  Button,
  Flex,
  Text,
  SimpleGrid,
  Heading,
  useColorModeValue,
  Card,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import AdminLayout from "layouts/admin";
import { TableData } from "views/admin/default/variables/columnsData";
import {
  columnsDataUsers,
  PendingInvite,
} from "views/admin/dataTables/variables/columnsData";
// import tableDataUser from "views/admin/dataTables/variables/tableDataUser.json";
// import pendingInvite from "views/admin/dataTables/variables/pendingInvite.json";
import UserTableComplex from "views/admin/dataTables/components/UserTableComplex";
import PendingUserInvite from "views/admin/dataTables/components/PendinguserInvite";
import { useEffect, useState } from "react";
import InviteUser from "views/admin/profile/components/InviteUser";
import axios from "axios";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function Users() {
  // component variables
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyMembers, setCompanyMembers] = useState([]);
  const [company, setCompany] = useState(null);
  const [hasDetails, setHasDetails] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [user, setUser] = useState<any>();
  const [companyUser] = useState(2);
  // const [companyUserLength, setCompanyUserLength] = useState(0);
  // const [companyUser] = useState(2);

  // session hook
  const { data: session, status } = useSession();

  // toggleUser invite modal
  const toggleModal = (state: boolean) => {
    setIsOpen(state);
  };

  //   get invitations
  const getCompanyMembers = async () => {
    setFetching(true);
    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };
    await axios
      .get(
        `https://surveyplanner.pythonanywhere.com/api/company/companymembers/companymember/`,
        config
      )
      .then((res) => {
        // console.log(res);
        // getInvitations();
        setCompanyMembers(res.data);
        console.log(res.data);
        setFetching(false);
      })
      .catch((err) => {
        // console.log(err);
        setFetching(false);
      });
  };

  //   get invitations
  const getInvitations = async () => {
    setLoading(true);
    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };
    await axios
      .get(
        `https://surveyplanner.pythonanywhere.com/api/company/invitations/invitations/`,
        config
      )
      .then((res) => {
        // console.log(res.data);

        let result = res.data.filter((invite: any) => {
          return invite.status == 1;
        });
        setInvitations(result);
        // console.log(result.length);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  };

  const getCompany = async () => {
    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .get(
        `https://surveyplanner.pythonanywhere.com/api/company/my-company/`,
        config
      )
      .then((res) => {
        console.log(res.data);
        setCompany(res.data);
        setLoading(false);
        setHasDetails(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setHasDetails(false);
      });
  };

  useEffect(() => {
    // if (session?.user?.user_profile?.user_type == companyUser) {
    //   Router.push("/admin/default");
    // }
    if (session != null) {
      // get invitations and company members
      getInvitations();
      getCompanyMembers();
      setUser(session?.user?.data);
    }
  }, [session]);

  if (session == null || undefined) {
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
            {user?.user_profile?.user_type == companyUser && (
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
            <InviteUser
              getInvitations={getInvitations}
              opened={isOpen}
              toggleModal={toggleModal}
            />
          </Box>
        </Flex>
        <Flex w="75%">
          {companyMembers != undefined && companyMembers.length != 0 ? (
            <UserTableComplex
              columnsData={columnsDataUsers}
              getCompanyMembers={getCompanyMembers}
              tableData={companyMembers as unknown as TableData[]}
            />
          ) : isFetching ? (
            <Card w="100%" borderRadius={20}>
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
          ) : (
            <Card w="100%" borderRadius={20}>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                py={24}
              >
                <Text>There are no company users</Text>
              </Flex>
            </Card>
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
          {invitations != undefined && invitations.length != 0 ? (
            <PendingUserInvite
              columnsData={PendingInvite}
              getInvitations={getInvitations}
              tableData={invitations as unknown as TableData[]}
            />
          ) : loading ? (
            <Card w="100%" borderRadius={20}>
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
          ) : (
            <Card w="100%" borderRadius={20}>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                py={24}
              >
                <Text>There are no pending invites in this company</Text>
              </Flex>
            </Card>
          )}
        </Flex>
      </Flex>
    </AdminLayout>
  );
}

Users.requireAuth = true;
