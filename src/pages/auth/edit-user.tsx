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
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  HStack,
  useToast,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";

import { useSession } from "next-auth/react";
import axios from "axios";
import AdminLayout from "layouts/admin";
import SetPassword from "views/admin/profile/components/SetPassword";
import SetEmail from "views/admin/profile/components/SetEmail";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axiosConfig from "axiosConfig";
import Select from "react-select";
import { useFormik } from "formik";
import styles from "../../styles/PhoneNumbr.module.css";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  // phone_number: Yup.string().required("Country is required"),
  user_type: Yup.string().required("User type required"),
});

export default function EditUser() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [, setUser] = React.useState<any>();
  const [error, setError] = React.useState(null);
  // const [canEdit, setCanEdit] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [emailModal, setEmailModal] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone_number, setPhone_number] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [createObjectURL, setCreateObjectURL] = React.useState(null);

  const { data: session } = useSession();

  // chakra toast
  const toast = useToast();

  // open password reset modal
  const toggleModal = (state: boolean | ((prevState: boolean) => boolean)) => {
    setIsOpen(state);
  };

  // open Email reset modal
  const toggleEmailModal = (
    state: boolean | ((prevState: boolean) => boolean)
  ) => {
    setEmailModal(state);
  };

  // function to upddate user
  const handleSubmit = async () => {
    setSubmitting(true);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("phone_number", phone_number);
    formData.append("user_type", session?.user?.data?.user_profile?.user_type);
    if (image != null) {
      formData.set("avatar", image);
    }

    const options = {
      // method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        // Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axiosConfig
      .patch(`/auth/users/me/`, formData, options)
      .then(() => {
        getUser();
        // toggleEdit();
        setSubmitting(false);
        toast({
          position: "bottom-right",
          description: "Profile update successful",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
      })
      .catch(() => {
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

  // remove user avatar
  const removeAvatar = () => {
    setImage(null);
    setCreateObjectURL(null);
  };

  // get user
  const getUser = async () => {
    await axiosConfig
      .get(`/auth/users/me/`)
      .then((res) => {
        setUser(res?.data);
        setName(res?.data?.name);
        setEmail(res?.data?.email);
        setPhone_number(res?.data?.user_profile?.phone_number);
        setCreateObjectURL(res?.data?.user_profile?.avatar);
      })
      .catch(() => {
        toast({
          position: "bottom-right",
          description: "Error getting user details",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, [session]);

  return (
    <AdminLayout>
      <Card mt={20} borderRadius="10" fontFamily="Poppins">
        <form>
          <Flex gap={20} pt={10} px={10} w="100%">
            {/* image upload */}
            <Flex alignItems="center" flexDirection="column">
              <Image
                src={createObjectURL || "/profile.png"}
                objectFit="contain"
                bg="transparent"
                width="200px"
                height="200px"
                borderRadius="lg"
              />
              <Box position="relative" overflow="hidden" my="3">
                <Button ml="10px" cursor="pointer">
                  {image ? image.name : "Upload Avatar"}
                </Button>
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
              {(image || createObjectURL) && (
                <Button onClick={removeAvatar} ml="10px" cursor="pointer">
                  Remove Avatar
                </Button>
              )}
            </Flex>

            {/* user details */}
            <Flex
              w="100%"
              mx={{ base: "auto", lg: "0px" }}
              alignItems="center"
              justifyContent="center"
              mb={{ base: "30px", md: "60px" }}
              flexDirection="column"
            >
              {error && (
                <Flex align="center" mb="25px">
                  <Text color="red.400" fontWeight="semibold" mx="14px">
                    {error}
                  </Text>
                </Flex>
              )}
              {/* Edit form begins */}
              <Flex w="100%" gap="5">
                <FormControl pb="3">
                  {/* <HStack spacing="10px"> */}
                  <FormLabel w="150px">Your name *</FormLabel>
                  <Input
                    data-cy="editName_input"
                    id="name"
                    name="name"
                    variant="flushed"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="text"
                    placeholder="Your name*"
                    mr="2px"
                    w="100%"
                    fontWeight="500"
                    size="lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/* </HStack> */}
                </FormControl>

                <FormControl w="100%">
                  {/* <HStack spacing="10px"> */}
                  <FormLabel w="150px">Phone Number</FormLabel>
                  <PhoneInput
                    placeholder="Phone Number"
                    international
                    value={phone_number}
                    onChange={setPhone_number}
                    inputComponent={Input}
                    className={styles["phone-input"]}
                  />
                  {/* </HStack> */}
                </FormControl>
              </Flex>

              <Flex w="100%" gap="5">
                <FormControl pb="3">
                  {/* <HStack spacing="10px"> */}
                  <FormLabel w="150px">Email *</FormLabel>
                  <InputGroup size="md">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      fontSize="sm"
                      placeholder="Confirm Password"
                      size="lg"
                      mt="12px"
                      variant="flushed"
                      value={email}
                    />
                    <InputRightElement
                      display="flex"
                      alignItems="center"
                      mt="15px"
                      w="max-content"
                    >
                      <Button
                        bg="none"
                        color="primary.500"
                        _hover={{ bg: "none", color: "primary.600" }}
                        onClick={() => toggleEmailModal(true)}
                      >
                        Reset Email
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {/* </HStack> */}
                </FormControl>

                <FormControl pb="3">
                  <FormLabel w="120px">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      fontSize="sm"
                      placeholder="Confirm Password"
                      size="lg"
                      mt="12px"
                      variant="flushed"
                      type="password"
                      value="password"
                    />
                    <InputRightElement
                      display="flex"
                      alignItems="center"
                      mt="15px"
                      w="max-content"
                    >
                      <Button
                        bg="none"
                        color="primary.500"
                        _hover={{ bg: "none", color: "primary.600" }}
                        onClick={() => toggleModal(true)}
                      >
                        Reset Password
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Flex>
              <Flex w="100%" gap="20px" mt={5}>
                <Button
                  // isLoading={formik.isSubmitting}
                  onClick={handleSubmit}
                  fontSize="sm"
                  variant="homePrimary"
                  bg="primary.600"
                  fontWeight="500"
                  py="0"
                  h="40px"
                >
                  Save
                </Button>
                <Button
                  onClick={() => router.back()}
                  fontSize="sm"
                  variant="outline"
                  py="0"
                  h="40px"
                  px="5"
                  fontWeight="500"
                >
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </form>
        <SetPassword toggleModal={toggleModal} opened={isOpen} />
        <SetEmail toggleEmailModal={toggleEmailModal} opened={emailModal} />
      </Card>
    </AdminLayout>
  );
}

EditUser.requireAuth = true;
