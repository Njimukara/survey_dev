import {
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Button,
  Box,
} from "@chakra-ui/react";
import { useMemo, useState, useEffect, useRef } from "react";

import SurveyResults from "pages/admin/survey-results";

// Assets
import { MdDeleteOutline } from "react-icons/md";
import { TableColumn, TableProps } from "../../default/variables/columnsData";
import { useRouter } from "next/router";
import { BiLinkExternal } from "react-icons/bi";
import { useReactToPrint } from "react-to-print";
import axiosConfig from "axiosConfig";
import ReusableTable from "views/admin/dataTables/components/Table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { fetchSurveys } from "redux/surveySlice";

interface survey {
  id: number;
  name: string;
  code: string;
}

const SurveyTable = (props: TableProps) => {
  const { tableData, tableName } = props;

  const dispatch = useDispatch<AppDispatch>();
  const font_family = "Poppins";
  const data = useMemo(() => tableData, [tableData]);
  // const { surveys, getAllSurveys } = useAllSurveysContext();
  const allSurveys = useSelector(
    (state: RootState) => state.reduxStore.surveys
  );
  const { surveys } = allSurveys;
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
    if (!surveys || surveys.length <= 0) {
      dispatch(fetchSurveys());
    }
  }, [dispatch, surveys]);

  const handleDelete = async (row: any) => {
    const { id, survey } = row?.original;
    let code: string;

    const matchingSurvey = surveys?.find(
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
  };

  const textColorSecondary = useColorModeValue("#757575", "white");
  const whiteColor = useColorModeValue("white", "white");
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
    if (!surveys) {
      return "";
    } else {
      surveys.map((survey: survey) => {
        if (survey.id == surveytype) {
          name = survey.name;
        }
      });
      return name;
    }
  };

  const viewResults = (cell: any) => {
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
        <Text fontFamily={font_family} fontSize="sm" fontWeight="400">
          {formatSurveyType(value)}
        </Text>
      ),
    },

    {
      Header: "DOWNLOAD",
      accessor: "download",
      Cell: ({ cell }) => (
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
        <Text fontFamily={font_family} fontSize="sm" fontWeight="400">
          {formatDate(value)}
        </Text>
      ),
    },
    {
      Header: "Actions",
      accessor: "id",
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
        tableName={tableName || "Survey History"}
      />
      <Box display="none">
        {survey && <SurveyResults surveyResult={survey} ref={componentRef} />}
      </Box>
    </>
  );
};

export default SurveyTable;
