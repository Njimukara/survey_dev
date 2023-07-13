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

import React, { useState } from "react";
import { useRouter } from "next/router";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

// Custom components
import DefaultAuthLayout from "layouts/auth/Default";
// Assets
import { MdOutlineArrowBack } from "react-icons/md";

import { useEffect } from "react";
import axiosConfig from "axiosConfig";

export default function resendEmail({ providers }: any) {
  const router = useRouter();
  const [canResend, setCanResend] = useState(true);
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    let secondsTimer: NodeJS.Timeout | number = 0;

    if (!canResend) {
      secondsTimer = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(secondsTimer);
    };
  }, [canResend]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setCanResend(true);
    }
  }, [secondsLeft]);

  const onSubmit = async (values: any, actions: any) => {
    setError("");

    const res = await axiosConfig
      .post(`/auth/users/resend_activation/`, values)
      .then(() => {
        setCanResend(false);
        setSecondsLeft(120); // 2 minutes
        setError("");
      })
      .catch(() => {
        setError("This user already has an account");
        setCanResend(true);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  const {
    values,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: "",
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
        alignItems="center"
        justifyContent="center"
        px={{ base: "25px", md: "0px" }}
        flexDirection="column"
      >
        <Box w={{ base: "100%", md: "300px", lg: "400px" }}>
          <form onSubmit={handleSubmit}>
            {error != "" && (
              <Flex justifyContent="center" mb="5">
                <Text fontSize="sm" color="red.400">
                  {error}
                </Text>
              </Flex>
            )}
            <FormControl>
              <FormLabel>Input the email you used to register</FormLabel>
              <Input
                id="email"
                name="email"
                w="100%"
                variant="rounded"
                fontSize="md"
                ms="0px"
                type="text"
                placeholder="Email *"
                mr="2px"
                fontWeight="500"
                size="lg"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <FormHelperText color="red.400" mt="0" mb="5px">
                  {errors.email}
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
            <Flex mt={6} w="100%" justifyContent="center">
              <Button
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!canResend}
                // isDisabled={seconds > 0 || minutes > 0}
                variant="homePrimary"
                py="5"
              >
                Resend Link
              </Button>
            </Flex>
            <Flex justifyContent="center" mt={2}>
              {!canResend && (
                <p>
                  Please wait {Math.floor(secondsLeft / 60)} minutes{" "}
                  {secondsLeft % 60} seconds before requesting again.
                </p>
              )}
            </Flex>
            <Flex justifyContent="center">
              <Button
                variant="outline"
                py="5"
                px="4"
                border="none"
                mt={8}
                onClick={() => router.push("/auth/signin")}
              >
                <Icon mr={1} as={MdOutlineArrowBack} boxSize={6} />
                <Text>Cancel</Text>
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </DefaultAuthLayout>
  );
}
