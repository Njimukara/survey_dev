// Chakra imports
import { Box, Flex, Icon, useColorModeValue, Text } from "@chakra-ui/react";
import Footer from "../home/Footer";
// Assets
import Link from "next/link";
import { ReactNode } from "react";

function AuthIllustration(props: {
  children: ReactNode;
  illustrationBackground: string;
}) {
  const authBg = useColorModeValue("white", "navy.900");
  const { children, illustrationBackground } = props;
  // Chakra color mode
  return (
    <Flex minW="100vw" bg={authBg} position="relative" h="max-content">
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "100vh",
        }}
        w="100%"
        maxW={{ md: "100vh", lg: "80%" }}
        mx="auto"
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent="start"
        alignItems="end"
        direction="column"
      >
        <Link href="/">
          <a
            style={{
              width: "fit-content",
              paddingTop: "20px",
            }}
          >
            <Text ms="0px" fontSize="30px" fontWeight="bold">
              Survey Planner
            </Text>
          </a>
        </Link>
        {children}
        <Box
          display={{ base: "none", md: "block" }}
          h="100%"
          maxH="95vh"
          w={{ base: 0, md: "30vw", lg: "50vw" }}
          position="absolute"
          left="20px"
          right="20px"
          bottom="20px"
        >
          <Flex
            bgImg='linear-gradient(rgba(0, 76, 252, 0.43), rgba(0, 76, 252, 0.43)), url("/gnss.png")'
            justify="center"
            align="start"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderRadius="15px"
          />
          <Flex
            flexDirection="column"
            position="absolute"
            color="white"
            left="10%"
            top="70%"
          >
            <Text fontSize="30px" fontWeight="bold">
              Survey Planner
            </Text>
            <Text fontSize="20px" letterSpacing="wide" opacity="0.8">
              The Fastest solution to generate hydrographic surveys
            </Text>
          </Flex>
        </Box>

        {/* <Flex justifyContent="center" alignItems="center" w="100%" mt="100px">
          <Footer />
        </Flex> */}
      </Flex>
    </Flex>
  );
}

export default AuthIllustration;
