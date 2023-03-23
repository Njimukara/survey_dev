import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useMemo, useRef, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

// Assets
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdCopyAll,
} from "react-icons/md";
import { TableProps } from "views/admin/default/variables/columnsData";
import { useSession } from "next-auth/react";
import axios from "axios";
export default function PendingUserInvite(props: TableProps) {
  const { columnsData, tableData } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const [isSending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyMembers, setCompanyMembers] = useState();
  const [invitations, setInvitations] = useState();
  const [pendingRevoke, setPendingRevoke] = useState<any>();
  const [user, setUser] = useState();
  const [companyUser] = useState(2);

  // chakra toast
  const toast = useToast();

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  // chakra colors
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const btnBgHover = useColorModeValue(
    { bg: "red.400", color: "white" },
    { bg: "red.400", color: "white" }
  );
  const btnTransBgHover = useColorModeValue({ bg: "none" }, { bg: "none" });

  const { data: session, status } = useSession();

  // format date
  const formatDate = (date: any) => {
    let dateToFormat = new Date(date);
    let joinedDate = dateToFormat.toLocaleDateString("en-US");
    return joinedDate;
  };

  // copy to clipboard
  const copyToClipboard = (data: any) => {
    navigator.clipboard.writeText(data);
    toast({
      position: "bottom-right",
      description: "Copied to clipboard",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  //   resend invitations
  const resendInvite = async (data: any) => {
    // console.log(data);
    setSending(true);
    const id = data.id;
    const body = {
      email: data.email,
      company: data.company,
      invited_by: data.invited_by,
      token: data.token,
      invitation_url: data.invitation_url,
      expires_on: data.expires_on,
      status: data.status,
    };

    // console.log(body, id);
    setSending(true);
    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };
    await axios
      .put(
        `https://surveyplanner.pythonanywhere.com/api/company/invitations/${id}/renew/`,
        body,
        config
      )
      .then((res) => {
        // setCompanyMembers(res.data.members);
        console.log(res);
        setSending(false);
        toast({
          position: "bottom-right",
          description: "Invite has been sent successfully.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setSending(false);
        toast({
          position: "bottom-right",
          description: "Invite has not been sent",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  //   revoke invitations
  const revokeInvite = async (data: any) => {
    setSending(true);
    const id = data.id;

    const body = {
      email: data.email,
      company: data.company,
      invited_by: data.invited_by,
      token: data.token,
      invitation_url: data.invitation_url,
      expires_on: data.expires_on,
      status: data.status,
    };

    // console.log(body, id);
    setSending(true);
    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };
    await axios
      .put(
        `https://surveyplanner.pythonanywhere.com/api/company/invitations/${id}/cancel/`,
        body,
        config
      )
      .then((res) => {
        // setCompanyMembers(res.data.members);
        console.log(res);
        setSending(false);
        toast({
          position: "bottom-right",
          description: "Invite has been cancelled successfully.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setSending(false);
        toast({
          position: "bottom-right",
          description: "Unable to revoke invite at this time",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Revoke Invite
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  variant="homePrimary"
                  bg="gray.100"
                  px="3"
                  py="1"
                  fontSize="sm"
                  ref={cancelRef}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="homePrimary"
                  bg="red"
                  _hover={{ bg: "red.600" }}
                  px="3"
                  py="1"
                  fontSize="sm"
                  onClick={() => {
                    onClose();
                    revokeInvite(pendingRevoke);
                  }}
                  ml={3}
                >
                  Revoke
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data;
                  if (cell.column.Header === "EMAIL") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "EXPIRY") {
                    data = (
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {formatDate(cell.value)}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "COPY LINK") {
                    data = (
                      <Button
                        bg="none"
                        onClick={() => copyToClipboard(cell.value)}
                        _hover={btnTransBgHover}
                        py="1"
                        px="0"
                        fontSize="sm"
                      >
                        <Icon as={MdCopyAll} boxSize={6} />
                      </Button>
                    );
                  } else if (cell.column.Header === "RESEND") {
                    data = (
                      <Button
                        onClick={() => {
                          resendInvite(cell.row.original);
                        }}
                        isLoading={isSending}
                        variant="homePrimary"
                        px="3"
                        py="1"
                        fontSize="sm"
                      >
                        resend
                      </Button>
                    );
                  } else if (cell.column.Header === "REVOKE") {
                    data = (
                      <Button
                        onClick={() => {
                          onOpen();
                          setPendingRevoke(cell.row.original);
                        }}
                        _hover={btnBgHover}
                        _active={{ bg: "white" }}
                        variant="homePrimary"
                        isLoading={isSending}
                        bg="transparent"
                        border="solid"
                        color="red.300"
                        borderColor="red.300"
                        py="1"
                        px="3"
                        fontSize="sm"
                      >
                        revoke
                      </Button>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize="sm"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="gray.100"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
