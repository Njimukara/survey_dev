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

export default function InviteUser(props: { [x: string]: any }) {
  let { toggleModal, opened, ...rest } = props;

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const textColordark = useColorModeValue("black", "white");
  const textColorPrimary = useColorModeValue("primary.500", "white");
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  // chakra toast
  const toast = useToast();

  //   import React, { useState, useMemo } from 'react'

  const closeModal = () => {
    toggleModal(false);
    setName("");
    setEmail("");
    setError("");
  };

  const onSubmit = async () => {
    if (name == "" || email == "") {
      setError("Name and Email are required");
      return;
    }
    setError("");
    setSubmitting(true);

    const body = {
      name: name,
      email: email,
    };

    console.log(body);

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
        "https://surveyplanner.pythonanywhere.com/api/company/send-invitation/",
        body,
        config
      )
      .then((res) => {
        console.log(res);
        // router.push('/auth/verifyemail')
        setSubmitting(false);
        closeModal();
        toast({
          position: "bottom-right",
          description: "Invite has been sent successfully.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
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
    <Card
      mb={{ base: "0px", lg: "0px" }}
      mt="0"
      bgColor="transparent"
      {...rest}
    >
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
          <ModalHeader>Invite User</ModalHeader>
          <ModalCloseButton />
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
                    <FormControl>
                      <FormLabel fontSize="sm" color={textColorSecondary}>
                        Name *
                      </FormLabel>
                      <Input
                        id="name"
                        name="name"
                        isRequired={true}
                        variant="rounded"
                        fontSize="sm"
                        ms={{ base: "0px", md: "0px" }}
                        mb="5px"
                        type="text"
                        placeholder="Name"
                        fontWeight="400"
                        size="md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>
                    <Flex w="100%">
                      <FormControl>
                        <FormLabel fontSize="sm" color={textColorSecondary}>
                          Email *
                        </FormLabel>
                        <Input
                          id="email"
                          name="email"
                          isRequired={true}
                          variant="rounded"
                          fontSize="sm"
                          ms={{ base: "0px", md: "0px" }}
                          mb="5px"
                          type="text"
                          placeholder="email"
                          fontWeight="400"
                          size="md"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                isLoading={submitting}
                colorScheme="blue"
                onClick={onSubmit}
              >
                Send Invite
              </Button>
              <Button variant="outline" py="8" onClick={closeModal}>
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
