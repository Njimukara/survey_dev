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

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// Chakra imports
import { Button, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import DefaultAuthLayout from "layouts/auth/Default";
// Assets
import { MdOutlineMail, MdOutlineArrowBack } from "react-icons/md";

export default function VerifyEmail(props: any) {
  const router = useRouter();
  const textColor = useColorModeValue("primary.500", "primary.500");
  const btnBgNull = useColorModeValue({ bg: "none" }, { bg: "none" });

  const handleOpenEmail = () => {
    window.open("mailto:"); // Opens the default email server
  };

  return (
    <DefaultAuthLayout illustrationBackground={"/img/auth/auth.png"}>
      <Flex
        maxW="max-content"
        w="100%"
        mx="0px"
        alignItems="center"
        justifyContent="center"
        px="0px"
        flexDirection="column"
      >
        <Flex flexDirection="column" alignItems="center">
          <Text>You're almost there!</Text>
          <Icon
            my={4}
            p={2}
            borderRadius={"50%"}
            bg="green.100"
            as={MdOutlineMail}
            w={12}
            h={12}
            boxSize={12}
          />
          <Text>
            A link has been sent to{" "}
            <Button
              color={textColor}
              bg={btnBgNull}
              _focus={btnBgNull}
              _active={btnBgNull}
              _hover={btnBgNull}
              onClick={handleOpenEmail}
            >
              your email
            </Button>
            Follow it to activate your account
          </Text>
          <Button
            variant="outline"
            py="5"
            px="4"
            onClick={() => router.push("/auth/resend-email")}
            my={4}
          >
            Resend Link
          </Button>
          <Link href="/auth/signin">
            <a href="/auth/signin">
              <Flex alignItems="center">
                <Icon mr={1} as={MdOutlineArrowBack} boxSize={6} />
                <Text>Back to Login</Text>
              </Flex>
            </a>
          </Link>
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}
