// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  // Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
// Custom components
import BarChart from "components/charts/BarChart";
import React, { useEffect, useState } from "react";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
  barChartOptionsDailyTraffic,
} from "variables/charts";
import { MdBarChart } from "react-icons/md";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import Select from "react-select";
import NoData from "layouts/admin/noData";

export default function WeeklyRevenue(props: { [x: string]: any }) {
  const { ...rest } = props;

  const font_family = "Poppins";

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const [surveyHistory, setSurveyHistory] = useState(null);
  const [surveyChartData, setSurveyChartData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [period, setPeriod] = useState(2);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [chatOptions, setChatOptions] = useState(barChartOptionsDailyTraffic);

  const { arrayHistory, getSurveyHistory } = useSurveyHistoryContext();

  const getdates = (date: string, surveyData: string) => {
    const thisMonth = new Date(date).getMonth();
    const surveyDate = new Date(surveyData).getMonth();
  };

  const getMonthlyAnalysis = (surveys: any, month: number) => {
    const surveyCount: any[] = [];
    surveys.forEach((element: any) => {
      const elementArray = element.filter((survey: any) => {
        const surveyDate = new Date(survey.created).getMonth();
        if (surveyDate == month) {
          return survey;
        }
      });
      surveyCount.push(elementArray);
      // console.log(surveyCount);
    });

    let data = getMonthlyData(surveyCount);
    return data;
  };

  const getMonthlyData = (surveyData: any[]) => {
    let data = [];
    let chartdata: { name: string; data: number[] } = {
      name: "Monthly Analysis",
      data: [],
    };

    surveyData.forEach((surveyWeek: any[], index: number) => {
      if (surveyWeek[0]) {
        chartdata.name = surveyWeek[0].survey;
      }
      chartdata.data.push(surveyWeek.length);
    });

    data.push(chartdata);
    // console.log(data);
    return data;
  };

  // const getWeeklyAnalysis = (surveys: any) => {
  //   const surveyCounts = [];

  //   for (let month = 0; month < 12; month++) {
  //     const surveyCount: number[] = [];

  //     surveys.forEach((element: any) => {
  //       const elementArray = element.filter((survey: any) => {
  //         const surveyDate = new Date(survey.created);
  //         return surveyDate.getMonth() === month;
  //       });

  //       surveyCount.push(elementArray.length);
  //     });

  //     surveyCounts.push(surveyCount);
  //   }

  //   console.log(surveyCounts);
  // };

  const getWeeklyAnalysis = (surveys: any, month: number) => {
    const allWeeksCounts = [];
    // const thisMonth = 5; // Assuming you want to get survey counts for May (month 5)

    for (let week = 1; week <= 5; week++) {
      const weekStart = new Date(2023, month, week * 7 - 6);
      const weekEnd = new Date(2023, month, week * 7);

      const weekCounts: any[] = [];
      surveys.forEach((element: any) => {
        const surveysInWeek = element.filter((survey: any) => {
          const surveyDate = new Date(survey.created);
          return surveyDate >= weekStart && surveyDate <= weekEnd;
        });
        const surveyCount = surveysInWeek;
        weekCounts.push(surveyCount);
      });

      allWeeksCounts.push(weekCounts);
    }

    let data = formatData(allWeeksCounts);
    return data;
  };

  const formatData = (surveyData: any[]) => {
    const data: any[] = [];

    surveyData.forEach((surveyWeek: any[], index: number) => {
      const chartdata: { name: string; data: number[] } = {
        name: `Week ${index + 1}`,
        data: [],
      };

      surveyWeek.forEach((survey: any) => {
        chartdata.data.push(survey.length);
      });

      data.push(chartdata);
    });

    return data;
  };

  useEffect(() => {
    if (!arrayHistory) {
      getSurveyHistory().catch((error: any) => {
        // Handle error
        console.error("Failed to fetch survey history:", error);
      });
    } else {
      setSurveyHistory(arrayHistory);
      let date = new Date().getMonth();
      let chart = getMonthlyAnalysis(arrayHistory, date);
      setCurrentMonth(date);
      setSurveyChartData(chart);
    }
  }, [arrayHistory, getSurveyHistory]);

  const options = [
    { value: 1, label: "Weekly Analysis" },
    { value: 2, label: "Monthly Analysis" },
  ];

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
    setCurrentMonth(e.value);
    if (period == 2) {
      let chart = getMonthlyAnalysis(arrayHistory, e.value);
      setSurveyChartData(chart);
      setChatOptions(barChartOptionsDailyTraffic);
    } else {
      let chart = getWeeklyAnalysis(arrayHistory, e.value);
      setSurveyChartData(chart);
      setChatOptions(barChartOptionsConsumption);
    }
  };

  const handleChange = (e: any) => {
    setSelectedOption(e);
    setPeriod(e.value);
    if (arrayHistory && e.value == 1) {
      let chart = getWeeklyAnalysis(arrayHistory, currentMonth);
      setSurveyChartData(chart);
      setChatOptions(barChartOptionsConsumption);
    } else if (arrayHistory && e.value == 2) {
      let chart = getMonthlyAnalysis(arrayHistory, currentMonth);
      setSurveyChartData(chart);
      setChatOptions(barChartOptionsDailyTraffic);
    }
  };

  return (
    <Card w="100%" {...rest}>
      <Flex
        align="center"
        justifyContent="space-between"
        w="100%"
        px="15px"
        py="10px"
        fontFamily={font_family}
      >
        {/* <Text
            me="auto"
            color={textColor}
            fontSize="xl"
            fontWeight="700"
            lineHeight="100%"
          >
            Monthly Analysis
          </Text> */}
        <Select
          defaultValue={selectedOption}
          onChange={(e: any) => handleChange(e)}
          options={options}
        />
        <Select
          defaultValue={currentMonth}
          onChange={(e: any) => changeMonth(e)}
          options={monthOptions}
        />

        <Button
          alignItems="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w="37px"
          h="37px"
          lineHeight="100%"
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
        </Button>
      </Flex>

      <Box h="260px" mt="auto">
        {surveyChartData && surveyChartData.length > 0 ? (
          <BarChart chartData={surveyChartData} chartOptions={chatOptions} />
        ) : (
          <NoData
            title="No survey history data"
            bg="transparent"
            border="none"
            boxShadow="none"
          />
        )}
      </Box>
    </Card>
  );
}
