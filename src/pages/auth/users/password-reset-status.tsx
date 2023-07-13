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
// Chakra imports
import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";

// Assets
import { MdLockOpen } from "react-icons/md";

export default function ResetPasswordStatus() {
  const router = useRouter();

  return (
    <>
      <Flex
        w="100%"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box w="30%">
          <Flex justifyContent="center" alignItems="center">
            <Flex
              h={14}
              w={14}
              borderRadius="50%"
              bg="primary.100"
              justifyContent="center"
              alignItems="center"
            >
              <Icon as={MdLockOpen} color="primary.500" boxSize={6} />
            </Flex>
          </Flex>
          <Heading textAlign="center">Password Reset</Heading>
          <Text my={4} fontSize="md" textAlign="center">
            Your password has been successfully changed
          </Text>

          <Button
            onClick={() => router.push("/auth/signin")}
            type="submit"
            variant="homePrimary"
            mx="auto"
            w="100%"
            my={4}
          >
            Continue
          </Button>
        </Box>
      </Flex>
    </>
  );
}
