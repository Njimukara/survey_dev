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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { NextAvatar } from "components/image/Avatar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";

export default function Banner(props: {
  avatar: string;
  name: string;
  email: string;
  date_joined: number | string;
  [x: string]: any;
}) {
  const { avatar, name, email, date_joined, phoneNumber, ...rest } = props;

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const borderColor = useColorModeValue(
    "primary.100 !important",
    "#111C44 !important"
  );

  const date = new Date(date_joined).toLocaleDateString();
  const router = useRouter();

  // alert dialog controls
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [deleting, setDeleting] = useState(false);
  const [userAvatar, setUserAvatar] = useState(false);

  const { data: session, status } = useSession();

  // chakra toast
  const toast = useToast();

  const checkAvatar = () => {
    // console.log("avatar", avatar);
    if (avatar) {
      let pathname = new URL(avatar).pathname;
      // console.log("checkavatar result", pathname.includes("null"));
      return pathname.includes("null");
    }
    return true;
  };

  // delete user acount
  const deleteAccount = async () => {
    setDeleting(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .delete(
        `https://surveyplanner.pythonanywhere.com/auth/users/${session?.user?.data.id}/`,
        config
      )
      .then(() => {
        signOut({ callbackUrl: "http://localhost:3000" });
        setDeleting(false);
        onClose();
      })
      .catch((err) => {
        // console.log(err);
        toast({
          position: "bottom-right",
          description: ["Account delete unsuccessful"],
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setDeleting(false);
      });
  };

  useEffect(() => {
    // console.log(user?.user_profile?.avatar);
    // headers
    let result = checkAvatar();
    setUserAvatar(result);
  }, [avatar]);

  return (
    <Card mb={{ base: "0px", lg: "20px" }} {...rest}>
      <Flex>
        <Flex align="center" justify="space-between" w="20%">
          <NextAvatar
            mx="auto"
            src={userAvatar ? "/profile.png" : avatar}
            alt="user avatar"
            h="100px"
            w="100px"
            border="10px solid"
            borderColor={borderColor}
          />
        </Flex>
        <Box h="100%" mx="10px" w="2px" bg="gray.200" />
        <Box w="80%" px={20}>
          <Text
            data-cy="user-name"
            pb={4}
            fontWeight="extrabold"
            fontSize="xl"
            color="primary.500"
          >
            {name}
          </Text>
          <Flex w="100%" mt="3" pb={4} align="center" justify="space-between">
            {/* <Box>
              <Text color="gray.400" transform="capitalize">
                Name
              </Text>
              <Text>{name}</Text>
            </Box> */}
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
              <Text>{date == "Invalid Date" ? "loading" : date}</Text>
            </Box>
            <Box>
              <Text color="gray.400" transform="capitalize">
                Phone Number
              </Text>
              <Text>
                {phoneNumber == "undefined" ? "Not Set" : phoneNumber}
              </Text>
            </Box>
          </Flex>

          <Flex mt="7">
            <Button
              data-cy="edit-info"
              onClick={() => router.push("/auth/edit-user")}
              mr={2}
              bg="primary.500"
              variant="homePrimary"
              py="5"
              color="white"
            >
              Edit info
            </Button>
            <Button
              color="red.500"
              py="4"
              px="4"
              isDisabled
              borderColor="red.500"
              variant="outline"
              bg="white"
              _hover={{ bg: "red.400", color: "white" }}
              onClick={onOpen}
            >
              Delete account
            </Button>
          </Flex>
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
                  isLoading={deleting}
                  py="6"
                  bgColor="red"
                  onClick={deleteAccount}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  py="5"
                  px="7"
                  mt="1px"
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
