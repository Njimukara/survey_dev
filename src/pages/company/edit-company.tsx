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
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  HStack,
  useToast,
  Heading,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";

// Assets

// import { useRef } from 'react'
import { useSession } from "next-auth/react";
import AdminLayout from "layouts/admin";

// react select
import { useState } from "react";
// import countryList from "react-select-country-list";
import { Country, City } from "country-state-city";
import Select from "react-select";
import axiosConfig from "axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { fetchCompanyData } from "redux/companySlice";

export default function EditCompany({ providers }: any) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  // const [company, setCompany] = useState<any>();
  const [error, setError] = useState(null);
  const [canEdit, setCanEdit] = useState(true);
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [city, setCity] = useState("");
  const [iso, setIso] = useState(null);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const companyData = useSelector(
    (state: RootState) => state.reduxStore.company
  );
  const { company } = companyData;

  // chakra toast
  const toast = useToast();

  const toggleEdit = () => {
    setCanEdit(!canEdit);
  };

  //   react-select
  // const options = useMemo(() => countryList().getData(), []);
  const options = Country.getAllCountries().map(
    (country: { latitude: any; longitude: any; isoCode: any; name: any }) => ({
      value: {
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
      },
      label: country.name,
    })
  );

  const changeHandler = (value: any) => {
    setCountry(value);
    setIso(value.value?.isoCode);
  };

  const handleSelectedCity = (option: any) => {
    setSelectedCity(option);
    setCity(option?.value?.name);
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
    formdata.append("state", state);
    formdata.append("street_address", streetAddress);
    formdata.append("zip_code", zipCode);
    if (image) {
      formdata.append("logo", image);
    }

    const headerOptions = {
      // method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axiosConfig
      .patch(
        `/api/company/update-company/${company.id}/`,
        formdata,
        headerOptions
      )
      .then((res) => {
        dispatch(
          fetchCompanyData({
            apiEndpoint: "/api/company/my-company/",
            force: true,
          })
        );
        toggleEdit();
        setSubmitting(false);
        toast({
          position: "bottom-right",
          description: "Company update successful",
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
          description: "Company update failed",
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

  const getCompany = () => {
    setName(company?.name);
    let tempcountry = countryNameFromIso(company?.country);
    let tempIso = company?.country;
    setIso(company?.country);
    setCountry({ value: tempIso, label: tempcountry });
    setSelectedCity({ label: city, value: tempIso });

    setCity(company?.city);
    setState(company?.state);
    setZipCode(company?.zip_code);
    setStreetAddress(company?.street_address);
    setCreateObjectURL(company?.logo);
  };

  useEffect(() => {
    getCompany();
  }, [session]);

  return (
    <AdminLayout>
      <Card mt={20} fontFamily="inter">
        <form>
          <Flex gap={20} pt={10} px={10} w="100%">
            {/* image upload */}
            <Flex alignItems="center" flexDirection="column">
              <Image
                src={createObjectURL ? createObjectURL : "/profile.png"}
                objectFit="contain"
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
                    data-cy="company-name-input"
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
                  <FormLabel w="160px">Country</FormLabel>
                  <Box w="100%" data-cy="country-select">
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

              <FormControl pb="3">
                <HStack spacing="10px">
                  <FormLabel w="160px">City</FormLabel>
                  <Box w="100%" data-cy="city-select">
                    <Select
                      isDisabled={canEdit}
                      styles={reactSelectStyles}
                      options={City.getCitiesOfCountry(iso)?.map(
                        (state: { name: any; countryCode: any }) => ({
                          value: {
                            name: state.name,
                            countryCode: state.countryCode,
                          },
                          label: state.name,
                        })
                      )}
                      placeholder="select city"
                      value={selectedCity}
                      onChange={handleSelectedCity}
                    />
                  </Box>
                </HStack>
              </FormControl>

              <FormControl pb="3">
                <HStack spacing="10px">
                  <FormLabel w="160px">state</FormLabel>
                  <Input
                    data-cy="state-input"
                    id="state"
                    name="state"
                    variant="rounded"
                    fontSize="sm"
                    type="text"
                    placeholder="State"
                    fontWeight="500"
                    size="lg"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    isDisabled={canEdit}
                  />
                </HStack>
              </FormControl>

              <FormControl pb="3">
                <HStack spacing="10px">
                  <FormLabel w="160px">Zip Code</FormLabel>
                  <Input
                    data-cy="zip-code-input"
                    id="zipCode"
                    name="zipCode"
                    variant="rounded"
                    fontSize="sm"
                    type="text"
                    placeholder="Zip Code"
                    fontWeight="500"
                    size="lg"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    isDisabled={canEdit}
                  />
                </HStack>
              </FormControl>

              <FormControl pb="3">
                <HStack spacing="10px">
                  <FormLabel w="160px">Street Address</FormLabel>
                  <Input
                    data-cy="street-address-input"
                    id="streetAddress"
                    name="streetAddress"
                    variant="rounded"
                    fontSize="sm"
                    type="text"
                    placeholder="Street Address"
                    fontWeight="500"
                    size="lg"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    isDisabled={canEdit}
                  />
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
