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

import React, { forwardRef, ChangeEvent, LegacyRef } from "react";
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
  Input,
  InputGroup,
  InputRightElement,
  Select as ChakraSelect,
  Text,
  useColorModeValue,
  Heading,
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

import { signIn } from "next-auth/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axiosConfig from "axiosConfig";
import { FaLinkedin } from "react-icons/fa";
import { useAllSurveysContext } from "contexts/SurveyContext";

const CustomInput = forwardRef(
  (props: any, ref: LegacyRef<HTMLInputElement>) => {
    const { value, onChange, ...rest } = props;
    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event.target.value);
      }
    };

    return (
      <Input
        ref={ref}
        isRequired={true}
        id="phoneNumber"
        variant="flushed"
        fontSize="sm"
        ms={{ base: "0px", md: "0px" }}
        type="email"
        placeholder="Enter your Email"
        mt="3"
        mb="10px"
        fontWeight="500"
        size="lg"
        value={value}
        onChange={handleChangeEvent}
        {...rest}
      />
    );
  }
);

export default function SignIn() {
  // Chakra color mode
  const btnbgColor = useColorModeValue("primary.500", "white");
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
  const linkedin = useColorModeValue({ bg: "#0077b5" }, { bg: "#0077b5" });
  const linkedinHover = useColorModeValue({ bg: "#0f6694" }, { bg: "#0f6694" });
  const linkedinActive = useColorModeValue(
    { bg: "#3c90bd" },
    { bg: "#3c90bd" }
  );

  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [login, setLogin] = React.useState(true);
  const [remember, setRemember] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [numberError, setNumberError] = React.useState(null);

  const { getAllSurveys } = useAllSurveysContext();

  // varaibles used for login
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    remember,
  });

  // Yup validation data schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is too Short!")
      .max(30, "Name is too Long!")
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
    setError(null);
  };

  const Login = async () => {
    if (!formData.email || !formData.password) {
      setError("Email and password required");
      return;
    }
    setSubmitting(true);
    const res: any = await signIn("Credentials", {
      email: formData.email,
      password: formData.password,
      remember: formData.remember,
      redirect: false,
    });

    if (res.status == 200) {
      getAllSurveys();
      setSubmitting(false);
      router.push("/admin");
    } else if (res.status != 200) {
      let error = JSON.parse(res.error);
      setError(error.errors);
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  const handlePhoneNumber = (option: string) => {
    setPhoneNumber(option);
    setNumberError(null);
  };

  const onSubmit = async (values: any, actions: any) => {
    console.log(phoneNumber);
    if (!phoneNumber) {
      setNumberError("required");
      return;
    }
    setNumberError(null);

    var formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("email", values.email);
    formdata.append("phone_number", phoneNumber);
    formdata.append("user_type", values.usertype);
    formdata.append("password", values.password);
    formdata.append("re_password", values.password);

    const res = await axiosConfig
      .post("/auth/users/", formdata)
      .then((res) => {
        router.push("/auth/verifyemail");
      })
      .catch((error) => {
        let err = error.response.data.email;
        setError("Server error, please try again later");
        if (err != "") {
          setError(err);
        }
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
      confirmPassword: "",
      usertype: "1",
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
        alignItems="center"
        justifyContent="center"
        px={{ base: "25px", md: "0px" }}
        flexDirection="column"
      >
        <Box w="100%">
          <Heading
            as="h2"
            data-cy="login-state"
            fontSize="2xl"
            textTransform="capitalize"
            textAlign="center"
            pb="20px"
          >
            {login ? "Welcome back!" : "Welcome to Survey Planner!"}
          </Heading>
          <Flex
            justifyContent="space-evenly"
            alignItems="center"
            h="50px"
            px="5px"
            py="5px"
            mb="10"
            borderRadius="7px"
            bgColor={googleBg}
          >
            <Button
              data-cy="toggle-login"
              bgColor={login ? btnbgColor : "transparent"}
              color={login ? "white" : "black"}
              _hover={{ color: "inherit" }}
              _active={{ color: "#fff" }}
              flex="1"
              borderRadius="5px"
              onClick={toggleLogin}
            >
              Login
            </Button>
            <Button
              data-cy="toggle-register"
              bgColor={!login ? btnbgColor : "transparent"}
              color={!login ? "white" : "black"}
              _hover={{ color: "inherit" }}
              _active={{ color: "#fff" }}
              flex="1"
              borderRadius="5px"
              onClick={toggleLogin}
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
          {error && (
            <Flex w="100%" justifyContent="center" mb="5px">
              <Text
                data-cy="login-error"
                color="red.400"
                fontWeight="semibold"
                mx="14px"
              >
                {error}
              </Text>
            </Flex>
          )}
          {login ? (
            <div>
              <FormControl>
                <Input
                  data-cy="login-email"
                  id="loginEmail"
                  isRequired={true}
                  variant="flushed"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="email"
                  placeholder="Enter your Email"
                  mb="24px"
                  px="2"
                  fontWeight="500"
                  size="lg"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </FormControl>

              <InputGroup size="md">
                <Input
                  data-cy="login-password"
                  id="loginPassword"
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Password (Min. 8 characters)"
                  mb="24px"
                  px="2"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="flushed"
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
                    isChecked={remember}
                    onChange={(e) => {
                      setRemember(e.target.checked);
                    }}
                    me="10px"
                  />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
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
                      data-cy="reset-password"
                    >
                      Forgot password?
                    </Text>
                  </a>
                </Link>
              </Flex>
              <Button
                data-cy="login-button"
                fontSize="sm"
                type="submit"
                isLoading={submitting}
                variant="homePrimary"
                fontWeight="500"
                w="100%"
                py="6"
                mb="24px"
                onClick={Login}
              >
                Log in
              </Button>

              <Flex align="center" mb="25px">
                <HSeparator />
                <Text color="gray.400" mx="14px">
                  or
                </Text>
                <HSeparator />
              </Flex>
              <Box w="100%">
                <Button
                  fontSize="sm"
                  me="0px"
                  w="100%"
                  mb="26px"
                  py="10px"
                  h="40px"
                  borderRadius="5px"
                  border="1px"
                  borderColor="gray.300"
                  bgColor="white"
                  color={textColor}
                  fontWeight="500"
                  _hover={googleHover}
                  _active={googleActive}
                  _focus={googleActive}
                >
                  <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                  Continue with Google
                </Button>
                <Button
                  fontSize="sm"
                  me="0px"
                  w="100%"
                  py="10px"
                  h="40px"
                  borderRadius="5px"
                  border="1px"
                  borderColor="gray.300"
                  bgColor="#0077b5"
                  color="white"
                  fontWeight="500"
                  _hover={linkedinHover}
                  _active={linkedinActive}
                  _focus={linkedinActive}
                >
                  <Icon as={FaLinkedin} w="20px" h="20px" me="10px" />
                  Continue with LinkedIn
                </Button>
              </Box>
            </div>
          ) : (
            // Signup form begins
            <div>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Input
                    data-cy="register-name"
                    id="name"
                    name="name"
                    variant="flushed"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="text"
                    placeholder="Enter Full Name"
                    mr="2px"
                    fontWeight="500"
                    size="lg"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? (
                    <FormHelperText
                      data-cy="register-name-error"
                      color="red.400"
                      mt="0"
                      mb="5px"
                    >
                      {errors.name}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
                <FormControl>
                  <Input
                    data-cy="register-email"
                    id="email"
                    name="email"
                    variant="flushed"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="email"
                    placeholder="Your Email"
                    mt="12px"
                    fontWeight="500"
                    size="lg"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <FormHelperText
                      data-cy="register-email-error"
                      color="red.400"
                      mt="0"
                      mb="5px"
                    >
                      {errors.email}.
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>

                <FormControl>
                  <PhoneInput
                    placeholder="Phone Number"
                    international
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                    inputComponent={CustomInput}
                  />
                  {numberError && (
                    <FormHelperText
                      data-cy="register-phonenumber-error"
                      color="red.400"
                      mt="0"
                      mb="5px"
                    >
                      {numberError}.
                    </FormHelperText>
                  )}
                </FormControl>

                <Flex>
                  <FormControl mr="4px">
                    <InputGroup size="md">
                      <Input
                        data-cy="register-password"
                        id="password"
                        name="password"
                        fontSize="sm"
                        placeholder="Password*(Min. 8 characters)"
                        size="lg"
                        mt="12px"
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
                        data-cy="register-password-error"
                        color="red.400"
                        mt="0"
                        mb="5px"
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
                        data-cy="register-confirmpassword"
                        id="confirmPassword"
                        name="confirmPassword"
                        fontSize="sm"
                        placeholder="Confirm Password"
                        size="lg"
                        mt="12px"
                        type={show ? "text" : "password"}
                        variant="flushed"
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
                      <FormHelperText
                        data-cy="register-confirmpassword-error"
                        color="red.400"
                        mt="0"
                        mb="5px"
                      >
                        {errors.confirmPassword}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Flex>
                <FormControl>
                  <InputGroup size="md">
                    <ChakraSelect
                      data-cy="register-usertype"
                      id="usertype"
                      name="usertype"
                      fontSize="sm"
                      placeholder="Select type of user*"
                      size="lg"
                      mt="12px"
                      variant="flushed"
                      value={values.usertype}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="1">Individual - default</option>
                      <option value="2">Company</option>
                    </ChakraSelect>
                  </InputGroup>
                  {errors.usertype && touched.usertype ? (
                    <FormHelperText color="red.400" mt="0" mb="5px">
                      {errors.usertype}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>

                <Button
                  data-cy="register-button"
                  type="submit"
                  isLoading={isSubmitting}
                  fontSize="sm"
                  variant="homePrimary"
                  fontWeight="500"
                  w="100%"
                  py="6"
                  mt="5"
                >
                  Sign Up
                </Button>
              </form>
              <Flex align="center" my="25px">
                <HSeparator />
                <Text color="gray.400" mx="14px">
                  or
                </Text>
                <HSeparator />
              </Flex>
              <Box w="100%">
                <Button
                  fontSize="sm"
                  me="0px"
                  w="100%"
                  mb="26px"
                  py="10px"
                  h="40px"
                  borderRadius="5px"
                  border="1px"
                  borderColor="gray.300"
                  bgColor="white"
                  color={textColor}
                  fontWeight="500"
                  _hover={googleHover}
                  _active={googleActive}
                  _focus={googleActive}
                >
                  <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                  Continue with Google
                </Button>
                <Button
                  fontSize="sm"
                  me="0px"
                  w="100%"
                  py="10px"
                  h="40px"
                  borderRadius="5px"
                  border="1px"
                  borderColor="gray.300"
                  bgColor="#0077b5"
                  color="white"
                  fontWeight="500"
                  _hover={linkedinHover}
                  _active={linkedinActive}
                  _focus={linkedinActive}
                >
                  <Icon as={FaLinkedin} w="20px" h="20px" me="10px" />
                  Continue with LinkedIn
                </Button>
              </Box>
            </div>
          )}
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}
