// Chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  FormLabel,
  useColorModeValue,
  VStack,
  FormControl,
  ButtonGroup,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useState } from "react";
import { Country, City } from "country-state-city";
import Select from "react-select";

import { useSession } from "next-auth/react";
import axiosConfig from "axiosConfig";

export default function RegisterCompany(props: { [x: string]: any }) {
  let { toggleModal, opened, toggleDetails, ...rest } = props;

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const textColordark = useColorModeValue("black", "white");

  const [companyData, setCompanyData] = useState({
    country: null,
    iso: null,
    name: "",
    city: null,
    state: "",
    zipCode: "",
    streetAddress: "",
    image: null,
    createObjectURL: null,
    submitting: false,
    imageError: null,
  });

  const { data: session } = useSession();

  //   import React, { useState, useMemo } from 'react'

  const closeModal = () => {
    toggleModal(false);
    removeAvatar();
    setCompanyData((prevState) => ({
      ...prevState,
      country: null,
      name: null,
      iso: null,
      image: null,
      createObjectURL: null,
    }));
  };
  // display uploaded logo on frontend
  const uploadToClient = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setCompanyData((prevState) => ({
        ...prevState,
        image: file,
        createObjectURL: URL.createObjectURL(file),
      }));
    }
  };

  // remove company logo
  const removeAvatar = () => {
    setCompanyData((prevState) => ({
      ...prevState,
      image: null,
      createObjectURL: null,
    }));
  };

  const onSubmit = async () => {
    const { image, name, city, iso, state, streetAddress, zipCode } =
      companyData;

    if (!image) {
      setCompanyData((prevState) => ({
        ...prevState,
        imageError: "Please upload your company logo",
      }));
      return;
    }

    setCompanyData((prevState) => ({
      ...prevState,
      imageError: null,
      submitting: true,
    }));

    var formdata = new FormData();
    formdata.append("logo", image);
    formdata.append("name", name);
    formdata.append("city", city);
    formdata.append("country", iso);
    formdata.append("state", state);
    formdata.append("street_address", streetAddress);
    formdata.append("zip_code", zipCode);

    try {
      await axiosConfig.post("/api/company/create/", formdata);
      setCompanyData((prevState) => ({
        ...prevState,
        submitting: false,
      }));
      toggleDetails(true);
      closeModal();
    } catch (error) {
      setCompanyData((prevState) => ({
        ...prevState,
        submitting: false,
      }));
      toggleDetails(false);
    }
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

  type option = {
    value: {
      latitude: string;
      longitude: string;
      isoCode: string;
    };
    label: string;
  } | null;

  type cityOption = {
    value: {
      latitude: string;
      longitude: string;
      name: string;
      stateCode: string;
      countryCode: string;
    };
    label: string;
  } | null;

  //   react-select
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
    setCompanyData((prevState) => ({
      ...prevState,
      country: value,
      iso: value?.value?.isoCode,
    }));
  };

  const handleSelectedCity = (option: cityOption) => {
    setCompanyData((prevState) => ({
      ...prevState,
      city: option?.value?.name,
    }));
  };

  return (
    <Card mb={{ base: "0px", lg: "20px" }} {...rest}>
      <Modal
        onClose={() => toggleModal(false)}
        isOpen={opened}
        motionPreset="slideInBottom"
        size="xl"
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="30%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>Register Company</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card
              justifyContent="center"
              flexDirection="column"
              w="100%"
              mb="0px"
              {...rest}
            >
              <Flex>
                <VStack flex="1">
                  <Text
                    w="100%"
                    textAlign="left"
                    fontWeight="bold"
                    color={textColordark}
                  >
                    Company Details
                  </Text>
                  <form>
                    <FormControl pb="3">
                      <FormLabel w="160px">Name</FormLabel>
                      <Input
                        id="name"
                        name="name"
                        variant="rounded"
                        fontSize="sm"
                        type="text"
                        placeholder="Name"
                        fontWeight="500"
                        size="lg"
                        value={companyData.name}
                        onChange={(e) =>
                          setCompanyData((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                    <Flex w="100%">
                      <FormControl mr="4">
                        <FormLabel fontSize="sm" color={textColorSecondary}>
                          Country
                        </FormLabel>
                        <Select
                          styles={reactSelectStyles}
                          options={options}
                          placeholder="select country"
                          value={companyData.country}
                          onChange={changeHandler}
                        />
                      </FormControl>

                      <FormControl pb="3">
                        <FormLabel w="160px">City</FormLabel>
                        <Box w="100%">
                          <Select
                            id="companyCity"
                            name="companyCity"
                            styles={reactSelectStyles}
                            options={City.getCitiesOfCountry(
                              companyData.iso
                            )?.map((state: any) => ({
                              value: {
                                latitude: state.latitude,
                                longitude: state.longitude,
                                name: state.name,
                                stateCode: state.stateCode,
                                countryCode: state.countryCode,
                              },
                              label: state.name,
                            }))}
                            placeholder="select city"
                            value={companyData.city}
                            onChange={handleSelectedCity}
                          />
                        </Box>
                      </FormControl>

                      <FormControl pb="3">
                        <FormLabel w="160px">State</FormLabel>
                        <Input
                          id="state"
                          name="state"
                          variant="rounded"
                          fontSize="sm"
                          type="text"
                          placeholder="State"
                          fontWeight="500"
                          size="lg"
                          value={companyData.state}
                          onChange={(e) =>
                            setCompanyData((prevState) => ({
                              ...prevState,
                              state: e.target.value,
                            }))
                          }
                        />
                      </FormControl>

                      <FormControl pb="3">
                        <FormLabel w="160px">Zip Code</FormLabel>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          variant="rounded"
                          fontSize="sm"
                          type="text"
                          placeholder="Zip Code"
                          fontWeight="500"
                          size="lg"
                          value={companyData.zipCode}
                          onChange={(e) =>
                            setCompanyData((prevState) => ({
                              ...prevState,
                              zipCode: e.target.value,
                            }))
                          }
                        />
                      </FormControl>

                      <FormControl pb="3">
                        <FormLabel w="160px">Street Address</FormLabel>
                        <Input
                          id="streetAddress"
                          name="streetAddress"
                          variant="rounded"
                          fontSize="sm"
                          type="text"
                          placeholder="Street Address"
                          fontWeight="500"
                          size="lg"
                          value={companyData.streetAddress}
                          onChange={(e) =>
                            setCompanyData((prevState) => ({
                              ...prevState,
                              streetAddress: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                    </Flex>
                    <Flex alignItems="center" w="100%">
                      <Image
                        src={
                          companyData.createObjectURL == null
                            ? "/profile.png"
                            : companyData.createObjectURL
                        }
                        borderRadius="10px"
                        objectFit="cover"
                        width="50px"
                        height="50px"
                        borderColor="primary.500"
                        alt=""
                      />
                      <Box position="relative" overflow="hidden" my="3">
                        <Button ml="10px" cursor="pointer">
                          {companyData.image
                            ? companyData.image.name
                            : "Upload logo"}
                        </Button>
                        <Input
                          onChange={uploadToClient}
                          position="absolute"
                          left="0"
                          opacity="0"
                          type="file"
                          name="myfile"
                          accept="image/*"
                        />
                      </Box>
                    </Flex>
                    {companyData.imageError && (
                      <Text color="red.400" mt="0" mb="5px">
                        {companyData.imageError}
                      </Text>
                    )}
                  </form>
                </VStack>
              </Flex>
            </Card>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup variant="homePrimary" spacing="6">
              <Button
                isLoading={companyData.submitting}
                colorScheme="blue"
                onClick={onSubmit}
              >
                Register Company
              </Button>
              <Button onClick={closeModal}>Close</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
