import React from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
const Hero = () => {
  const router = useRouter();
  return (
    <Center
      as="header"
      bgImg='linear-gradient(to right bottom, rgba(57, 101, 255, 0.90), rgba(115, 83, 255, 0.9)), url("/background-hero-3.jpg")'
      backgroundSize="cover"
      backgroundPosition="bottom"
      h="100vh"
      w="100%"
    >
      <VStack w="60rem" textAlign="center" mt="8rem" spacing="9">
        <Heading
          as="h1"
          fontSize="64px"
          color="white"
          letterSpacing="2px"
          mb="2"
        >
          The Fastest solution to generate hydrographic surveys
        </Heading>

        <Text w="40rem" fontSize="28px" color="white" lineHeight="9">
          Much more than just a software, we provide an easy made solution for
          you to generate your surveys
        </Text>

        <Button
          variant="homeWhite"
          py="6"
          _focus={{ bg: "gray.100" }}
          onClick={() => {
            router.push("/auth/signin");
          }}
        >
          Buy a licence
        </Button>
      </VStack>
    </Center>
  );

  // return (
  //   <Flex w="100%">
  //     <Flex
  //       // flex="20%"
  //       display={{ base: "none", md: "none", lg: "flex" }}
  //       flex={{ base: "0", md: "0", lg: "20%" }}
  //       flexDirection="column"
  //       // alignItems="center"
  //       justifyContent="center"
  //       bg={"#F5F5F5"}
  //     >
  //       {/* <VStack textAlign="center" mt="8rem" spacing="9"> */}
  //       <Box ml={{ base: "5%", md: "10%", lg: "15%" }}>
  //         <Heading
  //           data-cy="welcome-text"
  //           as="h1"
  //           mt="15%"
  //           fontSize={{ base: "32px", md: "32px", lg: "46px" }}
  //           fontWeight="semibold"
  //           letterSpacing="2px"
  //           lineHeight={"1.3em"}
  //           textTransform="capitalize"
  //           mb="10"
  //         >
  //           The Fastest solution to generate
  //           <span style={{ color: "#3203FC" }}>hydrographic surveys</span>
  //         </Heading>

  //         <Text
  //           w="40rem"
  //           fontSize="20px"
  //           color="#3C3C3C"
  //           lineHeight="6"
  //           mb="10%"
  //         >
  //           Much more than just a software, we provide an easy made solution for
  //           you to generate your surveys
  //         </Text>

  //         <Flex alignItems="center" gap="5">
  //           <Button variant="homePrimary" py="6">
  //             Buy a licence
  //           </Button>
  //           <Button
  //             variant="homeWhite"
  //             color="primary.500"
  //             _focus={{ bg: "gray.100" }}
  //             borderColor="primary.500"
  //             backgroundColor="transparent"
  //             border="2px"
  //             py="6"
  //           >
  //             Try Now
  //           </Button>
  //         </Flex>
  //       </Box>
  //       {/* </VStack> */}
  //     </Flex>
  //     <Center
  //       // flex="70%"
  //       flex={{ base: "100%", md: "100%", lg: "70%" }}
  //       as="header"
  //       bgImg='linear-gradient(to right, #F5F5F5, rgba(255, 255, 255, 0.1)), url("/ship.jpeg")'
  //       backgroundSize="cover"
  //       backgroundPosition="bottom"
  //       h="100vh"
  //       w="100%"
  //     >
  //       <Flex
  //         display={{ base: "flex", md: "flex", lg: "none" }}
  //         flex={{ base: "0", md: "0", lg: "20%" }}
  //         flexDirection="column"
  //         justifyContent="center"
  //         w="100%"
  //       >
  //         <Box ml={{ base: "5%", md: "10%", lg: "15%" }}>
  //           <Heading
  //             as="h1"
  //             mt="15%"
  //             fontSize={{ base: "32px", md: "32px", lg: "46px" }}
  //             fontWeight="semibold"
  //             letterSpacing="2px"
  //             lineHeight={"1.3em"}
  //             textTransform="capitalize"
  //             mb="10"
  //           >
  //             The Fastest solution to generate{" "}
  //             <span style={{ color: "#3203FC" }}>hydrographic surveys</span>
  //           </Heading>

  //           <Text
  //             fontSize={{ base: "14px", md: "16px", lg: "20px" }}
  //             color="#3C3C3C"
  //             lineHeight="6"
  //             mb="10%"
  //           >
  //             Much more than just a software, we provide an easy made solution
  //             for you to generate your surveys
  //           </Text>

  //           <Flex alignItems="center" gap="5">
  //             <Button variant="homePrimary" py="4" fontSize={"12px"}>
  //               Buy a licence
  //             </Button>
  //             <Button
  //               variant="homeWhite"
  //               color="primary.500"
  //               _focus={{ bg: "gray.100" }}
  //               borderColor="primary.500"
  //               backgroundColor="transparent"
  //               border="2px"
  //               py="4"
  //               fontSize={"12px"}
  //             >
  //               Try Now
  //             </Button>
  //           </Flex>
  //         </Box>
  //       </Flex>
  //     </Center>
  //   </Flex>
  // );
};

export default Hero;
