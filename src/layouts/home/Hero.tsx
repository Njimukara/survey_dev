import React from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  VStack,
  Text,
  Flex,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
const Hero = () => {
  const router = useRouter();
  const primaryTextColor = useColorModeValue("gray.500", "gray.500");
  // return (
  //   <Center
  //     as="header"
  //     bgImg='linear-gradient(to right bottom, rgba(57, 101, 255, 0.90), rgba(115, 83, 255, 0.9)), url("/background-hero-3.jpg")'
  //     backgroundSize="cover"
  //     backgroundPosition="bottom"
  //     h="100vh"
  //     w="100%"
  //   >
  //     <VStack w="60rem" textAlign="center" mt="8rem" spacing="9">
  //       <Heading
  //         data-cy="welcome-text"
  //         as="h1"
  //         fontSize={{ base: "16px", md: "40px", lg: "64px" }}
  //         color="white"
  //         letterSpacing="2px"
  //         mb="2"
  //       >
  //         The Fastest solution to generate hydrographic surveys
  //       </Heading>

  //       <Text
  //         w="40rem"
  //         fontSize={{ base: "14px", md: "24px", lg: "28px" }}
  //         color="white"
  //         lineHeight="9"
  //       >
  //         Much more than just a software, we provide an easy made solution for
  //         you to generate your surveys
  //       </Text>

  //       <Button
  //         variant="homeWhite"
  //         py="6"
  //         _focus={{ bg: "gray.100" }}
  //         onClick={() => {
  //           router.push("/auth/signin");
  //         }}
  //       >
  //         Buy a licence
  //       </Button>
  //     </VStack>
  //   </Center>
  // );

  return (
    <Flex w="100%">
      <Flex
        // flex="20%"
        display={{ base: "none", md: "none", lg: "flex" }}
        flex={{ base: "0", md: "0", lg: "24%" }}
        flexDirection="column"
        // alignItems="center"
        justifyContent="center"
        bg={"#F5F5F5"}
        zIndex={10}
      >
        {/* <VStack textAlign="center" mt="8rem" spacing="9"> */}
        <Box ml={{ base: "5%", md: "10%", lg: "15%" }} pr="5">
          <Heading
            data-cy="welcome-text"
            as="h1"
            mt="15%"
            fontSize={{ base: "32px", md: "32px", lg: "41px" }}
            fontWeight="700"
            letterSpacing="2px"
            lineHeight={"72px"}
            textTransform="capitalize"
          >
            The Fastest solution to
          </Heading>
          <Heading
            data-cy="welcome-text"
            as="h1"
            fontSize={{ base: "32px", md: "32px", lg: "41px" }}
            fontWeight="700"
            letterSpacing="2px"
            lineHeight={"72px"}
            textTransform="capitalize"
          >
            generate
            <span style={{ color: "#3203FC" }}> hydrographic </span>
          </Heading>
          <Heading
            data-cy="welcome-text"
            as="h1"
            fontSize={{ base: "32px", md: "32px", lg: "41px" }}
            fontWeight="700"
            letterSpacing="2px"
            lineHeight={"72px"}
            textTransform="capitalize"
            mb="5"
          >
            <span style={{ color: "#3203FC" }}> surveys</span>
          </Heading>

          <Text
            w="40rem"
            fontSize="16px"
            lineHeight="27px"
            color={primaryTextColor}
            overflowX="hidden"
            mb="5%"
          >
            Much more than just a software, we provide an easy made solution for
            you to generate your surveys
          </Text>

          <Flex alignItems="center" gap="5">
            <Link as={NextLink} href="#pricing">
              <Button
                variant="homePrimary"
                py="0"
                w="150px"
                h="48px"
                fontSize="16px"
                fontWeight="500"
              >
                Buy a licence
              </Button>
            </Link>

            <Button
              variant="homeWhite"
              py="0"
              w="150px"
              h="48px"
              fontSize="16px"
              fontWeight="500"
              color="primary.500"
              _focus={{ bg: "gray.100" }}
              borderColor="primary.500"
              backgroundColor="transparent"
              border="2px"
              onClick={() => router.push("/auth/signin")}
            >
              Try Now
            </Button>
          </Flex>
        </Box>
        {/* </VStack> */}
      </Flex>

      <Center
        // flex="70%"
        flex={{ base: "100%", md: "100%", lg: "70%" }}
        as="header"
        bgImg='linear-gradient(to right, #F5F5F5, rgba(255, 255, 255, 0.1)), url("/ship.jpeg")'
        backgroundSize="cover"
        backgroundPosition="bottom"
        h="100vh"
        w="100%"
      >
        {/* 
        This is the mobile view of the Hero section
       */}
        <Flex
          display={{ base: "flex", md: "flex", lg: "none" }}
          flex={{ base: "0", md: "0", lg: "20%" }}
          flexDirection="column"
          justifyContent="center"
          w="100%"
        >
          <Box ml={{ base: "5%", md: "10%", lg: "15%" }}>
            <Heading
              as="h1"
              mt="15%"
              fontSize={{ base: "32px", md: "32px", lg: "44px" }}
              fontWeight="600"
              letterSpacing="2px"
              lineHeight={"72px"}
              textTransform="capitalize"
              mb="10"
            >
              The Fastest solution to generate{" "}
              <span style={{ color: "#3203FC" }}>hydrographic surveys</span>
            </Heading>

            <Text
              fontSize={{ base: "16px", md: "16px", lg: "20px" }}
              color={primaryTextColor}
              lineHeight="27px"
              mb="10%"
            >
              Much more than just a software, we provide an easy made solution
              for you to generate your surveys
            </Text>

            <Flex alignItems="center" gap="5">
              <Button
                variant="homePrimary"
                py="0"
                w="150px"
                h="48px"
                fontSize="16px"
                fontWeight="500"
              >
                Buy a licence
              </Button>
              <Button
                py="0"
                w="150px"
                h="48px"
                variant="homeWhite"
                color="primary.500"
                _focus={{ bg: "gray.100" }}
                borderColor="primary.500"
                backgroundColor="transparent"
                border="2px"
                fontSize={"12px"}
              >
                Try Now
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Center>
    </Flex>
  );
};

export default Hero;
