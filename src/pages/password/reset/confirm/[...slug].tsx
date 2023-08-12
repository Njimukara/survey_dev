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
  useToast,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

// Assets
import {
  MdOutlineArrowBack,
  MdLockOpen,
  MdOutlineRemoveRedEye,
} from "react-icons/md";

import { useEffect, useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import axiosConfig from "axiosConfig";

export default function SetPassword(props: any) {
  const textColorSecondary = "gray.400";

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

  // chakra toast
  const toast = useToast();

  const handleClick = () => setShow(!show);

  // submit email for password reset
  const onSubmit = async (values: any) => {
    setSubmitting(true);
    setError(null);
    const { slug } = router.query;
    const [uid, token] = slug;
    // request body
    const data = {
      uid: uid,
      token: token,
      new_password: values.password,
    };

    await axiosConfig
      .post("/auth/users/reset_password_confirm/", data)
      .then((res) => {
        router.push("/auth/signin");
        setSubmitting(false);
        toast({
          position: "bottom-right",
          description: "Password reset successful",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setError(err.response.data.token[0]);
        setSubmitting(false);
        toast({
          position: "bottom-right",
          description: "Password reset failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
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
        w="100%"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        fontFamily="inter"
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

          {error && (
            <Text my={3} fontSize="sm" color="red.400" textAlign="center">
              {error}
            </Text>
          )}
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
                  variant="flushed"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    data-testid="toggle-password-visibility"
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && touched.password && (
                <FormHelperText color="red.400" mt="0" mb="5px">
                  {errors.password}.
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color={textColorSecondary}>
                Confirm Password
              </FormLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                variant="flushed"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                mb="5px"
                type={show ? "text" : "password"}
                placeholder="Password (Min. 8 characters)"
                fontWeight="400"
                size="md"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <FormHelperText color="red.400" mt="0" mb="5px">
                  {errors.confirmPassword}.
                </FormHelperText>
              )}
            </FormControl>
            <Button
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
