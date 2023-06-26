// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Card,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
import LidarCard from "./LidarCard";
import ParameterCard from "./SurveyParameters";

export default function Parameters(props: { [x: string]: any }) {
  const { results, surveyID, ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("navy.500", "white");
  const whiteText = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const textColordark = useColorModeValue("black", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("primary.500", "blue.300");
  const bgHover = useColorModeValue(
    { bg: "primary.600" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "primary.600" },
    { bg: "whiteAlpha.100" }
  );

  // variables
  const [lidar, setLidar] = useState(2);
  const [multibeam, setMultibeam] = useState(1);
  const [scan, setScan] = useState(3);
  const [acoustic, setAcoustic] = useState(4);

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const array = [1, 2, 3, 4];

  const formattedString = (inputString: string) => {
    return inputString
      .replace(/^.*?\./, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Card
      justifyContent="center"
      flexDirection="column"
      w="100%"
      mb="0px"
      p="6"
      borderRadius={10}
      {...rest}
    >
      <Text py="2" fontSize="md" fontWeight="bold" textTransform="uppercase">
        Determination of Parameters
      </Text>

      {results &&
        Object.entries(results).map(([keys, values]: any) => (
          <ParameterCard
            key={keys}
            label={formattedString(keys)}
            size="xs"
            value1={values}
            value2={values}
            value3={values}
            value4={values}
          />
        ))}

      {/* {surveyID == lidar && (
        <>
          <ParameterCard
            label="Swath Width (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Ratio Swath/Height-distance"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Max slant range (m))*"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Interprofit Spacing (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Diameter of a footprint (cm)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Range resolution (cm)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Range Uncertainty (mm)*"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Horizontal Uncertainty (cm) - 1σ"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Vertical Uncertainty (cm) - 1σ"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="LiDAR points density (pts/m2)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Number of profiles in length"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
        </>
      )}

      {(surveyID == scan || surveyID == acoustic) && (
        <>
          <ParameterCard
            label="Width of the Image (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Ratio of Image Width/Altitude"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Range Uncertainty (mm)*"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Max Slant range (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Line spacing - 50% of overlap (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Line spacing - 25% of overlap (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Line spacing - 10% of overlap (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Along track resolution R1 (cm)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Accross track resolution R1 (cm)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Along track resolution R2 (cm)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Accross track resolution R2 (cm)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Uncertainty in XY of vector-USBL (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Max ping rate (Hz)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
        </>
      )}

      {surveyID == multibeam && (
        <>
          <ParameterCard
            label="Number of profiles in lenght"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Survey time (h)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Along track resolution (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Accross track resolution (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Along track beams repartition (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Accross track beams repartition (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="THU - 1 lampda (m)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
        </>
      )}

      {surveyID == acoustic && (
        <>
          <ParameterCard
            label="Coverage rate in profile (%)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
          <ParameterCard
            label="Depression angle (*)"
            size="xs"
            value1={0.02}
            value2={0.2}
            value3={0.22}
            value4={0.32}
          />
        </>
      )} */}
    </Card>
  );
}
