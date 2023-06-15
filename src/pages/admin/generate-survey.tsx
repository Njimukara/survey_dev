import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import AdminLayout from "layouts/admin";
import PercormanceCard from "views/admin/dataTables/components/PerformanceCard";
import OperationalConditionsCard from "views/admin/dataTables/components/OperationalConditionsCard";
import PerformanceInsCard from "views/admin/dataTables/components/PerformanceInsCard";
import Calibrations from "views/admin/dataTables/components/Calibrations";
import LeverarmCard from "views/admin/dataTables/components/LeverarmCard";
import CloudPoints from "views/admin/dataTables/components/CloudPoints";
import Card from "components/card/Card";

export default function GenerateSurvey() {
  const brandColor = useColorModeValue("brand.500", "white");
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card
          p="20px"
          alignItems="center"
          flexDirection="column"
          w="100%"
          mb="4"
        >
          <FormControl display="flex" alignItems="center">
            <FormLabel
              htmlFor="remember-settings"
              mb="0"
              fontWeight="normal"
              color={brandColor}
              fontSize="md"
            >
              Import last survey settings
            </FormLabel>
            <Checkbox
              id="remember-settings"
              isChecked={isChecked}
              onChange={(e) => setIsChecked(!isChecked)}
            />
          </FormControl>
        </Card>
        <PercormanceCard surveyID={0} />
        <Flex mt="15px">
          <PerformanceInsCard surveyID={0} mr="15px" />
          <OperationalConditionsCard surveyID={0} />
        </Flex>
        <Flex mt="15px" mb="4">
          <Calibrations surveyID={0} mr="15px" />
          <LeverarmCard surveyID={0} />
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
          <CloudPoints />
        </SimpleGrid>
        <Flex mt="4" justifyContent="center" alignItems="center">
          <Button variant="homePrimary" size="lg">
            Generate Survey
          </Button>
        </Flex>
      </Box>
    </AdminLayout>
  );
}
GenerateSurvey.requireAuth = true;
