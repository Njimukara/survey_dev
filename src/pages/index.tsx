import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { VSeparator } from "../components/separator/Separator";
// import Image from 'next/image'
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
  Heading,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { HiUserPlus } from "react-icons/hi2";
import { ImKey } from "react-icons/im";
import { BsCalculator } from "react-icons/bs";
import Hero from "../layouts/home/Hero";
import Section from "../layouts/home/Section";
import Card from "../components/card/Card";
import { PricingCard } from "../components/card/PricingCard";
import Footer from "../layouts/home/Footer";
// import UserReports from './admin/default'
import Navbar from "components/navbar/Navbar";

import { useSession, signIn, signOut } from "next-auth/react";

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
      { id: 1, name: "Access to a single product " },
      { id: 2, name: "Unlimited Generation of surveys" },
      { id: 3, name: "Customer Support" },
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
      { id: 1, name: "Access to two producta" },
      { id: 2, name: "Unlimited Generation of surveys" },
      { id: 3, name: "Customer Support" },
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
      { id: 1, name: "Access to a three producta" },
      { id: 2, name: "Unlimited Generation of surveys" },
      { id: 3, name: "Customer Support" },
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
      { id: 1, name: "Access to all products" },
      { id: 2, name: "Unlimited Generation of surveys" },
      { id: 3, name: "Customer Support" },
    ],
  },
];

export default function Home() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const router = useRouter();
  if (status === "authenticated") {
    router.push("/admin/default");
    // console.log(session);
    // return <UserReports />;
  }

  return (
    <>
      <Navbar />
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
                Login now or create and account, input your information to have
                an access to the platform
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
              <Text>
                Choose a licence plan that satisfy your need and budget
              </Text>
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
                As soon as you get your licence plan, you can now generate
                surveys
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
                  alt="holder image"
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
            <TabList justifyContent="center" mb="70px">
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
                    <PricingCard
                      key={x.id}
                      title={x.title}
                      price={x.price}
                      period={x.period}
                      description={x.description}
                      advantages={x.advantages}
                    ></PricingCard>
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

        {/* Get started Section ; */}
        <Box pb="430px">
          <Container maxW="container.xl" centerContent py="150px">
            <SimpleGrid columns={2} spacing={100} minChildWidth="570px">
              <Box w="570px" mt="100px" mx="50px">
                <Heading as="h2" lineHeight="50px" mb="23px">
                  Fast, Secured and Easy Access to our platform
                </Heading>
                <Text
                  lineHeight="35px"
                  color="gray.600"
                  mb="23px"
                  fontSize="20px"
                >
                  You need a to have an active account to get access to our
                  platform. Creating an account is simple. Click on the button
                  below to create an account.
                </Text>
                <Button variant="homePrimary"> Get Started</Button>
              </Box>
              <Image src="/he_sitting_with_notebook.png" alt="me" width="670" />
            </SimpleGrid>
          </Container>
        </Box>

        {/* Contect section  */}
        <Footer>
          {/* Contact us section  */}
          <Box mt="-450px">
            <Container maxW="container.xl" centerContent>
              <Stack
                divider={<VSeparator />}
                boxShadow="2xl"
                bg="white"
                direction={["column", "row"]}
              >
                <Box width="600px" px="95px" mt="50px">
                  <Heading as="h2" my="30px">
                    Lets get in touch
                  </Heading>
                  <Text>Morbi non quam nec dui luctus rutrum.</Text>
                  <Box as="form" mt="25px" mb="100px">
                    <FormControl isRequired mb="25px">
                      <FormLabel>Name</FormLabel>
                      <Input height="50px" variant="rounded" type="text" />
                    </FormControl>
                    <FormControl isRequired mb="25px">
                      <FormLabel>Email address</FormLabel>
                      <Input height="50px" variant="rounded" type="email" />
                    </FormControl>
                    <FormControl mb="25px">
                      <FormLabel>Telephone number</FormLabel>
                      <Input
                        height="50px"
                        variant="rounded"
                        type="tel"
                        placeholder="+1(567)123-4567"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Your messages</FormLabel>
                      <Textarea
                        height="50px"
                        placeholder="Say what you want here"
                      />
                    </FormControl>

                    <Button my="25px" width="full" variant="homePrimary">
                      Contact us
                    </Button>

                    <Text>We will reply as soon as possible we promise</Text>
                  </Box>
                </Box>

                <Box width="600px" px="95px" mt="60px">
                  <Image
                    src="/contact-us.jpg"
                    alt="contact image"
                    width="450px"
                    height="330px"
                    borderRadius="16px"
                  />
                  <Heading as="h3" fontSize="64px" mt="40px">
                    Do you have a question ?
                  </Heading>
                  <Text mt="20px" mb="30px">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat. Dolor ipsum amet sin
                    iquarum tempea
                  </Text>
                  <Text mb="12px">Feel free to contact us here</Text>
                  <Text fontSize="22px">
                    Call:{" "}
                    <Text as="span" color="primary.500">
                      +1 (555) 123-4567
                    </Text>
                  </Text>
                </Box>
              </Stack>
            </Container>
          </Box>
        </Footer>
      </Box>
      )
    </>
  );
}
