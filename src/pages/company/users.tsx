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
import tableDataUser from "views/admin/dataTables/variables/tableDataUser.json";
import pendingInvite from "views/admin/dataTables/variables/pendingInvite.json";
import UserTableComplex from "views/admin/dataTables/components/UserTableComplex";
import PendingUserInvite from "views/admin/dataTables/components/PendinguserInvite";
import { useEffect, useState } from "react";
import InviteUser from "views/admin/profile/components/InviteUser";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Users() {
  // component variables
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyMembers, setCompanyMembers] = useState();
  const [invitations, setInvitations] = useState();
  const [user, setUser] = useState();
  const [companyUser] = useState(2);

  // session hook
  const { data: session, status } = useSession();

  // toggleUser invite modal
  const toggleModal = (state: boolean) => {
    setIsOpen(state);
  };

  //   get invitations
  const getCompany = async () => {
    setFetching(true);
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
        setCompanyMembers(res.data.members);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(res.data);
        setInvitations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (session != null) {
      // get invitations and company members
      getInvitations();
      getCompany();
      setUser(session?.user?.data);
    }
  }, [session]);

  return (
    <AdminLayout>
      <Flex pt={{ base: "130px", md: "80px", xl: "80px" }} w="100%" gap={10}>
        <Flex w="30%">
          <Box>
            <Heading as="h3" size="md">
              Company Users
            </Heading>
            <Text>
              All users in this company are listed in the adjacent table.
            </Text>
            {user?.user_profile.user_type == companyUser && (
              <Button
                mt="5"
                py="5"
                variant="homePrimary"
                onClick={() => toggleModal(true)}
              >
                {" "}
                Invite User
              </Button>
            )}
            <InviteUser opened={isOpen} toggleModal={toggleModal} />
          </Box>
        </Flex>
        <Flex w="70%">
          {companyMembers != undefined ? (
            <UserTableComplex
              columnsData={columnsDataUsers}
              tableData={companyMembers as unknown as TableData[]}
            />
          ) : isFetching ? (
            <Card w="100%">
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={20}
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
            <Card w="100%">
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={24}
              >
                <Text>There are no company users</Text>
              </Flex>
            </Card>
          )}
        </Flex>
      </Flex>
      {/* pending invites */}
      <Flex pt={{ base: "130px", md: "80px", xl: "80px" }} w="100%" gap={10}>
        <Flex w="30%">
          <Box>
            <Heading as="h3" size="md">
              Pending Invites
            </Heading>
            <Text>All unattended invites are shown in the table</Text>
          </Box>
        </Flex>
        <Flex w="70%">
          {invitations != undefined ? (
            <PendingUserInvite
              columnsData={PendingInvite}
              tableData={invitations as unknown as TableData[]}
            />
          ) : loading ? (
            <Card w="100%">
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={10}
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
            <Card w="100%">
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={20}
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
