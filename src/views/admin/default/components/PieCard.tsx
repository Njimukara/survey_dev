// Chakra imports
import { Box, Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
import { useEffect, useState, useCallback, useMemo } from "react";
// Custom components
import Card from "components/card/Card";
import PieChart from "components/charts/PieChart";
// import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import Select from "react-select";
import { ApexOptions } from "apexcharts";
import NoData from "layouts/admin/noData";

type ApexGeneric = ApexOptions & any;

const defaultColors = [
  "#C478FF",
  "#0096FF",
  "#301934",
  "#00A92F",
  "#3A2FB7",
  "#FFC300",
  "#4CAF50",
  "#E91E63",
  "#9C27B0",
];

const pieChartOptions: ApexGeneric = {
  labels: ["User 1", "User 2", "User 3", "User 4", "User 5"],
  colors: [],
  chart: {
    type: "donut",
  },
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "14px",
    fontFamily: "Poppins",
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toFixed(2) + "%";
    },
  },
  hover: { mode: true },
  plotOptions: {
    pie: {
      expandOnClick: true,
      donut: {
        size: "60%",
        labels: {
          show: false,
        },
      },
    },
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

const monthOptions = [
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" },
];

export default function Conversion(props: { [x: string]: any }) {
  const { companySurvey, loading, ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const bgHover = useColorModeValue(
    { bg: "primary.700", color: "white" },
    { bg: "primary.700", color: "secondaryGray.900" }
  );

  // const { mergedCompanyHistory } = useSurveyHistoryContext();

  const [period, setPeriod] = useState("year");
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const changeMonth = (e: any) => {
    setMonth(e.value);
  };

  const getSurveyCountsByUser = (surveys: any) => {
    const surveyCountsByUser: any = {};
    surveys.forEach((survey: any) => {
      const userId = survey.user?.id;
      const userName = survey.user?.name;

      if (surveyCountsByUser[userId]) {
        surveyCountsByUser[userId].count++;
      } else {
        surveyCountsByUser[userId] = { name: userName, count: 1 };
      }
    });

    return Object.entries(surveyCountsByUser).map(([userId, count]) => ({
      userId,
      count,
    }));
  };

  const groupSurveysByTimePeriod = useCallback(
    (surveys: any, timePeriod: string, year: number, month?: number) => {
      const groups: any[] = [];
      if (surveys && surveys.length > 0) {
        switch (timePeriod) {
          case "month":
            const monthStart = new Date(year, month, 1);
            const monthEnd = new Date(year, month + 1, 0);
            const monthSurveys = surveys.filter((survey: any) => {
              const surveyDate = new Date(survey.created);
              return surveyDate >= monthStart && surveyDate <= monthEnd;
            });
            groups.push(getSurveyCountsByUser(monthSurveys));

            break;
          case "year":
            const yearStart = new Date(year, 0, 1);
            const yearEnd = new Date(year, 11, 31);
            const yearSurveys = surveys.filter((survey: any) => {
              const surveyDate = new Date(survey.created);
              return surveyDate >= yearStart && surveyDate <= yearEnd;
            });
            groups.push(getSurveyCountsByUser(yearSurveys));
            break;
          default:
            throw new Error(`Invalid time period: ${timePeriod}`);
        }

        const labels = groups[0].map((item: any) => item?.count?.name);
        const counts = groups[0].map((item: any) => item?.count?.count);

        pieChartOptions.labels = labels;

        const newColors = defaultColors.slice(0, labels.length);

        pieChartOptions.colors = newColors;
        return { labels, counts };
      }
    },
    []
  );

  const getAnalysis = useCallback(
    (surveys: any, timePeriod: string, year: number, month?: number) => {
      const groups = groupSurveysByTimePeriod(surveys, timePeriod, year, month);
      return groups;
    },
    [groupSurveysByTimePeriod]
  );

  const data = useMemo(
    () => getAnalysis(companySurvey, period, year, month),
    [getAnalysis, companySurvey, period, year, month]
  );

  const CalculatePieWeekData = (cperiod: string) => {
    setPeriod(cperiod);
  };

  if (!companySurvey) {
    return <NoData title="No user statistics" />;
  }

  if (companySurvey && companySurvey.length <= 0) {
    return <NoData title="No user statistics" />;
  }

  return (
    <Card
      border="1px solid"
      borderColor="rgba(0, 0, 0, 0.11)"
      p="20px"
      alignItems="center"
      flexDirection="column"
      w="100%"
      borderRadius="10"
      fontFamily="Poppins"
      {...rest}
    >
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          User Usage
        </Text>
        {period == "month" && (
          <Select
            defaultValue={month}
            onChange={(e: any) => changeMonth(e)}
            options={monthOptions}
            styles={{
              control: (provided) => ({
                ...provided,
                width: "200px",
                borderRadius: "10px",
              }),
            }}
          />
        )}

        <Box bg="#F7F7FC" borderRadius="20px" py="1">
          <Button
            color={period === "month" ? "white" : "black"}
            bg={period === "month" ? "primary.600" : "#F7F7FC"}
            _hover={bgHover}
            mr="1"
            onClick={() => {
              setPeriod("month");
              CalculatePieWeekData("month");
            }}
          >
            Month
          </Button>
          <Button
            _hover={bgHover}
            color={period === "year" ? "white" : "black"}
            bg={period === "year" ? "primary.600" : "#F7F7FC"}
            onClick={() => {
              setPeriod("year");
              CalculatePieWeekData("year");
            }}
          >
            Year
          </Button>
        </Box>
      </Flex>

      {data && (
        <PieChart
          h="100%"
          w="100%"
          chartData={data.counts}
          chartOptions={pieChartOptions}
        />
      )}
    </Card>
  );
}
