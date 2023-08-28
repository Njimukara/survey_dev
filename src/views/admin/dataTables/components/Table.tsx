import React, { useEffect, useMemo, useState } from "react";
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
  Checkbox,
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

import { MdDownload, MdCancel, MdSearch } from "react-icons/md";

interface TableColumn {
  Header: string;
  accessor: string;
  Cell?: (cellProps: any) => JSX.Element;
  download?: (rowData: any) => void; // Function to handle download
}

interface ReusableTableProps {
  columns: TableColumn[];
  data: any[];
  searchPlaceholder: string;
  tableName: string;
}

export default function ReusableTable({
  columns,
  data,
  tableName,
  searchPlaceholder,
}: ReusableTableProps) {
  const font_family = `'Poppins', sans-serif'`;

  // Rest of your styling code
  // ...
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

  // Rest of your rendering logic
  // ...
  // Including header rendering and row rendering
  // ...
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
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {tableName || ""}
        </Text>
        <Menu />
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
                      {/* Render text content */}
                      {cell.column.Cell ? cell.render("Cell") : cell.value}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}

      {/* Rest of your component content */}
      {/* ... */}
    </Card>
  );
}
