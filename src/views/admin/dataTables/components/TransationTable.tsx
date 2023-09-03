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
  Input,
  Box,
} from "@chakra-ui/react";
import { useMemo, useState, useEffect, useRef } from "react";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import SurveyResults from "pages/admin/survey-results";

// Assets
import {
  MdCancel,
  MdCheckCircle,
  MdDeleteOutline,
  MdOutlineError,
} from "react-icons/md";
import { TableColumn, TableProps } from "../../default/variables/columnsData";
import { useAllSurveysContext } from "contexts/SurveyContext";
import ReusableTable from "views/admin/dataTables/components/Table";

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const formatPrice = (price: number) => {
  return price / 100;
};

const TransactionTable = (props: TableProps) => {
  const { tableData } = props;
  //   const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const textColor = useColorModeValue("secondaryGray.900", "white");

  const Tabblecolumns: TableColumn[] = [
    {
      Header: "AMOUNT",
      accessor: "plan",
      Cell: ({ cell: { value } }) => (
        <Text color={textColor} fontSize="sm" fontWeight="400">
          ${formatPrice(value?.amount)}
        </Text>
      ),
    },

    {
      Header: "STATUS",
      accessor: "status",
      Cell: ({ cell }) => {
        let data = null;

        if (cell.value === "active") {
          data = (
            <Flex align="center">
              <Icon
                w="24px"
                h="24px"
                me="5px"
                color="green.500"
                as={MdCheckCircle}
              />
              <Text color="green.500" fontSize="sm" fontWeight="400">
                {cell.value.toUpperCase()}
              </Text>
            </Flex>
          );
        } else if (cell.value === "past_due") {
          data = (
            <Flex align="center">
              <Icon
                w="24px"
                h="24px"
                me="5px"
                color="orange.500"
                as={MdOutlineError}
              />
              <Text color="orange.500" fontSize="sm" fontWeight="400">
                {cell.value.toUpperCase()}
              </Text>
            </Flex>
          );
        } else if (cell.value === "canceled" || cell.value === "trialing") {
          data = (
            <Flex align="center">
              <Icon w="24px" h="24px" me="5px" color="red.500" as={MdCancel} />
              <Text color="red.500" fontSize="sm" fontWeight="400">
                {cell.value.toUpperCase()}
              </Text>
            </Flex>
          );
        }

        return data;
      },
    },
    {
      Header: "DATE",
      accessor: "start_date",
      Cell: ({ cell: { value } }) => (
        <Text color={textColor} fontSize="sm" fontWeight="400">
          {formatDate(value)}
        </Text>
      ),
    },
    {
      Header: "PAYMENT", // Customize the column header
      accessor: "payment", // Assuming "id" is the unique identifier for each row
      Cell: ({ cell }) => (
        <Text color={textColor} fontSize="sm" fontWeight="400">
          Stripe Invoice
        </Text>
      ),
    },
  ];

  return (
    <>
      <ReusableTable
        columns={Tabblecolumns}
        data={data}
        searchPlaceholder="Input Search"
        tableName="Transaction History"
      />
    </>
  );
};

export default TransactionTable;
