/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import AdminLayout from "layouts/admin";
import { useCallback, useEffect, useState } from "react";

// Assets
import PaymentPlan from "views/admin/default/components/PaymentPlan";
import { TableData } from "views/admin/default/variables/columnsData";
import ComplexTable from "views/admin/default/components/ComplexTable";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { columnsDataComplex } from "views/admin/default/variables/columnsData";
import { SubscriptionCard } from "components/card/SubscriptionCard";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { Plan, subsciptionPlan } from "../../../types/data";
import { useSubscription } from "contexts/SubscriptionContext";
import PlanDetails from "views/admin/profile/components/PlanDetails";
import SubscirptionDetails from "views/admin/profile/components/SubscriptionDetails";

// mock data
// const MonthlyPricing = [
//   {
//     id: 1,
//     title: "Single Product Licence",
//     price: 48,
//     period: "Month",
//     description:
//       "Keep it simple, This licence gives you access to one product of your choice",
//     advantages: [
//       { name: "Access to a single product " },
//       { name: "Unlimited Generation of surveys" },
//       { name: "Customer Support" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Double Product Licence",
//     price: 98,
//     period: "Month",
//     description:
//       "In need of more, This licence gives you access to two product of your choice",
//     advantages: [
//       { name: "Access to two producta" },
//       { name: "Unlimited Generation of surveys" },
//       { name: "Customer Support" },
//     ],
//   },
//   {
//     id: 3,
//     title: "Triple Product Licence",
//     price: 158,
//     period: "Month",
//     description:
//       "Make it flexible, This licence gives you access to three product of your choice",
//     advantages: [
//       { name: "Access to a three producta" },
//       { name: "Unlimited Generation of surveys" },
//       { name: "Customer Support" },
//     ],
//   },
//   {
//     id: 4,
//     title: "Complete Product Licence",
//     price: 48,
//     period: "Month",
//     description:
//       "No stressing, No limits, This licence gives you access to all our products",
//     advantages: [
//       { name: "Access to all products" },
//       { name: "Unlimited Generation of surveys" },
//       { name: "Customer Support" },
//     ],
//   },
// ];

