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
  Flex,
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
// import { useSubscriptionContext } from "../contexts/SubscriptionContext";

import styles from "../styles/PhoneNumbr.module.css";

import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { usePlanContext } from "contexts/PlanContext";
import { WorkCard } from "components/card/WorkCard";
import { MdEmail, MdMyLocation, MdPhone } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";

const slides = [
  {
    id: "1",
    name: "Multibeam Echosounder",
    description:
      "Our multibeam echo sounders deliver unparalleled accuracy and precision, ensuring that you have access to the most detailed and comprehensive data available.",
    image: "/multibeam-echosounder.jpeg",
  },
  {
    id: "2",
    name: "2D Acoustic Sonar",
    description:
      "Our 2D acoustic sonar technology provides you with accurate and reliable data on underwater structures, marine life, and environmental conditions",
    image: "/side-scan-sonar.jpeg",
  },
  {
    id: "3",
    name: "Echo sounder",
    description:
      "Whether you're a fisherman, marine biologist, oceanographer, environmental consultant, surveyor, or engineer, our Echo sounder technology is the perfect solution for your underwater mapping and data analysis needs",
    image: "/echo-sounder.jpeg",
  },
  {
    id: "4",
    name: "Dynamic Lydar",
    description:
      "Our Dynamic LIDAR technology provides you with precise and real-time data on the location and movement of objects in their surroundings",
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

const WorkingMethodology = [
  {
    id: 1,
    title: "Create an account",
    img: "",
    description:
      "Login now or create and account, input your information to have an access to the platform",
  },
  {
    id: 2,
    title: "Buy a licence",
    img: "",
    description: "Choose a licence plan that satisfy your need and budget",
  },
  {
    id: 3,
    title: "Generate Surveys",
    img: "",
    description:
      "As soon as you get your licence plan, you can now generate surveys",
  },
];

type ArrayObject = {
  id?: number;
  name?: String;
  description?: String;
};

type StripeObject = {
  interval?: string;
  description?: string;
};

type PricingProps = {
  id?: number;
  name?: String;
  amount?: number;
  period?: String;
  stripe_plan_id?: StripeObject;
  features?: Array<ArrayObject>;
};

type WorkCardProps = {
  id?: number;
  img?: string;
  title?: string;
  description?: string;
};

export default function Home() {
  // Yup validation data schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Name is too Short!")
      .max(30, "Name is too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(3, "Name is too Short!")
      .max(30, "Name is too Long!")
      .required("Required"),
    email: Yup.string().email("Email is Invalid").required("Required"),
    phoneNumber: Yup.number().min(9, "Min of 9 digits"),
    message: Yup.string()
      .min(3, "Name is too Short!")
      .max(1000, "Name is too Long!")
      .required("Required"),
  });

  const onSubmit = async (values: any, actions: any) => {
    let data = {
      name: values.firstName + " " + values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      message: values.message,
    };

    console.log(data);

    // const options = {
    //   // method: 'POST',
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Accept: "application/json;charset=UTF-8",
    //   },
    // };

    // const res = await axios
    //   .post(
    //     "https://surveyplanner.pythonanywhere.com/auth/users/",
    //     formdata,
    //     options
    //   )
    //   .then((res) => {
    //     // console.log(res);
    //     router.push("/auth/verifyemail");
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //     let err = error.response.data.email;
    //     setError("Server error, please try again later");
    //     if (err != "") {
    //       setError(err);
    //     }
    //   });
  };

  // formik initialisation using yup validation schema
  const {
    values,
    isSubmitting,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  const [plans, setPlans] = useState([]);
  const { data: session, status } = useSession();
  const { addToStore } = usePlanContext();
  const [user, setUser] = useState(null);
  const router = useRouter();

  const getPlanData = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
      },
    };

    await axios
      .get(
        "https://surveyplanner.pythonanywhere.com/api/plans/list-with-price",
        config
      )
      .then((res) => {
        // console.log(res);
        // addToStore(res.data);
        setPlans(res.data);
        // router.push('/auth/verifyemail')
      })
      .catch((error) => {
        // setHasDetails(false);
        // console.log(error) ;
      });
  };

  if (status === "authenticated") {
    router.push("/admin/default");
    // getSubscriptionData();
    // console.log(session);
  }

  useEffect(() => {
    const getplan = async () => {
      await getPlanData();
    };

    getplan();
  });

  return (
    <>
      <Navbar />
      <Box p={0}>
        <Hero />

        {/* Pattern design */}
        <Box position="relative">
          <Image
            top="16"
            right="32"
            h="16"
            w="32"
            position="absolute"
            src="/blue_pattern.png"
            alt="patter"
          />
        </Box>

        {/* How it works section  */}
        <Box py="6%">
          <Box my="5px" px="6%" mb="2%">
            <Heading as="h2" size="sm" color="primary.500">
              How it works ?
            </Heading>
            <Heading
              as="h2"
              mb={{ base: "15px", md: "8px", lg: "0px" }}
              size={{ base: "md", md: "lg", lg: "xl" }}
            >
              Here is our simple 3-step process
            </Heading>
          </Box>
          <Box py="6%" px="6%" bg="#F6F8FA">
            <SimpleGrid minW="90%" spacing="40px" minChildWidth="200px">
              {WorkingMethodology.map((stage: WorkCardProps) => (
                <WorkCard
                  key={stage.id}
                  title={stage.title}
                  description={stage.description}
                />
              ))}
            </SimpleGrid>
          </Box>
        </Box>

        <Flex
          flexDirection={{ base: "column", md: "row", lg: "row" }}
          w="100vw"
          pt="15"
          mb="8%"
          px="6%"
        >
          <Box
            w={{ base: "100%", md: "50%", lg: "50%" }}
            mt={{ base: 0, lg: "2%" }}
          >
            <Heading py="2" size={{ base: "md", md: "lg", lg: "lg" }}>
              Introducing survey planner
            </Heading>
            <Text
              pt="4"
              pb={{ base: "4", lg: "8" }}
              textAlign="justify"
              fontSize={{ base: "14px", md: "16px", lg: "20px" }}
            >
              Our company provides innovative software solutions for
              hydrographic surveying, enabling users to easily collect and
              analyze high-quality data for mapping underwater environments. Our
              user-friendly software delivers powerful tools for real-time data
              analysis and visualization, making it a valuable tool for a range
              of applications in the marine industry.
            </Text>
            <Button
              _active={{ bg: "white" }}
              variant="homePrimary"
              py={{ base: "4px", md: "6px", lg: "6" }}
            >
              Read more
            </Button>
          </Box>
          <Box
            position="relative"
            w={{ base: "100%", md: "50%", lg: "100%" }}
            flex="70%"
          >
            <Box
              display={{ base: "none", lg: "block" }}
              className={styles.shipbg}
              zIndex={1}
              bg-local
            ></Box>
          </Box>
        </Flex>

        {/* Our products section  */}
        <Section
          title="All The Assitance You Need For Your Hydrolic Surveys Inspections"
          bg="#F6F8FA"
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {slides.map((slide, sid) => (
              <Card
                key={`slide-${sid}`}
                fontSize="18px"
                bg="transparent"
                borderRadius="0"
                w="250px"
                p="0"
              >
                <Image
                  src={slide.image}
                  alt="holder image"
                  w="250px"
                  h="200px"
                  _hover={{
                    scale: 1.1,
                  }}
                  borderRadius="0px"
                />
                <Box>
                  <Text
                    my={{ base: "2", lg: "3" }}
                    color="primary.500"
                    fontWeight="bold"
                  >
                    {slide.name}
                  </Text>
                  <Text textAlign="justify">{slide.description}</Text>
                </Box>
              </Card>
            ))}
          </SimpleGrid>
        </Section>

        {/* Pattern design */}
        <Box position="relative">
          <Image
            top="32"
            left="32"
            h="16"
            w="32"
            position="absolute"
            src="/blue_pattern.png"
            alt="patter"
          />
        </Box>

        {/* Pricing Plan Section  */}
        <Section
          bg="white"
          title="A simple and transaparent pricing just for you"
        >
          <Tabs variant="unstyled" w="full">
            <TabList justifyContent="center" mb={{ base: "40px", lg: "70px" }}>
              <Tab
                bg="white"
                borderRadius="0"
                shadow="md"
                color="primary.500"
                py="3"
                px={{ base: "5", md: "10", lg: "20" }}
                fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                fontWeight="semibold"
                _selected={{
                  bg: "primary.500",
                  color: "white",
                }}
              >
                Monthly
              </Tab>
              <Tab
                bg="white"
                borderRadius="0"
                shadow="md"
                color="primary.500"
                py="3"
                px={{ base: "5", md: "10", lg: "20" }}
                fontSize={{ base: "15px", md: "18px", lg: "20px" }}
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
                <SimpleGrid columns={4} spacing="15" minChildWidth="250px">
                  {plans.map((x: PricingProps) => (
                    <PricingCard
                      key={x.id}
                      title={x.name}
                      price={x.amount}
                      period={x?.stripe_plan_id?.interval}
                      description={x?.stripe_plan_id?.description}
                      advantages={x.features}
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

        {/* Pattern design */}
        <Box position="relative">
          <Image
            top="32"
            right="32"
            h="16"
            w="32"
            position="absolute"
            src="/blue_pattern.png"
            alt="patter"
          />
        </Box>

        {/* Get started Section ; */}
        <Box
          bg="white"
          bgImg='linear-gradient(to right, #3203FCA1, #3203FCA1), url("/design.jpeg")'
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        >
          <Container maxW="container.xl" centerContent py="50px">
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              color="white"
              mx="50px"
              py="5%"
            >
              <Box w="70%">
                <Heading
                  size={{ base: "md", md: "lg", lg: "lg" }}
                  textAlign="center"
                  as="h2"
                  lineHeight="50px"
                  mb="23px"
                >
                  Fast, Secured and Easy Access to our platform
                </Heading>
                <Text
                  textAlign="center"
                  lineHeight={{ base: "base", lg: "35px" }}
                  mb="23px"
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                >
                  You need a to have an active account to get access to our
                  platform. Creating an account is simple. Click on the button
                  below to create an account.
                </Text>
                <Flex justifyContent="center" alignItems="center" gap="10">
                  <Button
                    variant="homeWhite"
                    py={{ base: "4px", md: "6px", lg: "6" }}
                    // bg="white"
                    _focus={{ bg: "gray.100" }}
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    color="primary.500"
                    border="2px"
                    borderColor="white"
                  >
                    {" "}
                    Get Started
                  </Button>
                  <Button
                    variant="homeWhite"
                    py={{ base: "4px", md: "6px", lg: "6" }}
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    bg="transparent"
                    color="white"
                    border="2px"
                    borderColor="white"
                  >
                    Show More
                  </Button>
                </Flex>
              </Box>
              {/* <Image src="/he_sitting_with_notebook.png" alt="me" width="670" /> */}
            </Flex>
          </Container>
        </Box>

        <Box bg="#F6F8FA" py="5%" px={{ base: "2%", md: "3%", lg: "6%" }}>
          <Container maxW="container.xl">
            <Heading color="primary.500" size="sm" fontWeight="normal">
              Lets get in touch
            </Heading>
            <Heading mb="5" size={{ base: "md", md: "lg", lg: "lg" }}>
              Got any questions for use? let us know
            </Heading>
            <Stack
              spacing={0}
              direction={{ base: "column", md: "row", lg: "row" }}
            >
              <Card
                borderRadius="0"
                w={{ base: "100%", md: "700px", lg: "900px" }}
                position="relative"
                zIndex={23}
              >
                <Flex
                  w="100%"
                  justifyContent="center"
                  // alignItems="center"
                  flexDirection="column"
                  px={{ base: "5px", md: "30px", lg: "50px" }}
                  py="3%"
                >
                  <Heading as="h3" size="md" mt={{ base: "30px", lg: "60px" }}>
                    Do you have a question ?
                  </Heading>
                  <Text mt="20px" mb="30px" w="100%">
                    Thank you for reaching out to us! We value your inquiry and
                    strive to provide prompt assistance. our dedicated team will
                    review your message and respond to you shortly
                  </Text>

                  <Flex flexDir="column" gap="5">
                    <Box>
                      <span>
                        <Icon
                          as={MdPhone}
                          boxSize={4}
                          color="primary.500"
                          mr="8px"
                        />
                      </span>
                      <Text as="span">+1 (555) 123-4567</Text>
                    </Box>
                    <Box>
                      <span>
                        <Icon
                          as={MdEmail}
                          boxSize={4}
                          color="primary.500"
                          mr="8px"
                        />
                      </span>
                      <Text as="span">surveyplanner@gmail.com</Text>
                    </Box>
                    <Box>
                      <span>
                        <Icon
                          as={MdMyLocation}
                          boxSize={4}
                          color="primary.500"
                          mr="8px"
                        />
                      </span>
                      <Text as="span">12/3-A South RD, NYC2312</Text>
                    </Box>
                  </Flex>
                </Flex>
                <Box
                  position="absolute"
                  borderRadius="full"
                  width={{ base: "20px", lg: "30px" }}
                  height={{ base: "20px", lg: "30px" }}
                  left={{ base: "240px", lg: "380px" }}
                  top={{ base: "250px", lg: "290px" }}
                  zIndex={10}
                  background=" rgba(50, 3, 252, 0.08)"
                ></Box>
                <Box
                  position="absolute"
                  borderRadius="full"
                  width={{ base: "40px", lg: "80px" }}
                  height={{ base: "40px", lg: "80px" }}
                  left={{ base: "190px", lg: "300px" }}
                  top={{ base: "270px", lg: "340px" }}
                  zIndex={10}
                  background=" rgba(50, 3, 252, 0.08)"
                ></Box>
                <Box
                  position="absolute"
                  className={styles.circle_clip}
                  borderRadius="full"
                  width={{ base: "181px", lg: "281px" }}
                  height={{ base: "181px", lg: "281px" }}
                  left={{ base: "188px", lg: "320px" }}
                  top={{ base: "270px", lg: "320px" }}
                  zIndex={10}
                  background=" rgba(50, 3, 252, 0.08)"
                ></Box>
              </Card>

              <Card
                w={{ base: "100%", md: "700px", lg: "100%" }}
                zIndex={23}
                bg="transparent"
              >
                <Box px={{ base: "10px", md: "50px", lg: "0" }} mt="50px">
                  <form onSubmit={handleSubmit}>
                    <Flex
                      w={{ base: "100%", md: "100%", lg: "100%" }}
                      flexDirection={{ base: "column", md: "row", lg: "row" }}
                      gap="5"
                    >
                      <FormControl isRequired mb="25px">
                        <FormLabel color="#3C3C3C">First Name</FormLabel>
                        <Input
                          id="firstName"
                          name="firstName"
                          variant="flushed"
                          type="text"
                          px="1"
                          fontSize="sm"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                      <FormControl isRequired mb="25px">
                        <FormLabel color="#3C3C3C">Last Name</FormLabel>
                        <Input
                          id="lastName"
                          name="lastName"
                          variant="flushed"
                          type="text"
                          px="1"
                          fontSize="sm"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                    </Flex>
                    <Flex
                      w={{ base: "100%", md: "100%", lg: "100%" }}
                      flexDirection={{ base: "column", md: "row", lg: "row" }}
                      gap="5"
                    >
                      <FormControl isRequired mb="25px">
                        <FormLabel color="#3C3C3C">Email</FormLabel>
                        <Input
                          id="email"
                          name="email"
                          variant="flushed"
                          type="email"
                          px="1"
                          fontSize="sm"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                      <FormControl mb="25px">
                        <FormLabel color="#3C3C3C">Telephone</FormLabel>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          variant="flushed"
                          type="tel"
                          px="1"
                          fontSize="sm"
                          placeholder="+1(567)123-4567"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                    </Flex>
                    <FormControl isRequired>
                      <FormLabel color="#3C3C3C">message</FormLabel>
                      <Textarea
                        id="message"
                        name="message"
                        px="1"
                        fontSize="sm"
                        variant="flushed"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormControl>

                    <Button
                      variant="homePrimary"
                      disabled={isSubmitting}
                      type="submit"
                      py="6px"
                      mt="10"
                      px="70px"
                      mb={2}
                    >
                      Contact Us
                    </Button>
                    <Text fontSize="sm">
                      We will reply as soon as possible we promise
                    </Text>
                  </form>
                </Box>
              </Card>
            </Stack>
          </Container>
        </Box>

        <Footer />
      </Box>
    </>
  );
}
