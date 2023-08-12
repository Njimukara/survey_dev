// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";

import { NextAvatar } from "components/image/Avatar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RegisterCompany from "./RegisterCompany";

interface Company {
  name: string;
  logo: string;
  country: string;
  city: string;
  state?: string;
  zip_code?: string;
  street_address?: string;
}

const countryNameFromIso = (countryCode: string) => {
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  let tempCountry = countryCode;
  tempCountry = regionNamesInEnglish.of(tempCountry);
  return tempCountry;
};

export default function CompanyDetails(props: {
  company: Company;
  hasDetails: boolean;
  [x: string]: any;
}) {
  const { hasDetails, toggleHasDetails, company, ...rest } = props;

  const font_family = "Poppins";

  // Chakra Color Mode
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  // Constant variables
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState("");

  // toggle company Registration modal
  const toggleModal = (state: boolean) => {
    setIsOpen(state);
  };

  const toggleDetails = (state: boolean) => {
    toggleHasDetails(state);
  };

  useEffect(() => {
    if (company) {
      const tempCountry = countryNameFromIso(company?.country);
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
          fontFamily={font_family}
          py={15}
        >
          <Text py={4}>No Company associated with this account yet</Text>
          <Button
            variant="outline"
            py="0"
            h="48px"
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
      <Grid templateColumns={{ base: "1fr", md: "1fr", lg: "1fr" }} gap={6}>
        <Box>
          <Box
            w="95%"
            bg="gray.50"
            h="100"
            fontFamily={font_family}
            borderRadius="10"
            boxShadow="sm"
            mt={{ base: "12", lg: "12" }}
          >
            <Box mx="auto" w="87px" h="87px">
              <Avatar
                src={company.logo ? company?.logo : ""}
                size="2xl"
                name={company?.name}
                h="100%"
                w="100%"
                border="4px solid"
                boxShadow="md"
                borderColor={borderColor}
              />
            </Box>
          </Box>
          <Box mt="10" px="5" fontFamily={font_family}>
            <Text
              pb={4}
              fontWeight="600"
              color="primary.600"
              fontSize="23px"
              textAlign="center"
            >
              {company?.name ?? ""}
            </Text>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              <Box>
                <Text color="gray.400" transform="capitalize">
                  Country
                </Text>
                <Text>{country ?? ""}</Text>
              </Box>
              <Box>
                <Text color="gray.400" transform="capitalize">
                  State
                </Text>
                <Text>{company?.state ?? ""}</Text>
              </Box>
              <Box>
                <Text color="gray.400" transform="capitalize">
                  City
                </Text>
                <Text>{company?.city ?? ""}</Text>
              </Box>
              <Box>
                <Text color="gray.400" transform="capitalize">
                  Street Address
                </Text>
                <Text>{company?.street_address ?? ""}</Text>
              </Box>
              <Box>
                <Text color="gray.400" transform="capitalize">
                  Zip Code
                </Text>
                <Text>{company?.zip_code ?? ""}</Text>
              </Box>
              <Box>
                <Text color="gray.400" transform="capitalize">
                  {/* Admin: {company?.owner} */}
                </Text>
              </Box>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Button
            onClick={() => router.push("/company/edit-company")}
            mb={2}
            mt={{ base: "2", lg: "4" }}
            variant="homePrimary"
            py="0"
            ml="6"
            h="48px"
            bg="primary.600"
            color="white"
            fontFamily={font_family}
          >
            Edit info
          </Button>
        </Box>
      </Grid>
    </Card>
  );
}
