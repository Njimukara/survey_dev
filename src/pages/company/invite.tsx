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
import { MdUpload } from "react-icons/md";
import styles from "../../../styles/Home.module.css";
// import styles from '../../styles/Home.module.css'

// import { useRef } from 'react'
import { signIn } from "next-auth/react";
import axios from "axios";

export default function SignIn({ providers }: any) {
  // Chakra color mode
  const btnbgColor = useColorModeValue("primary.500", "white");
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const btnBgHover = useColorModeValue(
    { bg: "primary.500" },
    { bg: "primary.500" }
  );
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
  const [token, setToken] = React.useState<any>("");
  const [error, setError] = React.useState("");

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
    confirm_Password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("Required"),
  });

  const handleClick = () => setShow(!show);

  const onSubmit = async (values: any, actions: any) => {
    setError("");
    let data = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirm_password: values.confirm_Password,
      token: token,
    };

    const options = {
      // method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json;charset=UTF-8",
      },
    };

    await axios
      .post(
        "https://surveyplanner.pythonanywhere.com/auth/register-invited-user/",
        data,
        options
      )
      .then((res) => {
        console.log(res);
        router.push("/auth/verifyemail");
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.non_field_errors);
        setError(error.response.data.email);
      });
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
      confirm_Password: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  //   verify token
  const verifyToken = async (token: any) => {
    await axios
      .get(
        `https://surveyplanner.pythonanywhere.com/api/company/verify-invitation/${token}/`
      )
      .then((res) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    let token = router.query.token;
    setToken(token);
    if (token != undefined) {
      verifyToken(token);
    }
  }, [router]);

  return (
    <DefaultAuthLayout illustrationBackground={"/img/auth/auth.png"}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        h="100vh"
        alignItems="center"
        justifyContent="center"
        mb={{ base: "0px", md: "0px" }}
        px={{ base: "25px", md: "0px" }}
        mt={"1vh"}
        flexDirection="column"
      >
        <Box w="100%">
          <Text textAlign="center" pb="10px">
            Welcome to Survey Planner :-)
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
              bgColor={btnbgColor}
              cursor="default"
              color={"white"}
              _hover={btnBgHover}
              flex="1"
              borderRadius="5px"
            >
              Register
            </Button>
          </Flex>
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
          <Flex align="center" mb="15px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              or
            </Text>
            <HSeparator />
          </Flex>
          {error != "" && (
            <Text
              color="red.400"
              textAlign="center"
              fontWeight="semibold"
              mb="2px"
              mx="14px"
            >
              {error}
            </Text>
          )}
          {/* Signup form begins */}
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
                <FormHelperText color="red.400" mt="0" mb="2px">
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
                <FormHelperText color="red.400" mt="0" mb="2px">
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
                  <FormHelperText color="red.400" mt="0" mb="0px">
                    {errors.password}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl>
                <InputGroup size="md">
                  <Input
                    id="confirm_Password"
                    name="confirm_Password"
                    fontSize="sm"
                    placeholder="Confirm Password"
                    size="lg"
                    mt="12px"
                    type={show ? "text" : "password"}
                    variant="rounded"
                    value={values.confirm_Password}
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
                {errors.confirm_Password && touched.confirm_Password ? (
                  <FormHelperText color="red.400" mt="0" mb="0px">
                    {errors.confirm_Password}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Flex>
            <Button
              type="submit"
              isLoading={isSubmitting}
              fontSize="sm"
              variant="homePrimary"
              fontWeight="500"
              my="5"
              w="100%"
              h="30px"
            >
              Sign Up
            </Button>
          </form>
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}
