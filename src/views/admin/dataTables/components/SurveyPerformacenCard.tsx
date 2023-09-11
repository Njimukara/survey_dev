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
import CustomSurveyInput from "components/fields/CustomSurveyInput";
import { useEffect, useState, Fragment } from "react";

type Props = {
  fields?: Array<any>;
  form: any;
  survey_Id: number;
  [x: string]: any;
};

function convertValue(value: any) {
  const parsedValue = isNaN(value) ? value : parseFloat(value);
  return parsedValue;
}

export default function SurveyPerformanceCard(props: Props) {
  const { fields, form, survey_Id, ...rest } = props;

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

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
      p="6"
      borderRadius={10}
      {...rest}
    >
      <Grid templateColumns="repeat(9, 1fr)" gap="1" py="3">
        <GridItem colSpan={5} h="10">
          <Text fontSize="large" fontWeight="bold" textTransform="uppercase">
            Performance of{" "}
            {survey_Id === lidar
              ? "Lidars"
              : survey_Id === multibeam
              ? "MBESs  "
              : survey_Id === scan
              ? "SSSs"
              : "Cameras"}
          </Text>
        </GridItem>
        {array.map((item, index) => (
          <GridItem colSpan={1} h="10" key={index}>
            <Text fontSize="sm" fontWeight="bold">
              {survey_Id === lidar
                ? `Lidar ${item}`
                : survey_Id === multibeam
                ? `MBES ${item}`
                : survey_Id === scan
                ? `SL ${item}`
                : `AC ${item}`}
            </Text>
          </GridItem>
        ))}
      </Grid>

      <Flex w="100%" justifyContent="space-between">
        <Box pt="2" w="100%">
          <Flex flexDir="column">
            {fields.map((field, index) => (
              <GridItem colSpan={5} h="10" key={field.name + index}>
                <Text fontSize="sm">{formattedString(field.label)}</Text>
              </GridItem>
            ))}
          </Flex>
        </Box>
        <Box w="100%">
          {array.map((i) => (
            <Grid key={i} templateColumns="repeat(5, 1fr)" gap="1">
              <Flex flexDir="column">
                {fields.map((field, index) => (
                  <Fragment key={field.name + index}>
                    {field.type === "number" && (
                      <Input
                        //   required
                        w="8"
                        h="10"
                        key={field.name}
                        name={field.name}
                        color={textColorSecondary}
                        fontSize="xs"
                        variant="flushed"
                        size="xs"
                        type={field.type}
                        onChange={form.getFieldProps(field.name).onChange}
                      />
                    )}

                    {field.type === "select" && (
                      <Select
                        {...field}
                        key={field.name}
                        name={field.name}
                        required
                        size="xs"
                        h="10"
                        fontSize="xs"
                        variant="flushed"
                        value={form.values[field.name]}
                        onChange={(e) => {
                          const parsedValue = convertValue(e.target.value);
                          form.setFieldValue(field.name, parsedValue);
                        }}
                      >
                        {field.options?.map((opt: string, index: React.Key) => (
                          <option value={opt} key={index}>
                            {opt}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Fragment>
                ))}
              </Flex>
            </Grid>
          ))}
        </Box>
      </Flex>
    </Card>
  );
}

// Define the variables for Lidar, MBES, SL, AC
const lidar = 2;
const multibeam = 1;
const scan = 3;
const acoustic = 4;

const array = [1, 2, 3, 4];
