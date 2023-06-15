// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Card,
  Grid,
  GridItem,
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
import PerformanceSurvey from "./PerformanceSurvey";

const formFields = [
  {
    survey: "",
    label: "",
    name: "",
  },
];

type Props = {
  performance_ssss?: Array<any>;
  surveyID: number;
  handleform?: any;
  [x: string]: any;
};

export default function PercormanceCard(props: Props) {
  const { performance_ssss, handleform, surveyID, ...rest } = props;

  // variables
  const [lidar, setLidar] = useState(2);
  const [multibeam, setMultibeam] = useState(1);
  const [scan, setScan] = useState(3);
  const [acoustic, setAcoustic] = useState(4);

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

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const array = [1, 2, 3, 4];

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
      <Grid templateColumns="repeat(9, 1fr)" gap="1" py="3">
        <GridItem colSpan={5} h="10">
          <Text fontSize="large" fontWeight="bold" textTransform="uppercase">
            Performance of{" "}
            {surveyID == lidar
              ? "Lidars"
              : surveyID == multibeam
              ? "MBESs  "
              : surveyID == scan
              ? "SSSs"
              : "Cameras"}
          </Text>
        </GridItem>
        {array.map((item, index) => (
          <GridItem colSpan={1} h="10" key={index}>
            <Text fontSize="sm" fontWeight="bold">
              {surveyID == lidar
                ? `Lidar ${item}`
                : surveyID == multibeam
                ? `MBES ${item}`
                : surveyID == scan
                ? `SL ${item}`
                : `AC ${item}`}
            </Text>
          </GridItem>
        ))}
      </Grid>

      {performance_ssss.map((ss, index) => (
        <PerformanceSurvey
          key={ss.key}
          label={ss.label}
          value1={ss.name1}
          nameprefix={ss.nameprefix}
          // value2={`${ss.nameprefix}.${index}.${ss.name2}`}
          // value3={`${ss.nameprefix}.${index}.${ss.name3}`}
          // value4={`${ss.nameprefix}.${index}.${ss.name4}`}
          handleform={handleform}
          size="xs"
          name="maxRange"
        />
      ))}
    </Card>
  );
}
