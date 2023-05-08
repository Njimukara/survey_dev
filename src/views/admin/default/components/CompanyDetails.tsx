// Chakra imports
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import Projects from "views/admin/profile/components/CompanyUsers";

import { NextAvatar } from "components/image/Avatar";
// import { signOut, useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RegisterCompany from "./RegisterCompany";
import CompanyUsers from "views/admin/profile/components/CompanyUsers";
import { string } from "yup";

interface Company {
  name: string;
  logo: string;
  country: string;
  city: string;
  state?: string;
  zip_code?: string;
  street_address?: string;
}

export default function CompanyDetails(props: {
  company: Company;
  hasDetails: boolean;
  [x: string]: any;
}) {
  const { hasDetails, toggleHasDetails, company, ...rest } = props;

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  // Constant variables
  // const { data: session, status } = useSession()

  // const date = new Date(date_joined).toLocaleDateString()
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState("");

  // state for user invite
  const [modalState, setModalState] = useState(false);

  // toggle company user invite modal
  const toggleCompanyUserModal = (state: boolean) => {
    setModalState(state);
  };

  // toggle company Registration modal
  const toggleModal = (state: boolean) => {
    setIsOpen(state);
  };

  const toggleDetails = (state: boolean) => {
    toggleHasDetails(state);
  };

  // get country name from iso code
  const countryNameFromIso = (countryCode: any) => {
    const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
      type: "region",
    });
    let tempCountry = countryCode;
    tempCountry = regionNamesInEnglish.of(tempCountry);
    return tempCountry;
  };

  useEffect(() => {
    // get country name from iso code
    if (company != undefined) {
      let tempCountry = company?.country;
      tempCountry = countryNameFromIso(tempCountry);
      setCountry(tempCountry);
    }
  }, [company, hasDetails]);

  if (!hasDetails) {
    return (
      <Card mb="20px" {...rest}>
        <Flex
          id="registerCompany"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={15}
        >
          <Text py={4}>No Company associated with this account yet</Text>
          <Button
            variant="outline"
            py="6"
            px="4"
            onClick={() => {
              toggleModal(true);
            }}
          >
            Register Company
          </Button>
        </Flex>
        <RegisterCompany
          opened={isOpen}
          toggleModal={toggleModal}
          toggleDetails={toggleDetails}
        />
      </Card>
    );
  }

  return (
    <Card mb={{ base: "0px", lg: "20px" }} {...rest}>
      <Flex>
        <Flex
          px={5}
          w="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Flex
            w="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box w="95%" bg="gray.50" h="100" borderRadius="10" boxShadow="sm">
              <Box mt="12">
                <NextAvatar
                  mx="auto"
                  src={company?.logo}
                  alt={company?.name}
                  h="87px"
                  w="87px"
                  border="4px solid"
                  boxShadow="md"
                  borderColor={borderColor}
                />
              </Box>
            </Box>
            <Box w="100%" mt="10" px="5">
              <Text
                pb={4}
                fontWeight="bold"
                color="primary.500"
                fontSize="23px"
                textAlign="center"
              >
                {company?.name}
              </Text>
              <SimpleGrid w="100%" columns={3} spacing={10}>
                <Box>
                  <Text color="gray.400" transform="capitalize">
                    Country
                  </Text>
                  <Text>{country}</Text>
                </Box>

                <Box>
                  <Text color="gray.400" transform="capitalize">
                    State
                  </Text>
                  <Text>{company?.state}</Text>
                </Box>

                <Box>
                  <Text color="gray.400" transform="capitalize">
                    City
                  </Text>
                  <Text>{company?.city}</Text>
                </Box>

                <Box>
                  <Text color="gray.400" transform="capitalize">
                    Street Address
                  </Text>
                  <Text>{company?.street_address}</Text>
                </Box>

                <Box>
                  <Text color="gray.400" transform="capitalize">
                    Zip Code
                  </Text>
                  <Text>{company?.zip_code}</Text>
                </Box>

                <Box>
                  <Text color="gray.400" transform="capitalize">
                    {/* Admin: {company?.owner} */}
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>
          </Flex>
          {/* <Flex pb={4} align="center" justify="space-between"></Flex> */}

          <Button
            onClick={() => router.push("/company/edit-company")}
            mb={2}
            mt={8}
            variant="homePrimary"
            py="5"
            bg="primary.500"
            color="white"
          >
            Edit info
          </Button>
        </Flex>
        {/* <Flex w="70%">
          {hasDetails && (
            <CompanyUsers
              toggleModal={toggleCompanyUserModal}
              isOpen={modalState}
              company={company}
            />
          )}
        </Flex> */}
      </Flex>
    </Card>
  );
}
