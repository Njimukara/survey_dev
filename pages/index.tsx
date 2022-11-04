import type { NextPage } from "next";

import { Container, Heading, Box, SimpleGrid, Text, Icon, Center, VStack, Square } from "@chakra-ui/react";
import {HiUserPlus} from 'react-icons/hi2';
import {ImKey} from 'react-icons/im';
import {BsCalculator} from 'react-icons/bs';
import Hero from "../layouts/home/Hero";
import Section from "../layouts/home/Section";

const Home: NextPage = () => {
  return (
    <Box p={0}>
      <Hero />
      {/* How it works section  */}
      <Section title="How it Works ?">
        <SimpleGrid textAlign="center" minW='90%' spacing='40px' minChildWidth="200px">
          <VStack spacing={4} >
            <Square size={100} boxShadow='2xl' bg="orange" borderRadius="10px" mb="8px">
              <Icon as={HiUserPlus} w={10} h={10} color="white"/>
            </Square>
            <Text fontSize="xl" fontWeight="bold">1. Create an account</Text>
            <Text>
              Login now or create and account, input your information to have an access to the platform
            </Text>
          </VStack>
          <VStack spacing={4}>
          <Square size={100} boxShadow='2xl' bg="purple" borderRadius="10px" mb="8px">
              <Icon as={ImKey} w={10} h={10} color="white"/>
            </Square>
            <Text  fontSize="xl" fontWeight="bold">2. Buy a licence</Text>
            <Text>Choose a licence plan that satisfy your need and budget</Text>
          </VStack>
          <VStack spacing={4}>
          <Square size={100} boxShadow='2xl' bg="red.500" borderRadius="10px" mb="8px">
              <Icon as={BsCalculator} w={10} h={10} color="white"/>
            </Square>
            <Text  fontSize="xl" fontWeight="bold">3. Generate Surveys</Text>
            <Text>As soon as you get your licence plan, you can now generate surveys</Text>
          </VStack>
        </SimpleGrid>
      </Section>
    </Box>
  );
};

export default Home;
