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
  Spinner,
  FormControl,
  FormHelperText,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuthLayout from "layouts/auth/Default";
// Assets
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import axiosConfig from "axiosConfig";

export default function SignIn({ providers }: any) {
  // Chakra color mode
  const btnbgColor = useColorModeValue("primary.600", "white");
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
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const [token, setToken] = React.useState<any>("");
  const [error, setError] = React.useState("");

  // chakra toast
  const toast = useToast();

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

    await axiosConfig
      .post("/auth/register-invited-user/", data)
      .then((res) => {
        router.push("/auth/signin");
      })
      .catch((error) => {
        setError(
          error.response.data.non_field_errors || error.response.data.email
        );
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
    setIsVerifying(true);
    await axiosConfig
      .get(`/api/company/verify-invitation/${token}/`)
      .then((res) => {
        setError("");
        setIsVerifying(false);
        setVerified(true);
        toast({
          position: "bottom-right",
          description: "Token Verified.",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setIsVerifying(false);
        setError(err.response.data.error);
      });
  };

  useEffect(() => {
    let token = router.query.token;
    setToken(token);
    if (token) {
      verifyToken(token);
    }
  }, [router]);

  return (
    <DefaultAuthLayout illustrationBackground={"/img/auth/auth.png"}>
      {isVerifying ? (
        <Flex
          maxW="max-content"
          w="100%"
          mx="0px"
          alignItems="center"
          justifyContent="center"
          px="0px"
          flexDirection="column"
          fontFamily="inter"
        >
          <Box w="60vh" h="300px" bg="primary.200" borderRadius={10}>
            <Flex
              pt={30}
              h="100%"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontWeight="bold" fontSize="large">
                Token Verificaton in progress ...
              </Text>
              <Flex
                mt="10px"
                w="100%"
                alignItems="center"
                justifyContent="center"
              >
                <Spinner
                  size="xl"
                  thickness="7px"
                  speed="0.9s"
                  color="primary.500"
                />
              </Flex>
            </Flex>
          </Box>
        </Flex>
      ) : (
        <Flex
          maxW="max-content"
          w="100%"
          mx="0px"
          alignItems="center"
          justifyContent="center"
          px="0px"
          flexDirection="column"
          fontFamily="inter"
        >
          <Box w="100%">
            <Text textAlign="center" pb="10px">
              Welcome to Survey Planner!
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
            w="420px"
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb="auto"
          >
            <Button
              data-cy="google-signin-button"
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
                  data-cy="name"
                  id="name"
                  name="name"
                  variant="flushed"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="Your name*"
                  mr="2px"
                  px="2"
                  fontWeight="500"
                  size="lg"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <FormHelperText
                    data-cy="name-error"
                    color="red.400"
                    mt="0"
                    mb="2px"
                  >
                    {errors.name}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl>
                <Input
                  data-cy="email"
                  id="email"
                  name="email"
                  variant="flushed"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="email"
                  placeholder="Email*"
                  mt="12px"
                  px="2"
                  fontWeight="500"
                  size="lg"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <FormHelperText
                    data-cy="email-error"
                    color="red.400"
                    mt="0"
                    mb="2px"
                  >
                    {errors.email}.
                  </FormHelperText>
                )}
              </FormControl>
              <Flex>
                <FormControl mr="4px">
                  <InputGroup size="md">
                    <Input
                      data-cy="password"
                      id="password"
                      name="password"
                      fontSize="sm"
                      placeholder="Password*(Min. 8 characters)"
                      size="lg"
                      mt="12px"
                      px="2"
                      type={show ? "text" : "password"}
                      variant="flushed"
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
                    <FormHelperText
                      data-cy="password-error"
                      color="red.400"
                      mt="0"
                      mb="0px"
                    >
                      {errors.password}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
                <FormControl>
                  <InputGroup size="md">
                    <Input
                      data-cy="confirm-password"
                      id="confirm_Password"
                      name="confirm_Password"
                      fontSize="sm"
                      placeholder="Confirm Password"
                      size="lg"
                      mt="12px"
                      px="2"
                      type={show ? "text" : "password"}
                      variant="flushed"
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
                    <FormHelperText
                      data-cy="confirm-password-error"
                      color="red.400"
                      mt="0"
                      mb="0px"
                    >
                      {errors.confirm_Password}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Flex>
              <Button
                data-cy="signup-button"
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!verified && !isVerifying}
                fontSize="16px"
                variant="homePrimary"
                fontWeight="500"
                my="5"
                py="0"
                w="100%"
                h="48px"
              >
                Sign Up
              </Button>
            </form>
          </Flex>
        </Flex>
      )}
    </DefaultAuthLayout>
  );
}
