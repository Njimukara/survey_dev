import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Image,
  Box,
  SimpleGrid,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  Divider,
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
// import { usePlanContext } from "contexts/PlanContext";
import { WorkCard } from "components/card/WorkCard";
// import { MdEmail, MdMyLocation, MdPhone } from "react-icons/md";
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
    img: HiUserPlus,
    iconsColor: "orange",
    description:
      "Login now or create and account, input your information to have an access to the platform",
  },
  {
    id: 2,
    title: "Buy a licence",
    img: ImKey,
    iconColor: "purple",
    description: "Choose a licence plan that satisfy your need and budget",
  },
  {
    id: 3,
    title: "Generate Surveys",
    img: BsCalculator,
    iconsColor: "red",
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
  img?: React.ElementType;
  title?: string;
  description?: string;
  iconColor?: string;
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

    // console.log(data);

    // const options = {
    //   // method: 'POST',
    //   headers: {
    //     Accept: "application/json;charset=UTF-8",
    //   },
    // };

    // const res = await axios
    //   .post(
    //     "https://surveyplanner.pythonanywhere.com/auth/users/",
    //     data,
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
  // const { addToStore } = usePlanContext();
  // const [user, setUser] = useState(null);
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
  useEffect(() => {
    const getplan = async () => {
      await getPlanData();
    };

    getplan();
  }, []);

  if (status === "authenticated") {
    router.push("/admin/default");
    // getSubscriptionData();
    // console.log(session);
  } else {
    return (
      <>
        <Navbar />
        <Box w="100vw">
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
          <Section bg="white">
            <Box w="100vw" py="1%">
              <Box my="5px" px="6%" mb="2%">
                <Heading as="h2" size="sm" color="primary.500">
                  How it works ?
                </Heading>
                <Heading
                  data-cy="process-step"
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
                      img={stage.img}
                      title={stage.title}
                      description={stage.description}
                      iconColor={stage.iconColor}
                    />
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
          </Section>

          <Section bg="white">
            <Flex
              flexDirection={{ base: "column", md: "row", lg: "row" }}
              w="100vw"
              // pt="5"
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
                  fontSize={{ base: "14px", md: "16px", lg: "17px" }}
                  fontWeight="normal"
                  lineHeight={{ base: "20px", lg: "29px" }}
                >
                  Our company provides innovative software solutions for
                  hydrographic surveying, enabling users to easily collect and
                  analyze high-quality data for mapping underwater environments.
                  Our user-friendly software delivers powerful tools for
                  real-time data analysis and visualization, making it a
                  valuable tool for a range of applications in the marine
                  industry.
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
                  // bg-local
                ></Box>
              </Box>
            </Flex>
          </Section>

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
                  _hover={{
                    scale: 1.5,
                  }}
                >
                  <Image
                    src={slide.image}
                    alt="holder image"
                    w="250px"
                    h="200px"
                    borderRadius="7px"
                    boxShadow="lg"
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
              <TabList
                justifyContent="center"
                mb={{ base: "40px", lg: "70px" }}
              >
                <Tab
                  bg="white"
                  borderLeftRadius="10px"
                  shadow="md"
                  color="primary.500"
                  py="3"
                  px={{ base: "5", md: "10", lg: "20" }}
                  fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                  fontWeight="semibold"
                  _selected={{
                    bg: "primary.500",
                    color: "white",
                    borderLeftRadius: "10px",
                  }}
                >
                  Monthly
                </Tab>
                <Tab
                  bg="white"
                  borderRightRadius="10px"
                  shadow="md"
                  color="primary.500"
                  py="3"
                  px={{ base: "5", md: "10", lg: "20" }}
                  fontSize={{ base: "15px", md: "18px", lg: "20px" }}
                  fontWeight="semibold"
                  _selected={{
                    bg: "primary.500",
                    color: "white",
                    borderRightRadius: "10px",
                  }}
                >
                  Annually
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SimpleGrid columns={4} spacing="15" minChildWidth="250px">
                    {plans &&
                      plans.map((x: PricingProps) => (
                        <PricingCard
                          data-cy="pricing-cards"
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
                      _focus={{ bg: "primary.400" }}
                      _hover={{ bg: "primary.400" }}
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
            <Container maxW="container.xl" centerContent>
              <Card boxShadow="2xl" borderRadius="5px">
                <Flex direction={{ base: "column", md: "column", lg: "row" }}>
                  <Box
                    width={{ base: "100%", md: "100%", lg: "600px" }}
                    px="95px"
                    mt="50px"
                  >
                    <form onSubmit={handleSubmit}>
                      <Heading as="h2" my="30px">
                        Lets get in touch
                      </Heading>
                      <Text>Got any questions for use? let us know</Text>
                      <Box mt="25px" mb="100px">
                        <FormControl isRequired mb="25px">
                          <FormLabel color="#3C3C3C">Name</FormLabel>
                          <Input
                            id="firstName"
                            name="firstName"
                            variant="rounded"
                            type="text"
                            px="1"
                            fontSize="sm"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormControl>

                        <FormControl isRequired mb="25px">
                          <FormLabel color="#3C3C3C">Email</FormLabel>
                          <Input
                            id="email"
                            name="email"
                            variant="rounded"
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
                            variant="rounded"
                            type="tel"
                            px="1"
                            fontSize="sm"
                            placeholder="+1(567)123-4567"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel color="#3C3C3C">message</FormLabel>
                          <Textarea
                            id="message"
                            name="message"
                            px="1"
                            fontSize="sm"
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormControl>

                        <Button
                          variant="homePrimary"
                          w="full"
                          disabled={isSubmitting}
                          type="submit"
                          py="6px"
                          mt="10"
                          px="70px"
                          mb={2}
                        >
                          Contact us
                        </Button>

                        <Text textAlign="center">
                          We will reply as soon as possible we promise
                        </Text>
                      </Box>
                    </form>
                  </Box>

                  <Divider orientation="vertical" colorScheme="gray" />

                  <Box
                    width={{ base: "100%", md: "100%", lg: "600px" }}
                    px="95px"
                    mt="60px"
                  >
                    <Image
                      src="/contact.jpg"
                      alt="contact image"
                      width="450px"
                      height="330px"
                      objectFit="cover"
                      borderRadius="16px"
                    />
                    <Heading as="h3" fontSize="64px" mt="40px">
                      Do you have a question ?
                    </Heading>
                    <Text mt="20px" mb="30px">
                      Thank you for reaching out to us! We value your inquiry
                      and strive to provide prompt assistance. our dedicated
                      team will review your message and respond to you shortly
                    </Text>
                    <Text mb="12px">Feel free to contact us here</Text>
                    <Text fontSize="22px">
                      Call:{" "}
                      <Text as="span" color="primary.500">
                        +1 (555) 123-4567
                      </Text>
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Container>
          </Box>

          <Footer />
        </Box>
      </>
    );
  }
}
