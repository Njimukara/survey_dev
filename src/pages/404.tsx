import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Footer from "../layouts/home/Footer";

export default function Custom404() {
  const router = useRouter();
  return (
    <Card h="100vh" bg="white">
      <Heading pt="10" pl="20">
        <Link href="/">Survey Planner</Link>
      </Heading>
      <Flex>
        <Flex
          w="50%"
          alignItems="left"
          justifyContent="center"
          flexDir="column"
          px="20"
        >
          <Text>404 error</Text>
          <Heading my="2">Page not found...</Heading>
          <Text mt="2">
            We searched high and low but couldn't find what you're looking for
          </Text>
          <Text mb="4">Let's find a better place for you to go</Text>
          <Button
            w="50%"
            variant="homePrimary"
            py="6"
            onClick={() => router.push("/")}
          >
            <Link href="/admin/default">Take me home</Link>
          </Button>
        </Flex>
        <Flex
          w="50%"
          alignItems="left"
          justifyContent="center"
          flexDir="column"
        >
          <Image
            src="/img/404.png"
            alt="echo_sonar"
            height="70%"
            width="90%"
            objectFit="contain"
          />
        </Flex>
      </Flex>
      <Footer />
    </Card>
  );
}
