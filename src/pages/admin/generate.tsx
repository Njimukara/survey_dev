import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import AdminLayout from "layouts/admin";
import PercormanceCard from "views/admin/dataTables/components/PerformanceCard";
import OperationalConditionsCard from "views/admin/dataTables/components/OperationalConditionsCard";
import PerformanceInsCard from "views/admin/dataTables/components/PerformanceInsCard";
import Calibrations from "views/admin/dataTables/components/Calibrations";
import LeverarmCard from "views/admin/dataTables/components/LeverarmCard";
import CloudPoints from "views/admin/dataTables/components/CloudPoints";
import Card from "components/card/Card";
import PlatformPerformance from "views/admin/dataTables/components/PlatformPerformance";
import Parameters from "views/admin/dataTables/components/Parameters";
import SurveyInput from "views/admin/dataTables/components/SurveyInput";
import { useSurveyContext } from "contexts/Survey";

interface Props {
  surveyID: number;
}
export default function GenerateSurvey({ surveyID }: Props) {
  const brandColor = useColorModeValue("brand.500", "white");
  const [isChecked, setIsChecked] = React.useState(false);

  const { loading, surveyResults, planSurvey, form, handleFormChange } =
    useSurveyContext();

  useEffect(() => {
    console.log("after generate survey", form);
  }, [loading, surveyResults, form]);

  //   const handleFormChange = (event: {
  //     target: { name: string | number; value: any };
  //   }) => {
  //     // Clone form because we need to modify it
  //     const updatedForm = { ...form };

  //     // Get the name of the field that caused this change event
  //     // Get the new value of this field
  //     // Assign new value to the appropriate form field
  //     updatedForm[event.target.name] = event.target.value;

  //     console.log("Form changed: ", updatedForm);
  //     // console.log(event);

  //     // Update state
  //     setForm(updatedForm);
  //   };

  //   const [form, setForm] = React.useState({
  //     pitchboresight: null,
  //     rollBoresight: null,
  //     yawBoresight: null,
  //     yawUncertainty: null,
  //     pitchUncertainty: null,
  //     rollUncertainty: null,
  //     latencyGNSSINS: null,
  //     latencyGNSSUSBL: null,
  //     latencyUnctyGNSSINS: null,
  //     latencyUnctyGNSSLiDAR: null,
  //   });

  return (
    <AdminLayout>
      {/* <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Flex mt="15px">
        </Flex>
        <Flex mt="15px" mb="4">
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        </SimpleGrid>
        <Flex mt="4" justifyContent="center" alignItems="center">
        <Button variant="homePrimary" size="lg">
        Generate Survey
        </Button>
        </Flex>
    </Box> */}
      <Grid
        pt={{ base: "130px", md: "80px", xl: "80px" }}
        templateColumns="repeat(5, 1fr)"
        gap={3}
      >
        <GridItem colSpan={2}>
          <PercormanceCard mb="2" surveyID={surveyID} />
          <Parameters results={surveyResults} surveyID={surveyID} />
        </GridItem>
        <GridItem colSpan={3}>
          <Flex gap={3}>
            <Box>
              <PerformanceInsCard mb="2" surveyID={surveyID} />
              <PlatformPerformance mb="2" surveyID={surveyID} />
              <OperationalConditionsCard surveyID={surveyID} />
            </Box>
            <Box>
              <Calibrations mb="2" surveyID={surveyID} />
              <LeverarmCard mb="2" surveyID={surveyID} />
              <CloudPoints surveyID={surveyID} />
            </Box>
          </Flex>
          <Button mt="6" onClick={planSurvey} variant="homePrimary" py="6">
            Plan Survey
          </Button>
        </GridItem>
      </Grid>
    </AdminLayout>
  );
}
GenerateSurvey.requireAuth = true;
