import {
  Flex,
  Text,
  useColorModeValue,
  Button,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useMemo, useState, useEffect, useCallback, useRef } from "react";

// Assets
import { TableColumn, TableProps } from "../../default/variables/columnsData";
// import { useAllSurveysContext } from "contexts/SurveyContext";
import { useRouter } from "next/router";
import axiosConfig from "axiosConfig";
import ReusableTable from "views/admin/dataTables/components/Table";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { fetchCompanyData, fetchCompanyMembers } from "redux/companySlice";

interface user {
  date_joined?: string;
  email?: string;
  is_active?: boolean;
  name?: string;
  user_id?: number;
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const getBlockedState = (data: user) => {
  if (data.is_active == true) {
    return "Block User";
  } else {
    return "Unblock User";
  }
};

const CompanyUsersTable = (props: TableProps) => {
  const { getCompanyMembers, columnsData, tableData } = props;

  const dispatch = useDispatch<AppDispatch>();

  //   const columns = useMemo(() => columnsData, [columnsData]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const data = useMemo(() => tableData, [tableData]);
  // const { surveys, getAllSurveys } = useAllSurveysContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [survey, setSurvey] = useState(null);
  const [isSending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState();
  const [invitations, setInvitations] = useState();
  const [pendingDelete, setPendingDelete] = useState<any>();
  const [user, setUser] = useState<any>();
  const [companyUser] = useState(2);

  // useEffect(() => {
  //   if (!surveys) {
  //     getAllSurveys();
  //   }
  // }, [surveys, getAllSurveys]);

  const { data: session, status } = useSession();

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("#757575", "white");
  const whiteColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const btnbg = useColorModeValue(
    { bg: "secondary.200" },
    { bg: "secondary.200" }
  );
  const bgHover = useColorModeValue(
    { bg: "green.600" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "green.600" },
    { bg: "whiteAlpha.100" }
  );
  const nullbtnbgfocus = useColorModeValue({ bg: "none" }, { bg: "none" });
  const btnBgHover = useColorModeValue({ bg: "none" }, { bg: "none" });
  const btnBg = useColorModeValue({ bg: "none" }, { bg: "none" });
  const deleteTextColor = useColorModeValue("red.600", "red.600");
  const headerColor = useColorModeValue("gray.900", "secondary.600");

  const router = useRouter();
  // chakra toast
  const toast = useToast();

  const blockUser = useCallback(
    async (data: any) => {
      // console.log(data);
      const id = data.user_id;

      // check if user has been blocked already
      if (data.is_active) {
        setSending(true);
        setSending(true);
        let body = {};
        await axiosConfig
          .patch(`/api/company/companymember/${id}/block/`, body)
          .then((res) => {
            // refresh the table to show recent updates
            dispatch(
              fetchCompanyMembers({
                apiEndpoint: "/api/company/companymembers/companymember/",
                force: true,
              })
            );
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

      setSending(true);
      let body = {};
      await axiosConfig
        .patch(`/api/company/companymember/${id}/unblock/`, body)
        .then((res) => {
          // refresh the table to show recent updates
          dispatch(
            fetchCompanyMembers({
              apiEndpoint: "/api/company/companymembers/companymember/",
              force: true,
            })
          );
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

  const deleteUser = async (data: any) => {
    setLoading(true);
    const id = data.user_id;

    await axiosConfig
      .delete(`/api/company/companymember/${id}/delete/`)
      .then((res) => {
        // getCompanyMembers();
        dispatch(
          fetchCompanyMembers({
            apiEndpoint: "/api/company/companymembers/companymember/",
            force: true,
          })
        );
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

  const Tabblecolumns: TableColumn[] = [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "DATE JOINED",
      accessor: "date_joined",
      Cell: ({ cell: { value } }) => (
        <Text color={textColor} fontSize="sm" fontWeight="400">
          {formatDate(value)}
        </Text>
      ),
    },
    {
      Header: "BLOCK",
      accessor: "block", // Assuming "id" is the unique identifier for each row
      Cell: ({ cell }) => {
        let data = null;

        if (
          cell.column.Header === "BLOCK" &&
          user?.user_profile?.user_type === companyUser
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
              fontWeight="400"
            >
              {getBlockedState(cell.row.original)}
            </Button>
          );
        }

        return data;
      },
    },
    {
      Header: "Delete",
      accessor: "delete",
      Cell: ({ cell }) => {
        let data = null;
        if (user?.user_profile?.user_type === companyUser) {
          data = (
            <Button
              onClick={() => {
                onOpen();
                setPendingDelete(cell?.row.original);
              }}
              _hover={btnBgHover}
              color={deleteTextColor}
              isLoading={loading}
              px={0}
              bgColor="transparent"
              fontSize="sm"
              fontWeight="400"
            >
              Delete
            </Button>
          );
        }

        return data;
      },
    },
  ];

  return (
    <>
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
                  bg="primary.600"
                  px="3"
                  py="0"
                  h="40px"
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
                  py="0"
                  h="40px"
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
      <ReusableTable
        columns={Tabblecolumns}
        data={data}
        searchPlaceholder="Input Search"
        // tableName="Survey History Data"
      />
    </>
  );
};

export default CompanyUsersTable;
