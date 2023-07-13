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
  FormControl,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useState } from "react";

import axiosConfig from "axiosConfig";

function EmailCard({
  error,
  textColorSecondary,
  currentEmail,
  setCurrentEmail,
  newEmail,
  setNewEmail,
  submitting,
  onSubmit,
  closeModal,
}: any) {
  return (
    <Card justifyContent="center" flexDirection="column" w="100%" mb="0px">
      {error &&
        Object.keys(error).map((err) => (
          <>
            <Text
              key={err}
              w="100%"
              textAlign="center"
              fontWeight="bold"
              fontSize="sm"
              color="red.500"
            >
              {err}: {error[err]}
            </Text>
          </>
        ))}
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
    </Card>
  );
}

export default function SetEmail(props: { [x: string]: any }) {
  let { toggleEmailModal, opened, ...rest } = props;

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const closeModal = () => {
    toggleEmailModal(false);
    setCurrentEmail("");
    setNewEmail("");
    setError("");
  };

  const onSubmit = async () => {
    if (!currentEmail || !newEmail) {
      setError("New and Current emails are required");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const body = {
        new_email: newEmail,
        current_email: currentEmail,
      };

      await axiosConfig.post("/auth/users/set_email/", body);

      setSubmitting(false);
      closeModal();

      toast({
        position: "bottom-right",
        description: "Email changed successfully.",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    } catch (error: any) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
        setError(data);
      } else {
        setError({ error: "Something went wrong, please try again" });
      }
      setSubmitting(false);

      toast({
        position: "bottom-right",
        description: "Something went wrong, please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    // <Card mb={{ base: "0px", lg: "0px" }} mt="0" bgColor="none">
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
          <EmailCard
            error={error}
            textColorSecondary={textColorSecondary}
            currentEmail={currentEmail}
            setCurrentEmail={setCurrentEmail}
            newEmail={newEmail}
            setNewEmail={setNewEmail}
            submitting={submitting}
            onSubmit={onSubmit}
            closeModal={closeModal}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
    // </Card>
  );
}
