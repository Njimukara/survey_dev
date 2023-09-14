// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import Project from "views/admin/profile/components/Project";
import { MdAdd } from "react-icons/md";
import { Key, useEffect, useState } from "react";
import { useRouter } from "next/router";
import InviteUser from "./InviteUser";
import User from "views/admin/default/components/User";

export default function CompanyUsers(props: { [x: string]: any }) {
  const { toggleModal, isOpen, companyMembers, ...rest } = props;

  const font_family = "Poppins";

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 5px 5px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  console.log(companyMembers);

  // const [companyMembers, setCompanyMembers] = useState([]);
  const router = useRouter();

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} bg="transparent" {...rest}>
      <Flex flexDirection="column" alignItems="center" fontFamily={font_family}>
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          mb="20px"
        >
          <Flex>
            <Text
              color={textColorPrimary}
              fontWeight="600"
              fontSize="24px"
              mt="10px"
              mb="4px"
            >
              Company Users
            </Text>
          </Flex>
          <Flex>
            <Button
              variant="homePrimary"
              bg="primary.600"
              fontWeight="400"
              py="0"
              h="48px"
              px="3"
              fontSize="sm"
              mr="10px"
              onClick={() => {
                router.push("/company/users");
              }}
            >
              View all Users
            </Button>
            <Button
              variant="outline"
              fontWeight="400"
              h="48px"
              py="0"
              px="4"
              fontSize="sm"
              onClick={() => {
                toggleModal(!isOpen);
              }}
            >
              <Flex>
                <MdAdd />
              </Flex>
              Invite new user
            </Button>
          </Flex>
        </Flex>
        <Box w="100%">
          {companyMembers && companyMembers?.length != 0 ? (
            companyMembers
              .slice(0, 5)
              .map((member: { email: string; name: string }) => (
                <User
                  key={member?.email}
                  boxShadow="sm"
                  my="1"
                  name={member?.name}
                  email={member?.email}
                />
              ))
          ) : (
            <Flex justifyContent="center" alignItems="center" pt={32}>
              <Text>No users yet</Text>
            </Flex>
          )}
        </Box>
      </Flex>
      <InviteUser opened={isOpen} toggleModal={toggleModal} />
    </Card>
  );
}
