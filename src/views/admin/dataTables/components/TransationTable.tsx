import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { useMemo } from "react";

// Assets
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineError,
  MdTimer,
} from "react-icons/md";
import { TableColumn, TableProps } from "../../default/variables/columnsData";
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
  const font_family = "Poppins";

  if (!tableData) {
    // You can return a loading indicator or an appropriate message here
    return <div>Loading...</div>;
  }
  const Tabblecolumns: TableColumn[] = [
    {
      Header: "AMOUNT",
      accessor: "plan",
      Cell: ({ cell: { value } }) => (
        <Text fontSize="sm" fontWeight="400" fontFamily={font_family}>
          ${formatPrice(value?.amount)}
        </Text>
      ),
    },

    {
      Header: "STATUS",
      accessor: "status",
      Cell: ({ cell }) => {
        let data = null;

        if (cell.value === "active" || cell.value === "trialing") {
          data = (
            <Flex align="center">
              <Icon
                w="24px"
                h="24px"
                me="5px"
                color="green.500"
                as={MdCheckCircle}
              />
              <Text
                color="green.500"
                fontSize="sm"
                fontWeight="400"
                fontFamily={font_family}
              >
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
              <Text
                color="orange.500"
                fontSize="sm"
                fontWeight="400"
                fontFamily={font_family}
              >
                {cell.value.toUpperCase()}
              </Text>
            </Flex>
          );
        } else if (cell.value === "canceled") {
          data = (
            <Flex align="center">
              <Icon w="24px" h="24px" me="5px" color="red.500" as={MdCancel} />
              <Text
                color="red.500"
                fontSize="sm"
                fontWeight="400"
                fontFamily={font_family}
              >
                {cell.value.toUpperCase()}
              </Text>
            </Flex>
          );
        } else {
          data = (
            <Flex align="center">
              <Icon w="24px" h="24px" me="5px" color="red.500" as={MdTimer} />
              <Text
                color="red.500"
                fontSize="sm"
                fontWeight="400"
                fontFamily={font_family}
              >
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
        <Text fontSize="sm" fontWeight="400" fontFamily={font_family}>
          {formatDate(value)}
        </Text>
      ),
    },
    {
      Header: "PAYMENT", // Customize the column header
      accessor: "payment", // Assuming "id" is the unique identifier for each row
      Cell: ({ cell }) => (
        <Text fontSize="sm" fontWeight="400" fontFamily={font_family}>
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
