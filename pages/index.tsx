import type { NextPage } from "next";

import {
  Button,
  Container,
  Image,
  Box,
  SimpleGrid,
  Text,
  Icon,
  VStack,
  Square,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { HiUserPlus } from "react-icons/hi2";
import { ImKey } from "react-icons/im";
import { BsCalculator } from "react-icons/bs";
import Hero from "../layouts/home/Hero";
import Section from "../layouts/home/Section";
import Card from "../components/Card";
import { PricingCard } from "../components/PricingCard";

const slides = [
  {
    id: "1",
    name: "Multibeam Echosounder",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    image: "/multibeam-echosounder.jpeg",
  },
  {
    id: "2",
    name: "2D Acoustic Sonar",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    image: "/side-scan-sonar.jpeg",
  },
  {
    id: "3",
    name: "Echo sounder",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    image: "/echo-sounder.jpeg",
  },
  {
    id: "4",
    name: "Dynamic Lydar",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    image: "/dynamic-lidar.jpeg",
  },
];

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
const Home: NextPage = () => {
  return (
    <Box p={0}>
      <Hero />
      {/* How it works section  */}
      <Section title="How it Works ?">
        <SimpleGrid
          textAlign="center"
          minW="90%"
          spacing="40px"
          minChildWidth="200px"
        >
          <VStack spacing={4}>
            <Square
              size={100}
              boxShadow="2xl"
              bg="orange"
              borderRadius="10px"
              mb="8px"
            >
              <Icon as={HiUserPlus} w={10} h={10} color="white" />
            </Square>
            <Text fontSize="xl" fontWeight="bold">
              1. Create an account
            </Text>
            <Text>
              Login now or create and account, input your information to have an
              access to the platform
            </Text>
          </VStack>
          <VStack spacing={4}>
            <Square
              size={100}
              boxShadow="2xl"
              bg="purple"
              borderRadius="10px"
              mb="8px"
            >
              <Icon as={ImKey} w={10} h={10} color="white" />
            </Square>
            <Text fontSize="xl" fontWeight="bold">
              2. Buy a licence
            </Text>
            <Text>Choose a licence plan that satisfy your need and budget</Text>
          </VStack>
          <VStack spacing={4}>
            <Square
              size={100}
              boxShadow="2xl"
              bg="red.500"
              borderRadius="10px"
              mb="8px"
            >
              <Icon as={BsCalculator} w={10} h={10} color="white" />
            </Square>
            <Text fontSize="xl" fontWeight="bold">
              3. Generate Surveys
            </Text>
            <Text>
              As soon as you get your licence plan, you can now generate surveys
            </Text>
          </VStack>
        </SimpleGrid>
      </Section>

      {/* Our products section  */}
      <Section title="All The Assitance You Need For Your Hydrolic Surveys Inspections">
        <SimpleGrid columns={2} spacing={10}>
          {slides.map((slide, sid) => (
            <Card
              key={`slide-${sid}`}
              shadow="md"
              variant="bordered"
              fontSize="18px"
              w="400px"
              p="0"
            >
              <Image
                src={slide.image}
                w="400px"
                h="250px"
                _hover={{
                  scale: 1.1,
                }}
                borderRadius="0px"
              />
              <Box p="20px">
                <Text mb="1" fontWeight="bold">
                  {slide.name}
                </Text>
                <Text>{slide.description}</Text>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Section>

      {/* Pricing Plan Section  */}
      <Section
        bg="secondary.500"
        title="A simple and transaparent pricing just for you"
      >
        <Tabs variant="unstyled" w="full">
          <TabList as="Flex" justifyContent="center" mb="70px">
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
              <SimpleGrid columns={4} spacing="10px" minChildWidth="250px">
                {MonthlyPricing.map((x) => (
                  <PricingCard title={x.title} price={x.price} period={x.period} description={x.description} advantages={x.advantages}></PricingCard>
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
      </Section>
    </Box>
  );
};

export default Home;
