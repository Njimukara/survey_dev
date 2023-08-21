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
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useState } from "react";

import { RiEyeCloseLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axiosConfig from "axiosConfig";

function PasswordCard({
  error,
  textColorSecondary,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  handleClick,
  show,
}: any) {
  return (
    <Card
      justifyContent="center"
      fontFamily="Poppins"
      flexDirection="column"
      w="100%"
      mb="0px"
    >
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
            <InputRightElement display="flex" alignItems="center" mt="7px">
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
              <InputRightElement display="flex" alignItems="center" mt="7px">
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
    </Card>
  );
}

export default function SetPassword(props: { [x: string]: any }) {
  let { toggleModal, opened, ...rest } = props;

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => setShow(!show);

  // chakra toast
  const toast = useToast();

  const closeModal = () => {
    toggleModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setError("");
  };

  const onSubmit = async () => {
    if (!currentPassword || !newPassword) {
      setError("New and Current passwords are required");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const body = {
        new_password: newPassword,
        current_password: currentPassword,
      };

      const res = await axiosConfig.post("/auth/users/set_password/", body);
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
    } catch (error: any) {
      console.log(error);
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
    // <Card mb={{ base: "0px", lg: "0px" }} mt="0" bgColor="none" {...rest}>
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
          <PasswordCard
            error={error}
            textColorSecondary={textColorSecondary}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            submitting={submitting}
            onSubmit={onSubmit}
            closeModal={closeModal}
            handleClick={handleClick}
            show={show}
          />
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
    // </Card>
  );
}
