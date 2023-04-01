// react imports
import React from "react";
import Link from "next/link";

// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Assets
import Project2 from "img/profile/Project2.png";
import Project3 from "img/profile/Project3.png";
import { MdAdd, MdArrowRight } from "react-icons/md";

// Custom components
import Card from "components/card/Card";
import User from "./User";

export default function Users(props: { [x: string]: any }) {
  const { members, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  if (members.length == 0) {
    return (
      <Card
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        py="8"
        {...rest}
      >
        <Text color={textColorPrimary} mb="4" fontWeight="bold" fontSize="2xl">
          No company users yet.
        </Text>
        <Button variant="homePrimary" py="6">
          <Link href="/admin/profile">Add New user</Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
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
            <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
              All current users in your company.
            </Text>
          </Box>
          <Flex gap={3}>
            <Link href={`/company/users`}>
              <Button variant="homePrimary" py="5" px="4">
                All Users
                <MdArrowRight />
              </Button>
            </Link>
          </Flex>
        </Flex>
        {members?.map((member: any) => {
          return (
            <User key={member.name} boxShadow={cardShadow} name={member.name} />
          );
          // console.log(y);
        })}
      </>
    </Card>
  );
}
