import React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { MdFacebook, MdSend } from "react-icons/md";

const Footer = () => {
  return (
    <Box as="footer" pt="5px" bg="#0A1C40E0" w="100vw">
      <SimpleGrid
        color="#B1B6C2"
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={5}
        pt="5%"
        px="10%"
      >
        {/*  */}
        <Box>
          <Heading color="white" size="md">
            <Link href="/">SurveyPlanner</Link>
          </Heading>
          <Text data-cy="footer-info" my="5">
            For any questions or assistance, please do not hesitate to reach out
            to us. We are here to help and would love to hear from you.
          </Text>
          <Flex color="white" alignItems="center" gap="5">
            <Icon as={MdFacebook} />
            <Icon as={MdFacebook} />
            <Icon as={MdFacebook} />
            <Icon as={MdFacebook} />
          </Flex>
        </Box>
        {/*  */}
        <Box ml={{ base: 0, md: "20%", lg: "30%" }}>
          <Heading color="white" size="md">
            Page Link
          </Heading>
          <List spacing={4} my="5">
            <ListItem>
              <Link href="/">Home</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Services</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Pricing</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Resources</Link>
            </ListItem>
          </List>
        </Box>
        {/*  */}
        <Box>
          <Heading color="white" size="md">
            Contact{" "}
          </Heading>
          <List spacing={3} my="5">
            <ListItem>
              <Text>
                <span style={{ color: "white" }}> Cell:</span> +1 (555) 123-4567
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                {" "}
                <span style={{ color: "white" }}> Mail: </span>
                surveyplanner@mail.com
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <span style={{ color: "white" }}> Address:</span> 12/3-A South
                RD, NYC-2312
              </Text>
            </ListItem>
          </List>
        </Box>
        {/*  */}
        <Box>
          <Heading color="white" size="md">
            Get in touch with us{" "}
          </Heading>
          <InputGroup size="md" my="5">
            <Input
              placeholder="Email"
              variant="flushed"
              color="gray.200"
              type="email"
            />
            <InputRightElement width="4.5rem">
              <Button bg="none" _hover={{ bg: "none" }} h="1.75rem" size="sm">
                <Icon as={MdSend} boxSize={4} color="white" />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </SimpleGrid>
      <Box px="10%" py="2%" color="#B1B6C2">
        <Heading color="white" size="sm">
          Resources
        </Heading>
        <Text fontSize="sm" py="2">
          <a
            href="https://www.flaticon.com/free-icons/no-data"
            title="no data icons"
          >
            Flaticons
          </a>
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
