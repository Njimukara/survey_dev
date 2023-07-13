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
  Text,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

// Assets
import { MdOutlineArrowBack, MdLockOpen } from "react-icons/md";

import { useEffect, useState } from "react";
import axiosConfig from "axiosConfig";

export default function ResetPassword(props: any) {
  // var state = props
  const textColorSecondary = "gray.400";

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Yup validation data schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is Invalid").required("Required"),
  });

  // submit email for password reset
  const onSubmit = async (values: any) => {
    setSubmitting(true);
    const body = {
      email: values.email,
    };

    const res = await axiosConfig
      .post("/auth/users/reset_password/", body)
      .then(() => {
        router.push("/auth/verifyemail");
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
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
            No Worries, We'll send you reset instructions
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel fontSize="sm" color={textColorSecondary}>
                Email
              </FormLabel>
              <Input
                id="email"
                name="email"
                isRequired={true}
                variant="rounded"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                mb="5px"
                type="email"
                placeholder="name@mail.com"
                fontWeight="400"
                size="md"
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
