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
import { useEffect, useState, useCallback } from "react";
import InviteUser from "views/admin/profile/components/InviteUser";
import axios from "axios";
import { useSession } from "next-auth/react";
import Router from "next/router";
import axiosConfig from "axiosConfig";
import NoData from "layouts/admin/noData";

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
  const [companyMembers, setCompanyMembers] = useState([]);
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
  const getCompanyMembers = useCallback(async () => {
    setFetching(true);

    try {
      const response = await axiosConfig.get(
        "/api/company/companymembers/companymember/"
      );
      setCompanyMembers(response.data);
      setFetching(false);
    } catch (error) {
      setFetching(false);
    }
  }, []);

  //   get invitations
  const getInvitations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(
        "/api/company/companymembers/invitations/"
      );
      let result = response.data.filter((invite: any) => {
        return invite.status == 1;
      });
      setInvitations(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session != null) {
      getInvitations();
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
          {companyMembers && companyMembers.length != 0 ? (
            <UserTableComplex
              columnsData={columnsDataUsers}
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
          {invitations && invitations.length != 0 ? (
            <PendingUserInvite
              columnsData={PendingInvite}
              getInvitations={getInvitations}
              tableData={invitations as unknown as TableData[]}
            />
          ) : loading ? (
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
