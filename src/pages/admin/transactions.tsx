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
  useToast,
} from "@chakra-ui/react";
import AdminLayout from "layouts/admin";
import { useCallback, useEffect, useState } from "react";

// Assets
import PaymentPlan from "views/admin/default/components/PaymentPlan";
import { TableData } from "views/admin/default/variables/columnsData";
// import { columnsDataComplex } from "views/admin/default/variables/columnsData";
import { SubscriptionCard } from "components/card/SubscriptionCard";
import { Plan, subsciptionPlan } from "../../../types/data";
// import { useSubscription } from "contexts/SubscriptionContext";
import SubscirptionDetails from "views/admin/profile/components/SubscriptionDetails";
import { useCurrentUser } from "contexts/UserContext";
// import axiosConfig from "axiosConfig";
import NoData from "layouts/admin/noData";
// import { usePlanContext } from "contexts/PlanContext";
import TransactionTable from "views/admin/dataTables/components/TransationTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { fetchPlans } from "redux/planSlice";

export default function Transactions() {
  // component variables
  const subscriptionsData = useSelector(
    (state: RootState) => state.reduxStore.subscrptions
  );
  const { data, isLoading, error } = subscriptionsData;
  const currentSubscription = data?.currentSubscription;
  const subscriptions = data?.data;

  const [selectedPlan, setSelectedPlan] = useState<subsciptionPlan>(null);
  const [upgrade, setUpgrade] = useState(false);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const plansData = useSelector((state: RootState) => state.reduxStore.plans);
  const { plans, plansLoading, plansError } = plansData;
  const [localSubscriptions, setLocalSubscriptions] = useState([]);
  const { currentUser, fetchCurrentUser } = useCurrentUser();

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

  const handleUpgrade = (state: boolean) => {
    setUpgrade(state);
    // setStep(newstep);
  };

  useEffect(() => {
    if (!plans) {
      dispatch(fetchPlans());
    }
  }, [plans, dispatch]);

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
    setLocalSubscriptions(subscriptions);
  }, [subscriptions]);

  if (isLoading) {
    return (
      <AdminLayout>
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <Flex h="200" w="100%" justifyContent="center" alignItems="center">
            <Spinner
              thickness="2px"
              speed="0.95s"
              emptyColor="gray.200"
              color="primary.600"
              size="sm"
            />
          </Flex>
        </Box>
      </AdminLayout>
    );
  }

  if (localSubscriptions && localSubscriptions.length != 0) {
    return (
      <AdminLayout>
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
                    borderLeftRadius="10px"
                    h="48px"
                    px="20"
                    fontSize="20px"
                    fontWeight="semibold"
                    _selected={{
                      bg: "primary.600",
                      color: "white",
                      borderLeftRadius: "10px",
                    }}
                  >
                    Monthly
                  </Tab>
                  <Tab
                    bg="white"
                    borderRightRadius="10px"
                    h="48px"
                    px="20"
                    fontSize="20px"
                    fontWeight="semibold"
                    _selected={{
                      bg: "primary.600",
                      color: "white",
                    }}
                  >
                    Annually
                  </Tab>
                </TabList>
                {plansLoading ? (
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
                      color="primary.600"
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
                        {plans &&
                          plans?.map((plan: Plan, index: number) => (
                            <SubscriptionCard
                              key={plan.id + index}
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
            {localSubscriptions && localSubscriptions?.length > 0 ? (
              <TransactionTable
                tableData={localSubscriptions as unknown as TableData[]}
              />
            ) : (
              <NoData title="No subscription data" />
            )}
          </SimpleGrid>
        </Box>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>
          {step == 1 ? (
            <Box pb="50px">
              <Tabs variant="unstyled" w="full">
                <TabList justifyContent="center" mb="30px">
                  <Tab
                    bg="white"
                    borderLeftRadius="10px"
                    h="48px"
                    px="20"
                    fontSize="20px"
                    fontWeight="600"
                    _selected={{
                      bg: "primary.600",
                      color: "white",
                      borderLeftRadius: "10px",
                    }}
                  >
                    Monthly
                  </Tab>
                  <Tab
                    bg="white"
                    borderRightRadius="10px"
                    h="48px"
                    px="20"
                    fontSize="20px"
                    fontWeight="600"
                    _selected={{
                      bg: "primary.600",
                      color: "white",
                    }}
                  >
                    Annually
                  </Tab>
                </TabList>
                {plansLoading ? (
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
                      color="primary.600"
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
                        {plans &&
                          plans?.map((plan: Plan) => (
                            <SubscriptionCard
                              key={plan.id + "2"}
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
              handleUpgrade={handleUpgrade}
            />
          )}

          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
            {localSubscriptions.length > 0 ? (
              <TransactionTable
                tableData={localSubscriptions as unknown as TableData[]}
              />
            ) : (
              <NoData title="No subscription data" />
            )}
          </SimpleGrid>
        </>
      </Box>
    </AdminLayout>
  );
}

Transactions.requireAuth = true;
