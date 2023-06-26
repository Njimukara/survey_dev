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
  Input,
  Select,
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
  value?: any;
  [x: string]: any;
};

export default function PercormanceCard(props: Props) {
  const { performance_ssss, handleform, value, surveyID, ...rest } = props;

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
  const [labels, setLabels] = useState([]);
  const array = [1, 2, 3, 4];

  const formattedString = (inputString: string) => {
    return inputString
      .replace(/^.*?\./, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  };

  useEffect(() => {
    console.log("form in component", value);
    console.log("form in component", performance_ssss);
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

      <Flex>
        <Box pt="2" w="300px">
          <Flex flexDir="column">
            {Object.keys(performance_ssss[0]).map((attr: any) => (
              <GridItem colSpan={5} h="10" key={attr}>
                <Text fontSize="sm">{formattedString(attr)}</Text>
              </GridItem>
            ))}
          </Flex>
        </Box>
        <Box w="200px">
          <Grid templateColumns="repeat(8, 1fr)" gap="1">
            {performance_ssss.map((ss, index) => (
              <>
                <GridItem colSpan={2}>
                  {Object.keys(ss).map((attr) => (
                    <>
                      {ss[attr].type === "number" && (
                        <Input
                          key={attr}
                          h="10"
                          name={`${index}.${attr}`}
                          color={textColorSecondary}
                          fontSize="sm"
                          variant="flushed"
                          size="sm"
                          type="number"
                          placeholder="0.02"
                          value={
                            value && value[index] ? value[index][attr] : ""
                          }
                          onChange={handleform}
                        />
                      )}
                      {
                        ss[attr].type === "select" && (
                          <Select
                            onChange={handleform}
                            name={`${index}.${attr}`}
                            size="xs"
                            h="10"
                            fontSize="xs"
                            variant="flushed"
                            value={
                              value && value[index] ? value[index][attr] : ""
                            }
                          >
                            {ss[attr].option.map(
                              (opt: string, index: number) => (
                                <option value={opt} key={index}>
                                  {opt}
                                </option>
                              )
                            )}
                          </Select>
                        )

                        // <Input
                        //   key={attr}
                        //   h="10"
                        //   name={`${index}.${attr}`}
                        //   color={textColorSecondary}
                        //   fontSize="sm"
                        //   variant="flushed"
                        //   size="sm"
                        //   type="number"
                        //   placeholder="0.02"
                        //   value={
                        //     value && value[index] ? value[index][attr] : ""
                        //   }
                        //   onChange={handleform}
                        // />
                      }
                    </>
                  ))}
                </GridItem>
              </>
            ))}
          </Grid>
        </Box>
      </Flex>
    </Card>
  );
}
