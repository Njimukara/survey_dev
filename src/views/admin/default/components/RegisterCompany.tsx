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
import axios from "axios";
import Card from "components/card/Card";
import { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import { Country, City } from "country-state-city";
import Select from "react-select";

import { useSession } from "next-auth/react";

export default function RegisterCompany(props: { [x: string]: any }) {
  let { toggleModal, opened, toggleDetails, ...rest } = props;

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const textColordark = useColorModeValue("black", "white");

  const [companyCountry, setCompanyCountry] = useState(null);
  const [iso, setIso] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [companyCity, setCompanyCity] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageError, setImageError] = useState(null);
  const { data: session } = useSession();

  //   import React, { useState, useMemo } from 'react'

  const closeModal = () => {
    toggleModal(false);
    removeAvatar(null);
    setCompanyCountry(null);
    setCompanyName(null);
    setCompanyCity(null);
    setIso(null);
    setImageError(null);
  };
  // display uploaded logo on frontend
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      // setImageError(null)
    }
  };

  // remove company logo
  const removeAvatar = (event: any) => {
    setImage(null);
    setCreateObjectURL(null);
  };

  const onSubmit = async () => {
    if (!image) {
      setSubmitting(false);
      setImageError("please upload your company logo");
      return;
    }
    setImageError(null);
    setSubmitting(true);
    var formdata = new FormData();
    formdata.append("logo", image);
    formdata.append("name", companyName);
    formdata.append("city", companyCity);
    formdata.append("country", iso);
    formdata.append("state", state);
    formdata.append("street_address", streetAddress);
    formdata.append("zip_code", zipCode);

    // console.log(formdata);
    // setSubmitting(false)

    // headers
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .post(
        "https://surveyplanner.pythonanywhere.com/api/company/create/",
        formdata,
        config
      )
      .then((res) => {
        // console.log(res);
        setSubmitting(false);
        toggleDetails(true);
        closeModal();
      })
      .catch((error) => {
        // console.log(error);
        toggleDetails(false);
        setSubmitting(false);
      });
  };

  // const options = useMemo(() => countryList().getData(), []);

  // const changeHandler = (value: any) => {
  //   setCompanyCountry(value);
  //   setIso(value.value);
  // };

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
    setCompanyCountry(value);
    setIso(value.value?.isoCode);
  };

  const handleSelectedCity = (option: any) => {
    setCompanyCity(option?.value?.name);
    setCity(option?.value?.name);
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
                    <FormControl>
                      <FormLabel fontSize="sm" color={textColorSecondary}>
                        Company Name
                      </FormLabel>
                      <Input
                        id="companyName"
                        name="companyName"
                        isRequired={true}
                        variant="rounded"
                        fontSize="sm"
                        ms={{ base: "0px", md: "0px" }}
                        mb="5px"
                        type="text"
                        placeholder="Company Name"
                        fontWeight="400"
                        size="md"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      {/* {errors.companyName && touched.companyName ? (
                        <FormHelperText color='red.400' mt='0' mb='5px'>
                          {errors.companyName}
                        </FormHelperText>
                      ) : (
                        ''
                      )} */}
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
                          value={companyCountry}
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
                            options={City.getCitiesOfCountry(iso)?.map(
                              (state: {
                                latitude: any;
                                longitude: any;
                                name: any;
                                stateCode: any;
                                countryCode: any;
                              }) => ({
                                value: {
                                  latitude: state.latitude,
                                  longitude: state.longitude,
                                  name: state.name,
                                  stateCode: state.stateCode,
                                  countryCode: state.countryCode,
                                },
                                label: state.name,
                              })
                            )}
                            placeholder="select city"
                            value={companyCity}
                            onChange={handleSelectedCity}
                          />
                        </Box>
                      </FormControl>

                      <FormControl pb="3">
                        <FormLabel w="160px">state</FormLabel>
                        <Input
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
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
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
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                        />
                      </FormControl>
                    </Flex>
                    <Flex alignItems="center" w="100%">
                      <Image
                        src={
                          createObjectURL == null
                            ? "/profile.png"
                            : createObjectURL
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
                          {image ? image.name : "Upload logo"}
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
                    {imageError != null ? (
                      <Text color="red.400" mt="0" mb="5px">
                        {imageError}
                      </Text>
                    ) : (
                      ""
                    )}
                  </form>
                </VStack>
              </Flex>
            </Card>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup variant="homePrimary" spacing="6">
              <Button
                isLoading={submitting}
                colorScheme="blue"
                onClick={onSubmit}
              >
                Register Company
              </Button>
              <Button
                // variant='homeWhite'
                onClick={closeModal}
              >
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
