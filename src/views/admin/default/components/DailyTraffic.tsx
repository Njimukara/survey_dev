// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";
import { useState, useEffect } from "react";

// Custom components
import Card from "components/card/Card";
import { barChartOptionsDailyTraffic } from "variables/charts";

// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";

export default function DailyTraffic(props: { [x: string]: any }) {
  const { ...rest } = props;

  const [surveyHistory, setSurveyHistory] = useState(null);
  const { arrayHistory, getSurveyHistory } = useSurveyHistoryContext();
  const [chartData, setChartData] = useState(null);

  const groupSurveysByDate = (surveys: any) => {
    const surveyCounts = [];

    for (let month = 0; month < 12; month++) {
      const surveyCount: number[] = [];

      surveys.forEach((element: any) => {
        const elementArray = element.filter((survey: any) => {
          const surveyDate = new Date(survey.created);
          return surveyDate.getMonth() === month;
        });

        surveyCount.push(elementArray.length);
      });

      surveyCounts.push(surveyCount);
    }
    setChartData(surveyCounts);

    console.log(surveyCounts);
  };

  const getWeeklyHistory = (surveys: any) => {
    const surveyCounts: number[] = [];
    const thisMonth = 5; // Assuming you want to get survey counts for May (month 5)

    for (let week = 1; week <= 5; week++) {
      const weekStart = new Date(2023, thisMonth, week * 7 - 6);
      const weekEnd = new Date(2023, thisMonth, week * 7);
      console.log(weekStart, weekEnd);

      surveys.forEach((element: any) => {
        const surveysInWeek = element.filter((survey: any) => {
          const surveyDate = new Date(survey.created);
          return surveyDate >= weekStart && surveyDate <= weekEnd;
        });
        const surveyCount = surveysInWeek.length;
        surveyCounts.push(surveyCount);
      });
    }

    console.log(surveyCounts);
  };

  useEffect(() => {
    if (!arrayHistory) {
      getSurveyHistory().catch((error: any) => {
        // Handle error
        console.error("Failed to fetch survey history:", error);
      });
    } else {
      setSurveyHistory(arrayHistory);
      groupSurveysByDate(arrayHistory);
      getWeeklyHistory(arrayHistory);
    }
  }, [arrayHistory, getSurveyHistory]);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card
      alignItems="center"
      flexDirection="column"
      w="100%"
      borderRadius="10"
      {...rest}
    >
      <Flex justify="space-between" align="start" px="10px" pt="5px" w="100%">
        <Flex flexDirection="column" align="start" me="20px">
          <Text color="secondaryGray.600" fontSize="md" mb="5" fontWeight="500">
            Survey Monthly Analysis
          </Text>
          <Flex align="end">
            <Text
              color={textColor}
              fontSize="34px"
              fontWeight="700"
              lineHeight="100%"
            >
              23
            </Text>
            <Text
              ms="6px"
              color="secondaryGray.600"
              fontSize="sm"
              fontWeight="500"
            >
              Survey(s)
            </Text>
          </Flex>
        </Flex>
        {/* <Flex align='center' mt='4px'>
          <Icon as={RiArrowUpSFill} color='green.500' />
          <Text color='green.500' fontSize='sm' fontWeight='700'>
            +2.45%
          </Text>
        </Flex> */}
      </Flex>
      <Box h="240px" w="80%" mt="auto">
        <BarChart
          chartData={chartData}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </Box>
    </Card>
  );
}
