import { Box, Card, Text } from "@chakra-ui/react";
import React from "react";
import CustomSurveyInput from "components/fields/CustomSurveyInput";

type Props = {
  fields: any;
  formik: any;
  cardName: string;
  [x: string]: any;
};

export default function SurveySectionCard(props: Props) {
  const { fields, formik, cardName, ...rest } = props;

  return (
    <Card borderRadius="10px" p="4" w="100%" {...rest}>
      <Text mb="4" fontWeight="600" textTransform="uppercase">
        {cardName}
      </Text>
      <Box>
        {fields.map(
          (field: {
            options: any[];
            name: React.Key;
            label: string;
            type: string;
          }) => (
            <CustomSurveyInput
              key={field.name}
              field={formik.getFieldProps(field.name)}
              form={formik}
              label={field.label}
              type={field.type}
              options={field.options}
            />
          )
        )}
      </Box>
    </Card>
  );
}
