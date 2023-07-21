// Chakra imports
import { Box, Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
import { useEffect, useState, useCallback, useMemo } from "react";
// Custom components
import Card from "components/card/Card";
import PieChart from "components/charts/PieChart";
// import { pieChartData, pieChartOptions } from "variables/charts";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import Select from "react-select";
import { ApexOptions } from "apexcharts";
import DonutChart from "components/charts/DonutChart";

type ApexGeneric = ApexOptions & any;

interface DonutChartData {
  name: string;
  count: number;
}

interface SurveyCountByUser {
  userId: string;
  name: string;
  count: number;
}
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
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val + "%";
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

export default function Conversion(props: { [x: string]: any }) {
  const { companySurvey, ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const bgHover = useColorModeValue(
    { bg: "primary.700", color: "white" },
    { bg: "primary.700", color: "secondaryGray.900" }
  );

  const { getCompanySurvey, mergedCompanyHistory } = useSurveyHistoryContext();

  const [pieData, setPieData] = useState(null);
  const [period, setPeriod] = useState("year");
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());

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

  const changeMonth = (e: any) => {
    setMonth(e.value);
    // let data = getAnalysis(mergedCompanyHistory, period, year, e.value);
    // setPieData(data);
  };

  const getSurveyCountsByUser = (surveys: any) => {
    const surveyCountsByUser: { [userId: string]: DonutChartData } = {};
    surveys.forEach((survey: any) => {
      const userId = survey.user?.id;
      const userName = survey.user?.name;

      if (surveyCountsByUser[userId]) {
        surveyCountsByUser[userId].count++;
      } else {
        surveyCountsByUser[userId] = { name: userName, count: 1 };
      }
    });

    return Object.values(surveyCountsByUser);
  };

  const groupSurveysByTimePeriod = (
    surveys: any[],
    timePeriod: string,
    year: number,
    month?: number
  ): DonutChartData[] => {
    const groups: DonutChartData[] = [];
    switch (timePeriod) {
      case "week":
        for (let week = 1; week <= 5; week++) {
          const weekStart = new Date(year, month || 0, week * 7 - 6);
          const weekEnd = new Date(year, month || 0, week * 7);

          const weekSurveys = surveys.filter((survey: any) => {
            const surveyDate = new Date(survey.created);
            return surveyDate >= weekStart && surveyDate <= weekEnd;
          });

          groups.push(...getSurveyCountsByUser(weekSurveys));
        }
        break;
      case "month":
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        const monthSurveys = surveys.filter((survey: any) => {
          const surveyDate = new Date(survey.created);
          return surveyDate >= monthStart && surveyDate <= monthEnd;
        });

        groups.push(...getSurveyCountsByUser(monthSurveys));
        break;
      case "year":
        const yearStart = new Date(year, 0, 1);
        const yearEnd = new Date(year, 11, 31);

        const yearSurveys = surveys.filter((survey: any) => {
          const surveyDate = new Date(survey.created);
          return surveyDate >= yearStart && surveyDate <= yearEnd;
        });

        groups.push(...getSurveyCountsByUser(yearSurveys));
        break;
      default:
        throw new Error(`Invalid time period: ${timePeriod}`);
    }

    return groups;
  };

  // const getSurveyCountsByUser = (surveys: any) => {
  //   const surveyCountsByUser: any = {};
  //   surveys.forEach((survey: any) => {
  //     const userId = survey.user?.id;
  //     const userName = survey.user?.name;

  //     if (surveyCountsByUser[userId]) {
  //       surveyCountsByUser[userId].count++;
  //     } else {
  //       surveyCountsByUser[userId] = { name: userName, count: 1 };
  //     }
  //   });

  //   return Object.entries(surveyCountsByUser).map(([userId, count]) => ({
  //     userId,
  //     count,
  //   }));
  // };

  // const groupSurveysByTimePeriod = (
  //   surveys: any,
  //   timePeriod: string,
  //   year: number,
  //   month?: number
  // ) => {
  //   const groups: any[] = [];
  //   switch (timePeriod) {
  //     // case "week":
  //     //   const weekStart = new Date(year, month || 0, 3 * 7 - 6);
  //     //   const weekEnd = new Date(year, month || 0, 3 * 7);
  //     //   const weekSurveys = surveys.filter((survey: any) => {
  //     //     const surveyDate = new Date(survey.created);
  //     //     return surveyDate >= weekStart && surveyDate <= weekEnd;
  //     //   });
  //     //   groups.push(getSurveyCountsByUser(weekSurveys));
  //     //   break;

  //     case "month":
  //       const monthStart = new Date(year, month, 1);
  //       const monthEnd = new Date(year, month + 1, 0);
  //       const monthSurveys = surveys.filter((survey: any) => {
  //         const surveyDate = new Date(survey.created);
  //         return surveyDate >= monthStart && surveyDate <= monthEnd;
  //       });
  //       groups.push(getSurveyCountsByUser(monthSurveys));

  //       break;
  //     case "year":
  //       const yearStart = new Date(year, 0, 1);
  //       const yearEnd = new Date(year, 11, 31);
  //       const yearSurveys = surveys.filter((survey: any) => {
  //         const surveyDate = new Date(survey.created);
  //         return surveyDate >= yearStart && surveyDate <= yearEnd;
  //       });
  //       groups.push(getSurveyCountsByUser(yearSurveys));
  //       break;
  //     default:
  //       throw new Error(`Invalid time period: ${timePeriod}`);
  //   }

  //   const labels = groups[0].map((item: any) => item?.count?.name);
  //   const counts = groups[0].map((item: any) => item?.count?.count);

  //   pieChartOptions.labels = labels;

  //   const newColors = [];
  //   for (let i = 0; i < labels.length; i++) {
  //     newColors.push(generateRandomColor());
  //   }

  //   pieChartOptions.colors = newColors;
  //   return { labels, counts };
  // };

  function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const newColor = `rgb(${red}, ${green}, ${blue})`;
    return newColor;
  }

  const getAnalysis = useCallback(
    (surveys: any, timePeriod: string, year: number, month?: number) => {
      const groups = groupSurveysByTimePeriod(surveys, timePeriod, year, month);
      return groups;
    },
    []
  );

  const data = useMemo(
    () => getAnalysis(mergedCompanyHistory, period, year, month),
    [mergedCompanyHistory, period, year, month]
  );

  useEffect(() => {
    // let month = new Date().getMonth();
    // setMonth(month);
    console.log(data);
  }, [data]);

  const CalculatePieWeekData = (cperiod: string) => {
    // let mperiod = 'week'
    // let data = getAnalysis(mergedCompanyHistory, cperiod, year, month);
    // setPieData(data);
    setPeriod(cperiod);
    // console.log("week", data);
  };

  if (companySurvey.length <= 0) {
    return (
      <Card
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        borderRadius="10"
        {...rest}
      >
        <Text color={textColorPrimary} mb="4" fontWeight="bold" fontSize="2xl">
          No user statistics.
        </Text>
      </Card>
    );
  }

  return (
    <Card
      p="20px"
      alignItems="center"
      flexDirection="column"
      w="100%"
      borderRadius="10"
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
        <Select
          defaultValue={month}
          onChange={(e: any) => changeMonth(e)}
          options={monthOptions}
        />

        <Box bg="#F7F7FC" borderRadius="20px" py="1">
          {/* <Button
            color={period === "week" ? "white" : "black"}
            bg={period === "week" ? "primary.600" : "#F7F7FC"}
            _hover={bgHover}
            mr="1"
            onClick={() => {
              setPeriod("week");
              CalculatePieWeekData("week");
            }}
          >
            Week
          </Button> */}
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

      {data && <DonutChart data={data} width={300} height={300} />}

      {/* {data && (
        <PieChart
          h="100%"
          w="100%"
          chartData={data.counts}
          chartOptions={pieChartOptions}
        />
      )} */}
    </Card>
  );
}
