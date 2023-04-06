/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Spinner,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  HStack,
  useToast,
  Heading,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";

// Assets

// import { useRef } from 'react'
import { useSession } from "next-auth/react";
import axios from "axios";
import AdminLayout from "layouts/admin";

// react select
import { useState, useMemo, SetStateAction } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";

export default function EditCompany({ providers }: any) {
  // Chakra color mode
  const btnbgColor = useColorModeValue("primary.500", "white");
  const btnHover = useColorModeValue({ color: "white" }, { color: "white" });
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("brand.500", "white");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [company, setCompany] = useState<any>();
  const [error, setError] = useState(null);
  const [canEdit, setCanEdit] = useState(true);
  const [name, setName] = useState("");
  const [country, setCountry] = useState<any>(null);
  const [city, setCity] = useState("");
  const [iso, setIso] = useState(null);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const { data: session, status } = useSession();

  // chakra toast
  const toast = useToast();

  const toggleEdit = () => {
    setCanEdit(!canEdit);
  };

  //   react-select
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value: any) => {
    setCountry(value);
    setIso(value.value);
    console.log(country);
  };

  // css styling for react select
  const reactSelectStyles = {
    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "transparent",
      borderColor: "grey.200",
      color: "black",
      padding: "6px",
      borderRadius: "15px",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "black" }),
  };

  // function to upddate company
  const updateCompany = async () => {
    setError(null);
    if (image == "") {
      return;
    }
    setSubmitting(true);
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("country", iso || company.country);
    formdata.append("city", city);
    if (image) {
      formdata.append("logo", image);
    }
    // let body = {
    //   name: name,
    //   country: iso,
    //   city: city,
    //   logo: image,
    // };
    // console.log(body);
    const headerOptions = {
      // method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .patch(
        `https://surveyplanner.pythonanywhere.com/api/company/update-company/${company.id}/`,
        formdata,
        headerOptions
      )
      .then((res) => {
        getCompany();
        toggleEdit();
        setSubmitting(false);
        toast({
          position: "bottom-right",
          description: "Proile update successful",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      })
      .catch((err) => {
        // console.log(err);
        setError(err.response.data.logo[0]);
        setSubmitting(false);
        toast({
          position: "bottom-right",
          description: "Profile update failed",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      });
  };

  // display uploaded avatatar on frontend
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  // get country name from iso code
  const countryNameFromIso = (countryCode: any) => {
    const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
      type: "region",
    });
    let tempCountry = regionNamesInEnglish.of(countryCode);
    return tempCountry;
  };

  const getCompany = async () => {
    const headerOptions = {
      // method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .get(
        `https://surveyplanner.pythonanywhere.com/api/company/my-company/`,
        headerOptions
      )
      .then((res) => {
        // console.log(res);
        setCompany(res?.data);
        setName(res?.data?.name);
        let tempcountry = countryNameFromIso(res?.data?.country);
        let tempIso = res?.data?.country;
        setCountry({ value: tempIso, label: tempcountry });

        setCity(res?.data?.city);
        setCreateObjectURL(res?.data?.logo);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    getCompany();
  }, [session]);

  return (
    <AdminLayout>
      <Card mt={20}>
        <form>
          <Flex gap={20} pt={10} px={10} w="100%">
            {/* image upload */}
            <Flex alignItems="center" flexDirection="column">
              <Image
                src={createObjectURL ? createObjectURL : "/profile.png"}
                objectFit="fill"
                bg="transparent"
                width="350px"
                height="250px"
                borderRadius="lg"
              />
              <Box position="relative" overflow="hidden" my="3">
                {!canEdit && (
                  <Button ml="10px" cursor="pointer">
                    {image ? image.name : "Upload Avatar"}
                  </Button>
                )}
                <Input
                  onChange={uploadToClient}
                  position="absolute"
                  left="0"
                  opacity="0"
                  type="file"
                  name="myfile"
                  accept="image/x-png,image/gif,image/jpeg,image/avif"
                />
              </Box>
            </Flex>

            {/* Company details */}
            <Flex
              w="100%"
              mx={{ base: "auto", lg: "0px" }}
              //   alignItems="center"
              justifyContent="center"
              mb={{ base: "30px", md: "60px" }}
              flexDirection="column"
            >
              <Heading as="h3" fontSize="lg" mb={5}>
                Company Details
              </Heading>
              {error && (
                <Flex align="center" mb="25px">
                  <Text color="red.400" fontWeight="semibold" mx="14px">
                    {error}
                  </Text>
                </Flex>
              )}
              {/* Edit form begins */}
              <FormControl pb="3">
                <HStack spacing="10px">
                  <FormLabel w="160px">Company Name *</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    variant="rounded"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="text"
                    placeholder="Company name*"
                    mr="2px"
                    w="100%"
                    fontWeight="500"
                    size="lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isDisabled={canEdit}
                  />
                </HStack>
              </FormControl>

              <FormControl pb="3">
                <HStack spacing="10px">
                  <FormLabel w="160px">City *</FormLabel>
                  <Input
                    id="city"
                    name="city"
                    variant="rounded"
                    fontSize="sm"
                    type="country"
                    placeholder="City*"
                    fontWeight="500"
                    size="lg"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    isDisabled={canEdit}
                  />
                </HStack>
              </FormControl>

              <FormControl pb="3">
                <HStack spacing="10px">
                  <FormLabel w="160px">Country</FormLabel>
                  <Box w="100%">
                    <Select
                      isDisabled={canEdit}
                      styles={reactSelectStyles}
                      options={options}
                      placeholder="select country"
                      value={country}
                      onChange={changeHandler}
                    />
                  </Box>
                </HStack>
              </FormControl>

              {canEdit ? (
                <Flex w="100%" gap="20px" alignItems="center" pl="150px" mt={5}>
                  <Button
                    onClick={toggleEdit}
                    fontSize="sm"
                    variant="homePrimary"
                    fontWeight="500"
                    py="5"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => router.push("/admin/profile")}
                    fontSize="sm"
                    variant="outline"
                    py="4"
                    px="5"
                    fontWeight="500"
                  >
                    Return
                  </Button>
                </Flex>
              ) : (
                <Flex w="100%" gap="20px" alignItems="center" pl="150px" mt={5}>
                  <Button
                    isLoading={submitting}
                    onClick={updateCompany}
                    fontSize="sm"
                    variant="homePrimary"
                    fontWeight="500"
                    py="5"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={toggleEdit}
                    fontSize="sm"
                    variant="outline"
                    py="4"
                    px="5"
                    fontWeight="500"
                  >
                    Cancel
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </form>
      </Card>
    </AdminLayout>
  );
}

EditCompany.requireAuth = true;