export default function Transactions() {
  // component variables
  const [selectedPlan, setSelectedPlan] = useState<subsciptionPlan>(null);
  const [user, setUser] = useState(null);
  const [upgrade, setUpgrade] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [step, setStep] = useState(1);
  const [plans, setPlans] = useState([]);

  // get user subscription from store
  // const { store } = useSubscriptionContext();
  const [subscriptions, setSubscriptions] = useState([]);
  const { loading, subscription, fetchSubscription } = useSubscription();

  // chakra toast
  const toast = useToast();

  // Get selected plan by user
  const getSelectedPlan = (plan: subsciptionPlan) => {
    setSelectedPlan(plan);
  };

  // Get step
  const changeStep = (newStep: number) => {
    setStep(newStep);
  };

  // initial user session
  var { data: session } = useSession();

  // updated user session
  const secondSession = useCallback(async () => {
    await getSession()
      .then((res) => {
        // console.log(res);
        session = res;
        setUser(res?.user?.data);
      })
      .catch((err) => {});
  }, [session]);

  const handleUpgrade = (state: boolean) => {
    setUpgrade(state);
    // setStep(newstep);
  };

  // get subscription plans from database
  const getPlans = useCallback(async () => {
    setFetching(true);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .get(
        "https://surveyplanner.pythonanywhere.com/api/plans/list-with-price",
        config
      )
      .then((res) => {
        setPlans(res.data);
        setFetching(false);
      })
      .catch((error) => {
        // console.log(error);
        toast({
          position: "bottom-right",
          description: "Error getting plans",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setFetching(false);
      });
  }, []);

  useEffect(() => {
    secondSession();
    getPlans();
    fetchSubscription();
    setSubscriptions(subscription);
  }, [loading]);

  if (subscriptions.length != 0) {
    return (
      <AdminLayout>
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          {/* {
            if upgrade and step == 2{show payment}
            else (upgrade) and step ==1 {show plans}
            else show subscirpiton
          } */}

          {upgrade && step == 2 ? (
            <PaymentPlan
              plan={selectedPlan}
              getplan={getSelectedPlan}
              changeStep={changeStep}
              handleUpgrade={handleUpgrade}
            />
          ) : upgrade && step == 1 ? (
            <Box pb="50px">
              <Tabs variant="unstyled" w="full">
                <TabList justifyContent="center" mb="30px">
                  <Tab
                    bg="white"
                    borderLeftRadius="20px"
                    pt="5"
                    pb="5"
                    px="20"
                    fontSize="20px"
                    fontWeight="semibold"
                    _selected={{
                      bg: "primary.500",
                      color: "white",
                      borderLeftRadius: "20px",
                    }}
                  >
                    Monthly
                  </Tab>
                  <Tab
                    bg="white"
                    borderRightRadius="20px"
                    pt="5"
                    pb="5"
                    px="20"
                    fontSize="20px"
                    fontWeight="semibold"
                    _selected={{
                      bg: "primary.500",
                      color: "white",
                    }}
                  >
                    Annually
                  </Tab>
                </TabList>
                {fetching ? (
                  <Flex
                    h="200"
                    w="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Spinner
                      thickness="2px"
                      speed="0.95s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="sm"
                    />
                  </Flex>
                ) : (
                  <TabPanels>
                    <TabPanel>
                      <SimpleGrid
                        columns={4}
                        spacing="20px"
                        minChildWidth="250px"
                      >
                        {plans.map((plan: Plan) => (
                          <SubscriptionCard
                            key={plan.id}
                            id={plan.id}
                            title={plan.name}
                            price={plan.amount}
                            period={plan?.stripe_plan_id?.interval}
                            description={plan?.stripe_plan_id?.description}
                            advantages={plan.features}
                            max_products={plan.max_products}
                            getplan={getSelectedPlan}
                            changeStep={changeStep}
                          ></SubscriptionCard>
                        ))}
                      </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                      <Button variant="homePrimary" size="lg">
                        Annually!
                      </Button>
                    </TabPanel>
                  </TabPanels>
                )}
              </Tabs>
            </Box>
          ) : (
            <SubscirptionDetails upgrade={handleUpgrade} />
          )}

          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex as unknown as TableData[]}
            />
          </SimpleGrid>
        </Box>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>
          {/* {subscriptions.length != 0 && !upgrade && (
              <Box>
                <SubscirptionDetails />
              </Box>
            )} */}
          {step == 1 ? (
            <Box pb="50px">
              <Tabs variant="unstyled" w="full">
                <TabList justifyContent="center" mb="30px">
                  <Tab
                    bg="white"
                    borderLeftRadius="20px"
                    pt="5"
                    pb="5"
                    px="20"
                    fontSize="20px"
                    fontWeight="semibold"
                    _selected={{
                      bg: "primary.500",
                      color: "white",
                      borderLeftRadius: "20px",
                    }}
                  >
                    Monthly
                  </Tab>
                  <Tab
                    bg="white"
                    borderRightRadius="20px"
                    pt="5"
                    pb="5"
                    px="20"
                    fontSize="20px"
                    fontWeight="semibold"
                    _selected={{
                      bg: "primary.500",
                      color: "white",
                    }}
                  >
                    Annually
                  </Tab>
                </TabList>
                {fetching ? (
                  <Flex
                    h="200"
                    w="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Spinner
                      thickness="2px"
                      speed="0.95s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="sm"
                    />
                  </Flex>
                ) : (
                  <TabPanels>
                    <TabPanel>
                      <SimpleGrid
                        columns={4}
                        spacing="20px"
                        minChildWidth="250px"
                      >
                        {plans.map((plan: Plan) => (
                          <SubscriptionCard
                            key={plan.id}
                            id={plan.id}
                            title={plan.name}
                            price={plan.amount}
                            period={plan?.stripe_plan_id?.interval}
                            description={plan?.stripe_plan_id?.description}
                            advantages={plan.features}
                            max_products={plan.max_products}
                            getplan={getSelectedPlan}
                            changeStep={changeStep}
                          ></SubscriptionCard>
                        ))}
                      </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                      <Button variant="homePrimary" size="lg">
                        Annually!
                      </Button>
                    </TabPanel>
                  </TabPanels>
                )}
              </Tabs>
            </Box>
          ) : (
            <PaymentPlan
              plan={selectedPlan}
              getplan={getSelectedPlan}
              changeStep={changeStep}
            />
          )}

          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex as unknown as TableData[]}
            />
          </SimpleGrid>
        </>
      </Box>
    </AdminLayout>
  );
}

Transactions.requireAuth = true;
