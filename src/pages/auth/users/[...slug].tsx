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

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Assets
import { MdClear } from "react-icons/md";

import { useEffect } from "react";
import axiosConfig from "axiosConfig";

export default function SuccesVerifyEmail({ providers }: any) {
  const textColor = useColorModeValue("navy.700", "white");

  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const display = async () => {
    setLoading(true);
    const { slug } = router.query;
    if (!Array.isArray(slug) || slug.length < 3) {
      setError("Invalid slug format");
      setLoading(false);
      return;
    }
    const [link, uid, token] = slug;
    const data = {
      uid,
      token,
    };
    let respond;
    if (uid && token) {
      await axiosConfig
        .post("/auth/users/activation/", data)
        .then((res) => {
          respond = res?.data;
          setLoading(false);
          setError("");
        })
        .catch((err) => {
          setError(
            err.response.data.detail ||
              "There is an error with the verification email"
          );
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    display();
  }, [router.query.slug]);

  if (isLoading) {
    return (
      <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
        <Box w="50%" h="60%" borderRadius={10}>
          <Text
            p={4}
            fontWeight="bold"
            transform="capitalize"
            fontSize={20}
            color={textColor}
            align="center"
          >
            Survey Planner
          </Text>
          <Flex
            mt={40}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight="bold" fontSize="large">
              Account Verificaton in progress ...
            </Text>
            <Flex
              mt="10px"
              w="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner
                size="xl"
                thickness="7px"
                speed="0.9s"
                color="primary.500"
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      //   bgGradient='linear(to-b, primary.500, primary.300)'
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="50%" h="60%" borderRadius={20} bg="white" boxShadow="lg" pt="10">
        <Text
          p={4}
          fontWeight="bold"
          transform="capitalize"
          fontSize={20}
          color={textColor}
          align="center"
        >
          Survey Planner
        </Text>
        {error == "" ? (
          <Flex flexDirection="column" alignItems="center">
            <Box my={5}>
              <Image
                boxSize="150px"
                objectFit="cover"
                src="/congratulations.gif"
                alt="visual tick gif"
              />
            </Box>
            <Flex flexDirection="column" alignItems="center">
              <Text fontWeight="bold" fontSize="24px">
                Account Verified!
              </Text>
              <Text my={4}>Account verification successful</Text>
              <Button
                variant="homePrimary"
                onClick={() => router.push("/auth/signin")}
              >
                Proceed to Login
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex flexDirection="column" alignItems="center">
            <Flex
              my={8}
              bg="#cf8888"
              color="gray.200"
              borderRadius="50%"
              justifyContent="center"
              alignItems="center"
              className="spin"
            >
              <Icon boxSize={20} as={MdClear} />
            </Flex>
            <Flex flexDirection="column" alignItems="center">
              <Text fontWeight="bold" fontSize="24px">
                Account not Verified!
              </Text>
              <Text my={4} fontSize="18px" color="red.500">
                {error}
              </Text>
              <Button
                variant="homePrimary"
                onClick={() => router.push("/auth/resend-email")}
              >
                Resend activation link
              </Button>
            </Flex>
          </Flex>
        )}
      </Box>
    </Box>
  );
}
