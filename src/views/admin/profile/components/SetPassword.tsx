// Chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  FormLabel,
  useColorModeValue,
  VStack,
  FormControl,
  ButtonGroup,
  FormHelperText,
  useToast,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import Card from "components/card/Card";
import Projects from "views/admin/profile/components/CompanyUsers";

import { NextAvatar } from "components/image/Avatar";
import { useRouter } from "next/router";
import { useState, useMemo, SetStateAction } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";

import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { RiEyeCloseLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function SetPassword(props: { [x: string]: any }) {
  let { toggleModal, opened, ...rest } = props;

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const textColordark = useColorModeValue("black", "white");
  const textColorPrimary = useColorModeValue("primary.500", "white");
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => setShow(!show);

  // chakra toast
  const toast = useToast();

  //   import React, { useState, useMemo } from 'react'

  const closeModal = () => {
    toggleModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setError("");
  };

  const onSubmit = async () => {
    if (currentPassword == "" || newPassword == "") {
      setError("New and Current passwords are required");
      return;
    }
    setError("");
    setSubmitting(true);

    const body = {
      new_password: newPassword,
      current_password: currentPassword,
    };

    // console.log(body);

    // headers
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    const res = await axios
      .post(
        "https://surveyplanner.pythonanywhere.com/auth/users/set_password/",
        body,
        config
      )
      .then((res) => {
        console.log(res);
        setSubmitting(false);
        closeModal();
        toast({
          position: "bottom-right",
          description: "Password has been changed successfully.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.error);
        setSubmitting(false);
        toast({
          position: "bottom-right",
          description: "Something went wrong, please try again",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Card mb={{ base: "0px", lg: "0px" }} mt="0" bgColor="none" {...rest}>
      <Modal
        onClose={() => toggleModal(false)}
        isOpen={opened}
        motionPreset="slideInBottom"
        size="xl"
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="30%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>Set New Password</ModalHeader>
          <ModalCloseButton onClick={closeModal} />
          <ModalBody>
            <Card
              justifyContent="center"
              flexDirection="column"
              w="100%"
              mb="0px"
              {...rest}
            >
              <Flex>
                <VStack flex="1">
                  {error != "" && (
                    <Text
                      w="100%"
                      textAlign="center"
                      fontWeight="bold"
                      fontSize="sm"
                      color="red.500"
                    >
                      {error}
                    </Text>
                  )}
                  <form>
                    <FormControl mr="4px">
                      <FormLabel fontSize="sm" color={textColorSecondary}>
                        Current Password
                      </FormLabel>
                      <InputGroup size="md">
                        <Input
                          id="current_password"
                          name="current_password"
                          fontSize="sm"
                          placeholder="Password*(Min. 8 characters)"
                          size="md"
                          mb="5px"
                          type={show ? "text" : "password"}
                          variant="rounded"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <InputRightElement
                          display="flex"
                          alignItems="center"
                          mt="7px"
                        >
                          <Icon
                            color={textColorSecondary}
                            _hover={{ cursor: "pointer" }}
                            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                            onClick={handleClick}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Flex w="100%">
                      <FormControl mr="4px">
                        <FormLabel fontSize="sm" color={textColorSecondary}>
                          New Password
                        </FormLabel>
                        <InputGroup size="md">
                          <Input
                            id="new_password"
                            name="new_password"
                            fontSize="sm"
                            placeholder="Password*(Min. 8 characters)"
                            size="md"
                            mb="5px"
                            type={show ? "text" : "password"}
                            variant="rounded"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <InputRightElement
                            display="flex"
                            alignItems="center"
                            mt="7px"
                          >
                            <Icon
                              color={textColorSecondary}
                              _hover={{ cursor: "pointer" }}
                              as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                              onClick={handleClick}
                            />
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    </Flex>
                  </form>
                </VStack>
              </Flex>
            </Card>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup variant="homePrimary" spacing="6">
              <Button
                py="6"
                isLoading={submitting}
                colorScheme="blue"
                onClick={onSubmit}
              >
                Set Password
              </Button>
              <Button variant="outline" mt="1px" py="5" onClick={closeModal}>
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
