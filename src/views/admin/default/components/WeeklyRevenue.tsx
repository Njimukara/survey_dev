import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import BarChart from "components/charts/BarChart";
import {
  barChartOptionsConsumption,
  barChartOptionsDailyTraffic,
} from "variables/charts";
import { MdBarChart } from "react-icons/md";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import Select from "react-select";
import NoData from "layouts/admin/noData";
import { useAllSurveysContext } from "contexts/SurveyContext";
import DBarChart from "components/charts/DBarChart";

interface SurveyOptions {
  value: number;
  label: string;
}

interface ChatOptions {
  xaxis: {
    categories: string[];
  };
}

interface WeeklyRevenueProps {
  [x: string]: any;
}

const monthOptions: SurveyOptions[] = [
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

const calculateWeeksInMonth = (year: number, month: number): number => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysLeftInFirstWeek = 7 - firstDayOfWeek;

  const weeksInMonth = Math.ceil((daysInMonth - daysLeftInFirstWeek) / 7) + 1;
  return weeksInMonth;
};

// Calculate the start date of a specific week in a given month and year
const getWeekStartDate = (year: number, month: number, week: number): Date => {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = new Date(year, month, (week - 1) * 7 + 1);
  const startDiff = firstDayOfWeek.getDay() - firstDayOfMonth.getDay();
  const startDate = new Date(firstDayOfWeek);
  startDate.setDate(firstDayOfWeek.getDate() - startDiff);
  return startDate;
};

