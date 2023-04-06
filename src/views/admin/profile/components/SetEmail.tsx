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

export default function SetEmail(props: { [x: string]: any }) {
  let { toggleEmailModal, opened, ...rest } = props;

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const textColordark = useColorModeValue("black", "white");
  const textColorPrimary = useColorModeValue("primary.500", "white");
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
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
    toggleEmailModal(false);
    setCurrentEmail("");
    setNewEmail("");
    setError("");
  };

  const onSubmit = async () => {
    if (currentEmail == "" || newEmail == "") {
      setError("New and Current emails are required");
      return;
    }
    setError("");
    setSubmitting(true);

    const body = {
      new_email: newEmail,
      current_email: currentEmail,
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
        "https://surveyplanner.pythonanywhere.com/auth/users/set_email/",
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
        onClose={() => toggleEmailModal(false)}
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
          <ModalHeader>Set New Email</ModalHeader>
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
                        Current Email
                      </FormLabel>
                      <Input
                        id="current_email"
                        name="current_email"
                        fontSize="sm"
                        placeholder="name@gmail.com"
                        size="md"
                        mb="5px"
                        type="email"
                        variant="rounded"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
                      />
                    </FormControl>
                    <Flex w="100%">
                      <FormControl mr="4px">
                        <FormLabel fontSize="sm" color={textColorSecondary}>
                          New Email
                        </FormLabel>
                        <Input
                          id="new_email"
                          name="new_email"
                          fontSize="sm"
                          placeholder="newemail@gmail.com"
                          size="md"
                          mb="5px"
                          type="email"
                          variant="rounded"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
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
                Set Email
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
