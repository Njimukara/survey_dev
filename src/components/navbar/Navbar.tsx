import React, { useEffect } from "react";
import { useState } from "react";
import { Flex, Box, Text, Button, Link } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import NextLink from "next/link";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

type MenuItemsProps = {
  children: string;
  isLast?: boolean;
  to: string;
};

const MenuItem = ({
  children,
  isLast,
  to = "/",
}: MenuItemsProps): JSX.Element => {
  return (
    <Text
      px={8}
      fontSize="16px"
      fontWeight="400"
      borderBottom="8px solid rgba(96, 94, 97, 0.0)"
      _hover={{
        color: "primary.500",
      }}
      mb={{ base: isLast ? 0 : 6, sm: 8, md: 0 }}
      mr={{ base: 0, sm: 0 }}
      display="block"
    >
      <Link href={to}>{children}</Link>
    </Text>
  );
};

const Navbar = (): JSX.Element => {
  //     const email: any = null;
  //     const name: any = null;

  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");
  const [isLessThan1280] = useMediaQuery("(max-width: 1280px)");

  // checks of the user scrolls to change the
  // background color of the nav
  const [navScroll, setNavScroll] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 100) {
      setNavScroll(true);
    } else {
      setNavScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);
  });

  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      zIndex={111}
      mb={8}
      pt={[6, 6, 6, 7]}
      pb={[6, 6, 6, 7]}
      pr={[1, 2, 8, isLargerThan992 ? "7rem" : "5rem"]}
      pl={[1, 8, 8, isLargerThan992 ? "6rem" : "7rem"]}
      as="nav"
      alignItems="center"
      justify="space-between"
      wrap="wrap"
      w={["100vw"]}
      fontSize={isLargerThan992 && isLessThan1280 ? "0.7rem" : "1rem"}
      top="0"
      margin="auto"
      position="fixed"
      bg="#fff"
      boxShadow="sm"
      color={navScroll ? "" : ""}
    >
      <Text color="primary.500" fontSize="25px" fontWeight="500">
        SurveyPlanner
      </Text>

      <Box display={{ base: "block", lg: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <HamburgerIcon />}
      </Box>

      <Box
        display={{
          base: show ? "block" : "none",
          lg: "block",
        }}
        flexBasis={{ base: "100%", lg: "auto" }}
        bg={show ? "#1C121F" : ""}
      >
        <Flex
          justify={["center", "space-between", "flex-end", "flex-end"]}
          alignItems="center"
          direction={["column", "column", "column", "row"]}
          color={isLargerThan992 ? "black" : "white"}
        >
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="#services">Services</MenuItem>
          <MenuItem to="#pricing">Pricing</MenuItem>
          <MenuItem to="#resources">Resources</MenuItem>
          <Link as={NextLink} href="/auth/signin">
            <Button
              data-cy="login-button"
              fontWeight="500"
              fontSize="16px"
              variant={navScroll ? "homeWhite" : "homeWhite"}
              color="primary.500"
              border="2px"
              _focus={{ bg: "gray.100" }}
              cursor={"pointer"}
              ml={[0, 0, 4, 8]}
              w="150px"
              py="0"
              h="48px"
            >
              Login
            </Button>
          </Link>
          {/* // _active={{ bg: l"white" }} */}
          <Link as={NextLink} href="/auth/signin">
            <Button
              ml={[0, 0, 4, 8]}
              variant="homePrimary"
              w="150px"
              py="0"
              h="48px"
              fontSize="16px"
              fontWeight="500"
            >
              Try It Now
            </Button>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
