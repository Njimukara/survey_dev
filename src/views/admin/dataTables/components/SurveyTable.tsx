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
import { MdDeleteOutline } from "react-icons/md";
import { TableColumn, TableProps } from "../../default/variables/columnsData";
import { useAllSurveysContext } from "contexts/SurveyContext";
import { useRouter } from "next/router";
import { BiLinkExternal } from "react-icons/bi";
import { useReactToPrint } from "react-to-print";
import axiosConfig from "axiosConfig";
import ReusableTable from "views/admin/dataTables/components/Table";

interface survey {
  id: number;
  name: string;
  code: string;
}

const SurveyTable = (props: TableProps) => {
  const { tableData } = props;

  const font_family = "Poppins";

  //   const columns = useMemo(() => columnsData, [columnsData]);
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

  const handleDelete = async (row: any) => {
    const { id, name, created, survey, status } = row?.original;
    let code: string;

    const matchingSurvey = surveys.find(
      (uniqueSurvey: survey) => uniqueSurvey.id === survey
    );

    if (matchingSurvey) {
      code = matchingSurvey.code;
    } else return;

    await axiosConfig
      .delete(`/api/surveys/${code}/${id}/`)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });

    // console.log(row);
    // formatSurveyType
  };

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

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const router = useRouter();

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

  const Tabblecolumns: TableColumn[] = [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "TYPE",
      accessor: "survey",
      Cell: ({ cell: { value } }) => (
        <Text color={textColor} fontSize="sm" fontWeight="400">
          {formatSurveyType(value)}
        </Text>
      ),
    },

    {
      Header: "DOWNLOAD",
      accessor: "download",
      Cell: ({ cell }) => (
        // Custom Cell component for the "Actions" column
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
      ),
    },
    {
      Header: "DATE GENERATED",
      accessor: "created",
      Cell: ({ cell: { value } }) => (
        <Text color={textColor} fontSize="sm" fontWeight="400">
          {formatDate(value)}
        </Text>
      ),
    },
    {
      Header: "Actions", // Customize the column header
      accessor: "id", // Assuming "id" is the unique identifier for each row
      Cell: ({ cell }) => (
        <Flex>
          <Button
            size="xs"
            bg="none"
            _hover={nullbtnbgfocus}
            _focus={nullbtnbgfocus}
            _active={nullbtnbgfocus}
            onClick={() => viewResults(cell)}
          >
            <Icon as={BiLinkExternal} w={5} h={5} color={textColorSecondary} />
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
            <Icon as={MdDeleteOutline} w={5} h={5} color={textColorSecondary} />
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <ReusableTable
        columns={Tabblecolumns}
        data={data}
        searchPlaceholder="Input Search"
        tableName="Survey History"
      />
      <Box display="none">
        {survey && <SurveyResults surveyResult={survey} ref={componentRef} />}
      </Box>
    </>
  );
};

export default SurveyTable;
