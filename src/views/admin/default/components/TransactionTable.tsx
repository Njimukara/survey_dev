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
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { TableProps } from "../variables/columnsData";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
export default function TransactionTable(props: TableProps) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);

  // chakra toast
  const toast = useToast();

  var { data: session, status } = useSession();

  // format price
  const formatPrice = (price: number) => {
    return price / 100;
  };

  //   const sessionUpdate = useCallback(async () => {
  //     await getSession()
  //       .then((res) => {
  //         session = res;
  //         setUser(res?.user?.data);
  //       })
  //       .catch((err) => {
  //         // console.log(err);
  //       });
  //   }, [session]);

  //   // get user subscriptions
  //   const getSubscritptions = async () => {
  //     const config = {
  //       headers: {
  //         "Content-Type": "json",
  //         Accept: "application/json;charset=UTF-8",
  //         Authorization: `Token ${session?.user?.auth_token}`,
  //       },
  //     };

  //     await axios
  //       .get(
  //         "https://surveyplanner.pythonanywhere.com/api/plans/subscription/",
  //         config
  //       )
  //       .then((response) => {
  //         setSubscriptions(response.data);
  //         console.log(response.data);
  //       })
  //       .catch((err) => {
  //         toast({
  //           position: "bottom-right",
  //           description: "Error getting company users",
  //           status: "error",
  //           duration: 4000,
  //           isClosable: true,
  //         });
  //       });
  //   };

  useEffect(() => {
    // sessionUpdate();
    // // getSubscritptions()
    // setUser(session?.user?.data);
    console.log(data);
  }, [session, data]);

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

  // format date
  const formatDate = (date: any) => {
    let dateToFormat = new Date(date);
    let joinedDate = dateToFormat.toLocaleDateString("en-US");
    return joinedDate;
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      borderRadius="10"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      // overflowY={{ sm: "scroll", lg: "scroll" }}
    >
      <Flex px="25px" justify="space-between" mb="10px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Recent Transactions
        </Text>
        {/* <Menu /> */}
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
                  if (cell.column.Header === "AMOUNT") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        ${formatPrice(cell.value?.amount)}
                      </Text>
                    );
                  } else if (cell.column.Header === "STATUS") {
                    data = (
                      <Flex align="center">
                        {/* <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "Approved"
                              ? "green.500"
                              : cell.value === "Disable"
                              ? "red.500"
                              : cell.value === "Error"
                              ? "orange.500"
                              : null
                          }
                          as={
                            cell.value === "Approved"
                              ? MdCheckCircle
                              : cell.value === "Disable"
                              ? MdCancel
                              : cell.value === "Error"
                              ? MdOutlineError
                              : null
                          }
                        /> */}
                        <Text
                          color={
                            cell.value === "active"
                              ? "green.500"
                              : cell.value === "past_due"
                              ? "red.500"
                              : cell.value === "trialing"
                              ? "red.500"
                              : null
                          }
                          //    color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value.toUpperCase()}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {formatDate(cell.value)}
                      </Text>
                    );
                  } else if (cell.column.Header === "PAYMENT") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {/* {cell.value} */}
                        Stripe Invoice
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH="30px !important"
                      py="8px"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
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
