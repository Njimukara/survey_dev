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
  const array = [1, 2, 3, 4];

  const formattedString = (inputString: string) => {
    return inputString
      .replace(/^.*?\./, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  };

  return (
    <Card
      justifyContent="center"
      flexDirection="column"
      w="100%"
      mb="0px"
      p="5"
      borderRadius={10}
      {...rest}
    >
      <Flex gap="2">
        <Box w="300px">
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
        </Box>
        <Box w="300px">
          <Grid templateColumns="repeat(8, 1fr)" gap="1">
            {array.map((item, index) => (
              <GridItem colSpan={1} h="10" w="50px" key={index}>
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
        </Box>
      </Flex>
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
        <Box w="300px">
          <Grid templateColumns="repeat(8, 1fr)" gap="1">
            {performance_ssss.map((ss, index) => (
              <>
                <GridItem colSpan={2}>
                  {Object.keys(ss).map((attr, ind) => (
                    <>
                      <Input
                        key={attr + ind}
                        w="10"
                        h="10"
                        name={`${index}.${attr}`}
                        readOnly
                        fontSize="sm"
                        variant="flushed"
                        size="sm"
                        placeholder="0.02"
                        value={value && value[index] ? value[index][attr] : ""}
                      />
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
