import { Box, Button, Flex, Text, SimpleGrid, Heading } from "@chakra-ui/react";
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

export default function Users() {
  // component variables
  const [isOpen, setIsOpen] = useState(false);

  // toggleUser invite modal
  const toggleModal = (state: boolean) => {
    setIsOpen(state);
  };

  useEffect(() => {}, []);

  return (
    <AdminLayout>
      <Flex pt={{ base: "130px", md: "80px", xl: "80px" }} w="100%" gap={10}>
        <Flex w="30%">
          <Box>
            <Heading as="h3">Company Users</Heading>
            <Text>
              All users in this company are listed in the adjacent table.
            </Text>
            <Button
              mt="5"
              variant="homePrimary"
              onClick={() => toggleModal(true)}
            >
              {" "}
              Invite User
            </Button>
            <InviteUser opened={isOpen} toggleModal={toggleModal} />
          </Box>
        </Flex>
        <Flex w="70%">
          <UserTableComplex
            columnsData={columnsDataUsers}
            tableData={tableDataUser as unknown as TableData[]}
          />
        </Flex>
      </Flex>
      {/* pending invites */}
      <Flex pt={{ base: "130px", md: "80px", xl: "80px" }} w="100%" gap={10}>
        <Flex w="30%">
          <Box>
            <Heading as="h3">Pending Invites</Heading>
            <Text>
              All users in this company are listed in the adjacent table.
            </Text>
          </Box>
        </Flex>
        <Flex w="70%">
          <PendingUserInvite
            columnsData={PendingInvite}
            tableData={pendingInvite as unknown as TableData[]}
          />
        </Flex>
      </Flex>
    </AdminLayout>
  );
}
