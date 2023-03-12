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
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";

// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuthLayout from "layouts/auth/Default";
// Assets
import { MdUpload, MdOutlineMail, MdOutlineArrowBack } from "react-icons/md";

import { useEffect } from "react";
import { getProviders, getSession, signIn } from "next-auth/react";
import axios from "axios";

export default function resendEmail({ providers }: any) {
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
  const router = useRouter();
  const [canResend, setCanResend] = React.useState("true");
  const [time, setTime] = React.useState({
    time: 1,
    seconds: 0,
  });

  const countDown = () => {
    if (canResend == "false") {
      console.log("from outer if", canResend);
      // var minute = 1;
      // var sec = 60;
      // setInterval(function () {
      //   var Time = {
      //     time: minute,
      //     seconds: sec,
      //   };
      //   setTime(Time);
      //   sec--;

      //   if (sec == 0) {
      //     minute--;
      //     sec = 60;

      //     if (minute == 0) {
      //       setCanResend(true);
      //       console.log("from inner fnction", canResend);
      //       minute = 1;
      //     }
      //   }
      // }, 1000);
    }
  };

  const onSubmit = async (values: any, actions: any) => {
    setCanResend("false");
    console.log(values);
    console.log(canResend);
    const options = {
      headers: {
        Accept: "application/json;charset=UTF-8",
      },
    };

    const res = await axios
      .post(
        `https://surveyplanner.pythonanywhere.com/auth/users/resend_activation/`,
        values,
        options
      )
      .then((res) => {
        router.push("/auth/verifyemail");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        setCanResend("true");
      });
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is Invalid").required("Required"),
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

  useEffect(() => {
    countDown();
  }, []);

  return (
    <DefaultAuthLayout illustrationBackground={"/img/auth/auth.png"}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        h="100vh"
        alignItems="center"
        justifyContent="center"
        mb={{ base: "30px", md: "130px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "20vh", md: "30vh" }}
        flexDirection="column"
      >
        <Flex mb="100px" mr="70px" w="100%">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Input the email you used to register</FormLabel>
              <Input
                id="email"
                name="email"
                variant="rounded"
                fontSize="md"
                ms={{ base: "0px", md: "0px" }}
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
            <Flex mt={6} w="100%">
              {!isSubmitting ? (
                <Button
                  type="submit"
                  w="100%"
                  isDisabled={!canResend}
                  variant="homePrimary"
                >
                  Resend Link
                </Button>
              ) : (
                <Flex w="100%" alignItems="100%" justifyContent="center">
                  <Spinner thickness="4px" speed="0.9s" color="primary.500" />
                </Flex>
              )}
            </Flex>
            <Flex justifyContent="center" mt={2}>
              {canResend == "false" ? (
                <Text>
                  Resend link in {time.time} mins : {time.seconds} secs
                </Text>
              ) : (
                ""
              )}
            </Flex>
            <Flex justifyContent="center">
              <Button mt={8} onClick={() => router.push("/auth/signin")}>
                <Icon mr={1} as={MdOutlineArrowBack} boxSize={8} />
                <Text>Cancel</Text>
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}
