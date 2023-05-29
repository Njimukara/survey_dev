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
import Parameters from "views/admin/dataTables/components/Parameters";

export default function SurveyResult() {
  const brandColor = useColorModeValue("brand.500", "white");
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <PercormanceCard />
        <Parameters />
        <Flex mt="4" justifyContent="center" gap="10" alignItems="center">
          <Button variant="homePrimary" py="6" size="lg">
            Go Back
          </Button>
          <Button variant="homeWhite" py="5" size="lg">
            Download
          </Button>
        </Flex>
      </Box>
    </AdminLayout>
  );
}
SurveyResult.requireAuth = true;
