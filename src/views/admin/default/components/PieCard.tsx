// Chakra imports
import { Box, Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
import { useEffect, useState, useCallback, useMemo } from "react";
// Custom components
import Card from "components/card/Card";
import PieChart from "components/charts/PieChart";
// import { pieChartData, pieChartOptions } from "variables/charts";
import { VSeparator } from "components/separator/Separator";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";
import Select from "react-select";
import { ApexOptions } from "apexcharts";

type ApexGeneric = ApexOptions & any;

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
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const bgHover = useColorModeValue(
    { bg: "primary.700", color: "white" },
    { bg: "primary.700", color: "secondaryGray.900" }
  );

  const { mergedCompanyHistory } = useSurveyHistoryContext();

  const [pieData, setPieData] = useState();
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

  const groupSurveysByTimePeriod = (
    surveys: any,
    timePeriod: string,
    year: number,
    month?: number
  ) => {
    const groups: any[] = [];
    switch (timePeriod) {
      case "week":
        for (let week = 1; week <= 5; week++) {
          const weekStart = new Date(year, month || 0, week * 7 - 6);
          const weekEnd = new Date(year, month || 0, week * 7);
          // const weekSurveys = surveys.map((element: any) =>
          const weekSurveys = surveys.filter((survey: any) => {
            const surveyDate = new Date(survey.created);
            return surveyDate >= weekStart && surveyDate <= weekEnd;
          });
          // );

          groups.push(getSurveyCountsByUser(weekSurveys));
        }
        break;
      case "month":
        for (let month = 0; month <= 11; month++) {
          const monthStart = new Date(year, month, 1);
          const monthEnd = new Date(year, month + 1, 0);
          // const monthSurveys = surveys.map((element: any) =>
          const monthSurveys = surveys.filter((survey: any) => {
            const surveyDate = new Date(survey.created);
            return surveyDate >= monthStart && surveyDate <= monthEnd;
          });
          // );

          groups.push(getSurveyCountsByUser(monthSurveys));
        }
        break;
      case "year":
        const yearStart = new Date(year, 0, 1);
        const yearEnd = new Date(year, 11, 31);
        // const yearSurveys = surveys.map((element: any) =>
        const yearSurveys = surveys.filter((survey: any) => {
          const surveyDate = new Date(survey.created);
          return surveyDate >= yearStart && surveyDate <= yearEnd;
        });
        // );
        groups.push(getSurveyCountsByUser(yearSurveys));
        break;
      default:
        throw new Error(`Invalid time period: ${timePeriod}`);
    }

    // const merged = groups.flat(1);
    const labels = groups[0].map((item: any) => item?.count?.name);
    const counts = groups[0].map((item: any) => item?.count?.count);

    pieChartOptions.labels = labels;

    const newColors = [];
    for (let i = 0; i < labels.length; i++) {
      newColors.push(generateRandomColor());
    }

    pieChartOptions.colors = newColors;
    return { labels, counts };

    // const labels = useMemo(
    //   () => groups[0].map((item: any) => item?.count?.name),
    //   [groups]
    // );
    // const counts = useMemo(
    //   () => groups[0].map((item: any) => item?.count?.count),
    //   [groups]
    // );
    // return merged;
  };

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
    [mergedCompanyHistory, period, year, month, getAnalysis]
  );

  useEffect(() => {
    console.log("usememo", data);
    let month = new Date().getMonth();
    setMonth(month);
  }, []);

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
          <Button
            color={period === "week" ? "white" : "black"}
            bg={period === "week" ? "primary.600" : "#F7F7FC"}
            _hover={bgHover}
            mr="1"
            onClick={() => setPeriod("week")}
          >
            Week
          </Button>
          <Button
            color={period === "month" ? "white" : "black"}
            bg={period === "month" ? "primary.600" : "#F7F7FC"}
            _hover={bgHover}
            mr="1"
            onClick={() => setPeriod("month")}
          >
            Month
          </Button>
          <Button
            _hover={bgHover}
            color={period === "year" ? "white" : "black"}
            bg={period === "year" ? "primary.600" : "#F7F7FC"}
            onClick={() => setPeriod("year")}
          >
            Year
          </Button>
        </Box>
      </Flex>

      {data && (
        <PieChart
          h="100%"
          w="100%"
          // chartData={pieChartData}
          chartData={data.counts}
          chartOptions={pieChartOptions}
        />
      )}
      {/* <Card
        bg={cardColor}
        flexDirection="row"
        justifyContent="space-evenly"
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="20px"
        mt="15px"
        mx="auto"
      >
        <Flex direction="column" py="5px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="brand.500" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              User 1
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            8%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "20px", xl: "20px", "2xl": "20px" }} />
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#6AD2FF" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              User 2
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            10%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "20px", xl: "20px", "2xl": "20px" }} />
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#6AD2FF" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              User 3
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            12%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "20px", xl: "20px", "2xl": "20px" }} />
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#6AD2FF" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              User 4
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            14%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "20px", xl: "20px", "2xl": "20px" }} />
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#6AD2FF" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              User 5
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            12%
          </Text>
        </Flex>
      </Card> */}
    </Card>
  );
}
