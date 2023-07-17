// Chakra imports
import {
  Box,
  Flex,
  Card,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
  Input,
  Select,
} from "@chakra-ui/react";
// Custom components
import { useEffect, useState } from "react";

type Props = {
  performance_ssss?: Array<any>;
  survey_Id: number;
  handleform?: any;
  value?: any;
  [x: string]: any;
};

export default function PercormanceCard(props: Props) {
  const { performance_ssss, handleform, value, survey_Id, ...rest } = props;

  // variables
  const [lidar, setLidar] = useState(2);
  const [multibeam, setMultibeam] = useState(1);
  const [scan, setScan] = useState(3);
  const [acoustic, setAcoustic] = useState(4);

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  const [mounted, setMounted] = useState(false);
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
      <Grid templateColumns="repeat(9, 1fr)" gap="1" py="3">
        <GridItem colSpan={5} h="10">
          <Text fontSize="large" fontWeight="bold" textTransform="uppercase">
            Performance of{" "}
            {survey_Id == lidar
              ? "Lidars"
              : survey_Id == multibeam
              ? "MBESs  "
              : survey_Id == scan
              ? "SSSs"
              : "Cameras"}
          </Text>
        </GridItem>
        {array.map((item, index) => (
          <GridItem colSpan={1} h="10" key={index}>
            <Text fontSize="sm" fontWeight="bold">
              {survey_Id == lidar
                ? `Lidar ${item}`
                : survey_Id == multibeam
                ? `MBES ${item}`
                : survey_Id == scan
                ? `SL ${item}`
                : `AC ${item}`}
            </Text>
          </GridItem>
        ))}
      </Grid>

      <Flex>
        <Box pt="2" w="300px">
          <Flex flexDir="column">
            {Object.keys(performance_ssss[0]).map((attr: any, index) => (
              <GridItem colSpan={5} h="10" key={attr + index}>
                <Text fontSize="sm">{formattedString(attr)}</Text>
              </GridItem>
            ))}
          </Flex>
        </Box>
        <Box w="250px">
          <Grid templateColumns="repeat(8, 1fr)" gap="1">
            {performance_ssss.map((ss, index) => (
              <>
                <GridItem colSpan={2}>
                  {Object.keys(ss).map((attr, ind) => (
                    <>
                      {ss[attr].type === "number" && (
                        <Input
                          key={attr + ind}
                          w="8"
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
                      {ss[attr].type === "select" && (
                        <Select
                          key={attr + ind}
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
                          {ss[attr].option.map((opt: string, index: number) => (
                            <option value={opt} key={index}>
                              {opt}
                            </option>
                          ))}
                        </Select>
                      )}
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
