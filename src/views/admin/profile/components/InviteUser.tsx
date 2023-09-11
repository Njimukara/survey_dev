// Chakra imports
import {
  Button,
  Flex,
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
  useToast,
} from "@chakra-ui/react";
import Card from "components/card/Card";

import { useRouter } from "next/router";
import { useState } from "react";

import axiosConfig from "axiosConfig";
import useInvitations from "utils/useInvitations";

export default function InviteUser(props: { [x: string]: any }) {
  let { getInvitations, toggleModal, opened, ...rest } = props;

  const { fetchInvitations } = useInvitations();

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  const [guestUser, setGuestUser] = useState({
    name: "",
    email: "",
    submitting: false,
    error: "",
  });

  const router = useRouter();

  // chakra toast
  const toast = useToast();

  const closeModal = () => {
    toggleModal(false);
    setGuestUser((prevState) => ({
      ...prevState,
      name: "",
      email: "",
      error: "",
    }));
  };

  const onSubmit = async () => {
    if (!guestUser.name || !guestUser.email) {
      setGuestUser((prevState) => ({
        ...prevState,
        error: "Name and Email are required",
      }));
      return;
    }
    setGuestUser((prevState) => ({
      ...prevState,
      error: "",
      submitting: true,
    }));

    const body = {
      name: guestUser.name,
      email: guestUser.email,
    };

    try {
      const res = await axiosConfig.post("/api/company/send-invitation/", body);

      toast({
        position: "bottom-right",
        description: "Invite sent successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push("/company/users");
      fetchInvitations();
      closeModal();

      setGuestUser((prevState) => ({
        ...prevState,
        submitting: false,
      }));
    } catch (err) {
      toast({
        position: "bottom-right",
        description: "Something went wrong, please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      setGuestUser((prevState) => ({
        ...prevState,
        // error: err?.response?.data?.error,
        submitting: false,
      }));
    }
  };

  return (
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
        <ModalCloseButton onClick={closeModal} />
        <ModalBody>
          <Card
            justifyContent="center"
            flexDirection="column"
            fontFamily="Poppins"
            w="100%"
            mb="0px"
            {...rest}
          >
            <Flex>
              <VStack flex="1">
                {guestUser.error && (
                  <Text
                    w="100%"
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="sm"
                    color="red.500"
                  >
                    {guestUser.error}
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
                      value={guestUser.name}
                      onChange={(e) =>
                        setGuestUser((prevState) => ({
                          ...prevState,
                          name: e.target.value,
                        }))
                      }
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
                        value={guestUser.email}
                        onChange={(e) =>
                          setGuestUser((prevState) => ({
                            ...prevState,
                            email: e.target.value,
                          }))
                        }
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
              isLoading={guestUser.submitting}
              colorScheme="blue"
              onClick={onSubmit}
            >
              Send Invite
            </Button>
            <Button variant="outline" mt="1px" py="5" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
