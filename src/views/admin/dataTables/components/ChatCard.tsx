import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Text,
  SimpleGrid,
  GridItem,
  Card,
} from "@chakra-ui/react";

type Props = {
  fields?: Array<any>;
  form: any;
  CardName?: string;
  IndexLabel?: string;
  [x: string]: any;
};

const getFieldInfo = (fieldName: string, fields: any) => {
  const fieldInfo = fields.find(
    (field: { name: string }) => field.name.split(".")[1] === fieldName
  );

  return fieldInfo || { type: "text", options: [] };
};

const formattedString = (inputString: string) => {
  return inputString
    .replace(/^.*?\./, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
};

const TestPerformanceCard = ({ fields, form, CardName, IndexLabel }: Props) => {
  const { values, handleChange, handleBlur, touched, errors } = form;
  const font_type = "Poppins";
  return (
    <Card borderRadius="10px" mb="2" p="4" w="100%">
      <SimpleGrid columns={12} marginBottom="5px">
        <GridItem colSpan={6}>
          <FormLabel
            fontSize="md"
            fontWeight="600"
            textTransform="uppercase"
            fontFamily={font_type}
          >
            {CardName}
          </FormLabel>
        </GridItem>
        <GridItem colSpan={6}>
          <Box display="flex" flexDirection="row" gap="2">
            {values.performance_card.map((_: any, index: number) => (
              <FormLabel
                key={`title${index}`}
                fontSize="sm"
                fontWeight={600}
                fontFamily={font_type}
              >
                {IndexLabel} {index + 1}
              </FormLabel>
            ))}
          </Box>
        </GridItem>
      </SimpleGrid>
      {Object.keys(values.performance_card[0] || {}).map((fieldName) => (
        <SimpleGrid columns={12} key={fieldName} marginBottom="5px">
          <GridItem colSpan={6}>
            <FormLabel
              htmlFor={fieldName}
              fontSize="sm"
              fontWeight="500"
              fontFamily={font_type}
            >
              {formattedString(fieldName)}
            </FormLabel>
          </GridItem>
          <GridItem colSpan={6}>
            <Box display="flex" gap="2" alignItems="center">
              {values.performance_card.map(
                (
                  performance: {
                    [x: string]: string | number | readonly string[];
                  },
                  index: string | number
                ) => {
                  const fieldInfo = getFieldInfo(fieldName, fields);
                  const { type, options } = fieldInfo;

                  return (
                    <FormControl
                      key={`index${index}`}
                      isInvalid={
                        touched.performance_card &&
                        errors.performance_card &&
                        errors.performance_card[index] &&
                        errors.performance_card[index][fieldName]
                      }
                    >
                      {type === "select" ? (
                        <Select
                          variant="flushed"
                          fontSize="xs"
                          size="xs"
                          name={`performance_card[${index}].${fieldName}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={performance[fieldName]}
                        >
                          {options.map((option: string | number) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                      ) : (
                        <Input
                          variant="flushed"
                          borderBottom="1px solid gray"
                          fontSize="xs"
                          size="xs"
                          type={type}
                          name={`performance_card[${index}].${fieldName}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={performance[fieldName]}
                        />
                      )}
                      {touched.performance_card &&
                      errors.performance_card &&
                      errors.performance_card[index] &&
                      errors.performance_card[index][fieldName] ? (
                        <Text color="red.500">
                          {errors.performance_card[index][fieldName]}
                        </Text>
                      ) : null}
                    </FormControl>
                  );
                }
              )}
            </Box>
          </GridItem>
        </SimpleGrid>
      ))}
    </Card>
  );
};

export default TestPerformanceCard;