// Calculate the end date of a specific week in a given month and year
const getWeekEndDate = (year: number, month: number, week: number): Date => {
  const startDate = getWeekStartDate(year, month, week);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  return endDate;
};
export default function WeeklyRevenue(props: WeeklyRevenueProps) {
  const { ...rest } = props;

  const font_family: string = "Poppins";

  const textColor: string = useColorModeValue("secondaryGray.900", "white");
  const iconColor: string = useColorModeValue("brand.500", "white");
  const bgButton: string = useColorModeValue(
    "secondaryGray.300",
    "whiteAlpha.100"
  );
  const bgHover: any = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus: any = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const [surveyHistory, setSurveyHistory] = useState<any>(null);
  const [surveyChartData, setSurveyChartData] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<number>(2); // 2 for Monthly Analysis, 1 for Weekly Analysis
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [chatOptions, setChatOptions] = useState<ChatOptions>(
    barChartOptionsDailyTraffic
  );

  const { companySurveyHistory, getSurveyHistory } = useSurveyHistoryContext();
  const { surveys } = useAllSurveysContext();

  const surveyNameMapping: { [key: number]: string } = {};
  surveys?.forEach((survey: any) => {
    surveyNameMapping[survey.id] = survey.name;
  });

  // const getAnalysisData = (
  //   surveys: any[],
  //   analysisType: number,
  //   month: number
  // ) => {
  //   const analysisData: any[][] = [];

  //   for (let i = 0; i < (analysisType === 2 ? 1 : 5); i++) {
  //     const startDate = new Date(2023, month, i * 7 + 1);
  //     const endDate = new Date(2023, month, i * 7 + 7);

  //     const weekData = surveys.map((element: any[]) => {
  //       return element.filter((survey: any) => {
  //         const surveyDate = new Date(survey.created);
  //         return surveyDate >= startDate && surveyDate <= endDate;
  //       });
  //     });

  //     analysisData.push(weekData);
  //   }

  //   return analysisData;
  // };

  // Calculate the number of weeks in a given month and year

  const getAnalysisData = (
    surveys: any[],
    month: number,
    year: number
  ): { label: string; value: number }[] => {
    const analysisData: { label: string; value: number }[] = [];
    const weeksInMonth = calculateWeeksInMonth(year, month);

    // Initialize an array to hold survey counts for each week
    const weekData: number[] = new Array(weeksInMonth).fill(0);

    surveys.forEach((surveyWeek: any[]) => {
      surveyWeek.forEach((survey: any) => {
        const surveyDate = new Date(survey.created);
        if (
          surveyDate.getMonth() === month &&
          surveyDate.getFullYear() === year
        ) {
          const weekNumber = calculateWeekNumber(
            year,
            month,
            surveyDate.getDate()
          );
          if (weekNumber >= 1 && weekNumber <= weeksInMonth) {
            weekData[weekNumber - 1]++;
          }
        }
      });
    });

    // Convert weekData to the desired format
    weekData.forEach((count, index) => {
      const label = `Week ${index + 1}`;
      analysisData.push({ label, value: count });
    });

    return analysisData;
  };

  // Calculate the week number within a month
  const calculateWeekNumber = (
    year: number,
    month: number,
    day: number
  ): number => {
    const firstDayOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    const firstWeekDays = 7 - dayOfWeek;
    return Math.ceil((day + firstWeekDays) / 7);
  };

  // const getMonthlyData = (surveyData: any[]): any[] => {
  //   const data: any[] = [];
  //   const chartData: any = {
  //     name: "Monthly Analysis",
  //     data: [],
  //   };

  //   chartData.data = surveyData.map((surveyWeek: any[]) => {
  //     if (surveyWeek[0]) {
  //       const surveyName = surveyNameMapping[surveyWeek[0].survey];
  //       chatOptions.xaxis.categories.push(surveyName);
  //     }
  //     return surveyWeek.length;
  //   });

  //   data.push(chartData);
  //   return data;
  // };

  // const getMonthlyData = (surveyData: any[], selectedMonth: number): any[] => {
  //   const data: any[] = [];
  //   const chartData: any = {
  //     name: "Monthly Analysis",
  //     data: [],
  //   };

  //   // Collect survey counts for each type
  //   const surveyTypeCounts: Record<string, number> = {};

  //   surveyData.forEach((surveyWeek: any[]) => {
  //     surveyWeek.forEach((survey: any) => {
  //       const surveyDate = new Date(survey.created);
  //       if (surveyDate.getMonth() === selectedMonth) {
  //         const surveyType = surveyNameMapping[survey.survey];
  //         if (surveyType) {
  //           if (surveyTypeCounts[surveyType]) {
  //             surveyTypeCounts[surveyType]++;
  //           } else {
  //             surveyTypeCounts[surveyType] = 1;
  //           }
  //         }
  //       }
  //     });
  //   });

  //   // Populate chart data with survey type counts
  //   for (const surveyType in surveyTypeCounts) {
  //     console.log(surveyType);
  //     if (surveyTypeCounts.hasOwnProperty(surveyType)) {
  //       chartData.data.push(surveyTypeCounts[surveyType]);
  //       chatOptions.xaxis.categories.push(surveyType);
  //     }
  //   }

  //   data.push(chartData);
  //   console.log(data);
  //   return data;
  // };

  const getMonthlyData = (
    surveyData: any[],
    selectedMonth: number
  ): { label: string; value: number }[] => {
    const formattedData: { label: string; value: number }[] = [];

    // Collect survey counts for each type
    const surveyTypeCounts: Record<string, number> = {};

    surveyData.forEach((surveyWeek: any[]) => {
      surveyWeek.forEach((survey: any) => {
        const surveyDate = new Date(survey.created);
        if (surveyDate.getMonth() === selectedMonth) {
          const surveyType = surveyNameMapping[survey.survey];
          if (surveyType) {
            if (surveyTypeCounts[surveyType]) {
              surveyTypeCounts[surveyType]++;
            } else {
              surveyTypeCounts[surveyType] = 1;
            }
          }
        }
      });
    });

    // Populate formatted data with survey type counts
    for (const surveyType in surveyTypeCounts) {
      if (surveyTypeCounts.hasOwnProperty(surveyType)) {
        formattedData.push({
          label: surveyType,
          value: surveyTypeCounts[surveyType],
        });
      }
    }

    return formattedData;
  };

  const formatData = (analysisData: any[][]): any[] => {
    const data: any[] = [];
    chatOptions.xaxis.categories = [];

    analysisData.forEach((weekData, index) => {
      const chartData: any = {
        name: selectedOption === 2 ? "Monthly Analysis" : `Week ${index + 1}`,
        data: [],
      };

      chatOptions.xaxis.categories.push(chartData.name);

      weekData.forEach((surveyData) => {
        chartData.data.push(surveyData.length);
      });

      data.push(chartData);
    });

    return data;
  };

  // const formatMonthlyData = (analysisData: any[]): any[] => {
  //   const data: any[] = [];
  //   chatOptions.xaxis.categories = [];

  //   analysisData.forEach((weekData, index) => {
  //     const chartData: any = {
  //       name: selectedOption === 2 ? "Monthly Analysis" : `Week ${index + 1}`,
  //       data: [],
  //     };

  //     chatOptions.xaxis.categories.push(chartData.name);

  //     for (const surveyType in weekData) {
  //       if (weekData.hasOwnProperty(surveyType)) {
  //         chartData.data.push(weekData[surveyType]);
  //       }
  //     }

  //     data.push(chartData);
  //   });

  //   return data;
  // };

  const formatMonthlyData = (
    analysisData: any[]
  ): { label: string; value: number }[] => {
    const formattedData: { label: string; value: number }[] = [];

    analysisData.forEach((weekData, index) => {
      const dataForWeek: { label: string; value: number } = {
        label: selectedOption === 2 ? "Monthly Analysis" : `Week ${index + 1}`,
        value: 0, // Initialize the value, you can update this according to your data logic
      };

      for (const surveyType in weekData) {
        if (weekData.hasOwnProperty(surveyType)) {
          dataForWeek.value += weekData[surveyType];
        }
      }

      formattedData.push(dataForWeek);
    });

    return formattedData;
  };

  useEffect(() => {
    if (!companySurveyHistory) {
      // Fetch data if needed
    } else {
      setSurveyHistory(companySurveyHistory);

      let barChartData: any[];

      if (selectedOption === 2) {
        barChartData = getMonthlyData(companySurveyHistory, currentMonth);
        setChatOptions(barChartOptionsDailyTraffic);
        // setSurveyChartData(formatMonthlyData(barChartData));
        setSurveyChartData(barChartData);
      } else {
        barChartData = getAnalysisData(
          companySurveyHistory,
          currentMonth,
          currentYear
        );
        setChatOptions(barChartOptionsConsumption);
        console.log(barChartData);
        setSurveyChartData(barChartData);
      }
    }
  }, [companySurveyHistory, selectedOption, currentMonth, currentYear]);

  const handleChange = (e: SurveyOptions) => {
    setSelectedOption(e.value);
  };

  const changeMonth = (e: SurveyOptions) => {
    setCurrentMonth(e.value);
  };

  const options: SurveyOptions[] = [
    { value: 1, label: "Weekly Analysis" },
    { value: 2, label: "Monthly Analysis" },
  ];

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
        <Select
          onChange={handleChange}
          value={options.find((opt) => opt.value === selectedOption)}
          options={options}
          styles={{
            control: (provided) => ({
              ...provided,
              width: "200px",
              borderRadius: "10px",
            }),
          }}
        />

        <Select
          placeholder="Select month"
          defaultValue={monthOptions[currentMonth]}
          onChange={changeMonth}
          options={monthOptions}
          styles={{
            control: (provided) => ({
              ...provided,
              width: "200px",
              borderRadius: "10px",
            }),
          }}
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
          // <BarChart chartData={surveyChartData} chartOptions={chatOptions} />
          <DBarChart data={surveyChartData} />
        ) : (
          <NoData
            title="No company survey data"
            bg="transparent"
            border="none"
            boxShadow="none"
          />
        )}
      </Box>
    </Card>
  );
}
