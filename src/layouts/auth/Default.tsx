// Chakra imports
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
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
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(2, 1fr)",
      }}
      h="100vh"
      gap={{ base: 0, md: 10, lg: 6 }}
      bg={authBg}
    >
      <GridItem
        display={{ base: "none", md: "grid", lg: "grid" }}
        w={{ base: 0, md: "100%", lg: "100%" }}
        mt="5"
        ml="4"
        h="95vh"
      >
        <Flex
          bgImg='linear-gradient(rgba(0, 76, 252, 0.43), rgba(0, 76, 252, 0.43)), url("/gnss.png")'
          justify="center"
          align="start"
          w="100%"
          h="100%"
          bgSize="cover"
          bgPosition="50%"
          borderRadius="20px"
        />
        <Flex
          flexDirection="column"
          position="absolute"
          color="white"
          left={{ base: "0%", md: "0%", lg: "10%" }}
          top="50%"
          px={{ base: 0, md: "20px", lg: 0 }}
        >
          <Text textAlign="center" fontSize="30px" fontWeight="bold">
            Welcome to Survey Planner
          </Text>
          <Text
            textAlign="center"
            fontSize="20px"
            letterSpacing="wide"
            opacity="0.8"
          >
            The Fastest solution to generate hydrographic surveys
          </Text>
        </Flex>
      </GridItem>
      <GridItem w="100%" my="auto">
        <Flex justifyContent="center" alignItems="center">
          {children}
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default AuthIllustration;
