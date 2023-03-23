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

  const { data: session, status } = useSession();

  const toggleEdit = () => {
    setCanEdit(!canEdit);
  };

  // Yup validation data schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(25, "Name is too Long!").required("Required"),
    email: Yup.string().email("Email is Invalid").required("Required"),
    usertype: Yup.string().min(1, "Invalid option"),
    avatar: Yup.string(),
  });

  const toggleModal = (state: boolean | ((prevState: boolean) => boolean)) => {
    setIsOpen(state);
  };

  const onSubmit = async (values: any, actions: any) => {
    var formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("email", values.email);
    formdata.append("user_type", values.usertype);
    formdata.append("password", values.password);
    formdata.append("re_password", values.password);

    if (image != "") {
      formdata.append("avatar", image);
    }
    formdata.append("avatar", "");

    console.log(formdata);

    const options = {
      // method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
      },
    };

    const res = await axios
      .post(
        `https://surveyplanner.pythonanywhere.com/auth/users/${user?.id}//`,
        formdata,
        options
      )
      .then((res) => {
        console.log(res);
        router.push("/auth/verifyemail");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [image, setImage] = React.useState(null);
  const [createObjectURL, setCreateObjectURL] = React.useState(null);

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

  // formik initialisation using yup validation schema
  const {
    values,
    isSubmitting,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
      usertype: user?.user_type,
      avatar: user?.avatar,
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (session != null) {
      // get invitations and company members
      setUser(session?.user?.data);
    }
  }, [session]);

  return (
    <AdminLayout>
      <Card mt={20}>
        <form onSubmit={handleSubmit}>
          <Flex gap={20} pt={10} px={10} w="100%">
            {/* image upload */}
            <Flex alignItems="center" flexDirection="column">
              <Image
                src={createObjectURL ? createObjectURL : "/profile.png"}
                objectFit="contain"
                bg="transparent"
                width="350px"
                height="300px"
              />
              <Box position="relative" overflow="hidden" my="3">
                <Button ml="10px" cursor="pointer">
                  {image ? image.name : "Upload Avatar (optional)"}
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
              {image ? (
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
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={canEdit}
                  />
                </HStack>
                {errors.name && touched.name ? (
                  <FormHelperText ml={150} color="red.400" mt="1" mb="0">
                    {errors.name}
                  </FormHelperText>
                ) : (
                  ""
                )}
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
                    // mt="12px"
                    fontWeight="500"
                    size="lg"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isDisabled={canEdit}
                  />
                </HStack>
                {errors.email && touched.email ? (
                  <FormHelperText ml={150} color="red.400" mt="1" mb="0">
                    {errors.email}.
                  </FormHelperText>
                ) : (
                  ""
                )}
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
                    type="submit"
                    onClick={toggleEdit}
                    fontSize="sm"
                    variant="homePrimary"
                    fontWeight="500"
                    py="6"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => router.push("/admin/profile")}
                    fontSize="sm"
                    variant="outline"
                    py="5"
                    px="5"
                    fontWeight="500"
                  >
                    Return
                  </Button>
                </Flex>
              ) : (
                <Flex w="100%" gap="20px" alignItems="center" pl="150px" mt={5}>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    fontSize="sm"
                    variant="homePrimary"
                    fontWeight="500"
                    py="6"
                  >
                    Save
                  </Button>
                  <Button
                    isLoading={isSubmitting}
                    onClick={toggleEdit}
                    fontSize="sm"
                    variant="outline"
                    py="5"
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
