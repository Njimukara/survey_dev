import React, { useEffect } from "react";
import { useState } from "react";
import { Flex, Box, Text, Icon, Button, Image, Link } from "@chakra-ui/react";
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
      pt={["1px", "5px", 4, 16]}
      pb={["1px", "5px", 4, 6]}
      px={8}
      fontSize="18px"
      fontWeight="600"
      // borderColor="primary"
      borderBottom="8px solid rgba(96, 94, 97, 0.0)"
      _hover={{
        bg: "rgba(96, 94, 97, 0.2)",
        borderBottom: "6px",
        borderColor: "white",
        overflow: "hidden",
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
      pr={[1, 2, 6, isLargerThan992 ? "2rem" : "5rem"]}
      pl={[1, 8, 8, isLargerThan992 ? "2rem" : "7rem"]}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w={["100vw"]}
      fontSize={isLargerThan992 && isLessThan1280 ? "0.7rem" : "1rem"}
      top="0"
      margin="auto"
      position="fixed"
      bg={navScroll ? "#fff" : ""}
      boxShadow="sm"
      color={navScroll ? "" : "white"}
    >
      <Text mt={[6, 6, 6, 8]} mb={4} fontSize="32px" fontWeight="800">
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
          // align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "column", "column", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/service">Service</MenuItem>
          <MenuItem to="/pricing">Pricing</MenuItem>
          <MenuItem to="/resources">Resources</MenuItem>
          <Link as={NextLink} href="/auth/signin">
            <Text
              fontWeight="700"
              fontSize="18px"
              cursor={"pointer"}
              ml={[0, 0, 4, 16]}
              mr="8"
              mt={16}
              mb={4}
            >
              Login
            </Text>
          </Link>
          {/* <MenuItem to="/search"> */}
          <Button
            ml={[0, 0, 4, 8]}
            mt={10}
            mb={4}
            variant={navScroll ? "homePrimary" : "homeWhite"}
            size="lg"
          >
            Try It Now
          </Button>
          {/* </MenuItem> */}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
