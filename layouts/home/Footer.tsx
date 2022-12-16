import React from "react";
import Link from "next/link";
import { Box, Center, Flex, Grid, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import { HSeparator } from "../../components/separator/Separator";

const Footer = ({ children }: any) => {
  return (
    <Box as="footer" pt="5px" bg="secondary.500">
      {children}
      <Box>
        <HSeparator width="960px" mt="60px" mx="auto" />
        <Flex width="980px" mx="auto" my="50px">
          <Box fontSize="24px" fontWeight="600">
            <Link href="/">SurveyPlanner</Link>
          </Box>
          <Spacer />
          <Grid templateColumns='repeat(4, 1fr)' gap={3} fontSize="18px" fontWeight="600">
            <Link href="/">Home</Link>
            <Link href="/service">Service</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/pricing">Resources</Link>
          </Grid>
        </Flex>
        <Center mx="auto" fontWeight="600" py="30px">
          Copyright © 2022 SurveyPlanner. All Rights Reseved.
        </Center>
      </Box>
    </Box>
  );
};

export default Footer;
