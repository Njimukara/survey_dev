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
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

// Custom components
import DefaultAuthLayout from "layouts/auth/Default";
// Assets
import {
  MdOutlineMail,
  MdOutlineArrowBack,
  MdLockOpen,
  MdOutlineRemoveRedEye,
} from "react-icons/md";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { RiEyeCloseLine } from "react-icons/ri";

export default function SetPassword(props: any) {
  // var state = props
  // Chakra color mode
  const btnbgColor = useColorModeValue("primary.500", "white");
  const btnHover = useColorModeValue({ color: "white" }, { color: "white" });
  const textColor = useColorModeValue("navy.700", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  // const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600')
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

  //   togle password visibility
  const handleClick = () => setShow(!show);

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  // Yup validation data schema
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Min of 8 characters required")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("Required"),
  });

  // submit email for password reset
  const onSubmit = async (values: any) => {
    setSubmitting(true);
    let url: array = router.query.slug;
    let uid, token;
    for (let i in url) {
      uid = url[1];
      token = url[2];
    }
    console.log(uid, token);

    // request body
    const data = {
      uid: uid,
      token: token,
      new_password: values.password,
    };
    // headers
    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
      },
    };

    const res = await axios
      .post(
        "https://surveyplanner.pythonanywhere.com/auth/users/reset_password_confirm/",
        data,
        config
      )
      .then((res) => {
        console.log(res);
        // router.push('/auth/verifyemail')
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setSubmitting(false);
      });
  };

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
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {}, []);

  return (
    <>
      <Flex
        // maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box w="30%">
          <Flex justifyContent="center" alignItems="center">
            <Flex
              h={14}
              w={14}
              borderRadius="50%"
              bg="primary.100"
              justifyContent="center"
              alignItems="center"
            >
              <Icon as={MdLockOpen} color="primary.500" boxSize={6} />
            </Flex>
          </Flex>
          <Heading textAlign="center">Forgot Password</Heading>
          <Text my={4} fontSize="md" textAlign="center">
            Your new password must be different from the previous one.
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel fontSize="sm" color={textColorSecondary}>
                Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  name="password"
                  fontSize="sm"
                  placeholder="Password (Min. 8 characters)"
                  mb="5px"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="rounded"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
              {errors.password && touched.password ? (
                <FormHelperText color="red.400" mt="0" mb="5px">
                  {errors.password}.
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color={textColorSecondary}>
                Confirm Password
              </FormLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                variant="rounded"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                mb="5px"
                type="email"
                placeholder="name@mail.com"
                fontWeight="400"
                size="md"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <FormHelperText color="red.400" mt="0" mb="5px">
                  {errors.confirmPassword}.
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
            <Button
              // onClick={handleSubmit}
              type="submit"
              isLoading={submitting}
              variant="homePrimary"
              mx="auto"
              w="100%"
              my={4}
            >
              Reset password
            </Button>
          </form>
          <Flex justifyContent="center" alignItems="center" my={4}>
            <Link href="/auth/signin">
              <a href="/auth/signin">
                <Flex alignItems="center">
                  <Icon mr={1} as={MdOutlineArrowBack} boxSize={5} />
                  <Text>Back to Login</Text>
                </Flex>
              </a>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
