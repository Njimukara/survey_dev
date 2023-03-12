// Chakra imports
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { NextAvatar } from "components/image/Avatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Banner(props: {
  avatar: string;
  name: string;
  email: string;
  date_joined: number | string;
  [x: string]: any;
}) {
  const { avatar, name, email, date_joined, ...rest } = props;

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "primary.100 !important",
    "#111C44 !important"
  );

  const date = new Date(date_joined).toLocaleDateString();
  const router = useRouter();

  // alert dialog controls
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  // delete user acount
  const deleteAccount = async () => {
    await axios
      .delete(`https://surveyplanner.pythonanywhere.com/auth/users/me/`)
      .then(() => {
        signOut({ callbackUrl: "http://localhost:3000" });
        onClose();
      })
      .catch(() => {
        console.log("error loggin out");
      });
  };

  return (
    <Card mb={{ base: "0px", lg: "20px" }} {...rest}>
      <Flex>
        <Flex align="center" justify="space-between" w="20%">
          <NextAvatar
            mx="auto"
            src={avatar}
            h="100px"
            w="100px"
            // mt='-43px'
            border="10px solid"
            borderColor={borderColor}
          />
        </Flex>
        <Box h="100%" mx="10px" w="2px" bg="gray.200" />
        <Box w="80%" px={20}>
          <Text pb={4} fontWeight="bold" fontSize="large">
            User Info
          </Text>
          <Flex w="100%" pb={4} align="center" justify="space-between">
            <Box>
              <Text color="gray.400" transform="capitalize">
                Name
              </Text>
              <Text>{name}</Text>
            </Box>
            <Box>
              <Text color="gray.400" transform="capitalize">
                Email
              </Text>
              <Text>{email}</Text>
            </Box>
            <Box>
              <Text color="gray.400" transform="capitalize">
                Joined Since
              </Text>
              <Text>{date}</Text>
            </Box>
          </Flex>

          <Button
            onClick={() => router.push("/auth/edit-user")}
            mr={2}
            bg="primary.500"
            color="white"
          >
            Edit info
          </Button>
          <Button color="red.500" onClick={onOpen}>
            Delete account
          </Button>
        </Box>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Account
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action later.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  variant="homePrimary"
                  bgColor="red"
                  onClick={deleteAccount}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  py="8"
                  ref={cancelRef}
                  onClick={onClose}
                  ml={3}
                >
                  Cancel
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </Card>
  );
}
