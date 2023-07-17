// Chakra imports
import { Card, Text } from "@chakra-ui/react";
// Custom components
import ParameterCard from "./SurveyParameters";

export default function Parameters(props: { [x: string]: any }) {
  const { results, ...rest } = props;

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
    </Card>
  );
}
