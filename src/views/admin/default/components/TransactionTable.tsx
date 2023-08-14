import {
  Flex,
  Table,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Box,
  Input,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";

// Assets
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdSearch,
} from "react-icons/md";
import { TableProps } from "../variables/columnsData";
export default function TransactionTable(props: TableProps) {
  const { columnsData, tableData } = props;

  const font_family = `'Poppins', sans-serif'`;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [searchTerm, setSearchTerm] = useState("");

  // format price
  const formatPrice = (price: number) => {
    return price / 100;
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
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
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    setGlobalFilter,
  } = tableInstance;

  const handleSearch = () => {
    setGlobalFilter(searchTerm);
  };
  const cancelSearch = () => {
    setSearchTerm("");
  };

  function formatDate(date: string) {
    let options = [{ month: "short" }, { day: "numeric" }, { year: "numeric" }];
    let newDate = new Date(date);

    function format(options: any) {
      let formatter = new Intl.DateTimeFormat("en", options);
      return formatter.format(newDate);
    }
    return options.map(format).join(", ");
  }

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const nullbtnbgfocus = useColorModeValue({ bg: "none" }, { bg: "none" });

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      borderRadius="10"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      fontFamily={font_family}
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
        <Input
          placeholder="Input Search"
          mr="2"
          w="50%"
          value={searchTerm}
          variant="flushed"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Box>
          <Button
            onClick={handleSearch}
            variant="outline"
            fontSize={12}
            py="1"
            px="3"
            mr="2"
          >
            <Flex alignItems="center" gap="1" justifyContent="center">
              <Icon as={MdSearch} w={5} h={5} color={"primary.600"} />
              Search
            </Flex>
          </Button>
          <Button
            onClick={cancelSearch}
            _active={nullbtnbgfocus}
            _focus={nullbtnbgfocus}
            variant="homeWhite"
            py="4"
            px="2"
          >
            <Icon as={MdCancel} w={5} h={5} color={textColorSecondary} />
          </Button>
        </Box>

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
                      <Text color={textColor} fontSize="sm" fontWeight="400">
                        ${formatPrice(cell.value?.amount)}
                      </Text>
                    );
                  } else if (cell.column.Header === "STATUS") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "active"
                              ? "green.500"
                              : cell.value === "past_due"
                              ? "orange.500"
                              : cell.value === "canceled" || "trialing"
                              ? "red.500"
                              : null
                          }
                          as={
                            cell.value === "active"
                              ? MdCheckCircle
                              : cell.value === "canceled" || "trialing"
                              ? MdCancel
                              : cell.value === "past_due"
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text
                          color={
                            cell.value === "active"
                              ? "green.500"
                              : cell.value === "past_due"
                              ? "red.500"
                              : cell.value === "canceled" || "trialing"
                              ? "red.500"
                              : null
                          }
                          fontSize="sm"
                          fontWeight="400"
                        >
                          {cell.value.toUpperCase()}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="400">
                        {formatDate(cell.value)}
                      </Text>
                    );
                  } else if (cell.column.Header === "PAYMENT") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="400">
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
      <Flex justifyContent="space-between" alignItems="center" px="25px">
        <Box>
          <Button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            bg={nullbtnbgfocus}
            mr="2"
          >
            {"<<"}
          </Button>
          <Button
            onClick={previousPage}
            bg={nullbtnbgfocus}
            disabled={!canPreviousPage}
            mr="2"
          >
            {"<"}
          </Button>
          <Button
            onClick={nextPage}
            bg={nullbtnbgfocus}
            disabled={!canNextPage}
            mr="2"
          >
            {">"}
          </Button>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            bg={nullbtnbgfocus}
          >
            {">>"}
          </Button>
        </Box>
        <Box>
          <Text as="span" mr="2">
            Page
          </Text>
          <Input
            type="number"
            variant="flushed"
            min={1}
            max={pageOptions.length}
            value={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            w="40px"
            mr="2"
          />
          <Text as="span" mr="2">
            of {pageOptions.length}
          </Text>
          {/* <Select
            value={pageSize}
            variant="flushed"
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            w="100%"
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </Select> */}
        </Box>
      </Flex>
    </Card>
  );
}
