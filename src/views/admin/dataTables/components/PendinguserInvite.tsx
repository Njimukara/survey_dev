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
import React, { useMemo, useRef } from "react";
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
export default function PendingUserInvite(props: TableProps) {
  const { columnsData, tableData } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

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
                Delete Customer
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={onClose} ml={3}>
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
                        // onClick={() => console.log(cell.value)}
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
                      <Button variant="homePrimary" px="3" py="1" fontSize="sm">
                        resend
                      </Button>
                    );
                  } else if (cell.column.Header === "REVOKE") {
                    data = (
                      <Button
                        onClick={onOpen}
                        _hover={btnBgHover}
                        variant="homePrimary"
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
