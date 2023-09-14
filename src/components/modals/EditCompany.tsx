// Chakra imports
import {
  Button,
  Flex,
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
  useToast,
  Image,
  Box,
} from "@chakra-ui/react";
import Card from "components/card/Card";

import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import axiosConfig from "axiosConfig";
import useInvitations from "utils/useInvitations";
import { Country, City } from "country-state-city";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { fetchCompanyData } from "redux/companySlice";
import axios from "axios";
import { useSession } from "next-auth/react";

const reactSelectStyles = {
  control: (defaultStyles: any) => ({
    ...defaultStyles,
    backgroundColor: "transparent",
    borderColor: "none",
    border: "none",
    color: "black",
    marginTop: "-8px",
    paddingBottom: "0",
    borderBottom: "1px solid grey",
    borderRadius: "0",
    boxShadow: "none",
  }),
  singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "black" }),
};

const countryNameFromIso = (countryCode: any) => {
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  // console.log(regionNamesInEnglish);
  let tempCountry = regionNamesInEnglish?.of(countryCode);
  return tempCountry;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Company Name is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  address: Yup.string().required("Address is required"),
});

// const validationSchema = Yup.object().shape({});

export default function EditCompanyModal(props: { [x: string]: any }) {
  let { getInvitations, toggleModal, opened, ...rest } = props;

  const [country, setCountry] = useState<any>(null);
  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const companyData = useSelector(
    (state: RootState) => state.reduxStore.company
  );
  const { company } = companyData;
  const dispatch = useDispatch<AppDispatch>();
  const [imageSrc] = useState("/logo.png");
  const { data: session } = useSession();

  const handleSubmit = async (values: any) => {
    console.log(values);
    // setError(null);

    let formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("country", values.country);
    formdata.append("city", values.city);
    formdata.append("state", values.state);
    formdata.append("street_address", values.address);
    formdata.append("zip_code", values.zipCode);
    if (values.logo != "") {
      formdata.append("logo", values.logo);
    }

    const headerOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",

        // Authorization: `Token ${session?.user?.auth_token}`,
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
        toast({
          position: "bottom-right",
          description: "Company update successful",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          position: "bottom-right",
          description: `${err.response.data.logo[0]} || Company update failed`,
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      });
  };

  const initialValues = {
    name: company?.name || "",
    country: company?.country || "",
    state: company?.state || "",
    city: company?.city || "",
    zipCode: company?.zip_code || "",
    address: company?.street_address || "",
    logo: company?.logo || "",
    imageSrc: imageSrc,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    let tempcountry = countryNameFromIso(company?.country);
    let tempIso = company?.country;
    setCountry({ value: tempIso, label: tempcountry });

    if (company?.logo !== "") {
      formik.setFieldValue("imageSrc", company.logo);
    }
  }, [company]);

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

  // chakra toast
  const toast = useToast();

  const closeModal = () => {
    formik.resetForm();
    toggleModal(false);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      formik.values.logo = objectURL;

      formik.setFieldValue("imageSrc", objectURL);
      formik.setFieldValue("logo", file);
    }
  };

  const changeHandler = (value: any) => {
    setCountry(value);
    formik.setFieldValue("country", value.value?.isoCode);
  };

  return (
    <Modal
      onClose={() => toggleModal(false)}
      isOpen={opened}
      motionPreset="slideInBottom"
      size="2xl"
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
        <ModalHeader>Edit Company</ModalHeader>
        <ModalCloseButton onClick={closeModal} />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Card
              justifyContent="center"
              //   flexDirection="column"
              fontFamily="Poppins"
              w="100%"
              mb="0px"
              {...rest}
            >
              <Flex>
                <VStack flex="1">
                  <Flex gap="4" w="100%" mb="15px">
                    <FormControl>
                      <FormLabel fontSize="sm" color={textColorSecondary}>
                        Company Name
                      </FormLabel>
                      <Input
                        id="name"
                        name="name"
                        variant="flushed"
                        fontSize="sm"
                        type="text"
                        placeholder="Company Name"
                        fontWeight="400"
                        size="sm"
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <Text color="red" fontSize="xs">
                          {formik.errors.name as ReactNode}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="sm" color={textColorSecondary}>
                        Country
                      </FormLabel>
                      <Select
                        styles={reactSelectStyles}
                        options={options}
                        placeholder="select country"
                        value={country}
                        onChange={changeHandler}
                      />
                      {formik.touched.country && formik.errors.country && (
                        <Text color="red" fontSize="xs">
                          {formik.errors.country as ReactNode}
                        </Text>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex gap="4" w="100%" mb="15px">
                    <FormControl>
                      <FormLabel fontSize="sm" color={textColorSecondary}>
                        State
                      </FormLabel>
                      <Input
                        id="state"
                        name="state"
                        variant="flushed"
                        fontSize="sm"
                        type="text"
                        placeholder="state"
                        fontWeight="400"
                        size="sm"
                        {...formik.getFieldProps("state")}
                      />
                      {formik.touched.state && formik.errors.state && (
                        <Text color="red" fontSize="xs">
                          {formik.errors.state as ReactNode}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="sm" color={textColorSecondary}>
                        City
                      </FormLabel>
                      <Input
                        id="city"
                        name="city"
                        variant="flushed"
                        fontSize="sm"
                        type="text"
                        placeholder="city"
                        fontWeight="400"
                        size="sm"
                        {...formik.getFieldProps("city")}
                      />
                      {formik.touched.city && formik.errors.city && (
                        <Text color="red" fontSize="xs">
                          {formik.errors.city as ReactNode}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="sm" color={textColorSecondary}>
                        Zip Code
                      </FormLabel>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        variant="flushed"
                        fontSize="sm"
                        type="text"
                        placeholder="Zip Code"
                        fontWeight="400"
                        size="sm"
                        {...formik.getFieldProps("zipCode")}
                      />
                      {formik.touched.zipCode && formik.errors.zipCode && (
                        <Text color="red" fontSize="xs">
                          {formik.errors.zipCode as ReactNode}
                        </Text>
                      )}
                    </FormControl>
                  </Flex>
                  <FormControl mb="15px">
                    <FormLabel fontSize="sm" color={textColorSecondary}>
                      Address
                    </FormLabel>
                    <Input
                      id="address"
                      name="address"
                      variant="flushed"
                      fontSize="sm"
                      type="text"
                      placeholder="Address"
                      fontWeight="400"
                      size="sm"
                      {...formik.getFieldProps("address")}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <Text color="red" fontSize="xs">
                        {formik.errors.address as ReactNode}
                      </Text>
                    )}
                  </FormControl>
                  <Flex alignItems="center" w="100%">
                    <Image
                      src={formik.values.imageSrc}
                      objectFit="cover"
                      bg="transparent"
                      width="50px"
                      height="50px"
                      borderRadius="lg"
                      alt="company logo"
                    />
                    <Box position="relative" overflow="hidden" my="3">
                      <Button ml="10px" cursor="pointer">
                        {"Upload company logo"}
                      </Button>
                      <Input
                        onChange={handleImageChange}
                        position="absolute"
                        left="0"
                        opacity="0"
                        type="file"
                        name="myfile"
                        accept="image/x-png,image/gif,image/jpeg,image/avif"
                      />
                    </Box>
                  </Flex>
                </VStack>
              </Flex>
            </Card>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup variant="homePrimary" spacing="6">
              <Button
                h="40px"
                px="8"
                isDisabled={!formik.isValid}
                isLoading={formik.isSubmitting}
                colorScheme="blue"
                type="submit"
                //   onClick={onSubmit}
              >
                Save
              </Button>
              <Button
                variant="outline"
                py="0"
                h="40px"
                px="8"
                onClick={closeModal}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
