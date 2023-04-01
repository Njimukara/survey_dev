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
  Select,
  Text,
  useColorModeValue,
  HStack,
  useToast,
} from "@chakra-ui/react";

import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";

// Custom components
import Card from "components/card/Card";

// Assets

// import { useRef } from 'react'
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import AdminLayout from "layouts/admin";
import SetPassword from "views/admin/profile/components/SetPassword";

export default function EditUser({ providers }: any) {
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
  const [submitting, setSubmitting] = React.useState(false);
  const [user, setUser] = React.useState<any>();
  const [error, setError] = React.useState(null);
  const [canEdit, setCanEdit] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [createObjectURL, setCreateObjectURL] = React.useState(null);

  const { data: session, status } = useSession();

  // chakra toast
  const toast = useToast();

  const toggleEdit = () => {
    setCanEdit(!canEdit);
  };

  // open password reset modal
  const toggleModal = (state: boolean | ((prevState: boolean) => boolean)) => {
    setIsOpen(state);
  };

  // function to upddate user
  const updateUser = async () => {
    setSubmitting(true);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("user_type", session?.user?.data?.user_profile?.user_type);
    formData.set("avatar", "");
    if (image != "") {
      formData.set("avatar", image);
    }

    console.log(session?.user?.data?.user_profile?.user_type);

    const options = {
      // method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .patch(
        `https://surveyplanner.pythonanywhere.com/auth/users/me/`,
        formData,
        options
      )
      .then((res) => {
        getUser();
        toggleEdit();
        setSubmitting(false);
        toast({
          position: "bottom-right",
          description: "Profile update successful",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        // setError(err);
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
  const removeAvatar = (event: any) => {
    setImage(null);
    setCreateObjectURL(null);
  };

  const getUser = async () => {
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .get(`https://surveyplanner.pythonanywhere.com/auth/users/me/`, options)
      .then((res) => {
        console.log(res);
        setUser(res?.data);
        setName(res?.data?.name);
        setEmail(res?.data?.email);
        setCreateObjectURL(res?.data?.user_profile?.avatar);
        // router.push("/auth/verifyemail");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
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
                objectFit="contain"
                bg="transparent"
                width="370px"
                height="230px"
                borderRadius="lg"
              />
              <Box position="relative" overflow="hidden" my="3">
                {!canEdit && (
                  <Button ml="10px" cursor="pointer">
                    {image ? image.name : "Upload Avatar (optional)"}
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
              {image || (createObjectURL && !canEdit) ? (
                <Button onClick={removeAvatar} ml="10px" cursor="pointer">
                  Remove Avatar
                </Button>
              ) : null}
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
              <FormControl pb="3">
                <HStack spacing="10px">
                  <FormLabel w="150px">Your name *</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    variant="rounded"
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
                    // onBlur={handleBlur}
                    isDisabled={canEdit}
                  />
                </HStack>
              </FormControl>
              <FormControl pb="3">
                <HStack spacing="10px">
                  <FormLabel w="150px">Email *</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    variant="rounded"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="email"
                    placeholder="Email*"
                    fontWeight="500"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isDisabled={canEdit}
                  />
                </HStack>
              </FormControl>

              <FormControl pb="3">
                <Flex alignItems="center">
                  <FormLabel w="120px">Password</FormLabel>
                  <Button
                    bg="none"
                    _hover={{ bg: "none", color: "primary.300" }}
                    onClick={() => toggleModal(true)}
                  >
                    Reset Password
                  </Button>
                </Flex>
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
                    onClick={updateUser}
                    fontSize="sm"
                    variant="homePrimary"
                    fontWeight="500"
                    py="5"
                  >
                    Save
                  </Button>
                  <Button
                    // isLoading={isSubmitting}
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
        <SetPassword toggleModal={toggleModal} opened={isOpen} />
      </Card>
    </AdminLayout>
  );
}

EditUser.requireAuth = true;
