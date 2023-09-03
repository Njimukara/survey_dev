import React, { useEffect, useMemo, useState } from "react";
import {
  Flex,
  Table,
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
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { isWindowAvailable } from "utils/navigation";
import { MdBarChart } from "react-icons/md";

interface TableColumn {
  Header: string;
  accessor: string;
  Cell?: (cellProps: any) => JSX.Element;
  download?: (rowData: any) => void;
}

interface ReusableTableProps {
  columns: TableColumn[];
  data: any[];
  searchPlaceholder: string;
  tableName?: string;
}

export default function ReusableTable({
  columns,
  data,
  tableName,
  searchPlaceholder,
}: ReusableTableProps) {
  const font_family = `'Poppins', sans-serif`;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [isMounted, setIsMounted] = useState(false);

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

  useEffect(() => {
    if (isMounted) return;
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return <></>;

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      borderRadius="10"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      fontFamily={font_family}
    >
      <Flex
        px="25px"
        justify="space-between"
        mb="20px"
        align="center"
        flexDirection={{ sm: "column", md: "row" }}
      >
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
          mb={{ sm: "10px", md: "0" }}
          flexBasis={{ sm: "100%", md: "auto" }}
        >
          {tableName || ""}
        </Text>
        <Input
          type="text"
          placeholder={searchPlaceholder}
          variant="flushed"
          onChange={(e) => setGlobalFilter(e.target.value)}
          w={{ sm: "100%", md: "50%" }}
        />
      </Flex>

      {isWindowAvailable() && (
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
                      fontSize={{ sm: "10px", lg: "16px" }}
                      fontWeight="600"
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
                  {row.cells.map((cell, index) => (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH="30px !important"
                      py="8px"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {/* Render cell content */}
                      {cell.column.Cell ? cell.render("Cell") : cell.value}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt="20px">
        <Button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          mx="2px"
          size="sm"
        >
          {"<<"}
        </Button>{" "}
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          mx="2px"
          size="sm"
        >
          {"<"}
        </Button>{" "}
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          mx="2px"
          size="sm"
        >
          {">"}
        </Button>{" "}
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          mx="2px"
          size="sm"
        >
          {">>"}
        </Button>{" "}
        <Text fontSize="sm" mt="6px">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </Text>
      </Box>
    </Card>
  );
}
