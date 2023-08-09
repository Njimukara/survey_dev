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
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
// import html2pdf from "html2pdf.js/dist/html2pdf.min";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import SurveyResults from "pages/admin/survey-results";

// Assets
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdDeleteOutline,
  MdEdit,
  MdLink,
  MdDetails,
  MdOutlineDetails,
  MdMore,
  MdMoreHoriz,
} from "react-icons/md";
import { TableProps } from "../variables/columnsData";
import { useAllSurveysContext } from "contexts/SurveyContext";
import { useRouter } from "next/router";
import { BiLinkExternal } from "react-icons/bi";
import { useReactToPrint } from "react-to-print";
import axiosConfig from "axiosConfig";

interface survey {
  id: number;
  name: string;
  code: string;
}

export default function ColumnsTable(props: TableProps) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const { surveys, getAllSurveys } = useAllSurveysContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [survey, setSurvey] = useState(null);

  const componentRef = useRef();

  function Print(row: any) {
    setSurvey(row?.original);
    setTimeout(() => {
      handlePrint();
    }, 1000);
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (!surveys) {
      getAllSurveys();
    }
  }, [surveys, getAllSurveys]);

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

  const handleDelete = async (row: any) => {
    const { id, name, created, survey, status } = row?.original;
    let code: string;

    if (surveys) {
      surveys.map((uniqueSurvey: survey) => {
        if (uniqueSurvey.id == survey) {
          code = uniqueSurvey.code;
        }
      });
    }

    await axiosConfig
      .delete(`/api/surveys/${code}/${id}/`)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });

    // console.log(row);
    // formatSurveyType
  };

  const router = useRouter();

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const formatSurveyType = (surveytype: number) => {
    let name = "";
    if (surveys) {
      surveys.map((survey: survey) => {
        if (survey.id == surveytype) {
          name = survey.name;
        }
      });
      return name;
    }
  };

  const viewResults = (cell: any) => {
    // console.log(cell.row?.original?.id);
    let result_id = cell.row?.original?.id;
    let survey_id = cell.row?.original?.survey;
    router.push(
      `/admin/history/result/?result_id=${result_id}&survey_id=${survey_id}`
    );
  };

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      borderRadius="10"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      h="max-content"
      max-h="500"
      border="1px solid"
      borderColor="rgba(0, 0, 0, 0.11)"
    >
      <Flex
        data-testid="survey-history-table"
        px="25px"
        justify="space-between"
        mb="10px"
        align="center"
      >
        <Text
          color={textColor}
          fontSize="2xl"
          fontWeight="700"
          lineHeight="100%"
        ></Text>
        <Input
          placeholder="Input Search"
          value={searchTerm}
          w="50%"
          mr="2"
          variant="flushed"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Box>
          <Button onClick={handleSearch} variant="outline" py="3" px="6" mr="2">
            Search
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
        <Button
          size="xs"
          bg={btnbg}
          _hover={nullbtnbgfocus}
          _focus={nullbtnbgfocus}
          _active={nullbtnbgfocus}
          onClick={() => {
            router.push("/admin/survey-history");
          }}
        >
          <Icon as={MdMoreHoriz} w={5} h={5} color={textColorSecondary} />
        </Button>
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
                        {cell.value || "NA"}
                      </Text>
                    );
                  } else if (cell.column.Header === "TYPE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {formatSurveyType(cell.value)}
                      </Text>
                    );
                  } else if (cell.column.Header === "DOWNLOAD") {
                    data = (
                      <Flex align="center">
                        <Button
                          size="xs"
                          bg="#00A92F"
                          py="4"
                          color={whiteColor}
                          borderRadius="7px"
                          fontSize="xs"
                          fontWeight="400"
                          onClick={() => Print(cell.row)}
                          _hover={bgHover}
                          _focus={bgFocus}
                          _active={bgFocus}
                        >
                          Download as PDF
                        </Button>
                      </Flex>
                    );
                  } else if (cell.column.Header === "DATE GENERATED") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {formatDate(cell.value)}
                      </Text>
                    );
                  } else if (cell.column.Header === "ACTIONS") {
                    data = (
                      <Flex>
                        <Button
                          size="xs"
                          bg="none"
                          _hover={nullbtnbgfocus}
                          _focus={nullbtnbgfocus}
                          _active={nullbtnbgfocus}
                          onClick={() => viewResults(cell)}
                        >
                          <Icon
                            as={BiLinkExternal}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                          />
                          {/* {printcell(cell.row?.original?.id)} */}
                        </Button>
                        <Button
                          size="xs"
                          bg="none"
                          _hover={nullbtnbgfocus}
                          _focus={nullbtnbgfocus}
                          _active={nullbtnbgfocus}
                          onClick={() => handleDelete(cell.row)}
                        >
                          <Icon
                            as={MdDeleteOutline}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                          />
                        </Button>
                        {}
                      </Flex>
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
      <Box display="none">
        {survey && <SurveyResults surveyResult={survey} ref={componentRef} />}
      </Box>
    </Card>
  );
}
