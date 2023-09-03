import {
  Flex,
  Icon,
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
  Text,
} from "@chakra-ui/react";
import { useMemo, useState, useEffect, useRef } from "react";

// Assets
import { MdCopyAll } from "react-icons/md";
import { TableColumn, TableProps } from "../../default/variables/columnsData";
import axiosConfig from "axiosConfig";
import ReusableTable from "views/admin/dataTables/components/Table";
import { useSession } from "next-auth/react";
import useInvitations from "utils/useInvitations";
import { useCurrentUser } from "contexts/UserContext";

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const checkExpiry = (data: any) => {
  let today = new Date();
  let expiry = new Date(data?.expires_on);

  return expiry >= today;
};

const PendingUsersTable = (props: TableProps) => {
  const { tableData } = props;

  const { fetchInvitations } = useInvitations();
  const { currentUser } = useCurrentUser();

  const [user, setUser] = useState<any>(currentUser);

  const [pendingRevoke, setPendingRevoke] = useState<any>();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const data = useMemo(() => tableData, [tableData]);
  const [isSending, setSending] = useState(false);
  const [, setLoading] = useState(false);

  const btnBgHover = useColorModeValue({ bg: "none" }, { bg: "none" });
  const btnTransBgHover = useColorModeValue({ bg: "none" }, { bg: "none" });

  // chakra toast
  const toast = useToast();

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

  const resendInvite = async (data: any) => {
    // console.log(data);
    setSending(true);
    const id = data.id;
    const body = {};

    // console.log(body, id);
    setSending(true);
    await axiosConfig
      .put(`/api/company/invitations/${id}/renew/`, body)
      .then((res) => {
        fetchInvitations();
        setSending(false);
        toast({
          position: "bottom-right",
          description: "Invite sent successfully.",
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
    await axiosConfig
      .put(`/api/company/invitations/${id}/cancel/`, body)
      .then((res) => {
        fetchInvitations();
        setSending(false);
        toast({
          position: "bottom-right",
          description: "Invite cancelled successfully.",
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

  const Tabblecolumns: TableColumn[] = [
    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "EXPIRY",
      accessor: "expires_on",
      Cell: ({ cell: { value } }) => (
        <Text color={textColor} fontSize="sm" fontWeight="400">
          {formatDate(value)}
        </Text>
      ),
    },
    {
      Header: "COPY LINK",
      accessor: "invitation_url",
      Cell: ({ cell: { value } }) => (
        <Button
          bg="none"
          onClick={() => copyToClipboard(value)}
          _hover={btnTransBgHover}
          py="0"
          h="48px"
          px="0"
          fontSize="sm"
        >
          <Icon as={MdCopyAll} boxSize={6} />
        </Button>
      ),
    },
    {
      Header: "RESEND",
      accessor: "resend",
      Cell: ({ cell }) => (
        <Button
          onClick={() => {
            resendInvite(cell.row?.original);
          }}
          isLoading={isSending}
          isDisabled={checkExpiry(cell.row?.original)}
          variant="homePrimary"
          px="3"
          py="0"
          h="48px"
          fontSize="sm"
        >
          resend
        </Button>
      ),
    },
    {
      Header: "REVOKE",
      accessor: "revoke",
      Cell: ({ cell }) => (
        <Button
          onClick={() => {
            onOpen();
            setPendingRevoke(cell.row?.original);
          }}
          _hover={btnBgHover}
          _active={{ bg: "white" }}
          variant="homePrimary"
          isLoading={isSending}
          bg="transparent"
          border="solid"
          color="red.300"
          borderColor="red.300"
          py="0"
          px="3"
          height="48px"
          fontSize="sm"
        >
          revoke
        </Button>
      ),
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
              <AlertDialogHeader fontSize="lg" fontWeight="600">
                Revoke Invite
              </AlertDialogHeader>

              <AlertDialogBody fontSize="16px" fontWeight="400">
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  variant="homePrimary"
                  bg="transparent"
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
                    revokeInvite(pendingRevoke);
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

export default PendingUsersTable;
