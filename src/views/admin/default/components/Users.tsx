// react imports
import React from "react";
import Link from "next/link";

// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Assets
import { MdArrowRight } from "react-icons/md";

// Custom components
import Card from "components/card/Card";
import User from "./User";

export default function Users(props: { [x: string]: any }) {
  const { members, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  if (members.length == 0) {
    return (
      <Card
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        py="8"
        borderRadius="10"
        {...rest}
      >
        <Text color={textColorPrimary} mb="4" fontWeight="bold" fontSize="2xl">
          No company users yet.
        </Text>
        <Button variant="homePrimary" py="6">
          <Link href="/admin/profile/#registerCompany">Add New user</Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card
      mb={{ base: "0px", "2xl": "20px" }}
      bg="transparent"
      borderRadius="10"
      {...rest}
    >
      <>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize="2xl"
              mt="10px"
              mb="4px"
            >
              My Users
            </Text>
          </Box>
          <Flex gap={3}>
            <Link href={`/company/users`}>
              <Button variant="homePrimary" py="6" px="5" bg="#3A2FB7">
                All Users
                <MdArrowRight />
              </Button>
            </Link>
          </Flex>
        </Flex>
        {members?.map(({ email, name }: { name: string; email: string }) => {
          return (
            <User key={email} boxShadow="sm" my="1" name={name} email={email} />
          );
        })}
      </>
    </Card>
  );
}
