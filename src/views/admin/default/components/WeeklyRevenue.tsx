import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";

import { MdBarChart } from "react-icons/md";
// import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import Select from "react-select";
import NoData from "layouts/admin/noData";
// import { useAllSurveysContext } from "contexts/SurveyContext";
import ABarChart from "components/charts/ABarChart";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface SurveyOptions {
  value: number;
  label: string;
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

export default function WeeklyRevenue(props: WeeklyRevenueProps) {
  const { companySurvey, ...rest } = props;

  const font_family: string = "Poppins";

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

  const [, setSurveyHistory] = useState<any>(null);
  const [surveyChartData, setSurveyChartData] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<number>(2); // 2 for Monthly Analysis, 1 for Weekly Analysis
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentYear] = useState<number>(new Date().getFullYear());
  const allSurveys = useSelector(
    (state: RootState) => state.reduxStore.surveys
  );
  const { surveys } = allSurveys;
  const [survey, setSurvey] = useState(null);

  const surveyNameMapping = useMemo(() => {
    const mapping: { [key: number]: string } = {};
    if (surveys) {
      console.log(surveys);
      surveys?.forEach((survey: any) => {
        mapping[survey.id] = survey.name;
      });
      return mapping;
    }
    return;
  }, [surveys]);

  const getWeeklyData = (
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

    weekData.forEach((count, index) => {
      const label = `Week ${index + 1}`;
      analysisData.push({ label, value: count });
    });

    return analysisData;
  };

  const getMonthlyData = useCallback(
    (surveyData: any[], selectedMonth: number) => {
      const formattedData: { label: string; value: number }[] = [];

      const surveyTypeCounts: Record<string, number> = {};

      surveyData.forEach((surveyWeek: any[]) => {
        surveyWeek.forEach((survey: any) => {
          const surveyDate = new Date(survey.created);
          if (surveyDate.getMonth() === selectedMonth) {
            const surveyType = surveyNameMapping[survey.survey];
            if (surveyType) {
              surveyTypeCounts[surveyType] =
                (surveyTypeCounts[surveyType] || 0) + 1;
            }
          }
        });
      });

      for (const surveyType in surveyTypeCounts) {
        if (surveyTypeCounts.hasOwnProperty(surveyType)) {
          formattedData.push({
            label: surveyType,
            value: surveyTypeCounts[surveyType],
          });
        }
      }

      return formattedData;
    },
    [surveyNameMapping]
  );

  const getYearlyData = (surveys: any[], year: any) => {
    const analysisData = [];

    // Create a data structure to hold totals for each survey type within each month
    const monthlyTotals: Record<string, Record<string, number>> = {};

    surveys.forEach((surveyWeek: any) => {
      surveyWeek.forEach((survey: any) => {
        const surveyDate = new Date(survey.created);
        if (surveyDate.getFullYear() === year) {
          const month = surveyDate.getMonth();
          const surveyType = surveyNameMapping[survey.survey];
          if (surveyType) {
            if (!monthlyTotals[month]) {
              monthlyTotals[month] = {};
            }
            if (!monthlyTotals[month][surveyType]) {
              monthlyTotals[month][surveyType] = 0;
            }
            monthlyTotals[month][surveyType]++;
          }
        }
      });
    });

    // Convert the monthly totals into the desired format
    for (let month = 0; month < 12; month++) {
      const label = monthOptions[month].label; // Assuming you have an array of month names
      const monthData = monthlyTotals[month] || {};

      // Calculate the total value for this month
      let totalValue = 0;
      for (const surveyType in monthData) {
        if (monthData.hasOwnProperty(surveyType)) {
          totalValue += monthData[surveyType];
        }
      }

      analysisData.push({
        label,
        value: totalValue,
      });
    }

    return analysisData;
  };

  const chartData = useMemo(() => {
    if (!companySurvey || !surveys || surveys.length <= 0) {
      return [];
    }

    if (selectedOption === 2) {
      return getMonthlyData(companySurvey, currentMonth);
    } else if (selectedOption == 1) {
      return getWeeklyData(companySurvey, currentMonth, currentYear);
    } else {
      // Yearly Analysis
      return getYearlyData(companySurvey, selectedYear);
    }
  }, [
    companySurvey,
    selectedOption,
    currentMonth,
    currentYear,
    getMonthlyData,
  ]);

  const handleChange = (e: SurveyOptions) => {
    setSelectedOption(e.value);
  };

  const changeMonth = (e: SurveyOptions) => {
    setCurrentMonth(e.value);
  };

  const options: SurveyOptions[] = [
    { value: 1, label: "Weekly Analysis" },
    { value: 2, label: "Monthly Analysis" },
    { value: 3, label: "Yearly Analysis" },
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

      <Box h="360px" mt="auto">
        {chartData && chartData.length > 0 ? (
          <ABarChart data={chartData} />
        ) : (
          <NoData
            title="No data available for the selected period"
            bg="transparent"
            border="none"
            boxShadow="none"
          />
        )}
      </Box>
    </Card>
  );
}
