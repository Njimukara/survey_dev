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

import React from "react";
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
} from "@chakra-ui/react";

import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";

// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuthLayout from "layouts/auth/Default";
// Assets
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

// import { useRef } from 'react'
import { signIn } from "next-auth/react";
import axios from "axios";

export default function SignIn({ providers }: any) {
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
  const [show, setShow] = React.useState(false);
  const [login, setLogin] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);

  // varaibles used for login
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  // Yup validation data schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is too Short!")
      .max(25, "Name is too Long!")
      .required("Required"),
    email: Yup.string().email("Email is Invalid").required("Required"),
    password: Yup.string()
      .min(8, "Min of 8 characters required")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("Required"),
    usertype: Yup.string().min(1, "Invalid option").required("Required"),
    avatar: Yup.string(),
  });

  const handleClick = () => setShow(!show);
  const toggleLogin = () => {
    setLogin(!login);
  };

  const Login = async () => {
    if (formData.email == "" || formData.password == "") {
      setError("Invalid Inputs");
    }
    setSubmitting(true);
    // setError(null)
    // nextauth login with credentials
    const res: any = await signIn("Credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
      // callbackurl: `${window.location.origin}`,
    });

    if (res.status == 200) {
      console.log(res);
      setSubmitting(false);
      router.push("/admin");
    } else if (res.status != 200) {
      setError("Invalid Email or Password");
      setSubmitting(false);
    }
    setSubmitting(false);
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
    const options = {
      // method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
      },
    };

    const res = await axios
      .post(
        "https://surveyplanner.pythonanywhere.com/auth/users/",
        formdata,
        options
      )
      .then((res) => {
        console.log(res);
        router.push("/auth/verifyemail");
      })
      .catch((error) => {
        console.log(error);
        let err = error.response.data.email;
        if (err != "") {
          setError(err);
        }
        setError("Server error, please try again later");
      });
  };

  const [image, setImage] = React.useState(null);
  const [createObjectURL, setCreateObjectURL] = React.useState(null);

  // display uploaded avatatar on fronend
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      usertype: "",
      avatar: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <DefaultAuthLayout illustrationBackground={"/img/auth/auth.png"}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        h="100vh"
        alignItems="center"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={login ? "8vh" : "1vh"}
        flexDirection="column"
      >
        <Box w="100%">
          <Text textAlign="center" pb="10px">
            {login
              ? "Hello! You are welcome back :-)"
              : "Welcome to Survey Planner :-)"}
          </Text>
          <Flex
            justifyContent="space-evenly"
            alignItems="center"
            h="50px"
            px="5px"
            py="5px"
            mb="15px"
            borderRadius="7px"
            bgColor={googleBg}
          >
            <Button
              bgColor={login ? btnbgColor : "transparent"}
              color={login ? "white" : "black"}
              _hover={{ color: "inherit" }}
              flex="1"
              borderRadius="5px"
              onClick={toggleLogin}
            >
              Login
            </Button>
            <Button
              bgColor={!login ? btnbgColor : "transparent"}
              color={!login ? "white" : "black"}
              _hover={{ color: "inherit" }}
              flex="1"
              borderRadius="5px"
              onClick={toggleLogin}
            >
              Register
            </Button>
          </Flex>
          {!login ? (
            <Text
              mb="10px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize="sm"
            >
              we provide an easy made solution for you to generate your surveys
            </Text>
          ) : (
            ""
          )}
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bgColor={googleBg}
            color={textColor}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Sign in with Google
          </Button>
          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              or
            </Text>
            <HSeparator />
          </Flex>
          {error && (
            <Flex w="100%" justifyContent="center" mb="5px">
              <Text color="red.400" fontWeight="semibold" mx="14px">
                {error}
              </Text>
            </Flex>
          )}
          {login ? (
            <FormControl>
              <Input
                id="loginEmail"
                isRequired={true}
                variant="rounded"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="email"
                placeholder="Email"
                mb="24px"
                fontWeight="500"
                size="lg"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <InputGroup size="md">
                <Input
                  id="loginPassword"
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Password (Min. 8 characters)"
                  mb="24px"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="rounded"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent="space-between" align="center" mb="24px">
                <FormControl display="flex" alignItems="center">
                  <Checkbox
                    id="remember-login"
                    colorScheme="brandScheme"
                    me="10px"
                  />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    fontWeight="normal"
                    color={textColor}
                    fontSize="sm"
                  >
                    Keep me logged in
                  </FormLabel>
                </FormControl>
                <Link href="/auth/reset-password">
                  <a>
                    <Text
                      color={textColorBrand}
                      fontSize="sm"
                      w="124px"
                      fontWeight="500"
                    >
                      Forgot password?
                    </Text>
                  </a>
                </Link>
              </Flex>
              <Button
                fontSize="sm"
                type="submit"
                isLoading={submitting}
                variant="homePrimary"
                fontWeight="500"
                w="100%"
                h="30"
                mb="24px"
                onClick={Login}
              >
                Sign in
              </Button>
              {/* )} */}
            </FormControl>
          ) : (
            // Signup form begins
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Input
                  id="name"
                  name="name"
                  variant="rounded"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="Your name*"
                  mr="2px"
                  fontWeight="500"
                  size="lg"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <FormHelperText color="red.400" mt="0" mb="5px">
                    {errors.name}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl>
                <Input
                  id="email"
                  name="email"
                  variant="rounded"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="email"
                  placeholder="Email*"
                  mt="12px"
                  fontWeight="500"
                  size="lg"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <FormHelperText color="red.400" mt="0" mb="5px">
                    {errors.email}.
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <Flex>
                <FormControl mr="4px">
                  <InputGroup size="md">
                    <Input
                      id="password"
                      name="password"
                      fontSize="sm"
                      placeholder="Password*(Min. 8 characters)"
                      size="lg"
                      mt="12px"
                      type={show ? "text" : "password"}
                      variant="rounded"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <InputRightElement
                      display="flex"
                      alignItems="center"
                      mt="15px"
                    >
                      <Icon
                        color={textColorSecondary}
                        _hover={{ cursor: "pointer" }}
                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && touched.password ? (
                    <FormHelperText color="red.400" mt="0" mb="5px">
                      {errors.password}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
                <FormControl>
                  <InputGroup size="md">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      fontSize="sm"
                      placeholder="Confirm Password"
                      size="lg"
                      mt="12px"
                      type={show ? "text" : "password"}
                      variant="rounded"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <InputRightElement
                      display="flex"
                      alignItems="center"
                      mt="15px"
                    >
                      <Icon
                        color={textColorSecondary}
                        _hover={{ cursor: "pointer" }}
                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <FormHelperText color="red.400" mt="0" mb="5px">
                      {errors.confirmPassword}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Flex>
              <FormControl>
                <InputGroup size="md">
                  <Select
                    id="usertype"
                    name="usertype"
                    fontSize="sm"
                    placeholder="Select type of user*"
                    size="lg"
                    mt="12px"
                    variant="auth"
                    value={values.usertype}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="1">Individual - default</option>
                    <option value="2">Company</option>
                  </Select>
                </InputGroup>
                {errors.usertype && touched.usertype ? (
                  <FormHelperText color="red.400" mt="0" mb="5px">
                    {errors.usertype}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <Flex alignItems="center">
                <Image
                  src={createObjectURL ? createObjectURL : "/profile.png"}
                  borderRadius="10px"
                  objectFit="cover"
                  width="50px"
                  height="50px"
                  borderColor="primary.500"
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
                  />
                </Box>
                {image ? (
                  <Button onClick={removeAvatar} ml="10px" cursor="pointer">
                    Remove Avatar
                  </Button>
                ) : null}
              </Flex>

              {/* {isSubmitting ? (
                <Flex
                  mt='10px'
                  w='100%'
                  alignItems='center'
                  justifyContent='center'>
                  <Spinner
                    size='xl'
                    thickness='7px'
                    speed='0.9s'
                    color='primary.500'
                  />
                </Flex>
              ) : ( */}
              <Button
                type="submit"
                isLoading={isSubmitting}
                fontSize="sm"
                variant="homePrimary"
                fontWeight="500"
                w="100%"
                h="30px"
              >
                Sign Up
              </Button>
              {/* )} */}
            </form>
          )}
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}
