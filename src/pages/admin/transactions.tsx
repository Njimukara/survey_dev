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
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AdminLayout from "layouts/admin";
import { useState } from "react";

// Assets
import PaymentPlan from "views/admin/default/components/PaymentPlan";
import { TableData } from "views/admin/default/variables/columnsData";
import ComplexTable from "views/admin/default/components/ComplexTable";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { columnsDataComplex } from "views/admin/default/variables/columnsData";
import { SubscriptionCard } from "components/card/SubscriptionCard";

const MonthlyPricing = [
  {
    id: 1,
    title: "Single Product Licence",
    price: 48,
    period: "Month",
    description:
      "Keep it simple, This licence gives you access to one product of your choice",
    advantages: [
      { name: "Access to a single product " },
      { name: "Unlimited Generation of surveys" },
      { name: "Customer Support" },
    ],
  },
  {
    id: 2,
    title: "Double Product Licence",
    price: 98,
    period: "Month",
    description:
      "In need of more, This licence gives you access to two product of your choice",
    advantages: [
      { name: "Access to two producta" },
      { name: "Unlimited Generation of surveys" },
      { name: "Customer Support" },
    ],
  },
  {
    id: 3,
    title: "Triple Product Licence",
    price: 158,
    period: "Month",
    description:
      "Make it flexible, This licence gives you access to three product of your choice",
    advantages: [
      { name: "Access to a three producta" },
      { name: "Unlimited Generation of surveys" },
      { name: "Customer Support" },
    ],
  },
  {
    id: 4,
    title: "Complete Product Licence",
    price: 48,
    period: "Month",
    description:
      "No stressing, No limits, This licence gives you access to all our products",
    advantages: [
      { name: "Access to all products" },
      { name: "Unlimited Generation of surveys" },
      { name: "Customer Support" },
    ],
  },
];

export default function Transactions() {
  type ArrayObject = {
    name?: String;
  };

  interface subsciptionPlan {
    title?: String;
    price?: Number;
    period?: String;
    description?: String;
    advantages?: Array<ArrayObject>;
  }
  const [selectedPlan, setSelectedPlan] = useState<subsciptionPlan>(null);

  const getSelectedPlan = (plan: subsciptionPlan) => {
    setSelectedPlan(plan);
  };

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>
          {selectedPlan == null ? (
            <Box>
              <Tabs variant="unstyled" w="full">
                <TabList justifyContent="center" mb="50px">
                  <Tab
                    bg="white"
                    borderLeftRadius="20px"
                    pt="9"
                    pb="8"
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
                    pt="9"
                    pb="8"
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
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid
                      columns={4}
                      spacing="20px"
                      minChildWidth="150px"
                    >
                      {MonthlyPricing.map((x) => (
                        <SubscriptionCard
                          key={x.id}
                          title={x.title}
                          price={x.price}
                          period={x.period}
                          description={x.description}
                          advantages={x.advantages}
                          getplan={getSelectedPlan}
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
              </Tabs>
            </Box>
          ) : (
            // payment
            <PaymentPlan plan={selectedPlan} getplan={getSelectedPlan} />
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
