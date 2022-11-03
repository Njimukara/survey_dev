import { useState } from "react";
import { Flex, Box, Text, Icon, Button, Image } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { MainLogo } from "../icons/Icons";

const MenuItem = ({ children, isLast, to = "/" }) => {
  return (
    <Text
      pt={["1px", "5px", 4, 16]}
      pb={["1px", "5px", 4, 6]}
      px={4}
      // borderColor="primary"
      borderBottom="8px solid rgba(96, 94, 97, 0.0)"
      _hover={{
        bg: "rgba(96, 94, 97, 0.2)",
        borderBottom: "8px",
        borderColor: "primary",
        overflow: "hidden",
      }}
      mb={{ base: isLast ? 0 : 6, sm: 8, md: 0 }}
      mr={{ base: 0, sm: 0 }}
      display="block"
    >
      <Link to={to}>{children}</Link>
    </Text>
  );
};

const NavBar = (props) => {
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
  window.addEventListener("scroll", changeNavbarColor);
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
      bg={navScroll ? "#1C121F" : ""}
      boxShadow="sm"
    >
      <Box mt={[6, 6, 6, 12]} mb={4}>
        <Image
          src="https://res.cloudinary.com/dnfpmrdjl/image/upload/v1657005648/small%20icons/mainlogo_ay2tps.svg"
          w={[
            "8rem",
            "8rem",
            "8rem",
            isLargerThan992 && isLessThan1280 ? "6rem" : "10rem",
          ]}
        />
      </Box>

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
          <MenuItem to="/nft-sneakers">NFT Sneakers</MenuItem>
          <MenuItem to="/tokenomics">Tokenomics</MenuItem>
          <MenuItem to="/roadmap">Roadmap</MenuItem>
          <MenuItem to="/team">Team</MenuItem>
          <MenuItem to="/document">Document</MenuItem>
          <MenuItem to="/whitepaper">Whitepaper</MenuItem>
          {/* <MenuItem to="/search"> */}
          <Button ml={[0, 0, 4, 8]} mt={12} mb={4} variant="connect_wallet">
            Connect Wallet
          </Button>
          {/* </MenuItem> */}
        </Flex>
      </Box>
    </Flex>
  );
};

export default NavBar;
