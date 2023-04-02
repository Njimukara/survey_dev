// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// // Assets
// import Project1 from 'img/profile/Project1.png'
// import Project2 from 'img/profile/Project2.png'
// import Project3 from 'img/profile/Project3.png'
// Custom components
import Card from "components/card/Card";
import Project from "views/admin/profile/components/Project";
import { MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RegisterCompany from "views/admin/default/components/RegisterCompany";
import InviteUser from "./InviteUser";

export default function CompanyUsers(props: { [x: string]: any }) {
  const { toggleModal, isOpen, company, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const [companyMembers, setCompanyMembers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // console.log("members", company?.members);
    setCompanyMembers(company?.members);
    console.log(company);
  }, [company]);

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Flex flexDirection="column" alignItems="center">
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          mb="20px"
        >
          <Flex>
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize="2xl"
              mt="10px"
              mb="4px"
            >
              Company Users
            </Text>
          </Flex>
          <Flex>
            <Button
              variant="homePrimary"
              py="5"
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
              py="4"
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
          <>
            {/* <Project
              boxShadow={cardShadow}
              mb="20px"
              position="Owner"
              name={company?.owner}
            /> */}
            {companyMembers.length != 0 ? (
              companyMembers.map((member, index) => {
                return (
                  <Project
                    key={index}
                    boxShadow={cardShadow}
                    mb="20px"
                    position={member?.email}
                    name={member?.name}
                  />
                );
              })
            ) : (
              <Flex justifyContent="center" alignItems="center">
                <Text>No users yet</Text>
              </Flex>
            )}
          </>
        </Box>
      </Flex>
      <InviteUser opened={isOpen} toggleModal={toggleModal} />
    </Card>
  );
}
