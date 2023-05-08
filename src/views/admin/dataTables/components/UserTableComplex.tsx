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
  useToast,
} from "@chakra-ui/react";
import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
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
import { TableProps } from "views/admin/default/variables/columnsData";
import axios from "axios";
import { useSession } from "next-auth/react";

interface user {
  date_joined?: string;
  email?: string;
  is_active?: boolean;
  name?: string;
  user_id?: number;
}

export default function UserTableComplex(props: TableProps) {
  const { getCompanyMembers, columnsData, tableData } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const [isSending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState();
  const [invitations, setInvitations] = useState();
  const [pendingDelete, setPendingDelete] = useState<any>();
  const [user, setUser] = useState<any>();
  const [companyUser] = useState(2);

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
  const btnBgHover = useColorModeValue({ bg: "none" }, { bg: "none" });
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const deleteTextColor = useColorModeValue("red.600", "red.600");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  // chakra toast
  const toast = useToast();

  const formatDate = (date: any) => {
    let dateToFormat = new Date(date);
    let joinedDate = dateToFormat.toLocaleDateString("en-US");
    return joinedDate;
  };

  const getBlockedState = (data: user) => {
    if (data.is_active == true) {
      return "Block User";
    } else {
      return "Unblock User";
    }
  };

  const { data: session, status } = useSession();

  //   Block User
  const blockUser = useCallback(
    async (data: any) => {
      // console.log(data);
      const id = data.user_id;

      // check if user has been blocked already
      if (data.is_active) {
        setSending(true);
        setSending(true);
        // headers
        const config = {
          headers: {
            Accept: "application/json;charset=UTF-8",
            Authorization: `Token ${session?.user?.auth_token}`,
          },
        };

        let body = {};
        await axios
          .patch(
            `https://surveyplanner.pythonanywhere.com/api/company/companymember/${id}/block/`,
            body,
            config
          )
          .then((res) => {
            // refresh the table to show recent updates
            getCompanyMembers();
            setSending(false);
            toast({
              position: "bottom-right",
              description: "User blocked successfully.",
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
              description: "Unable to block user",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
        return;
      }

      // else unblock User
      console.log("unblock user please");
      setSending(true);
      const config = {
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Token ${session?.user?.auth_token}`,
        },
      };

      let body = {};
      await axios
        .patch(
          `https://surveyplanner.pythonanywhere.com/api/company/companymember/${id}/unblock/`,
          body,
          config
        )
        .then((res) => {
          // refresh the table to show recent updates
          getCompanyMembers();
          setSending(false);
          toast({
            position: "bottom-right",
            description: "User unblocked successfully.",
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
            description: "Unable to unblock user",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    },
    [getCompanyMembers]
  );

  //   delete invitations
  const deleteUser = async (data: any) => {
    setLoading(true);
    const id = data.user_id;

    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };
    await axios
      .delete(
        `https://surveyplanner.pythonanywhere.com/api/company/companymember/${id}/delete/`,
        config
      )
      .then((res) => {
        // setCompanyMembers(res.data.members);
        // console.log(res);
        getCompanyMembers();
        setLoading(false);
        toast({
          position: "bottom-right",
          description: "User deleted successfully.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast({
          position: "bottom-right",
          description: "Unable to delete user",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (session != null) {
      // get user
      setUser(session?.user?.data);
    }
  }, [session]);

  return (
    <Card
      flexDirection="column"
      borderRadius="10"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      h="max-content"
      max-h="500"
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
                Delete Customer
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  variant="homePrimary"
                  bg="transparent"
                  px="3"
                  py="1"
                  fontSize="sm"
                  ref={cancelRef}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  variant="homePrimary"
                  _hover={{ bg: "red.600" }}
                  bg="red"
                  px="3"
                  py="1"
                  fontSize="sm"
                  onClick={() => {
                    onClose();
                    deleteUser(pendingDelete);
                  }}
                  ml={3}
                >
                  Delete
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
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "EMAIL") {
                    data = (
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "DATE JOINED") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {formatDate(cell.value)}
                      </Text>
                    );
                  }
                  // else if (cell.column.Header === "ISACTIVE") {
                  //   data = (
                  //     <Text color={textColor} fontSize="sm" fontWeight="700">
                  //       {cell.value.toString()}
                  //     </Text>
                  //   );
                  // }
                  else if (
                    cell.column.Header === "BLOCK" &&
                    user?.user_profile?.user_type == companyUser
                  ) {
                    data = (
                      <Button
                        onClick={() => {
                          blockUser(cell.row.original);
                        }}
                        _hover={btnBgHover}
                        color={deleteTextColor}
                        isLoading={isSending}
                        px={0}
                        bgColor="transparent"
                        fontSize="sm"
                        fontWeight="700"
                      >
                        {/* {cell.row.original?.is_active
                          ? "Block User"
                          : "UnBlock User"} */}
                        {getBlockedState(cell.row.original)}
                      </Button>
                    );
                  } else if (user?.user_profile?.user_type == companyUser) {
                    data = (
                      <Button
                        onClick={() => {
                          onOpen();
                          setPendingDelete(cell.row.original);
                        }}
                        _hover={btnBgHover}
                        color={deleteTextColor}
                        isLoading={loading}
                        px={0}
                        bgColor="transparent"
                        fontSize="sm"
                        fontWeight="700"
                      >
                        Delete
                      </Button>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
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
